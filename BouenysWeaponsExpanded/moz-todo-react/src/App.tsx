import { useState } from 'react'
import './App.css'
import { weapons } from './WeaponList'
import { upgrades } from './UpgradeList'
import React from 'react'
import { Weapon } from './Weapon'
import { Attribute } from './Weapon'
import { DiceFormula } from './Weapon'
import { AttributeName } from './Weapon'
import { WeaponType } from './Weapon'
import { DamageType } from './Weapon'

function WeaponTableWrapper(props) {

    if (props.tab != "Weapons") {
        return (<></>)
    }

    let weaponRule = (weapon: Weapon) => true

    const [weaponCategory, setWeaponCategory] = useState("All");
    const [activeWeapon, setActiveWeapon] = useState("")

    let setActiveWeaponCallback = (weapon: string) => {
        setActiveWeapon(weapon);
    }


    const weaponList = Object.keys(weapons).map((weapon) => [weapon, weapons[weapon].category == weaponCategory || weaponCategory == "All"])


    return (
        <>
            <span className='weapon-tab-container' style={{ height: "10%", position: "sticky" }}>
                <button onClick={() => setWeaponCategory("All")} className="weapon-tab">All</button>
                <button onClick={() => setWeaponCategory("Basic")} className="weapon-tab">Basic</button>
                <button onClick={() => setWeaponCategory("Agile")} className="weapon-tab">Agile</button>
                <button onClick={() => setWeaponCategory("Polearm")} className="weapon-tab">Polearm</button>
                <button onClick={() => setWeaponCategory("Cleaving")} className="weapon-tab">Cleaving</button>
                <button onClick={() => setWeaponCategory("Brutal")} className="weapon-tab">Brutal</button>
                <button onClick={() => setWeaponCategory("Thrown")} className="weapon-tab">Thrown</button>
                <button onClick={() => setWeaponCategory("Archery")} className="weapon-tab">Archery</button>
                <button onClick={() => setWeaponCategory("Firearm")} className="weapon-tab">Firearm</button>
            </span>

            <div style={{ height: "90%" }}>
                <div className='side-div' style={{ width: "66%" }}>
                    <WeaponTable list={weaponList} setWeapon={setActiveWeaponCallback} />
                </div>
                <div className='side-div' style={{ width: "33%" }}>
                    <WeaponDetails name={activeWeapon} />

                </div>
            </div>
        </>
    )
}

