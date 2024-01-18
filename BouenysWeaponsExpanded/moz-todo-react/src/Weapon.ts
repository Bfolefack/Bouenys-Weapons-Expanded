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

    constructor(
        name: string,
        cost: number,
        formula: DiceFormula,
        critRange: number,
        critPower: number,
        upgrade: number,
        tier: number,
        category: WeaponType,
        attributes: Attribute[],
        description?: string) {

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

enum DamageType {
    Blud = "Bludgeoning",
    Pier = "Piercing",
    Slash = "Slashing",
    Fire = "Fire",
    Cold = "Cold",
    Light = "Lightning",
    Acid = "Acid",
    Thunder = "Thunder",
    Poison = "Poison",
    Necrotic = "Necrotic",
    Radiant = "Radiant",
    Force = "Force",
    Psychic = "Psychic",
}

enum AttributeName {
    Ammo = "Ammunition",
    Deli = "Delicate",
    DelFin = "Delicate/Finesse",
    Fill = "Fillable",
    Fine = "Finesse",
    Glove = "Glove",
    Heavy = "Heavy",
    Light = "Light",
    Load = "Loading",
    Mis = "Misfire",
    OneVer = "One-Handed/Versatile",
    Pow = "Powder",
    Range = "Range",
    Reach = "Reach",
    Rel = "Reload",
    Ret = "Returning",
    Stat = "Stationary",
    Sub = "Submersible",
    Thrown = "Thrown",
    Two = "Two-Handed",
    Ver = "Versatile",
    Spec = "Special",
    ReAmmo = "Reach or Ranged",
    Melee = "Melee"
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
        if (this.name == AttributeName.Reach)
            return this.name + (this.stats.length == 0 ? "" : "(" + this.stats[0] + "ft)")
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
    types: DamageType[];

    constructor(dice: number[][], types: DamageType[]) {
        this.formula = [];
        this.types = [];
        let max = 0;
        let maxIndex = 0;
        let dieCeiling = Number.MAX_VALUE;
        let indexed = 0;
        if (dice.length != types.length)
            throw new Error("Dice and types must be same length");
        while (indexed < dice.length) {
            for (let i = 0; i < dice.length; i++) {
                if (max < dice[i][1] && dice[i][1] < dieCeiling) {
                    maxIndex = i;
                    max = dice[i][1];
                }
            }
            dieCeiling = max;
            this.formula.push([Math.round(dice[maxIndex][0]), Math.round(dice[maxIndex][1])])
            this.types.push(types[maxIndex])
            max = 0;
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
            total += this.formula[i][0] * ((this.formula[i][1] + 1) / 2);
        }
        return total;
    }

    toString() {
        let out = "";

        if (this.formula[0][0] * this.formula[0][1] == 0) {
            return "-";
        }

        for (let i = 0; i < this.formula.length - 1; i++) {
            if(this.formula[i][1] == 1)
                out += "+" + this.formula[i][0] + " " + this.types[i] + " + ";
            else
                out += this.formula[i][0] + "d" + this.formula[i][1] + " " + this.types[i] + " + ";
        }
        if(this.formula[this.formula.length - 1][1] == 1)
            out += "+" + this.formula[this.formula.length - 1][0] + " " + this.types[this.formula.length - 1];
        else
            out += this.formula[this.formula.length - 1][0] + "d" + this.formula[this.formula.length - 1][1] + " " + this.types[this.formula.length - 1];
        // console.log(this.formula)
        return out;
    }
}


export { Weapon, WeaponType, Attribute, DiceFormula, AttributeName, DamageType };



