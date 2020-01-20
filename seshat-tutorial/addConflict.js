function createConflictRecord(WOQL){
    return WOQL.and(
    createSeshatProperty("belligerent", "PoliticalAuthority", ["Military"], 
        "Belligerent", 
        `A list of all belligerents involved in the conflict`, "Conflict"),
    createSeshatProperty("interpolity_war", "EpistemicState", ["Military"], 
        "Inter-Polity War", 
        `This variable tells us whether this was an external (inter-state) 
        war (code Present), or internal (civil) war (code Absent).`, "Conflict"),
    createSeshatProperty("intraelite_war", "EpistemicState", ["Military"], 
        "Intra-elite War", 
        `Between different elite factions`, "Conflict"),
    createSeshatProperty("popular_uprising", "EpistemicState", ["Military"], 
        "Popular Uprising", 
        `A broadly based rebellion in which commoners (non-elites) are the major component.
        It can take place in the central regions of the polity, or in peripheral regions 
        (in which case a separatist rebellion can also be coded as present), or both.`,
        "Conflict"),
    createSeshatProperty("separatist_rebellion", "EpistemicState", ["Military"], 
        "Separatist Rebellion", 
        `Rebellion in a region aiming to secede from the centre.`, "Conflict"),
    createSeshatProperty("violent_civil_conflict", "EpistemicState", ["Military"], 
        "Violent Civil Conflict", 
        `A violent civil conflict (riots, pogroms, etc)`, "Conflict"),
    createSeshatProperty("oppression_extermination", "EpistemicState", ["Military"], 
        "Oppression / Extermination", 
        `'Purges' of some community or interest group within a polity by the state, e.g.
        the violent persecution of religious minorities under the Sassanid Persian Empire.`, "Conflict"),
    createSeshatProperty("urban_riots", "EpistemicState", ["Military"], 
        "Urban Riots", 
        `Urban Riots.`, "Conflict"),
    createSeshatProperty("rural_succession", "EpistemicState", ["Military"], 
        "Rural Succession", 
        `Succession of rural areas from urban center`, "Conflict"),
    createSeshatProperty("military_revolt", "EpistemicState", ["Military"], 
        "Military Revolt", 
        `Insurrection lead by a military leader involving components of armed forces.`, "Conflict")
    )
}

function createCulturalDistanceRecord(WOQL){
    return WOQL.and(
    WOQL.add_class("CulturalDistance")
        .label("Cultural Distance")
        .description("The cultural distance between groups."),
    createSeshatProperty("between", "PoliticalAuthority", [], 
        "Between", 
        `The groups that the cultural distance is between`, "CulturalDistance"),
    createSeshatProperty("different_dialects", "EpistemicState", ["Language"], 
        "Different Dialects", 
        `Opponent groups perceive each other as having distinct ethnic identities 
        demarcated by a significant dialectal difference,
        but still speaking a mutually comprehensible language but within the same linguistic group.`, 
        "CulturalDistance"),
    createSeshatProperty("different_languages", "EpistemicState", ["Language"], 
        "Different Languages", 
        `The opponent groups speak mutually unintelligible languages, but similarites between 
        languages are apparent to them. Examples include English and Dutch, or Italian and Spanish,
        but not English and Italian (although both are Indo-European languages, the kinship 
        between them is not apparent to a nonspecialist).`,"CulturalDistance"),           
    createSeshatProperty("same_ethnic_group", "EpistemicState", [], 
        "Same Ethnic Group", 
        `Both sides come from the same ethnic group and speak the same 
        dialect of the common language. Most civil wars will
        fall into this category, unless there is a signiﬁcant cultural 
        distance between the two parties.`,"CulturalDistance"),           
    createSeshatProperty("different_language_families", "EpistemicState", ["Language"], 
        "Different Language Families", 
        `The opponent groups speak mutually unintelligible languages that have no similarities 
        apparent to them. Examples include English and Chinese, or Italian and Hindu 
        (although in the second example both are Indo-European languages, the kinship 
        between them is not apparent to a nonspecialist).`,"CulturalDistance"),           
    createSeshatProperty("different_religious_sects", "EpistemicState", ["Religion"], 
        "Different Religious Sects", 
        `This refers to different religious denominations within the same world religion. 
        E.g., Catholics vs. Protestants, or Shiites vs. Sunnis.`,"CulturalDistance"),           
    createSeshatProperty("different_world_religions", "EpistemicState", ["Religion"], 
        "Different World Religions", 
        `Taoism, Confucianism (China), Hinduism, Buddhism, Jainism, Sikhism (India), Zoroastrianism, Judaism, ChrisEanity, Islam (Middle East).`,"CulturalDistance"),           
    createSeshatProperty("world_religion_against_tribal_religion", "EpistemicState", ["Religion"], 
        "World Religion Against Tribal Religion", 
        `E.g., Christian European settlers vs. Native American Indians.`,"CulturalDistance"),           
    createSeshatProperty("civilization_barbarism_frontier", "EpistemicState", [], 
        "Civilization/Barbarism Frontier", 
        `'Civilization' refers to cultures with developed urbanism and literacy 
        (indicated by written records), and 'barbarism' 
        (in the non-pejorative sense) is a culture without developed urbanism and literacy.`,"CulturalDistance"),           
    createSeshatProperty("steppe_frontier", "EpistemicState", [], 
        "Steppe Frontier", 
        `Settled agriculturalists vs. nomadic pastoralists.`,"CulturalDistance"),           
    createSeshatProperty("agricultural_frontier", "EpistemicState", [], 
        "Agricultural Frontier", 
        `Settled agriculturalists vs. hunter-gatherers.`,"CulturalDistance"),           
    createSeshatProperty("steppe_frontier", "EpistemicState", [], 
        "Steppe Frontier", 
        `Settled agriculturalists vs. nomadic pastoralists.`,"CulturalDistance"),           
    createSeshatProperty("consequences", "ConflictConsequences", ["Conflict"], 
        "Consequences For Territories", 
        `For each war / internal conflict, code the following variables concerning 
        the consequences of the conflict for the parties involved.`,"ConflictConsequences"),           
    )
}