function WeaponTable(props) {
    const weaponElements = props.list.map(([weapon, show]) => <WeaponRow weapon={weapon} show={show} setWeapon={props.setWeapon} />)
    const [weaponSortRule, setWeaponSortRule] = useState("Default")

    let weaponSort;
    switch (weaponSortRule) {
        case "Name":
            weaponSort = ((a: [string, boolean], b: [string, boolean]) => (weapons[a[0]].name < weapons[b[0]].name ? -1 : 1))
            break;
        case "Cost":
            weaponSort = ((a: [string, boolean], b: [string, boolean]) => (weapons[a[0]].cost == weapons[b[0]].cost ?
                (weapons[a[0]].name < weapons[b[0]].name ? -1 : 1) :
                (weapons[a[0]].cost < weapons[b[0]].cost ? -1 : 1)))
            break;
        case "Damage":
            weaponSort = ((a: [string, boolean], b: [string, boolean]) =>
            (weapons[a[0]].formula.average() == weapons[b[0]].formula.average() ?
                (weapons[a[0]].name < weapons[b[0]].name ? -1 : 1) :
                (weapons[a[0]].formula.average() < weapons[b[0]].formula.average() ? -1 : 1)))
            break;
        case "Crit":
            weaponSort = ((a: [string, boolean], b: [string, boolean]) => (weapons[a[0]].critRange * -10 + weapons[a[0]].critPower == weapons[b[0]].critRange * -10 + weapons[b[0]].critPower ?
                (weapons[a[0]].name < weapons[b[0]].name ? -1 : 1) :
                (weapons[a[0]].critRange * -10 + weapons[a[0]].critPower < weapons[b[0]].critRange * -10 + weapons[b[0]].critPower ? -1 : 1)))
            break;
        case "Upgrade":
            weaponSort = ((a: [string, boolean], b: [string, boolean]) =>
            (weapons[a[0]].upgrade == weapons[b[0]].upgrade ?
                (weapons[a[0]].name < weapons[b[0]].name ? -1 : 1) :
                (weapons[a[0]].upgrade < weapons[b[0]].upgrade ? -1 : 1)))
            break;
        case "Attributes":
            weaponSort = ((a: [string, boolean], b: [string, boolean]) =>
            (weapons[a[0]].attributes.length == weapons[b[0]].attributes.length ?
                (weapons[a[0]].attributes[0] == weapons[b[0]].attributes[0] ?
                    (weapons[a[0]].name < weapons[b[0]].name ? -1 : 1) :
                    (weapons[a[0]].attributes[0] < weapons[b[0]].attributes[0] ? -1 : 1)) :
                (weapons[a[0]].attributes.length < weapons[b[0]].attributes.length ? -1 : 1)))
            break;
        default:
            console.log("Default Weapon Sort")
            weaponSort = ((a: [string, boolean], b: [string, boolean]) =>
            ((weapons[a[0]].tier == weapons[b[0]].tier ?
                (weapons[a[0]].name < weapons[b[0]].name ? -1 : 1)
                : weapons[a[0]].tier - weapons[b[0]].tier)))
            break;
    }


    const dark = { backgroundColor: "#1d1d1d", color: "#dddddd" };
    const light = { backgroundColor: "#dddddd", color: "#1d1d1d" };

    props.list.sort(weaponSort);

    return (
        <div className=' scrolling-wrapper'>
            <table className='weapon-table'>
                <thead>
                    <tr>
                        <th>
                            <button style={weaponSortRule == "Name" ? light : dark} onClick={() => (weaponSortRule == "Name" ? setWeaponSortRule("Default") : setWeaponSortRule("Name"))}>
                                Name
                            </button>
                        </th>
                        <th>
                            <button style={weaponSortRule == "Cost" ? light : dark} onClick={() => (weaponSortRule == "Cost" ? setWeaponSortRule("Default") : setWeaponSortRule("Cost"))}>
                                Cost
                            </button>
                        </th>
                        <th>
                            <button style={weaponSortRule == "Damage" ? light : dark} onClick={() => (weaponSortRule == "Damage" ? setWeaponSortRule("Default") : setWeaponSortRule("Damage"))}>
                                Damage
                            </button>
                        </th>
                        <th>
                            <button style={weaponSortRule == "Crit" ? light : dark} onClick={() => (weaponSortRule == "Crit" ? setWeaponSortRule("Default") : setWeaponSortRule("Crit"))}>
                                Crit
                            </button>
                        </th>
                        <th>
                            <button style={weaponSortRule == "Upgrade" ? light : dark} onClick={() => (weaponSortRule == "Upgrade" ? setWeaponSortRule("Default") : setWeaponSortRule("Upgrade"))}>
                                Upgrades
                            </button>
                        </th>
                        <th>
                            <button style={weaponSortRule == "Attributes" ? light : dark} onClick={() => (weaponSortRule == "Attributes" ? setWeaponSortRule("Default") : setWeaponSortRule("Attributes"))}>
                                Attributes
                            </button>
                        </th>
                    </tr>
                </thead>
                {weaponElements}
            </table>
        </div>
    )
}

