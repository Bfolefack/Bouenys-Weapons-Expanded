// import { AttributeName } from "./Weapon";

export var attributes = {
    Ammunition : {
        name: "Ammunition",
        //attribute_enum: AttributeName.Ammo,
        description: "You may use a weapon that has the ammunition property to make a ranged attack only if you have ammunition to fire from the weapon. Each time you attack with the weapon, you expend one piece of ammunition. Drawing the ammunition from a quiver, case, or other container is part of the attack. At the end of the battle, if you are wielding a weapon of the Archery of Throwing category you may recover half your expended ammunition by taking a minute to search the battlefield. For weapons in the Firearm category, ammunition is destroyed in the attack. If you use a weapon that has the ammunition property to make a melee attack, you treat the weapon as an improvised weapon. A sling must be loaded to deal any damage when used in this way.",
        short_description: "This weapon requires ammunition to use. If this weapon is not a firearm, you may recover half your expended ammunition after a battle."
    },
    Delicate : {
        name: "Delicate",
        //attribute_enum: AttributeName.Deli,
        description: "When making an attack with a delicate weapon, you use your Dexterity modifier in place of strength for the attack and damage rolls.",
        short_description: "Use your Dexterity modifier for attack and damage rolls with this weapon."
    },
    Fillable : {
        name: "Fillable",
        //attribute_enum: AttributeName.Fill,
        description: "This item has a cavity built-in that can be filled with a liquid or powder, and can be released after a successful attack."
    },
    Finesse : {
        name: "Finesse",
        //attribute_enum: AttributeName.Fine,
        description: "When making an attack with a finesse weapon, you use your choice of your Strength or Dexterity modifier for the attack and damage rolls. You must use the same modifier for both rolls.",
        short_description: "You may use your choice of Strength or Dexterity for attack and damage rolls with this weapon."
    },
    Glove : {
        name: "Glove",
        //attribute_enum: AttributeName.Glove,
        description: "Melee attacks with this weapon are treated as unarmed strikes, and you cannot be disarmed of this weapon."
    },
    Heavy : {
        name: "Heavy",
        //attribute_enum: AttributeName.Heavy,
        description: "Small creatures have disadvantage on attack rolls with heavy weapons. Additionally, wielding more than one heavy weapon at a time imposes disadvantage on attack rolls.",
        short_description: "Small creatures have disadvantage on attack rolls with this weapon."
    },
    Light : {
        name: "Light",
        //attribute_enum: AttributeName.Light,
        description: "A light weapon is small and easy to handle, making it ideal for use when fighting with two weapons. When you take the Attack action and attack with a light weapon that you’re holding in one hand, you can use a bonus action to attack with a different light weapon that you’re holding in the other hand. You don’t add your ability modifier to the damage of the bonus attack, unless that modifier is negative.",
        short_description: "This weapon is small and easy to handle, making it ideal for use when fighting with two weapons."
    },
    Loading : {
        name: "Loading",
        //attribute_enum: AttributeName.Load,
        description: "Because of the time required to load this weapon, you can fire only one piece of ammunition from it when you use an action, bonus action, or reaction to fire it, regardless of the number of attacks you can normally make.",
        short_description: "This weapon can only be fired once per turn."
    },
    Misfire : {
        name: "Misfire",
        //attribute_enum: AttributeName.Mis,
        description: "Whenever you make an attack roll with a weapon that has the misfire property and the number shown on the die is equal to or lower than the weapon’s misfire score, the weapon misfires. The attack misses, and the weapon cannot be used again until you spend an action to repair it. To repair your weapon, make a Dexterity check with a DC of 10 + the weapon's misfire score. On a success, the weapon is repaired. On a failure, the weapon is broken and must be repaired outside of combat with its proper firearm repair kit.",
        short_description: "This weapon has a chance to misfire when used. If it misfires, it cannot be used again until repaired."
    },
    Powder : {
        name: "Powder",
        //attribute_enum: AttributeName.Pow,
        description: "This weapon uses gunpowder or some similar explosive to propel its ammunition. It becomes useless when exposed to heavy rain or submerged in water. In order to regain its usefulness, the weapon must be cleaned and left out to dry for eight hours, or otherwise be dried to working condition. Additionally, this weapon is loud and can be heard from a distance of 300 feet.",
        short_description: "This weapon uses gunpowder or some similar explosive to propel its ammunition. It becomes useless when exposed to heavy rain or submerged in water."
    },
    Reach : {
        name: "Reach",
        //attribute_enum: AttributeName.Reach,
        description: "This weapon increases your reach when you attack with it, as well as when determining your reach for opportunity attacks with it. By default this extended reach is 10 feet, but certain weapons may reach further.",
        short_description: "This weapon has an extended reach."
    },
    Reload : {
        name: "Reload",
        //attribute_enum: AttributeName.Rel,
        description: "A limited number of shots can be made with this weapon before it must be reloaded. You must have a free hand, sufficient ammunition, and take an action to reload the weapon.",
        short_description: "This weapon must be reloaded after a certain number of shots."
    },
    Returning : {
        name: "Returning",
        //attribute_enum: AttributeName.Ret,
        description: "This weapon returns to your hand at the end of the turn after you make a ranged attack with it. If you have no free hand, the weapon falls to the ground at your feet.",
        short_description: "This weapon returns to your hand after being thrown."
    },
    Stationary : {
        name: "Stationary",
        //attribute_enum: AttributeName.Stat,
        description: "This weapon is mounted in place and cannot be moved while attacking with it. If you are proficient with this weapon, you may use your bonus action stow it, otherwise you must use your action to stow it. The weapon cannot be safely fired until it is mounted, and if fired without being mounted, the weapon has disadvantage on attack rolls, and its misfire score — if it has one — is doubled.",
        short_description: "This weapon is mounted in place and cannot be moved while attacking with it."
    },
    Submersible : {
        name: "Submersible",
        //attribute_enum: AttributeName.Sub,
        description: "This weapon is waterproof and can be used underwater without penalty.",
        short_description: "This weapon can be used underwater without penalty."
    },
    Thrown : {
        name: "Thrown",
        //attribute_enum: AttributeName.Thrown,
        description: "If a weapon has the thrown property, you can throw the weapon to make a ranged attack. You use the same ability modifier for that attack roll and damage roll that you would use for a melee attack with the weapon.",
        short_description: "This weapon can be thrown to make a ranged attack."
    },
    "Two-Handed" : {
        name: "Two-Handed",
        //attribute_enum: AttributeName.Two,
        description: "This weapon requires two hands to use.",
        short_description: "This weapon requires two hands to use."
    },
    Versatile : {
        name: "Versatile",
        //attribute_enum: AttributeName.Ver,
        description: "This weapon can be used with one or two hands. A damage value in parentheses appears with the property — the damage when the weapon is used with two hands to make a melee attack.",
        short_description: "This weapon can be used with one or two hands."
    },
    Special : {
        name: "Special",
        //attribute_enum: AttributeName.Spec,
        description: "This weapon has a special property that is detailed in its description."
    },
};