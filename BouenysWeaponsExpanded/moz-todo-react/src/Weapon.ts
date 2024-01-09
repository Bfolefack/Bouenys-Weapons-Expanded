import React, { ReactElement } from "react";

class Weapon {
    name: string;
    cost: number;
    formula: DiceFormula;
    critRange: number;
    critPower: number;
    upgrade: number;
    tier: number;
    category: WeaponType;
    attributes: Attribute[];

    constructor(name: string,
        cost: number,
        formula: DiceFormula,
        critRange: number,
        critPower: number,
        upgrade: number,
        tier: number,
        category: WeaponType,
        attributes: Attribute[]) {

        this.name = name;
        this.cost = cost;
        this.formula = formula;
        this.critRange = critRange;
        this.critPower = critPower;
        this.upgrade = upgrade;
        this.tier = tier;
        this.category = category;
        this.attributes = attributes;
        this.attributes.sort((a, b) => a < b ? -1 : 1);
    }

    toString(): string {
        return this.name;
    }

    static getName(weapon: Weapon): string {
        return weapon.name;
    }
}


enum WeaponType {
    Basic = "Basic",
    Agile = "Agile",
    Polearm = "Polearm",
    Cleaving = "Cleaving",
    Brutal = "Brutal",
    Thrown = "Thrown",
    Archery = "Archery",
    Firearm = "Firearm"
}

enum AttributeName {
    Ammo = "Ammunition",
    Deli = "Delicate",
    Fill = "Fillable",
    Fine = "Finesse",
    Glove = "Glove",
    Heavy = "Heavy",
    Light = "Light",
    Load = "Loading",
    Mis = "Misfire",
    Pow = "Powder",
    Range = "Range",
    Reach = "Reach",
    Ret = "Returning",
    Stat = "Stationary",
    Sub = "Submersible",
    Thrown = "Thrown",
    Two = "Two-Handed",
    Ver = "Versatile",
    Spec = "Special"
}

class Attribute {
    name: AttributeName;
    stats: number[];

    constructor(name: AttributeName, stats?: number[]) {
        this.name = name;
        if (!stats)
            this.stats = [];
        else if (stats)
            this.stats = stats;
    }

    toString() {
        if (this.name == AttributeName.Ver)
            return this.name + " (" + this.stats[0] + "d" + this.stats[1] + ")"
        if (this.name == AttributeName.Reach){
            return this.name + (this.stats.length == 0 ? "" : "(" + this.stats[0] + "ft)")
        }
        if (this.name == AttributeName.Mis)
            return this.name + " (" + this.stats[0] + "/" + this.stats[1] + "d10)"
        if (this.stats.length == 0)
            return this.name;
        else
            return this.name + " (" + this.stats.join("/") + ")";
    }
}

class DiceFormula {
    formula: number[][];
    types: string[];

    constructor(dice: number[][], types: string[]) {
        this.formula = [];
        this.types = [];

        let max = 0;
        let maxIndex = 0;
        let dieCeiling = Number.MAX_VALUE;
        let indexed = 0;
        // console.log(dice, types);
        if(dice.length != types.length)
            throw new Error("Dice and types must be same length");
        while (indexed < dice.length) {
            for (let i = 0; i < dice.length; i++) {
                if (max < dice[i][1] && dice[i][1] < dieCeiling) {
                    maxIndex = i;
                    max = dice[i][1];
                }
            }
            dieCeiling = max;
            this.formula.push(dice[maxIndex]);
            this.types.push(types[maxIndex])
            indexed++;
        }
    }

    roll() {
        let total = 0;
        for (let i = 0; i < this.formula.length; i++) {
            for (let j = 0; j < this.formula[i][0]; j++) {
                total += Math.ceil(Math.random() * this.formula[i][1]);
            }
        }
        return total;
    }

    average() {
        let total = 0;
        for (let i = 0; i < this.formula.length; i++) {
            for (let j = 0; j < this.formula[i][0]; j++) {
                total = Math.round(this.formula[i][0] / 2 + 0.5);
            }
        }
        return total;
    }

    toString() {
        let out = "";
        for (let i = 0; i < this.formula.length - 1; i++) {
            out += this.formula[i][0] + "d" + this.formula[i][1] + " " + this.types[i]  + " + ";
        }
        out += this.formula[this.formula.length - 1][0] + "d" + this.formula[this.formula.length - 1][1] + " " + this.types[this.formula.length - 1];
        return out;
    }
}

// export const toComponent: React.FC = (weapon: Weapon): ReactElement => {
//     return (
        
//     );
// }

export { Weapon, WeaponType, Attribute, DiceFormula, AttributeName };

type WeaponMap = { [key: string]: Weapon };