function WeaponRow(props) {
    const weapon = weapons[props.weapon]

    if (!props.show) {
        return (<></>)
    }

    let weaponColor;
    switch (weapon.tier) {
        case 0:
            weaponColor = "basic-weapon"
            break;
        case 1:
            weaponColor = "advanced-weapon"
            break;
        case 2:
            weaponColor = "expert-weapon"
            break;
    }

    const onTrigger = (event) => {
        props.setWeapon(props.weapon)
    }

    return (
        <tbody className={weaponColor}>
            <tr onClick={onTrigger}>
                <td className='list-element'>{weapon.name}</td>
                <td className='list-element'>{weapon.cost < 1 ? (weapon.cost * 10) + " SP" : weapon.cost + " GP"}</td>
                <td className='list-element'>{weapon.formula.toString()}</td>
                <td className='list-element'>{weapon.critPower == 0 ? "-" : (weapon.critRange == 20 ? "x" + weapon.critPower : weapon.critRange + "-20/x" + weapon.critPower)}</td>
                <td className='list-element'>{weapon.upgrade == 0 ? "-" : "x" + weapon.upgrade}</td>
                <td className='list-element'>{weapon.attributes.length > 0 ? weapon.attributes.map((attribute) => attribute.toString()).join(", ") : "-"}</td>
            </tr>
        </tbody>)
}

function WeaponDetails(props) {

    return (
        <>
            {props.name}
        </>
    )

}

function UpgradeListWrapper(props) {
    if (props.tab != "Upgrades") {
        return (<></>)
    }

    let setActiveUpgradeCallback = (upgrade: string) => {
        setActiveUpgrade(upgrade);
    }


    const [activeUpgrade, setActiveUpgrade] = useState("")

    const upgradeList = Object.keys(upgrades).sort((a: string, b: string) => (upgrades[a].name < upgrades[b].name ? -1 : 1))
    return (
        <>
            <div className='side-div' style={{ width: "33%" }}>
                <UpgradeList upgradeList={upgradeList} callback={setActiveUpgradeCallback} />
            </div>
            <div className='side-div' style={{ width: "66%" }}>
                <UpgradeDetails name={activeUpgrade} />
            </div>
        </>
    )
}

function WeaponItem(props) {
    const weapon = weapons[props.weapon]

    let weaponColor;
    switch (weapon.tier) {
        case 0:
            weaponColor = "basic-weapon"
            break;
        case 1:
            weaponColor = "advanced-weapon"
            break;
        case 2:
            weaponColor = "expert-weapon"
            break;
    }

    const onTrigger = (event) => {
        props.setWeapon(props.weapon)
    }

    return (
        <li className={weaponColor + " list-element"} onClick={onTrigger} style={{overflow: "hidden"}}>{weapon.name}</li>
    )
}

function WeaponList(props) {
    if(!props.show) {
        return (<></>)
    }

    const weaponElements = props.list.map(([weapon]) => <WeaponItem weapon={weapon} setWeapon={props.setWeapon} />)
    return (
        <div className='scrolling-wrapper'>
            <nav>
                <ul>
                    {weaponElements}
                </ul>
            </nav>
        </div>
    )
}

function UpgradeList(props) {
    const upgradeElements = props.upgradeList.map((upgrade) => <UpgradeRow name={upgrade} callback={props.callback} />)

    return (
        <div className='scrolling-wrapper'>
            <nav>
                <ul>
                    <b>{upgradeElements}</b>
                </ul>
            </nav>
        </div>
    )
}

function UpgradeRow(props) {

    let onTrigger = (event) => {
        props.callback(props.name)
    }

    return (
        <li className='list-element basic-row' onClick={onTrigger}>{upgrades[props.name].name}</li>
    )
}