function createConsequencesRecord(WOQL){
    return WOQL.and(
    WOQL.add_class("ConflictConsequences")
        .label("Consequences of Conflict")
        .description("The condquences of a conflict."),
    createSeshatProperty("no_consequences", "EpistemicState", ["Conflict"], 
        "No Consequences", 
        `The war / conflict has no consequences for the territories / parties involved.`,
        "ConflictConsequences"),           
    createSeshatProperty("annexation", "EpistemicState", ["Conflict"], 
        "Annexation", 
        `The war / conflict results in annexation.`,
        "ConflictConsequences"),           
    createSeshatProperty("annexation", "EpistemicState", ["Conflict"], 
        "Annexation", 
        `The war / conflict results in annexation.`,
        "ConflictConsequences"),           
    createSeshatProperty("looting", "EpistemicState", ["Conflict"], 
        "Looting", 
        `The war / conflict results in looting.`,
        "ConflictConsequences"),           
    createSeshatProperty("sacking", "EpistemicState", ["Conflict"], 
        "Sacking", 
        `The war / conflict results in sacking.`,
        "ConflictConsequences"),           
    createSeshatProperty("rape", "EpistemicState", ["Conflict"], 
        "Rape", 
        `The war / conflict results in rape.`,
        "ConflictConsequences"),           
    createSeshatProperty("deportation", "EpistemicState", ["Conflict"], 
        "Deportation", 
        `The war / conflict results in deportation.`,
        "ConflictConsequences"),           
    createSeshatProperty("expulsion", "EpistemicState", ["Conflict"], 
        "Expulsion", 
        `The war / conflict results in expulsion.`,
        "ConflictConsequences"),           
    createSeshatProperty("enslavement", "EpistemicState", ["Conflict"], 
        "Enslavement", 
        `The war / conflict results in enslavement.`,
        "ConflictConsequences"),           
    createSeshatProperty("imprisonment", "EpistemicState", ["Conflict"], 
        "Imprisonment", 
        `The war / conflict results in imprisonment.`,
        "ConflictConsequences"),           
    createSeshatProperty("destruction", "EpistemicState", ["Conflict"], 
        "Destruction", 
        `The war / conflict results in destruction.`,
        "ConflictConsequences"),           
    createSeshatProperty("torture", "EpistemicState", ["Conflict"], 
        "Torture", 
        `The war / conflict results in torture.`,
        "ConflictConsequences"),           
    createSeshatProperty("mutilation", "EpistemicState", ["Conflict"], 
        "Mutilation", 
        `The war / conflict results in mutilation.`,
        "ConflictConsequences"),           
    createSeshatProperty("targeted_massacre", "EpistemicState", ["Conflict"], 
        "Targeted Massacre", 
        `The war / conflict results in targetted massacre..`,
        "ConflictConsequences"),           
    createSeshatProperty("torture", "EpistemicState", ["Conflict"], 
        "Torture", 
        `The war / conflict results in torture.`,
        "ConflictConsequences"),           
    createSeshatProperty("general_massacre", "EpistemicState", ["Conflict"], 
        "General Massacre", 
        `The war / conflict results in general massacre.`,
        "ConflictConsequences"),           
    createSeshatProperty("torture", "EpistemicState", ["Conflict"], 
        "Torture", 
        `The war / conflict results in torture.`,
        "ConflictConsequences"),           
    createSeshatProperty("extermination", "EpistemicState", ["Conflict"], 
        "Extermination", 
        `The war / conflict results in extermination.`,
        "ConflictConsequences"),           
    createSeshatProperty("ethnocide", "EpistemicState", ["Conflict"], 
        "Ethnocide", 
        `The war / conflict results in ethnocide.`,
        "ConflictConsequences")
    );
}