export var weapons: WeaponMap = {
    // Club	1 GP	1d4 bludgeoning	x2	x1	Light, Versatile(1d6)
    "Club": new Weapon(
        "Club",
        1,
        new DiceFormula([[1, 4]], ["bludgeoning"]),
        20,
        2,
        1,
        0,
        WeaponType.Basic,
        [new Attribute(AttributeName.Light),
        new Attribute(AttributeName.Ver, [1, 6])]),
    // Dagger	2 GP	1d4 piercing	x2	x1	 Thrown(20/60), Finesse, Light
    "Dagger": new Weapon(
        "Dagger",
        2,
        new DiceFormula([[1, 4]], ["piercing"]),
        20,
        2,
        2,
        0,
        WeaponType.Basic,
        [new Attribute(AttributeName.Thrown, [20, 60]),
        new Attribute(AttributeName.Fine),
        new Attribute(AttributeName.Light)]),
    // Dart (10)	1 GP	1d4 piercing	x2	x0	Thrown (20/60), Fillable, Finesse, Light
    "Dart": new Weapon(
        "Dart",
        1,
        new DiceFormula([[1, 4]], ["piercing"]),
        20,
        2,
        0,
        0,
        WeaponType.Basic,
        [new Attribute(AttributeName.Thrown, [20, 60]),
        new Attribute(AttributeName.Fill),
        new Attribute(AttributeName.Fine),
        new Attribute(AttributeName.Light)]),

    // Gauntlet	2 GP	1d4 bludgeoning	x3	x1	Glove, Light
    "Gauntlet": new Weapon(
        "Gauntlet",
        2,
        new DiceFormula([[1, 4]], ["bludgeoning"]),
        20,
        3,
        1,
        0,
        WeaponType.Basic,
        [new Attribute(AttributeName.Glove),
        new Attribute(AttributeName.Light)]),
    // Light Crossbow	25 GP	1d8 piercing	x3	x2	Ammo (80/320), Loading, Two-Handed	
    "LightCrossbow": new Weapon(
        "Light Crossbow",
        25,
        new DiceFormula([[1, 8]], ["piercing"]),
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
        1,
        new DiceFormula([[1, 6]], ["bludgeoning"]),
        20,
        2,
        2,
        0,
        WeaponType.Basic,
        [new Attribute(AttributeName.Ver, [1, 8])]),

        // Scimitar	20 GP	1d6 slashing	19-20/x2	x1	Finesse, Light
    "Scimitar": new Weapon(
        "Scimitar",
        20,
        new DiceFormula([[1, 6]], ["slashing"]),
        19,
        2,
        1,
        0,
        WeaponType.Agile,
        [new Attribute(AttributeName.Fine),
        new Attribute(AttributeName.Light)]),

        // Switchblade	5 GP	1d4 slashing	19-20/x3	x2	Finesse, Light
    "Switchblade": new Weapon(
        "Switchblade",
        5,
        new DiceFormula([[1, 4]], ["slashing"]),
        19,
        3,
        2,
        0,
        WeaponType.Agile,
        [new Attribute(AttributeName.Fine),
        new Attribute(AttributeName.Light)]),
        // Knuckleduster	5 GP	+2 bludgeoning	x2	x2	Glove, Light
    "Knuckleduster": new Weapon(
        "Knuckleduster",
        5,
        new DiceFormula([[1, 2]], ["bludgeoning"]),
        20,
        2,
        2,
        0,
        WeaponType.Agile,
        [new Attribute(AttributeName.Glove),
        new Attribute(AttributeName.Light)]),
        // Clawed Gauntlet	40 GP	1d6 slashing	x3	x2	Finesse, Glove, Light
    "ClawedGauntlet": new Weapon(
        "Clawed Gauntlet",
        40,
        new DiceFormula([[1, 6]], ["slashing"]),
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
        15,
        new DiceFormula([[1, 4]], ["piercing"]),
        20,
        2,
        2,
        1,
        WeaponType.Agile,
        [new Attribute(AttributeName.Fine),
        new Attribute(AttributeName.Light)]),
        // Poisoner's Dagger	30 GP	1d4 piercing	x2	x2	Thrown(20/50), Delicate, Fillable,  Light
    "PoisonersDagger": new Weapon(
        "Poisoner's Dagger",
        30,
        new DiceFormula([[1, 4]], ["piercing"]),
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
        100,
        new DiceFormula([[0, 0]], [""]),
        20,
        0,
        0,
        1,
        WeaponType.Agile,
        [new Attribute(AttributeName.Thrown, [20, 40]),
        new Attribute(AttributeName.Deli),
        new Attribute(AttributeName.Fill),
        new Attribute(AttributeName.Spec)]),
        // Chain Blade	15 GP	1d6 slashing	x3	x2	Finesse, Reach
    "ChainBlade": new Weapon(
        "Chain Blade",
        15,
        new DiceFormula([[1, 6]], ["slashing"]),
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
        new DiceFormula([[1, 6]], ["slashing"]),
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
        new DiceFormula([[1, 8]], ["piercing"]),
        19,
        3,
        2,
        1,
        WeaponType.Agile,
        [new Attribute(AttributeName.Deli),
        new Attribute(AttributeName.Spec)]),
        // Whip Sword	1,000 GP	2d6 slashing	19-20/x3	x4	Delicate, Reach
    "WhipSword": new Weapon(
        "Whip Sword",
        1000,
        new DiceFormula([[2, 6]], ["slashing"]),
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
        new DiceFormula([[1, 8], [1, 4]], ["piercing", "piercing"]),
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
        new DiceFormula([[1, 6]], ["bludgeoning"]),
        20,
        2,
        4,
        2,
        WeaponType.Agile,
        [new Attribute(AttributeName.Fine),
        new Attribute(AttributeName.Glove),
        new Attribute(AttributeName.Light),
        new Attribute(AttributeName.Spec)])};