function UpgradeDetails(props) {
    if (!upgrades[props.name]) {
        return (<></>)
    }

    const [activeWeapon, setActiveWeapon] = useState("")

    let setActiveWeaponCallback = (weapon: string) => {
        setActiveWeapon(weapon);
    }

    const upgrade = upgrades[props.name]

    const weaponNames = Object.keys(weapons);
    let weaponList: [string, boolean][] = [];
    for (let i = 0; i < weaponNames.length; i++) {
        if (UpgradeMatchesWeapon(weaponNames[i], props.name))
            weaponList.push([weaponNames[i], true])
    }

    if(!props.truncate){
        return (
            <div style={{ height: "100%", margin: 0, padding: 0 }}>
                <div className='scrolling-wrapper' style={{ height: "50%", overflow: "auto"}}>
                    <h1 style={{ margin: "0px" }}>{upgrade.name}</h1>
                    <b>
                        Proficiency Cost: {"X".repeat(upgrade.proficiencyCost)} <br />
                        Attribute Prerequisites: {upgrade.attributePrereqs == undefined ? "None" : upgrade.attributePrereqs.join(", ")} <br />
                        Weapon Type Prerequisites: {upgrade.typePrereq ? upgrade.typePrereq.toString() : "None"} <br />
                        Damage Type Prerequisites: {upgrade.damagePrereqs == undefined ? "None" : upgrade.damagePrereqs.join(" or ")} <br /><br />
                        Description:
                    </b>
                    <p style={{ margin: 0 }}>{upgrade.description}</p>
                    <div hidden={upgrade.advanceCost == undefined}>
                        <br />
                        <b>
                            Advance Cost: {"X".repeat(upgrade.advanceCost)} <br />
                            Advance Description:
                        </b>
                        <p style={{ margin: 0 }}>{upgrade.advanceDescription}</p>
                    </div>
                </div>
                <div style={{ height: "50%" }}>
                    <WeaponTable list={weaponList} setWeapon={setActiveWeaponCallback} />
                </div>
            </div>
        )
    }
    return (
        <div style={{ height: "100%", margin: 0, padding: 0 }}>
            <div className='scrolling-wrapper' style={{ height: "100%", overflow: "auto" }}>
                <h1 style={{ margin: "0px" }}>{upgrade.name}</h1>
                <b>
                    Proficiency Cost: {"X".repeat(upgrade.proficiencyCost)} <br />
                    Attribute Prerequisites: {upgrade.attributePrereqs == undefined ? "None" : upgrade.attributePrereqs.join(", ")} <br />
                    Weapon Type Prerequisites: {upgrade.typePrereq ? upgrade.typePrereq.toString() : "None"} <br />
                    Damage Type Prerequisites: {upgrade.damagePrereqs == undefined ? "None" : upgrade.damagePrereqs.join(" or ")} <br /><br />
                    Description:
                </b>
                <p style={{ margin: 0 }}>{upgrade.description}</p>
                <div hidden={upgrade.advanceCost == undefined}>
                    <br />
                    <b>
                        Advance Cost: {"X".repeat(upgrade.advanceCost)} <br />
                        Advance Description:
                    </b>
                    <p style={{ margin: 0 }}>{upgrade.advanceDescription}</p>
                </div>
            </div>
        </div>
    )
}

function UpgradeMatchesWeapon(weaponName: string, upgradeName: string) {
    if(weaponName == undefined || upgradeName == undefined || weapons[weaponName] == undefined || upgrades[upgradeName] == undefined){
        return true;
    }
    let upgrade = upgrades[upgradeName]
    if (weapons[weaponName].upgrade <= 0)
        return false
    if (upgrade.attributePrereqs != undefined) {
        for (const attribute of upgrade.attributePrereqs) {
            if (attribute == AttributeName.DelFin) {
                if (!weapons[weaponName].attributes.map((attribute) => (attribute.name)).includes(AttributeName.Fine) && !weapons[weaponName].attributes.map((attribute) => (attribute.name)).includes(AttributeName.Deli)) {
                    return false
                } else {
                    continue
                }
            }
            if (attribute == AttributeName.OneVer) {
                if (weapons[weaponName].attributes.map((attribute) => (attribute.name)).includes(AttributeName.Two)) {
                    return false
                } else {
                    continue
                }
            }
            if (attribute == AttributeName.ReAmmo) {
                if (!weapons[weaponName].attributes.map((attribute) => (attribute.name)).includes(AttributeName.Ammo) &&
                    !weapons[weaponName].attributes.map((attribute) => (attribute.name)).includes(AttributeName.Reach) &&
                    !weapons[weaponName].attributes.map((attribute) => (attribute.name)).includes(AttributeName.Thrown)) {
                    return false
                } else {
                    continue
                }
            }

            if (attribute == AttributeName.Melee) {
                if (weapons[weaponName].attributes.map((attribute) => (attribute.name)).includes(AttributeName.Ammo)) {
                    return false
                } else {
                    continue
                }
            }

            if (!weapons[weaponName].attributes.map((attribute) => (attribute.name)).includes(attribute)) {
                return false
            }
        }
    }
    if (upgrade.typePrereq != undefined) {
        if (upgrade.typePrereq != weapons[weaponName].category) {
            return false
        }
    }


    if (upgrade.damagePrereqs != undefined) {
        let damageFound = false;
        for (const damageType of upgrade.damagePrereqs)
            if (weapons[weaponName].formula.types.includes(damageType)) {
                damageFound = true;
            }
        return damageFound;
    }
    return true
}

