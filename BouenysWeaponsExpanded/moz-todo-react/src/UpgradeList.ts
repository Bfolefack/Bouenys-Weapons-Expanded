import { WeaponType, AttributeName, DamageType } from "./Weapon"





export var upgrades = {
    // Balanced
    // Prereq: Versatile 
    // Proficiency Cost: X
    // This weapon does its versatile damage whether you are wielding it one-handed or not. A weapon with the balanced upgrade is considered heavy for dual wielding purposes.
    Balanced: {
        name: "Balanced",
        attributePrereqs: [AttributeName.Ver],
        proficiencyCost: 2,
        description: "This weapon does its versatile damage whether you are wielding it one-handed or not. A weapon with the balanced upgrade is considered heavy for dual wielding purposes.",
        advanceCost: 3,
        advanceDescription: "This weapon does its versatile damage whether you are wielding it one-handed or not."
    },
    // Brawler
    // Prereq: One-Handed/Versatile, Bludgeoning
    // Proficiency Cost: X
    // As a bonus action, upon a successful attack, so long as you are wielding only this weapon you may grapple or shove your target five feet.
    // Brawler+
    // Prereq: Brawler
    // Proficiency Cost: XX
    // As a bonus action, upon a successful attack, so long as you are wielding only this weapon you may grapple, make an unarmed strike against, or shove your target up to 10 feet.
    Brawler: {
        name: "Brawler",
        attributePrereqs: [AttributeName.OneVer, AttributeName.Melee],
        damagePrereqs: [DamageType.Blud],
        proficiencyCost: 1,
        description: "As a bonus action, upon a successful attack, so long as you are wielding only this weapon you may grapple or shove your target five feet.",
        advanceCost: 2,
        advanceDescription: "As a bonus action, upon a successful attack, so long as you are wielding only this weapon you may grapple, make an unarmed strike against, or shove your target up to 10 feet."
    },
    // Bleed
    // Prereq: Slashing
    // Proficiency Cost: X
    // If an attack from this weapon would bloody a creature, treat the hit as a critical hit and roll additional damage accordingly.
    // Bleed+
    // Prereq: Bleed
    // Proficiency Cost: XXX
    // If an attack from this weapon would bloody a creature, treat the hit as a critical hit and roll additional damage accordingly. Additionally all attacks against a bloodied creature deal an additional die of damage. 
    Bleed: {
        name: "Bleed",
        damagePrereqs: [DamageType.Slash],
        proficiencyCost: 2,
        description: "If an attack from this weapon would bloody a creature, treat the hit as a critical hit and roll additional damage accordingly.",
        advanceCost: 3,
        advanceDescription: "If an attack from this weapon would bloody a creature, treat the hit as a critical hit and roll additional damage accordingly. Additionally all attacks made with this weapon against a bloodied creature deal an additional die of damage."
    },

    // Charge
    // Prereq: Polearm
    // Proficiency Cost: X
    // If the first attack made after moving 20+ feet in a straight line  is made with this weapon the attack deals one extra die of damage.
    // Charge+
    // Prereq: Charge
    // Proficiency Cost: XX
    // If the first attack made after moving 10+ feet in a straight line  is made with this weapon the attack has advantage, and deals an extra die of damage.
    Charge: {
        name: "Charge",
        damagePrereqs: [DamageType.Pier, DamageType.Slash],
        typePrereq: WeaponType.Polearm,
        proficiencyCost: 1,
        description: "If the first attack made after moving 20+ feet in a straight line  is made with this weapon the attack deals one extra die of damage.",
        advanceCost: 2,
        advanceDescription: "If the first attack made after moving 20+ feet in a straight line  is made with this weapon the attack has advantage, and deals an extra die of damage."
    },


    // Cleave
    // Prereq: Cleaving
    // Proficiency Cost: XX
    // If you kill a creature with a melee attack using this weapon, you may immediately make another attack roll with the same weapon against another creature within your reach as  part of the same attack.
    Cleave: {
        name: "Cleave",
        typePrereq: WeaponType.Cleaving,
        proficiencyCost: 2,
        description: "If you kill a creature with a melee attack using this weapon, you may immediately make another attack roll with the same weapon against another creature within your reach as  part of the same attack."
    },

    // Concealed
    // Prereq: Delicate/Finesse, Light
    // Proficiency Cost: -
    // This weapon can easily be concealed within clothing and will not attract suspicion unless it is searched for.
    Concealed: {
        name: "Concealed",
        attributePrereqs: [AttributeName.DelFin, AttributeName.Light],
        proficiencyCost: 0,
        description: "This weapon can easily be concealed within clothing and will not attract suspicion unless it is searched for."
    },

    // Concuss
    // Prereq: Bludgeoning
    // Proficiency Cost: XX
    // Upon a critical hit with this weapon the target is stunned. This effect can be nullified with a legendary resistance.
    Concuss: {
        name: "Concuss",
        damagePrereqs: [DamageType.Blud],
        proficiencyCost: 2,
        description: "Upon a critical hit with this weapon the target is stunned. This effect can be nullified with a legendary resistance."
    },

    // Critical
    // Prereq: None
    // Proficiency Cost: XX
    // This weapon’s critical range is increased by one. This upgrade may be taken multiple times, however, each upgrade occupies its own slot and has its own proficiency cost.
    Critical: {
        name: "Critical",
        proficiencyCost: 2,
        description: "This weapon’s critical range is increased by one. This upgrade may be taken multiple times, however, each upgrade occupies its own slot and has its own proficiency cost."
    },

    // Deadeye
    // Prereqs: Firearm
    // Proficiency Cost: X
    // When you make an attack roll with this weapon, as a bonus action, you may choose to take a -5 penalty to the roll. If the attack hits, it deals an additional die of damage. 
    // Deadeye+
    // Prereqs: Firearm
    // Proficiency Cost: XX
    // When you make an attack roll with this weapon, as a bonus action, you may choose to take a -5 penalty to the roll. If the attack hits, it deals two additional dice of damage. 
    Deadeye: {
        name: "Deadeye",
        typePrereq: WeaponType.Firearm,
        proficiencyCost: 1,
        description: "When you make an attack roll with this weapon, as a bonus action, you may choose to take a -5 penalty to the roll. If the attack hits, it deals an additional die of damage.",
        advanceCost: 2,
        advanceDescription: "When you make an attack roll with this weapon, as a bonus action, you may choose to take a -5 penalty to the roll. If the attack hits, it deals two additional dice of damage."
    },

    // Demolish
    // Prereq: Brutal
    // Proficiency Cost: X
    // This weapon deals double damage to inanimate objects and structures as well as an extra die of damage to any creatures made from hard inorganic materials such as stone, crystal, or metal.
    Demolish: {
        name: "Demolish",
        typePrereq: WeaponType.Brutal,
        proficiencyCost: 1,
        description: "This weapon deals double damage to inanimate objects and structures as well as an extra die of damage to any creatures made from hard inorganic materials such as stone, crystal, or metal."
    },

    // Disarm
    // Prereq: Finesse/Delicate
    // Proficiency Cost: X
    // Upon landing an attack with this weapon, you may use your bonus action to disarm the target. The target must make a dexterity or strength saving throw. If your opponent is dual-wielding you may choose which weapon to disarm them of.
    Disarm: {
        name: "Disarm",
        attributePrereqs: [AttributeName.DelFin, AttributeName.Melee],
        proficiencyCost: 1,
        description: "Upon landing an attack with this weapon, you may use your bonus action to disarm the target. The target must make a dexterity or strength saving throw. If your opponent is dual-wielding you may choose which weapon to disarm them of."
    },

    // Execute
    // Prereq: Agile
    // Proficiency Cost: X
    // This weapon deals an extra die of damage against a creature that is incapacitated, restrained, grappled, or surprised.
    // Execute+
    // Prereq: Execute
    // Proficiency Cost: XXX
    // This any attack you make with this weapon against a creature that is incapacitated, restrained, grappled, or surprised may be considered a critical hit.
    Execute: {
        name: "Execute",
        typePrereq: WeaponType.Agile,
        proficiencyCost: 1,
        description: "This weapon deals an extra die of damage against a creature that is incapacitated, restrained, grappled, or surprised.",
        advanceCost: 3,
        advanceDescription: "This any attack you make with this weapon against a creature that is incapacitated, restrained, grappled, or surprised may be considered a critical hit."
    },

    // Extended Stock(+)
    // Prereq: Reload
    // Proficiency Cost: (X)
    // This weapon’s Reload value is increased by 50% of its original value (rounding down). This Upgrade may be taken multiple times to increase this value to 100%, 150%, etc. Each increase increases the proficiency cost of this upgrade by one.
    ExtendedStock: {
        name: "Extended Stock",
        attributePrereqs: [AttributeName.Rel],
        typePrereq: WeaponType.Firearm,
        proficiencyCost: 1,
        description: "This weapon’s Reload value is increased by 50% of its original value (rounding down). This Upgrade may be taken multiple times to increase this value to 100%, 150%, etc. Every new instance of this upgrade on a weapon has a proficiency cost one higher than the previous."
    },

    // Explosive
    // Prereq: None
    // Proficiency Cost: XX
    // This weapon uses exploding dice. This means that whenever any of the weapon’s damage dice roll their maximum value they may be rolled again, adding to the total damage each time. This effect only applies to the weapon’s damage dice, and not to other dice such as sneak attack or smite. 
    Explosive: {
        name: "Explosive",
        proficiencyCost: 2,
        description: "This weapon uses exploding dice. This means that whenever any of the weapon’s damage dice roll their maximum value they may be rolled again, adding to the total damage each time. This effect only applies to the weapon’s damage dice, and not to other dice such as sneak attack or smite."
    },

    // Feint
    // Prereq: One-Handed/Versatile, Slashing or Piercing 
    // Proficiency Cost: X
    // Upon a successful attack you may forgo dealing damage in exchange for giving the next attack against the creature advantage. 
    Feint: {
        name: "Feint",
        attributePrereqs: [AttributeName.OneVer, AttributeName.Melee],
        damagePrereqs: [DamageType.Slash, DamageType.Pier],
        proficiencyCost: 1,
        description: "Upon a successful attack you may forgo dealing damage in exchange for giving the next attack against the creature advantage."
    },

    // Focus
    // Prereq: Ammunition
    // Proficiency Cost: X
    // You may take an action to give yourself an additional +5 (on top of any existing bonuses) to your next attack with this weapon before the end of your next turn.
    // Focus+
    // Prereq: Ammunition
    // Proficiency Cost: XX
    // You may take an action to give yourself an additional +10 (on top of any existing bonuses) to your next attack with this weapon. This effect expires at the end of your next turn.
    Focus: {
        name: "Focus",
        attributePrereqs: [AttributeName.Ammo],
        proficiencyCost: 1,
        description: "You may take an action to give yourself an additional +5 to hit (on top of any existing bonuses) to your next attack with this weapon before the end of your next turn.",
        advanceCost: 2,
        advanceDescription: "You may take an action to give yourself an additional +10 to hit (on top of any existing bonuses) to your next attack with this weapon. This effect expires at the end of your next turn."
    },

    // Hobble
    // Prereq: Reach or Ranged
    // Proficiency Cost: X
    // On a critical or bloodying hit the target’s speed is reduced to zero until the end of its next turn.
    Hobble: {
        name: "Hobble",
        attributePrereqs: [AttributeName.ReAmmo],
        proficiencyCost: 1,
        description: "On a critical or bloodying hit the target’s speed is reduced to zero until the end of its next turn."
    },

    // Honed
    // Prereq: Piercing or Slashing Damage
    // Proficiency Cost: X
    // This weapon's attacks ignore the target's resistance to piercing or slashing damage.
    // Honed+
    // Prereq: Piercing or Slashing Damage
    // Proficiency Cost: XXX
    // This weapon's attacks ignore the target's resistance to piercing or slashing damage. Additionally on a critical or bloodying hit, the target’s AC is reduced by 10 until the end of your next turn.
    Honed: {
        name: "Honed",
        attributePrereqs: [AttributeName.Melee],
        damagePrereqs: [DamageType.Slash, DamageType.Pier],
        proficiencyCost: 1,
        description: "This weapon's attacks ignore the target's resistance to piercing or slashing damage.",
        advanceCost: 3,
        advanceDescription: "This weapon's attacks ignore the target's resistance to piercing or slashing damage. Additionally on a critical or bloodying hit, the target’s AC is reduced by 5 until the end of its next turn."
    },

    // Intimidating    
    // Prereq: Heavy
    // Proficiency Cost: X
    // When you kill a creature with this weapon, all enemy creatures of the same type within 10 feet of the target must make a charisma saving throw, or be frightened of you until the end of your next turn. 
    // Intimidating+
    // Prereq: Heavy
    // Proficiency Cost: X
    // When you kill a creature with this weapon, all enemy creatures of the same type within 30 feet of the target must make a charisma saving throw, or be frightened of you until the end of your next turn. 
    Intimidating: {
        name: "Intimidating",
        attributePrereqs: [AttributeName.Heavy],
        proficiencyCost: 1,
        description: "When you kill a creature with this weapon, all enemy creatures of the same type within 10 feet of the target must make a charisma saving throw, or be frightened of you until the end of your next turn.",
        advanceCost: 2,
        advanceDescription: "When you kill a creature with this weapon, all enemy creatures of the same type within 30 feet of the target must make a charisma saving throw, or be frightened of you until the end of your next turn."
    },

    // Intuitive
    // Prereq: None
    // Proficiency Cost: -
    // The required proficiency bonus to wield this weapon is halved.
    Intuitive: {
        name: "Intuitive",
        proficiencyCost: 0,
        description: "The proficiency cost of this weapon is halved (rounding up). This upgrade may be taken multiple times, however, each upgrade occupies its own slot."
    },

    // Knockback
    // Prereq: Heavy, Bludgeoning 
    // Proficiency Cost: X
    // When you hit a creature with this weapon, you may use your bonus action to attempt to shove the target. The target must make a strength saving throw or be pushed up to 10 feet away from you in any direction.
    // Knockback+
    // Prereq: Heavy, Bludgeoning 
    // Proficiency Cost: XX
    // When you hit a creature with this weapon, you may use your bonus action to attempt to shove the target. The target must make a strength saving throw or be pushed up to 20 feet away from you in any direction, and knocked prone.
    Knockback: {
        name: "Knockback",
        attributePrereqs: [AttributeName.Heavy, AttributeName.Melee],
        damagePrereqs: [DamageType.Blud],
        proficiencyCost: 1,
        description: "When you hit a creature with this weapon, you may use your bonus action to attempt to shove the target. The target must make a strength saving throw or be pushed up to 10 feet away from you in any direction.",
        advanceCost: 2,
        advanceDescription: "When you hit a creature with this weapon, you may use your bonus action to attempt to shove the target. The target must make a strength saving throw or be pushed up to 20 feet away from you in any direction, and knocked prone."
    },

    // Longshot
    // Prereq: Archery
    // Proficiency Cost: XX
    // Ignore disadvantage due to long range when wielding this weapon
    Longshot: {
        name: "Longshot",
        typePrereq: WeaponType.Archery,
        proficiencyCost: 2,
        description: "Ignore disadvantage due to long range when wielding this weapon"
    },


    // Parry
    // Prereq: Agile
    // Proficiency Cost: X
    // While not wielding a shield, you may use your reaction to add your proficiency bonus to your AC against a single attack.
    Parry: {
        name: "Parry",
        typePrereq: WeaponType.Agile,
        proficiencyCost: 1,
        description: "While not wielding a shield, you may use your reaction to add your proficiency bonus to your AC against a single attack."
    },

    // Phalanx
    // Prereqs: Polearm, Piercing
    // Proficiency Cost: XX
    // Whilst wielding this weapon in one hand, and a shield in the other, you may take opportunity attacks against foes who enter your attack range as well as those who leave it. Any creature whom you hit with an opportunity attack has its movement speed reduced to zero until the start of its next turn. 
    Phalanx: {
        name: "Phalanx",
        damagePrereqs: [DamageType.Pier],
        typePrereq: WeaponType.Polearm,
        proficiencyCost: 2,
        description: "Whilst wielding this weapon in one hand, and a shield in the other, you may take opportunity attacks against foes who enter your attack range as well as those who leave it. Any creature whom you hit with an opportunity attack has its movement speed reduced to zero until the start of its next turn."
    },

    // Point Blank
    // Prereqs: Firearm
    // Proficiency Cost: X
    // Attacks with this weapon within 5 ft of the target have advantage rather than disadvantage
    PointBlank: {
        name: "Point Blank",
        typePrereq: WeaponType.Firearm,
        proficiencyCost: 1,
        description: "Attacks with this weapon within 5 ft of the target have advantage rather than disadvantage"
    },

    // Quickdraw
    // Prereqs: One-Handed, Firearm
    // Proficiency Cost: X
    // This weapon may be drawn and stowed as a free action. The wielder may also use a reaction to fire it once when initiative is rolled so long as they are not surprised.
    Quickdraw: {
        name: "Quickdraw",
        attributePrereqs: [AttributeName.OneVer],
        typePrereq: WeaponType.Firearm,
        proficiencyCost: 1,
        description: "This weapon may be drawn and stowed as a free action. The wielder may also use a reaction to fire it once when initiative is rolled so long as they are not surprised."
    },

    // Reliable(+)
    // Prereqs: Firearm
    // Proficiency Cost: (X)
    // This weapon’s misfire is decreased by 1 (minimum 1). This upgrade may be taken multiple times.  Each decrease increases the proficiency cost of this upgrade by one.
    Reliable: {
        name: "Reliable",
        typePrereq: WeaponType.Firearm,
        proficiencyCost: 1,
        description: "This weapon’s misfire is decreased by 1 (minimum 1).",
        advanceCost: 1,
        advanceDescription: "Decrease the weapon's misfire by an additional point (minimum one). Increase the proficiency cost of this upgrade by one. This advancement may be taken multiple times. "
    },

    // Riposte
    // Prereq: Finesse/Delicate
    // Proficiency Cost: XX
    // When a creature misses you with a melee attack, you may use your reaction to make a melee attack against that creature with this weapon so long as you are not wielding a shield. If this attack hits, it deals an additional die of damage.
    Riposte: {
        name: "Riposte",
        attributePrereqs: [AttributeName.DelFin],
        proficiencyCost: 2,
        description: "When a creature misses you with a melee attack, you may use your reaction to make a melee attack against that creature with this weapon so long as you are not wielding a shield. If this attack hits, it deals an additional die of damage."
    },

    // Silenced
    // Prereq: Powder
    // Proficiency Cost: -
    // This weapon does not create the loud bang signature of powder weapons. It is still audible when fired, but is not easily heard through walls or from a distance.
    Silenced: {
        name: "Silenced",
        attributePrereqs: [AttributeName.Pow],
        proficiencyCost: 0,
        description: "This weapon does not create the loud bang signature of powder weapons. It is still audible when fired, but is not easily heard through thick walls or from a distance."
    },

    // Steady
    // Prereq: Ammunition
    // Proficiency Cost: X
    // As a bonus action, you may give yourself advantage on your next attack roll for the current turn. You may take this bonus action only if you haven’t used any movement during this turn, and after you use the bonus action, your speed is reduced to 0 until the end of your turn.
    // Steady+
    // Prereq: Ammunition
    // Proficiency Cost: XXX
    // As a bonus action, you may give yourself advantage on all attack rolls you make with this weapon until the end of your turn. You may take this bonus action only if you haven’t used any movement during this turn, and after you use the bonus action, your speed is reduced to 0 until the end of your turn.
    Steady: {
        name: "Steady",
        attributePrereqs: [AttributeName.Ammo],
        proficiencyCost: 1,
        description: "As a bonus action, you may give yourself advantage on your next attack roll for the current turn. You may take this bonus action only if you haven’t used any movement during this turn, and after you use the bonus action, your speed is reduced to 0 until the end of your turn.",
        advanceCost: 3,
        advanceDescription: "As a bonus action, you may give yourself advantage on all attack rolls you make with this weapon until the end of your turn. You may take this bonus action only if you haven’t used any movement during this turn, and after you use the bonus action, your speed is reduced to 0 until the end of your turn."
    },

    // Trip
    // Prereq: Reach 
    // Proficiency Cost: X
    // When you hit a creature with this weapon, you may use your bonus action to attempt to trip the target. The target must make a Dexterity saving throw or be knocked prone.
    Trip: {
        name: "Trip",
        attributePrereqs: [AttributeName.Reach],
        proficiencyCost: 1,
        description: "When you hit a creature with this weapon, you may use your bonus action to attempt to trip the target. The target must make a Dexterity saving throw or be knocked prone."
    },

    // Vigilant
    // Prereq: One-Handed/Versatile
    // Proficiency Cost: XX
    // Your opportunity attacks with this weapon have advantage.
    Vigilant: {
        name: "Vigilant",
        attributePrereqs: [AttributeName.OneVer, AttributeName.Melee],
        proficiencyCost: 2,
        description: "Your opportunity attacks with this weapon have advantage."
    },
}