from terminusdb_client.woqlquery import WOQLQuery
from terminusdb_client.woqlclient import WOQLClient
import pandas as pd

SIMPLE_TYPE_MAP={"http://schema.org/Boolean": "boolean",
             "http://schema.org/Text": "string",
             "http://schema.org/Date": "dateTime",
             "http://schema.org/DateTime": "dateTime",
             "http://schema.org/URL": "string",
             "http://schema.org/XPathType": "string",
             "http://schema.org/Integer": "integer", # define in csv that is subType of Number
             "http://schema.org/Number": "integer",
             "http://schema.org/Float": "decimal",
             "http://schema.org/Thing": "string",
             }

# Contruction functions

def construct_simple_type_relations():
    result = []
    for key, value in SIMPLE_TYPE_MAP.items():
        if value == "string" and key != "http://schema.org/Thing":
            result.append(WOQLQuery().add_quad(key, "subClassOf", "http://schema.org/Thing" ,"schema"))
        if value == "dateTime" and key != "http://schema.org/DateTime":
            result.append(WOQLQuery().add_quad(key, "subClassOf", "http://schema.org/DateTime" ,"schema"))
    return result

def construction_schema_objects(series):
    result = WOQLQuery().doctype(series.id,
             label=series.label,
             description=series.comment)
    if series.id in SIMPLE_TYPE_MAP:
        result = result.property(series.id+"Value", "xsd:"+SIMPLE_TYPE_MAP[series.id])
    return result

def construction_schema_addon(series, type_list):
    result=[]
    if type(series.subTypes) == str:
        for kid in series.subTypes.split(','):
            kid = kid.strip()
            if kid in list(type_list):
                result.append(WOQLQuery().add_quad(kid, "subClassOf", series.id ,"schema"))
    if type(series.subTypeOf) == str:
        for parent in series.subTypeOf.split(','):
            parent = parent.strip()
            if parent in list(type_list):
                result.append(WOQLQuery().add_quad(series.id, "subClassOf", parent ,"schema"))
    return result

def construct_prop_dr(series):
    result=[]
    if (type(series.domainIncludes) == str) and (',' in series.domainIncludes):
        result.append(WOQLQuery().doctype(series.id+"Domain"))
    if (type(series.rangeIncludes) == str) and (',' in series.rangeIncludes):
        result.append(WOQLQuery().doctype(series.id+"Range"))
    return result

def construction_schema_addon_property(series, type_list):
    result=[WOQLQuery().add_quad(series.id,"rdf:type","owl:ObjectProperty","schema")]
    if (type(series.domainIncludes) == str):
        if (',' in series.domainIncludes):
            for domain in  series.domainIncludes.split(','):
                domain = domain.strip()
                if domain in list(type_list):
                    #result.append(WOQLQuery().add_quad(series.id, "domain", domain, "schema"))
                    result.append(WOQLQuery().add_quad(domain, "subClassOf", series.id+"Domain", "schema"))
            result.append(WOQLQuery().add_quad(series.id, "domain", series.id+"Domain", "schema"))
        else:
            if series.domainIncludes in list(type_list):
                result.append(WOQLQuery().add_quad(series.id, "domain", series.domainIncludes, "schema"))
    if (type(series.rangeIncludes) == str):
        if (',' in series.rangeIncludes):
            for range in series.rangeIncludes.split(','):
                range = range.strip()
                if range in list(type_list):
                    #result.append(WOQLQuery().add_quad(series.id, "range", range, "schema"))
                    result.append(WOQLQuery().add_quad(range, "subClassOf", series.id+"Range", "schema"))
            result.append(WOQLQuery().add_quad(series.id, "range", series.id+"Range", "schema"))
        else:
            if series.rangeIncludes in list(type_list):
                result.append(WOQLQuery().add_quad(series.id, "range", series.rangeIncludes, "schema"))
    if len(result) < 3:
        return []
    return result

# Excution funstions

def create_schema_objects(client, queries):
    result_query = WOQLQuery().woql_and(*queries)
    return result_query.execute(client)

def create_schema_add_ons(client, queries):
    new_queries = []
    for query_list in queries:
        if len(query_list) > 1:
            new_queries.append(WOQLQuery().woql_and(*query_list))
        elif len(query_list) == 1:
            new_queries.append(query_list[0])
    result_query = WOQLQuery().woql_and(*new_queries)
    return result_query.execute(client)

types = pd.read_csv("all-layers-types.csv")
types["QueryObjects"] = types.apply(construction_schema_objects, axis=1)
types["QueryAddOnObj"] = types.apply(construction_schema_addon, axis=1, type_list=list(types["id"]))

propteries = pd.read_csv("all-layers-properties.csv")
propteries["QueryObjects"] = propteries.apply(construction_schema_objects, axis=1)
propteries["QueryObjects_DR"] = propteries.apply(construct_prop_dr, axis=1)
propteries["QueryAddOnObj"] = propteries.apply(construction_schema_addon_property, axis=1, type_list=list(types["id"]))


server_url = "https://127.0.0.1:6363"
user = "admin"
account = "admin"
key = "root"
dbid = "schema_tutorial"
label = "Schema Tutorial"
description = "Create a graph with Schema.org data"

client = WOQLClient(server_url)
client.connect(user=user,account=account,key=key,db=dbid)

try:
    client.create_database(dbid,user,label=label, description=description)
except Exception as E:
    error_obj = E.errorObj
    if "api:DatabaseAlreadyExists" == error_obj.get("api:error",{}).get("@type",None):
        print(f'Warning: Database "{dbid}" already exists!\n')
    else:
        raise(E)

print("create schema for types")
create_schema_objects(client, list(types["QueryObjects"]))
print("create schema relations for simple types")
#construct_simple_type_relations(type_list=list(types["id"]))
create_schema_objects(client, construct_simple_type_relations())
print("create schema add on for types")
create_schema_add_ons(client, list(types["QueryAddOnObj"]))
#print("crete schema for properties")
#create_schema_objects(client, list(propteries["QueryObjects"]))
print("create schema for DR objects")
create_schema_add_ons(client, list(propteries["QueryObjects_DR"]))
print("create schema add on for properties")
create_schema_add_ons(client, list(propteries["QueryAddOnObj"]))