function WeaponBuilderWrapper(props) {
    if (props.tab != "Builder") {
        return (<></>)
    }

    let weaponList = Object.keys(weapons).map((weapon) => [weapon, true]) 
    weaponList.sort((a: (string | boolean)[], b: (string | boolean)[]) => (weapons[a[0] as string].name < weapons[b[0] as string].name ? -1 : 1))
    const [activeWeapon, setActiveWeapon] = useState("")
    const [activeUpgrade, setActiveUpgrade] = useState("")
    let setActiveWeaponCallback = (weapon: string) => {
        setActiveWeapon(weapon);
    }
    let setActiveUpgradeCallback = (upgrade: string) => {
        setActiveUpgrade(upgrade);
    }


    
    let upgradeList = Object.keys(upgrades).filter((upgrade) => UpgradeMatchesWeapon(activeWeapon, upgrade))
    return (
        <>
            <div className='side-div' style={{ width: "20%" }}>
                <WeaponList list={weaponList} setWeapon={setActiveWeaponCallback} show={true} active/>
            </div>
            <div className='side-div' style={{ width: "50%" }}>
            </div>
            <div className='side-div' style={{ width: "30%" }}>
                <div style={{height:"30%"}}>
                    <UpgradeList upgradeList={upgradeList} callback={setActiveUpgradeCallback} />
                </div>
                <div style={{height:"70%"}}>
                    <UpgradeDetails name={activeUpgrade} truncate={true}/>
                </div>
            </div>
        </>

    )
}

