import { DiceFormula } from "./Weapon";
import { Attribute, AttributeName, DamageType } from "./Weapon";
import { Weapon } from "./Weapon";
import { WeaponType } from "./Weapon";

type WeaponMap = { [key: string]: Weapon };

export var weapons: WeaponMap = {
    // Basic
    // Club	1 GP	1d4 bludgeoning	x2	x1	Light, Versatile(1d6)
    "Club": new Weapon(
        "Club",
        0.2,
        new DiceFormula([[1, 4]], [DamageType.Blud]),
        20,
        3,
        1,
        0,
        WeaponType.Basic,
        [new Attribute(AttributeName.Light),
        new Attribute(AttributeName.Ver, [1, 6])]
        ),
    // Dagger	2 GP	1d4 piercing	x2	x1	 Thrown(20/60), Finesse, Light
    "Dagger": new Weapon(
        "Dagger",
        2,
        new DiceFormula([[1, 4]], [DamageType.Pier]),
        20,
        2,
        2,
        0,
        WeaponType.Basic,
        [new Attribute(AttributeName.Thrown, [20, 60]),
        new Attribute(AttributeName.Fine),
        new Attribute(AttributeName.Light)]
    ),
    // Gauntlet	2 GP	1d4 bludgeoning	x3	x1	Glove, Light
    "Gauntlet": new Weapon(
        "Gauntlet",
        2,
        new DiceFormula([[1, 4]], [DamageType.Blud]),
        20,
        3,
        1,
        0,
        WeaponType.Basic,
        [new Attribute(AttributeName.Glove),
        new Attribute(AttributeName.Fine),
        new Attribute(AttributeName.Light)]),
    // Light Crossbow	25 GP	1d8 piercing	x3	x2	Ammo (80/320), Loading, Two-Handed	
    "LightCrossbow": new Weapon(
        "Light Crossbow",
        25,
        new DiceFormula([[1, 8]], [DamageType.Pier]),
        20,
        3,
        2,
        0,
        WeaponType.Basic,
        [new Attribute(AttributeName.Ammo, [80, 320]),
        new Attribute(AttributeName.Load),
        new Attribute(AttributeName.Two)]),
    // Quarterstaff	1 GP	1d6 bludgeoning	x2	x2	Versatile(1d8)
    "Quarterstaff": new Weapon(
        "Quarterstaff",
        0.3,
        new DiceFormula([[1, 6]], [DamageType.Blud]),
        20,
        2,
        2,
        0,
        WeaponType.Basic,
        [new Attribute(AttributeName.Ver, [1, 8])]),
    // Agile
    // Scimitar	20 GP	1d6 slashing	19-20/x2	x1	Finesse, Light
    "Scimitar": new Weapon(
        "Scimitar",
        20,
        new DiceFormula([[1, 6]], [DamageType.Slash]),
        19,
        2,
        2,
        0,
        WeaponType.Agile,
        [new Attribute(AttributeName.Fine),
        new Attribute(AttributeName.Light)]),
    // Knuckleduster	5 GP	+2 bludgeoning	x2	x2	Glove, Light
    "Knuckleduster": new Weapon(
        "Knuckleduster",
        10,
        new DiceFormula([[2, 1]], [DamageType.Blud]),
        20,
        2,
        2,
        0,
        WeaponType.Basic,
        [new Attribute(AttributeName.Glove),
        new Attribute(AttributeName.Fine),
        new Attribute(AttributeName.Light)]),
    // Clawed Gauntlet	40 GP	1d6 slashing	x3	x2	Finesse, Glove, Light
    "ClawedGauntlet": new Weapon(
        "Clawed Gauntlet",
        40,
        new DiceFormula([[1, 6]], [DamageType.Slash]),
        20,
        3,
        2,
        1,
        WeaponType.Agile,
        [new Attribute(AttributeName.Fine),
        new Attribute(AttributeName.Glove),
        new Attribute(AttributeName.Light)]),
    // Gauche	15 GP	1d4 piercing	x2	x2	Finesse, Light
    "Gauche": new Weapon(
        "Gauche",
        20,
        new DiceFormula([[1, 4]], [DamageType.Pier]),
        19,
        3,
        3,
        1,
        WeaponType.Agile,
        [new Attribute(AttributeName.Fine),
        new Attribute(AttributeName.Light)]),
    // Poisoner's Dagger	30 GP	1d4 piercing	x2	x2	Thrown(20/50), Delicate, Fillable,  Light
    "PoisonersDagger": new Weapon(
        "Poisoner's Dagger",
        30,
        new DiceFormula([[1, 4]], [DamageType.Pier]),
        20,
        2,
        2,
        1,
        WeaponType.Agile,
        [new Attribute(AttributeName.Thrown, [20, 50]),
        new Attribute(AttributeName.Deli),
        new Attribute(AttributeName.Fill),
        new Attribute(AttributeName.Light)]),
    // Poisoner's Needle	100 GP	-	-	-	Thrown(20/40), Delicate, Fillable, Special
    "PoisonersNeedle": new Weapon(
        "Poisoner's Needle",
        20,
        new DiceFormula([[0, 0]], [DamageType.Pier]),
        20,
        0,
        0,
        0,
        WeaponType.Agile,
        [new Attribute(AttributeName.Thrown, [20, 40]),
        new Attribute(AttributeName.Deli),
        new Attribute(AttributeName.Fill),
        new Attribute(AttributeName.Spec)]),
    // Chain Blade	15 GP	1d6 slashing	x3	x2	Finesse, Reach
    "ChainBlade": new Weapon(
        "Chain Blade",
        15,
        new DiceFormula([[1, 6]], [DamageType.Slash]),
        20,
        3,
        2,
        1,
        WeaponType.Agile,
        [new Attribute(AttributeName.Fine),
        new Attribute(AttributeName.Reach)]),
    // Hook Sword	20 GP	1d6 slashing	x3	x3	Delicate, Light, Special
    "HookSword": new Weapon(
        "Hook Sword",
        20,
        new DiceFormula([[1, 6]], [DamageType.Slash]),
        20,
        3,
        3,
        1,
        WeaponType.Agile,
        [new Attribute(AttributeName.Deli),
        new Attribute(AttributeName.Light),
        new Attribute(AttributeName.Spec)]),
    // Rapier	30 GP	1d8 piercing	19-20/x3	x2	Delicate, Parry
    "Rapier": new Weapon(
        "Rapier",
        30,
        new DiceFormula([[1, 8]], [DamageType.Pier]),
        19,
        3,
        2,
        1,
        WeaponType.Agile,
        [new Attribute(AttributeName.Deli)]),
    // Whip Sword	1,000 GP	2d6 slashing	19-20/x3	x4	Delicate, Reach
    "WhipSword": new Weapon(
        "Whip Sword",
        1000,
        new DiceFormula([[2, 6]], [DamageType.Slash]),
        19,
        3,
        4,
        2,
        WeaponType.Agile,
        [new Attribute(AttributeName.Deli),
        new Attribute(AttributeName.Reach)]),
    // Rapier + Gauche	60 GP	(1d8 + 1d4)	19-20/x4	x3, x3	Delicate, Special
    "RapierGauche": new Weapon(
        "Rapier + Gauche",
        60,
        new DiceFormula([[1, 8], [1, 4]], [DamageType.Pier, DamageType.Pier]),
        19,
        4,
        3,
        2,
        WeaponType.Agile,
        [new Attribute(AttributeName.Deli),
        new Attribute(AttributeName.Spec)]),
    // Chain Gauntlets	700 GP	1d6 bludgeoning	x2	x4	Finesse, Glove, Light, Special
    "ChainGauntlets": new Weapon(
        "Chain Gauntlets",
        700,
        new DiceFormula([[1, 6]], [DamageType.Blud]),
        20,
        2,
        4,
        2,
        WeaponType.Agile,
        [new Attribute(AttributeName.Reach), 
        new Attribute(AttributeName.Fine),
        new Attribute(AttributeName.Glove),
        new Attribute(AttributeName.Light),
        new Attribute(AttributeName.Spec)]),
    // Polearm					
    // Shortspear	1 GP	1d6 piercing	x2	x1	Thrown(15/30), Versatile(1d8)
    "Shortspear": new Weapon(
        "Shortspear",
        1,
        new DiceFormula([[1, 6]], [DamageType.Pier]),
        20,
        2,
        1,
        0,
        WeaponType.Polearm,
        [new Attribute(AttributeName.Thrown, [15, 30]),
        new Attribute(AttributeName.Ver, [1, 8])]),
    // Trident	35 GP	1d6 piercing	x3	x1	Submersible, Thrown(20/60), Versatile(1d8)
    "Trident": new Weapon(
        "Trident",
        35,
        new DiceFormula([[1, 6]], [DamageType.Pier]),
        20,
        3,
        1,
        0,
        WeaponType.Polearm,
        [new Attribute(AttributeName.Sub),
        new Attribute(AttributeName.Thrown, [20, 60]),
        new Attribute(AttributeName.Ver, [1, 8])]),
    // Bostaff	10 GP	1d6 bludgeoning	19-20/x2	x4	Reach, Versatile (1d8)
    "Bostaff": new Weapon(
        "Bostaff",
        10,
        new DiceFormula([[1, 6]], [DamageType.Blud]),
        19,
        2,
        4,
        0,
        WeaponType.Polearm,
        [new Attribute(AttributeName.Reach),
        new Attribute(AttributeName.Ver, [1, 8])]),
    // Glaive	20 GP	1d10 slashing	19-20/x3	x2	Finesse, Heavy, Reach, Two-Handed
    "Glaive": new Weapon(
        "Glaive",
        20,
        new DiceFormula([[1, 10]], [DamageType.Slash]),
        19,
        3,
        2,
        1,
        WeaponType.Polearm,
        [new Attribute(AttributeName.Fine),
        new Attribute(AttributeName.Heavy),
        new Attribute(AttributeName.Reach),
        new Attribute(AttributeName.Two)]),
    // Great Trident	70 GP	1d8 piercing	x3	x2	Heavy, Reach, Submersible, Versatile(1d10)
    "GreatTrident": new Weapon(
        "Great Trident",
        70,
        new DiceFormula([[1, 8]], [DamageType.Pier]),
        20,
        3,
        2,
        1,
        WeaponType.Polearm,
        [new Attribute(AttributeName.Heavy),
        new Attribute(AttributeName.Reach),
        new Attribute(AttributeName.Sub),
        new Attribute(AttributeName.Ver, [1, 10])]),
    // Lance	100 GP	1d12 piercing	x3	x2	Heavy, Reach, Special
    "Lance": new Weapon(
        "Lance",
        100,
        new DiceFormula([[1, 12]], [DamageType.Pier]),
        20,
        3,
        2,
        1,
        WeaponType.Polearm,
        [new Attribute(AttributeName.Heavy),
        new Attribute(AttributeName.Reach),
        new Attribute(AttributeName.Spec)]),
    // Longspear	25 GP	1d8 piercing	x2	x2	Thrown(20/60), Heavy, Reach, Versatile(1d10)
    "Longspear": new Weapon(
        "Longspear",
        25,
        new DiceFormula([[1, 8]], [DamageType.Pier]),
        20,
        2,
        2,
        1,
        WeaponType.Polearm,
        [new Attribute(AttributeName.Thrown, [20, 60]),
        new Attribute(AttributeName.Heavy),
        new Attribute(AttributeName.Reach),
        new Attribute(AttributeName.Ver, [1, 10])]),
    // Pike	30 GP	1d8 piercing	19-20/x2	x2	Heavy, Reach
    "Pike": new Weapon(
        "Pike",
        30,
        new DiceFormula([[1, 8]], [DamageType.Pier]),
        19,
        2,
        2,
        1,
        WeaponType.Polearm,
        [new Attribute(AttributeName.Heavy),
        new Attribute(AttributeName.Reach)]),
    // Halberd	700 GP	2d8 slashing	18-20/x2	x2	Heavy, Reach, Two-Handed
    "Halberd": new Weapon(
        "Halberd",
        700,
        new DiceFormula([[2, 8]], [DamageType.Slash]),
        18,
        2,
        2,
        2,
        WeaponType.Polearm,
        [new Attribute(AttributeName.Heavy),
        new Attribute(AttributeName.Reach),
        new Attribute(AttributeName.Two)]),
    // Imperial Lance	600 GP	2d12 piercing	x3	x3	Heavy, Reach(15ft), Special
    "ImperialLance": new Weapon(
        "Imperial Lance",
        600,
        new DiceFormula([[2, 12]], [DamageType.Pier]),
        20,
        3,
        3,
        2,
        WeaponType.Polearm,
        [new Attribute(AttributeName.Heavy),
        new Attribute(AttributeName.Reach, [15]),
        new Attribute(AttributeName.Spec)]),
    // Cleaving					

    // Broadsword	15 GP	1d8 slashing	19-20/x2	x1	-
    "Broadsword": new Weapon(
        "Broadsword",
        15,
        new DiceFormula([[1, 8]], [DamageType.Slash]),
        19,
        2,
        1,
        0,
        WeaponType.Cleaving,
        []),
    // Handaxe	5 GP	1d6 slashing	x3	x1	Light
    "Handaxe": new Weapon(
        "Handaxe",
        5,
        new DiceFormula([[1, 6]], [DamageType.Slash]),
        20,
        3,
        1,
        0,
        WeaponType.Cleaving,
        [new Attribute(AttributeName.Light)]),
    // Sickle	1 GP	1d4 slashing	x2	x1	Finesse, Light
    "Sickle": new Weapon(
        "Sickle",
        0.5,
        new DiceFormula([[1, 4]], [DamageType.Slash]),
        20,
        2,
        1,
        0,
        WeaponType.Cleaving,
        [new Attribute(AttributeName.Fine),
        new Attribute(AttributeName.Light)]),
    // Shortsword	10 GP	1d6 slashing	19-20/x2	x1	Finesse, Light
    "Shortsword": new Weapon(
        "Shortsword",
        10,
        new DiceFormula([[1, 6]], [DamageType.Slash]),
        19,
        2,
        1,
        0,
        WeaponType.Cleaving,
        [new Attribute(AttributeName.Fine),
        new Attribute(AttributeName.Light)]),
    // Battleaxe	20 GP	1d8 slashing	x3	x1	Versatile(1d10)
    "Battleaxe": new Weapon(
        "Battleaxe",
        20,
        new DiceFormula([[1, 8]], [DamageType.Slash]),
        20,
        3,
        1,
        1,
        WeaponType.Cleaving,
        [new Attribute(AttributeName.Ver, [1, 10])]),
    // Whip	5 GP	1d6 slashing	x3	x2	Finesse, Light, Reach
    "Whip": new Weapon(
        "Whip",
        8,
        new DiceFormula([[1, 6]], [DamageType.Slash]),
        20,
        3,
        2,
        0,
        WeaponType.Agile,
        [new Attribute(AttributeName.Fine),
        new Attribute(AttributeName.Light),
        new Attribute(AttributeName.Reach)]),
    // Scythe	10 GP	2d4 slashing	x2	x2	Reach, Two-Handed
    "BattleScythe": new Weapon(
        "Battle Scythe",
        15,
        new DiceFormula([[2, 4]], [DamageType.Slash]),
        20,
        2,
        2,
        1,
        WeaponType.Cleaving,
        [new Attribute(AttributeName.Reach),
        new Attribute(AttributeName.Two)]),
    // Longsword	30 GP	1d10 slashing	19-20/x2	x2	Heavy, Versatile(1d12)
    "Longsword": new Weapon(
        "Longsword",
        30,
        new DiceFormula([[1, 10]], [DamageType.Slash]),
        19,
        2,
        2,
        1,
        WeaponType.Cleaving,
        [new Attribute(AttributeName.Heavy),
        new Attribute(AttributeName.Ver, [1, 12])]),
    // Greatsword	50 GP	2d6 slashing	19-20/x2	x2	Heavy, Two-Handed
    "Greatsword": new Weapon(
        "Greatsword",
        50,
        new DiceFormula([[2, 6]], [DamageType.Slash]),
        19,
        2,
        2,
        1,
        WeaponType.Cleaving,
        [new Attribute(AttributeName.Heavy),
        new Attribute(AttributeName.Two)]),
    // Greataxe	35 GP	1d12 slashing	x3	x2	Heavy, Two-Handed
    "Greataxe": new Weapon(
        "Greataxe",
        35,
        new DiceFormula([[1, 12]], [DamageType.Slash]),
        20,
        3,
        2,
        1,
        WeaponType.Cleaving,
        [new Attribute(AttributeName.Heavy),
        new Attribute(AttributeName.Two)]),
    // Greatscythe	40 GP	3d4 slashing	x2	x2	Heavy, Two-Handed, Reach
    "Greatscythe": new Weapon(
        "Greatscythe",
        40,
        new DiceFormula([[3, 4]], [DamageType.Slash]),
        20,
        2,
        2,
        1,
        WeaponType.Cleaving,
        [new Attribute(AttributeName.Heavy),
        new Attribute(AttributeName.Two),
        new Attribute(AttributeName.Reach)]),
    // Claymore	500 GP	2d10 slashing	19-20/x2	x3	Heavy, Two-Handed
    "Claymore": new Weapon(
        "Claymore",
        500,
        new DiceFormula([[2, 10]], [DamageType.Slash]),
        19,
        2,
        3,
        2,
        WeaponType.Cleaving,
        [new Attribute(AttributeName.Heavy),
        new Attribute(AttributeName.Two)]),
    // War Axe	700 GP	3d6 slashing	x3	x3	Heavy, Two-Handed
    "WarAxe": new Weapon(
        "War Axe",
        700,
        new DiceFormula([[3, 6]], [DamageType.Slash]),
        20,
        3,
        3,
        2,
        WeaponType.Cleaving,
        [new Attribute(AttributeName.Heavy),
        new Attribute(AttributeName.Two)]),
    // Warwhip	150 GP	2d8 slashing	x3	x4	Finesse,  Heavy, Reach
    "Warwhip": new Weapon(
        "Warwhip",
        150,
        new DiceFormula([[1, 10]], [DamageType.Slash]),
        20,
        3,
        3,
        1,
        WeaponType.Agile,
        [new Attribute(AttributeName.Fine),
        new Attribute(AttributeName.Heavy),
        new Attribute(AttributeName.Reach)]),
    // Brutal        
    // Mace	5 GP	1d6 bludgeoning	x3	x1	Heavy
    "Mace": new Weapon(
        "Mace",
        8,
        new DiceFormula([[1, 6]], [DamageType.Blud]),
        20,
        3,
        1,
        0,
        WeaponType.Brutal,
        [new Attribute(AttributeName.Heavy)]),
    // War pick	5 GP	1d8 piercing	x2	x1	Heavy
    "WarPick": new Weapon(
        "War Pick",
        5,
        new DiceFormula([[1, 8]], [DamageType.Pier]),
        20,
        2,
        1,
        0,
        WeaponType.Brutal,
        [new Attribute(AttributeName.Heavy)]),
    // Light hammer	2 GP	1d4 bludgeoning	x2	x1	Thrown (20/60), Light
    "LightHammer": new Weapon(
        "Light Hammer",
        2,
        new DiceFormula([[1, 4]], [DamageType.Blud]),
        20,
        2,
        1,
        0,
        WeaponType.Brutal,
        [new Attribute(AttributeName.Thrown, [20, 60]),
        new Attribute(AttributeName.Light)]),
    // Warhammer	40 GP	1d8 bludgeoning	x3	x2	Versatile(1d10)
    "Warhammer": new Weapon(
        "Warhammer",
        40,
        new DiceFormula([[1, 8]], [DamageType.Blud]),
        20,
        3,
        2,
        1,
        WeaponType.Brutal,
        [new Attribute(AttributeName.Ver, [1, 10])]),
    // Greatclub	1 GP	2d4 bludgeoning	x2	x2	 Heavy, Two-Handed
    "Greatclub": new Weapon(
        "Greatclub",
        3,
        new DiceFormula([[2, 4]], [DamageType.Blud]),
        20,
        2,
        2,
        1,
        WeaponType.Brutal,
        [new Attribute(AttributeName.Heavy),
        new Attribute(AttributeName.Two)]),
    // Flail	10 GP	1d8 bludgeoning	x2	x2	Versatile(1d10)
    "Flail": new Weapon(
        "Flail",
        15,
        new DiceFormula([[1, 8]], [DamageType.Blud]),
        20,
        2,
        2,
        1,
        WeaponType.Brutal,
        [new Attribute(AttributeName.Ver, [1, 10])]),
    // Maul	10 GP	3d4 bludgeoning	x2	x2	Heavy, Two-Handed
    "Maul": new Weapon(
        "Maul",
        10,
        new DiceFormula([[2, 6]], [DamageType.Blud]),
        20,
        2,
        2,
        1,
        WeaponType.Brutal,
        [new Attribute(AttributeName.Heavy),
        new Attribute(AttributeName.Two)]),
    // Morningstar	15 GP	1d8 piercing	x3	x2	Versatile(1d10)
    "Morningstar": new Weapon(
        "Morningstar",
        15,
        new DiceFormula([[1, 8]], [DamageType.Pier]),
        20,
        3,
        2,
        1,
        WeaponType.Brutal,
        [new Attribute(AttributeName.Ver, [1, 10])]),
    // Warclub	25 GP	1d12 bludgeoning	x3	x2	Heavy, Two-Handed
    "Warclub": new Weapon(
        "Warclub",
        25,
        new DiceFormula([[1, 12]], [DamageType.Blud]),
        20,
        3,
        2,
        1,
        WeaponType.Brutal,
        [new Attribute(AttributeName.Heavy),
        new Attribute(AttributeName.Two)]),
    // Greathammer	800 GP	3d6 bludgeoning	x3	x3	Heavy, Two-Handed
    "Greathammer": new Weapon(
        "Greathammer",
        800,
        new DiceFormula([[3, 8]], [DamageType.Blud]),
        20,
        3,
        3,
        2,
        WeaponType.Brutal,
        [new Attribute(AttributeName.Heavy),
        new Attribute(AttributeName.Two)]),
    // Giant's Club	1,200 GP	2d12 bludgeoning	x4	x3	Heavy, Two-Handed
    "GiantsClub": new Weapon(
        "Giant's Club",
        1200,
        new DiceFormula([[2, 12]], [DamageType.Blud]),
        20,
        4,
        3,
        2,
        WeaponType.Brutal,
        [new Attribute(AttributeName.Heavy),
        new Attribute(AttributeName.Two)]),
    // Thrown					
    // Javelin (5)	1 GP	1d6 piercing	x3	x0	Thrown(30/120), Versatile(1d8)
    "Javelin": new Weapon(
        "Javelin",
        0.5,
        new DiceFormula([[1, 6]], [DamageType.Pier]),
        20,
        3,
        0,
        0,
        WeaponType.Thrown,
        [new Attribute(AttributeName.Thrown, [30, 120]),
        new Attribute(AttributeName.Ver, [1, 8])]),
    // Boomerang	1 GP	1d4 bludgeoning	19-20/x2	x2	Thrown(30/120), Light, Returning
    "Boomerang": new Weapon(
        "Boomerang",
        0.8,
        new DiceFormula([[1, 4]], [DamageType.Blud]),
        19,
        2,
        2,
        0,
        WeaponType.Thrown,
        [new Attribute(AttributeName.Thrown, [30, 120]),
        new Attribute(AttributeName.Light),
        new Attribute(AttributeName.Ret)]),
    // Sling	1 GP	1d4 bludgeoning	x3	x3	Ammo(30/120)
    "Sling": new Weapon(
        "Sling",
        0.1,
        new DiceFormula([[1, 4]], [DamageType.Blud]),
        20,
        3,
        2,
        0,
        WeaponType.Thrown,
        [new Attribute(AttributeName.Ammo, [30, 120])]),
    // Throwing Axe (5)	5 GP	1d4 slashing	x3	x1	Light, Thrown (20/60)
    "ThrowingAxe": new Weapon(
        "Throwing Axe",
        3,
        new DiceFormula([[1, 4]], [DamageType.Slash]),
        20,
        3,
        1,
        0,
        WeaponType.Thrown,
        [new Attribute(AttributeName.Light),
        new Attribute(AttributeName.Thrown, [20, 60])]),
    // Blowgun	10 GP	1d4 piercing	x2	x2	Ammo(25/100), Loading, Two-Handed
    "Blowgun": new Weapon(
        "Blowgun",
        10,
        new DiceFormula([[1, 4]], [DamageType.Pier]),
        20,
        2,
        2,
        1,
        WeaponType.Thrown,
        [new Attribute(AttributeName.Ammo, [25, 100]),
        new Attribute(AttributeName.Load),
        new Attribute(AttributeName.Two)]),
    // Harpoon	25 GP	1d10 piercing	x2	x1	Thrown(30/90), Heavy, Submersible, Two-Handed
    "Harpoon": new Weapon(
        "Harpoon",
        25,
        new DiceFormula([[1, 10]], [DamageType.Pier]),
        20,
        2,
        1,
        1,
        WeaponType.Thrown,
        [new Attribute(AttributeName.Thrown, [30, 90]),
        new Attribute(AttributeName.Heavy),
        new Attribute(AttributeName.Sub),
        new Attribute(AttributeName.Two)]),
    // Throwing Knives (10)	30 GP	1d6 piercing	x3	x3	 Thrown(30/90), Finesse, Light,
    "ThrowingKnives": new Weapon(
        "Throwing Knives",
        30,
        new DiceFormula([[1, 6]], [DamageType.Pier]),
        20,
        3,
        3,
        1,
        WeaponType.Thrown,
        [new Attribute(AttributeName.Thrown, [60, 180]),
        new Attribute(AttributeName.Fine),
        new Attribute(AttributeName.Light)]),
    // Chakram	40 GP	1d8 slashing	18-20/x3	x3	Thrown(60/240), Light, Returning
    "Chakram": new Weapon(
        "Chakram",
        40,
        new DiceFormula([[1, 8]], [DamageType.Slash]),
        18,
        3,
        3,
        2,
        WeaponType.Thrown,
        [new Attribute(AttributeName.Fine),
        new Attribute(AttributeName.Thrown, [60, 240]),
        new Attribute(AttributeName.Light),
        new Attribute(AttributeName.Ret)]),
    // Archery       
    // Shortbow	15 GP	1d6 piercing	x2	x1	Ammo (80/320), Two-Handed
    "Shortbow": new Weapon(
        "Shortbow",
        15,
        new DiceFormula([[1, 6]], [DamageType.Pier]),
        20,
        2,
        1,
        0,
        WeaponType.Archery,
        [new Attribute(AttributeName.Ammo, [80, 320]),
        new Attribute(AttributeName.Two)]),
    // Hand Crossbow	75 GP	1d6 piercing	x3	x2	Ammo(30/120), Light, Loading
    "HandCrossbow": new Weapon(
        "Hand Crossbow",
        75,
        new DiceFormula([[1, 6]], [DamageType.Pier]),
        20,
        3,
        2,
        0,
        WeaponType.Archery,
        [new Attribute(AttributeName.Ammo, [30, 120]),
        new Attribute(AttributeName.Light),
        new Attribute(AttributeName.Load)]),
    // Heavy Crossbow	50 GP	1d10 piercing	x3	x2	Ammo(100/400), Heavy, Loading, Two-Handed
    "HeavyCrossbow": new Weapon(
        "Heavy Crossbow",
        50,
        new DiceFormula([[1, 12]], [DamageType.Pier]),
        20,
        3,
        2,
        1,
        WeaponType.Archery,
        [new Attribute(AttributeName.Ammo, [100, 400]),
        new Attribute(AttributeName.Heavy),
        new Attribute(AttributeName.Load),
        new Attribute(AttributeName.Two)]),
    // Longbow	90 GP	1d8 piercing	x2	x2	Ammo(150/600), Heavy, Two-Handed
    "Longbow": new Weapon(
        "Longbow",
        90,
        new DiceFormula([[1, 8]], [DamageType.Pier]),
        20,
        2,
        2,
        1,
        WeaponType.Archery,
        [new Attribute(AttributeName.Ammo, [150, 600]),
        new Attribute(AttributeName.Heavy),
        new Attribute(AttributeName.Two)]),
    // Recurve Bow	100 GP	1d10 piercing	x2	x2	Ammo(100/400), Heavy, Two-Handed
    "RecurveBow": new Weapon(
        "Recurve Bow",
        150,
        new DiceFormula([[1, 10]], [DamageType.Pier]),
        20,
        2,
        2,
        1,
        WeaponType.Archery,
        [new Attribute(AttributeName.Ammo, [100, 400]),
        new Attribute(AttributeName.Heavy),
        new Attribute(AttributeName.Two)]),
    // Wrist Crossbow	150 GP	1d4 piercing	x3	x3	Ammo(30/120), Glove, Light, Loading
    "WristCrossbow": new Weapon(
        "Wrist Crossbow",
        25,
        new DiceFormula([[1, 4]], [DamageType.Pier]),
        20,
        3,
        3,
        1,
        WeaponType.Archery,
        [new Attribute(AttributeName.Ammo, [30, 120]),
        new Attribute(AttributeName.Glove),
        new Attribute(AttributeName.Light),
        new Attribute(AttributeName.Load)]),
    // Repeating Crossbow	300 GP	1d10 piercing	19-20/2x	x3	Ammo(100/400), Heavy, Two-Handed
    "RepeatingCrossbow": new Weapon(
        "Repeating Crossbow",
        300,
        new DiceFormula([[1, 10]], [DamageType.Pier]),
        20,
        2,
        3,
        2,
        WeaponType.Archery,
        [new Attribute(AttributeName.Ammo, [100, 400]),
        new Attribute(AttributeName.Heavy),
        new Attribute(AttributeName.Two)]),
    // Portable Ballista	650 GP	3d6 piercing	x3	x3	Ammo(200,800), Heavy, Loading, Stationary, Two-Handed
    "PortableBallista": new Weapon(
        "Portable Ballista",
        650,
        new DiceFormula([[3, 6]], [DamageType.Pier]),
        20,
        3,
        3,
        2,
        WeaponType.Archery,
        [new Attribute(AttributeName.Ammo, [200, 800]),
        new Attribute(AttributeName.Heavy),
        new Attribute(AttributeName.Load),
        new Attribute(AttributeName.Stat),
        new Attribute(AttributeName.Two)]),
    // Firearm
    // Handgone	50 GP	2d10 piercing	x10	x0	Ammo(60/240), Powder, Reload(1), Misfire(10/2d10)
    "Handgonne": new Weapon(
        "Handgonne",
        50,
        new DiceFormula([[2, 10]], [DamageType.Pier]),
        20,
        5,
        0,
        0,
        WeaponType.Firearm,
        [new Attribute(AttributeName.Ammo, [60, 240]),
        new Attribute(AttributeName.Pow),
        new Attribute(AttributeName.Rel, [1]),
        new Attribute(AttributeName.Mis, [10, 2, 10])]),
    // Tommy Gun	65 GP	2d4 piercing	x2	x1	Ammo(120/360), Powder, Reload(-), Misfire(2/1d10), 
    "TommyGun": new Weapon(
        "Tommy Gun",
        65,
        new DiceFormula([[2, 4]], [DamageType.Pier]),
        20,
        2,
        1,
        0,
        WeaponType.Firearm,
        [new Attribute(AttributeName.Ammo, [50, 150]),
        new Attribute(AttributeName.Pow),
        new Attribute(AttributeName.Mis, [2, 1])]),
    // Revolver	250 GP	1d8 piercing	x2	x1	Ammo(60/240), Light, Powder, Reload(6), Misfire(1/1d10),
    "Revolver": new Weapon(
        "Revolver",
        250,
        new DiceFormula([[1, 8]], [DamageType.Pier]),
        20,
        2,
        1,
        0,
        WeaponType.Firearm,
        [new Attribute(AttributeName.Ammo, [60, 240]),
        new Attribute(AttributeName.Light),
        new Attribute(AttributeName.Pow),
        new Attribute(AttributeName.Rel, [6]),
        new Attribute(AttributeName.Mis, [1, 1])]),
    // Firestarter	1,000 GP	3d8 fire	x2	x1	Ammo(15/15), Loading, Powder, Two-Handed, Misfire(3/3d10), Special
    "Firestarter": new Weapon(
        "Firestarter",
        1000,
        new DiceFormula([[1, 8.001], [2, 8]], [DamageType.Blud, DamageType.Fire]),
        20,
        2,
        1,
        1,
        WeaponType.Firearm,
        [new Attribute(AttributeName.Ammo, [15, 15]),
        new Attribute(AttributeName.Load),
        new Attribute(AttributeName.Pow),
        new Attribute(AttributeName.Two),
        new Attribute(AttributeName.Mis, [3, 3]),
        new Attribute(AttributeName.Spec)]),
    // Pistol	300 GP	1d10 piercing	x2	x2	Ammo(60/180), Powder, Reload(8), Misfire(2/1d10)
    "Pistol": new Weapon(
        "Pistol",
        300,
        new DiceFormula([[1, 10]], [DamageType.Pier]),
        20,
        2,
        2,
        1,
        WeaponType.Firearm,
        [new Attribute(AttributeName.Ammo, [60, 180]),
        new Attribute(AttributeName.Pow),
        new Attribute(AttributeName.Rel, [8]),
        new Attribute(AttributeName.Mis, [2, 1])]),
    // Rifle	500 GP	1d12 piercing	x2	x2	Ammo(200/400), Powder, Reload(8), Two-Handed, Misfire(3/2d10)
    "Rifle": new Weapon(
        "Rifle",
        500,
        new DiceFormula([[1, 12]], [DamageType.Pier]),
        20,
        2,
        2,
        1,
        WeaponType.Firearm,
        [new Attribute(AttributeName.Ammo, [200, 400]),
        new Attribute(AttributeName.Pow),
        new Attribute(AttributeName.Rel, [4]),
        new Attribute(AttributeName.Two),
        new Attribute(AttributeName.Mis, [3, 2])]),
    // Shotgun	350 GP	2d8 Piercing	x3	x2	Ammo(30/90), Powder, Reload(2), Two-Handed, Misfire (2/2d10)
    "Shotgun": new Weapon(
        "Shotgun",
        350,
        new DiceFormula([[2, 8]], [DamageType.Pier]),
        20,
        3,
        2,
        1,
        WeaponType.Firearm,
        [new Attribute(AttributeName.Ammo, [30, 90]),
        new Attribute(AttributeName.Pow),
        new Attribute(AttributeName.Rel, [2]),
        new Attribute(AttributeName.Two),
        new Attribute(AttributeName.Mis, [2, 2])]),
    // Grenade Launcher	600 GP	1d10 piercing, 1d10 fire	x2	x2	Ammo(50/100), Powder, Reload(5), Two-Handed, Misfire(4/3d10)
    "GrenadeLauncher": new Weapon(
        "Grenade Launcher",
        600,
        new DiceFormula([[1, 10.0001], [1, 10]], [DamageType.Pier, DamageType.Fire]),
        20,
        2,
        2,
        1,
        WeaponType.Firearm,
        [new Attribute(AttributeName.Ammo, [50, 100]),
        new Attribute(AttributeName.Pow),
        new Attribute(AttributeName.Rel, [5]),
        new Attribute(AttributeName.Two),
        new Attribute(AttributeName.Mis, [4, 3])]),
    // Minigun	2,000 GP	Xd6 piercing	x2	x3	Ammo(30), Heavy, Stationary, Powder, Two-Handed,  Misfire(X/Xd10), Special
    "Minigun": new Weapon(
        "Minigun",
        2000,
        new DiceFormula([[1, 6]], [DamageType.Pier]),
        20,
        2,
        3,
        2,
        WeaponType.Firearm,
        [new Attribute(AttributeName.Ammo, [30]),
        new Attribute(AttributeName.Heavy),
        new Attribute(AttributeName.Stat),
        new Attribute(AttributeName.Pow),
        new Attribute(AttributeName.Two),
        new Attribute(AttributeName.Mis, [1, 1]),
        new Attribute(AttributeName.Spec)]),
    // Sniper Rifle	1,800 GP	4d12 piercing	x4	x2	Ammo(60/300/900), Heavy, Stationary, Powder, Two-Handed, Misfire(3/4d10), Reload(1)
    "SniperRifle": new Weapon(
        "Sniper Rifle",
        1800,
        new DiceFormula([[4, 12]], [DamageType.Pier]),
        20,
        4,
        2,
        2,
        WeaponType.Firearm,
        [new Attribute(AttributeName.Ammo, [60, 300, 900]),
        new Attribute(AttributeName.Heavy),
        new Attribute(AttributeName.Stat),
        new Attribute(AttributeName.Pow),
        new Attribute(AttributeName.Two),
        new Attribute(AttributeName.Mis, [3, 4]),
        new Attribute(AttributeName.Rel, [1])]),
};