function HomepageWrapper(props) {
    if (props.tab != "Home") {
        return (<></>)
    }
    return (
        <>
            <div className='side-div' style={{ width: "60%", height: "100%", marginLeft: "20%", lineHeight: "1.6" }}>
                <h1>Welcome to Boueny's Weapons Expanded</h1>
                <p>&emsp;&emsp;
                    This is a collection of weapons and upgrades for Dungeons and Dragons 5th Edition. The weapons are designed to be balanced and flavorful, with a focus on providing a variety of options for players and DMs, while the upgrades are designed to be powerful and unique, greatly expanding 5e's weapon customization, and giving your players the chance to make their weapons truly legendary. This module is a work in progress, and will be updated and refined periodically.
                </p>
                <h2>Weapons Categories</h2>
                <p>&emsp;&emsp;
                    Weapons and weapon proficiencies work a little differently in Boueny's Weapons Expanded. Rather than being split into the classic four categories of Simple Melee, Simple Ranged, Martial Melee, and Martial Ranged, weapons are split into eight categories based on their properties and design. These categories are as follows:
                </p>
                <ul style={{width: "80%", marginLeft: "10%"}}>
                    <li style={{margin: "0.5em"}}><b>Basic</b> - Simple weapons that require no or very little special training to use effectively</li>
                    <li style={{margin: "0.5em"}}><b>Agile</b> - Lightweight weapons that rely on dexterity and finesse to kill with deadly efficiency</li>
                    <li style={{margin: "0.5em"}}><b>Polearm</b> - Long armed weapons with a far reach that are extremely dangerous when paired with careful positioning and planning</li>
                    <li style={{margin: "0.5em"}}><b>Cleaving</b> - Heavy weapons made to cut through flesh and leave severe bleeding wounds</li>
                    <li style={{margin: "0.5em"}}><b>Brutal</b> - Weapons made to bludgeon, bruise, and crush bone, leaving enemies incapacitated, but alive.</li>
                    <li style={{margin: "0.5em"}}><b>Throwing</b> - Weapons launched via muscle alone without the assistance of tension or explosives. </li>
                    <li style={{margin: "0.5em"}}><b>Archery</b> - Weapons made from stiff materials with taut string to launch piercing ammunition. </li>
                    <li style={{margin: "0.5em"}}><b>Firearms</b> - Metallic weapons made to launch specialized ammunition with explosive force, to devastating effect.</li>
                </ul>
                <p>&emsp;&emsp;
                    Each weapon category has its own unique properties and playstyle, and can be used to create a wide variety of characters and builds.
                </p>
                <h2>Weapon Proficiencies</h2>
                <p>&emsp;&emsp;
                    Weapon proficiencies are also handled differently in Boueny's Weapons Expanded. Rather than gaining blanket proficiency with a wide variety of weapons, players gain proficiency with specific weapon categories in stages. There are four sequential stages of weapon proficiency, each granting access to a new selection of weapons. <br/>
                </p>
                <ul style={{width: "80%", marginLeft: "10%"}}>
                    <li style={{marginBottom: "1em"}}><b>General Weapons Proficiency</b> - Grants proficiency with all weapons in the <em>Basic</em> category. All adventurers start with this proficiency, though most commoners will lack even this basic training. <br/> </li>
                    <li style={{marginBottom: "1em"}}><b>Basic Proficiency</b> - Given a character has General Weapons Proficiency they can then gain Basic Proficiency in a weapon category. This grants proficiency with all <em>Green</em> weapons in that category. Basic proficiency represents a basic understanding of a weapon type and the ability to use it effectively in combat. This level of proficiency is expected among even low-level soldiers and bandits. <br/> </li>
                    <li style={{marginBottom: "1em"}}><b>Advanced Proficiency</b> - Given a character has Basic Proficiency in a weapon category they can then gain Advanced Proficiency in that category. This grants proficiency with all <em>Yellow</em> weapons in that category. Advanced proficiency represents a deep understanding of a weapon type and the ability to use it to its full potential. This level of proficiency is expected among elite soldiers and experienced adventurers. <br/></li>
                    <li style={{marginBottom: "1em"}}><b>Expert Proficiency</b> - Finally, given a character has Advanced Proficiency in a weapon category they can then gain Expert Proficiency for a  that category. This grants proficiency with a <b><em>SINGLE</em></b> <em>Red</em> weapon in that category. Expert proficiency represents an unprecedented degree of synchronicty and mastery over a single weapon, allowing the wielder to perform feats of martial prowess that would be impossible for lesser warriors. This level of proficiency is rarely found except among legendary warriors and heroes, and is the pinnacle of martial skill. A character may take multiple expert proficiencies, in a single weapon category or in multiple weapon categories. <br/> </li>
                </ul>
                <h3>Class Proficiencies</h3>
                <p>&emsp;&emsp;The altered proficiency system above clashes with how D&D classically defines weapon proficiencies. Under this ruleset, martial classes (e.g. any class without spell slots) can take a new weapon proficiency alongside each ability score increase (therefore, if a feat is taken the proficiency is not gained). This means taking Basic proficiency in a new category, Advanced proficiency in a category you already have Basic proficiency for, or an Expert proficiency in a category you already have Advanced proficiency for. Other classes can gain proficiencies via the weapons training feat. Rules for starting proficiency by class, as well as clarifications for special weapon categories are provided below. These proficiencies are gained from your primary class and <em>cannot</em> be gained by multi-classing<br/> </p>
                <ul style={{width: "80%", marginLeft: "10%"}}>
                    <li style={{marginBottom: "0.5em"}}><b>Artificer</b> - Artificers gain proficiency with basic weapons, and gain basic proficiency in firearms.</li>
                    <li style={{marginBottom: "0.5em"}}><b>Barbarian</b> - Barbarians gain proficiency with basic weapons, basic proficiency in any two categories, and advanced proficiency in any other two categories.</li>
                    <li style={{marginBottom: "0.5em"}}><b>Bard</b> - Bards gain proficiency with basic weapons and may choose one basic proficiency and one advanced proficiency from Agile, Throwing, and Archery.</li>
                    <li style={{marginBottom: "0.5em"}}><b>Cleric</b> - Clerics gain proficiency with basic weapons, and may choose two basic proficiencies from Brutal, Polearm, Cleaving, and Throwing.</li>
                    <li style={{marginBottom: "0.5em"}}><b>Druid</b> - Druids gain proficiency with basic weapons and choose two basic proficiencies from Agile, Brutal, Polearm, Cleaving, and Throwing.</li>
                    <li style={{marginBottom: "0.5em"}}><b>Fighter</b> - Fighters gain proficiency with basic weapons, basic proficiency in any three categories, and advanced proficiency in any other two categories.</li>
                    <li style={{marginBottom: "0.5em"}}><b>Monk</b> - Monks gain proficiency with basic weapons and choose a basic proficiency and an advanced proficiency from Agile, Polearm, Cleaving, and Throwing. Monk weapons are any basic melee weapons that do not have the two-handed or heavy properties.</li>
                    <li style={{marginBottom: "0.5em"}}><b>Paladin</b> - Paladins gain proficiency with basic weapons, basic proficiency in any two categories, and advanced proficiency in any other two categories.</li>
                    <li style={{marginBottom: "0.5em"}}><b>Ranger</b> - Rangers gain proficiency with basic weapons, basic proficiency in any two categories, and advanced proficiency in any other two categories.</li>
                    <li style={{marginBottom: "0.5em"}}><b>Rogue</b> - Rogues gain proficiency with basic weapons,  as well as two basic proficiencies and two advanced proficiencies from Agile,  Throwing, Archery, and Firearms.</li>
                    <li style={{marginBottom: "0.5em"}}><b>Sorcerer</b> - Sorcerers gain proficiency with basic weapons and choose a basic proficiency from any category.</li>
                    <li style={{marginBottom: "0.5em"}}><b>Warlock</b> - Warlocks gain proficiency with basic weapons and choose any two basic proficiencies from any category. Note: Pact of the blade warlocks cannot choose an expert (red) weapon as their pact weapon unless they already have proficiency with that weapon.</li>
                    <li style={{marginBottom: "0.5em"}}><b>Wizard</b> - Wizards gain proficiency with basic weapons and choose a basic proficiency from any category.</li>
                </ul>

                <div style={{width: "60%", marginLeft: "20%", border: "1px solid grey", padding:"1em", paddingTop:"0px"}}>
                    <h4>Feat: Weapons Training</h4>
                    You have practiced extensively with a specific weapon or type of weapon, gaining the following benefits:<br/>
                    &emsp;&emsp; - Increase your Strength or Dexterity score by 1, to a maximum of 20. <br/>
                    &emsp;&emsp; - You gain two weapon proficiencies of your choice. <br/>
                    This feat may be taken multiple times.
                </div>

            </div>
        </>
    )
}

function App() {

    const [tab, setTab] = useState("Weapons")

    return (
        <>
            <div className='main-body'>
                <header className='header'>
                    <button onClick={() => setTab("Builder")} className="header-tab">Builder</button>
                    <button onClick={() => setTab("Upgrades")} className="header-tab">Upgrades</button>
                    <button onClick={() => setTab("Weapons")} className="header-tab">Weapons</button>
                    <button onClick={() => setTab("Home")} className="header-tab">Home</button>
                    <h1>
                        Boueny's Weapons Expanded
                    </h1>
                </header>

                <div style={{ height: "89%" }}>
                    <WeaponTableWrapper tab={tab} />
                    <UpgradeListWrapper tab={tab} />
                    <WeaponBuilderWrapper tab={tab} />
                    <HomepageWrapper tab={tab} />
                </div>
            </div>
        </>
    );
}

export default App
