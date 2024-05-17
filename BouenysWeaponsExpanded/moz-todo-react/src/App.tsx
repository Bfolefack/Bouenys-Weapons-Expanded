import { useEffect, useState } from 'react'
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
import { special } from './SpecialList'

function WeaponTableWrapper(props) {
    let weaponRule = (weapon: Weapon) => true

    const [weaponCategory, setWeaponCategory] = useState("All");
    const [activeWeapon, setActiveWeapon] = useState("")

    let setActiveWeaponCallback = (weapon: string) => {
        setActiveWeapon(weapon);
    }


    const weaponList = Object.keys(weapons).map((weapon) => [weapon, weapons[weapon].category == weaponCategory || weaponCategory == "All"])

    let show = props.tab == "Weapons" ? "block" : "none"
    let weapon = weapons[activeWeapon]

    return (
        <div style={{display: show, height: "100%"}}>
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
                    <WeaponDetails weapon={weapon} />

                </div>
            </div>
        </div>
    )
}

function WeaponTable(props) {
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
            weaponSort = ((a: [string, boolean], b: [string, boolean]) =>
            ((weapons[a[0]].tier == weapons[b[0]].tier ?
                (weapons[a[0]].name < weapons[b[0]].name ? -1 : 1)
                : weapons[a[0]].tier - weapons[b[0]].tier)))
            break;
    }
    

    const dark = { backgroundColor: "#1d1d1d", color: "#dddddd" };
    const light = { backgroundColor: "#dddddd", color: "#1d1d1d" };

    props.list.sort(weaponSort);
    let weaponElements = props.list.map(([weapon, show]) => <WeaponRow weapon={weapon} show={show} setWeapon={props.setWeapon} />)


    function updateSortRule(rule: string) {
        if (weaponSortRule == rule) {
            setWeaponSortRule("Default")
        } else {
            setWeaponSortRule(rule)
        }
    }

    return (
        <div className=' scrolling-wrapper'>
            <table className='weapon-table'>
                <thead>
                    <tr>
                        <th>
                            <button style={weaponSortRule == "Name" ? light : dark} onClick={() => updateSortRule("Name")}>
                                Name
                            </button>
                        </th>
                        <th>
                            <button style={weaponSortRule == "Cost" ? light : dark} onClick={() => updateSortRule("Cost")}>
                                Cost
                            </button>
                        </th>
                        <th>
                            <button style={weaponSortRule == "Damage" ? light : dark} onClick={() => updateSortRule("Damage")}>
                                Damage
                            </button>
                        </th>
                        <th>
                            <button style={weaponSortRule == "Crit" ? light : dark} onClick={() => updateSortRule("Crit")}>
                                Crit
                            </button>
                        </th>
                        <th>
                            <button style={weaponSortRule == "Upgrade" ? light : dark} onClick={() => updateSortRule("Upgrade")}>
                                Upgrades
                            </button>
                        </th>
                        <th>
                            <button style={weaponSortRule == "Attributes" ? light : dark} onClick={() => updateSortRule("Attributes")}>
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
    if(!props.weapon){
        return (<></>)
    }

    let weapon : Weapon = props.weapon
    return (
        <div className='scrolling-wrapper'>
            <h2>{weapon.name}</h2>
            <b>Cost:</b> {weapon.cost < 1 ? (weapon.cost * 10) + " SP" : weapon.cost + " GP"} <br />
            <b>Damage:</b> {weapon.formula.toString()} <br />
            <b>Critical:</b> {weapon.critPower == 0 ? "-" : (weapon.critRange == 20 ? "x" + weapon.critPower : weapon.critRange + "-20/x" + weapon.critPower)} <br />
            <h3>Attributes:</h3>
            <ul>
                {weapon.attributes.map((attribute) => (attribute.name != "Special" ? (<><li><b>{attribute.name}: </b>{attribute.description} </li><br/></>) : (<></>)))}
                {weapon.attributes.map((attribute) => (attribute.name == "Special" ? (<><li><b>{attribute.name}: </b>{special[weapon.name]} </li><br/></>) : (<></>)))}
            </ul>
            
        </div>
    )

}

function UpgradeListWrapper(props) {
    let setActiveUpgradeCallback = (upgrade: string) => {
        setActiveUpgrade(upgrade);
    }

    const [activeUpgrade, setActiveUpgrade] = useState("")
    const upgradeList = Object.keys(upgrades).sort((a: string, b: string) => (upgrades[a].name < upgrades[b].name ? -1 : 1))

    let show = props.tab == "Upgrades" ? "block" : "none"
    return (
        <span style={{display: show, height: "100%"}}>
            <div className='side-div' style={{ width: "33%" }}>
                <UpgradeList upgradeList={upgradeList} callback={setActiveUpgradeCallback} />
            </div>
            <div className='side-div' style={{ width: "66%" }}>
                <UpgradeDetails name={activeUpgrade} />
            </div>
        </span>
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
    const weaponElements = props.list.map(([weapon]) => <WeaponItem weapon={weapon} setWeapon={props.setWeapon} />)
    return (
        <div className='scrolling-wrapper'>
            {/* <nav> */}
                <ul>
                    {weaponElements}
                </ul>
            {/* </nav> */}
        </div>
    )
}

function UpgradeList(props) {
    const upgradeElements = props.upgradeList.map((upgrade) => <UpgradeRow name={upgrade} callback={props.callback} />)

    return (
        <div className='scrolling-wrapper'>
            {/* <nav> */}
                <ul>
                    <b>{upgradeElements}</b>
                </ul>
            {/* </nav> */}
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

function UpgradeBlock(props) {
    console.log("UpgradeBlock", props.name, props.count)
    if(props.name == "Critical"){
        let out = [0]
        for(let i = 1; i < props.count; i++){
            out.push(i)
        }
        return out.map((i) => <li className='list-element basic-row' onClick={() => props.callback(props.name)}><b>{upgrades[props.name].name + "+".repeat(i)}</b></li>)
    } else {
        return (
            <li className='list-element basic-row' onClick={() => props.callback(props.name)}>
                <b>{upgrades[props.name].name + "+".repeat(props.count - 1)}</b>
            </li>
        )
    
    }
}

function WeaponBuilderWrapper(props) {
    let weaponList = Object.keys(weapons).map((weapon) => [weapon, true]) 
    weaponList.sort((a: (string | boolean)[], b: (string | boolean)[]) => (weapons[a[0] as string].name < weapons[b[0] as string].name ? -1 : 1))
    const [activeWeapon, setActiveWeapon] = useState("")
    const [activeUpgrade, setActiveUpgrade] = useState("")
    const [builderUpgradeList, setBuilderUpgradeList] = useState<[string, number][]>([])
    const [maxUpgradeCount, setMaxUpgradeCount] = useState(0)
    const [upgradeCount, setUpgradeCount] = useState(0)
    const [upgradeBlocks, setUpgradeBlocks] = useState<JSX.Element[]>([(<></>)])

    let setActiveWeaponCallback = (weapon: string) => {
        setActiveWeapon(weapon);
        setMaxUpgradeCount(weapons[weapon].upgrade);
        setActiveUpgrade("");
    }
    let setActiveUpgradeCallback = (upgrade: string) => {
        setActiveUpgrade(upgrade);
    }

    let setBuilderUpgradeListCallback = (list: [string, number][]) => {
        console.log("Setting Builder Upgrade List", list)
        setBuilderUpgradeList(list);
        console.log("Builder Upgrade List", builderUpgradeList)
        setUpgradeBlocks(builderUpgradeList.map(([upgrade, count]) => <UpgradeBlock name={upgrade} count={count} callback={setActiveUpgradeCallback} />))
    }



    function addUpgrade() {
        for (let i = 0; i < builderUpgradeList.length; i++) {
            if (builderUpgradeList[i][0] == activeUpgrade) {
                switch (activeUpgrade) {
                    case "Cleave":
                    case "Concealed":
                    case "Concuss":
                    case "Demolish":
                    case "Disarm":
                    case "Explosive":
                    case "Feint":
                    case "Hobble":
                    case "Intuitive":
                    case "Longshot":
                    case "Parry":
                    case "Phalanx":
                    case "PointBlank":
                    case "Quickdraw":
                    case "Riposte":
                    case "Silenced":
                    case "Trip":
                    case "Vigilant":
                    // Non-advanceable upgrades
                        return;
                    case "Balanced" :
                    case "Bleed" :
                    case "Brawler" :
                    case "Charge" :
                    case "Deadeye" :
                    case "Execute" :
                    case "Focus" :
                    case "Honed" :
                    case "Intimidating" :
                    case "Knockback" :
                    case "Steady" :
                        if (builderUpgradeList[i][1] == 2) {
                            return;
                        } else {
                            builderUpgradeList[i][1]++;
                            setBuilderUpgradeListCallback(builderUpgradeList);
                            return;
                        }
                    case "ExtendedStock" :
                    case "Reliable" :
                        builderUpgradeList[i][1]++;
                        setBuilderUpgradeListCallback(builderUpgradeList);
                        return;
                    case "Critical" :
                        if(upgradeCount < maxUpgradeCount){
                            builderUpgradeList[i][1]++;
                            setBuilderUpgradeListCallback(builderUpgradeList);
                            setUpgradeCount(upgradeCount+ 1);
                        }
                        return;
                }
            }
        }
        if(upgradeCount < maxUpgradeCount){
            builderUpgradeList.push([activeUpgrade, 1])
            setBuilderUpgradeListCallback(builderUpgradeList)
            setUpgradeCount(upgradeCount + 1);
        }
    }

    function removeUpgrade(remove : string) {
            for(let i = 0; i < builderUpgradeList.length; i++){
                if(remove == "" ? builderUpgradeList[i][0] == activeUpgrade : builderUpgradeList[i][0] == remove){
                    if(builderUpgradeList[i][0] == "Critical" && builderUpgradeList[i][1] > 1){
                        builderUpgradeList[i][1]--;
                        setBuilderUpgradeListCallback(builderUpgradeList);
                        setUpgradeCount(upgradeCount - 1)
                        return;
                    }
                    builderUpgradeList.splice(i, 1)[0];
                    setBuilderUpgradeListCallback(builderUpgradeList);
                    setUpgradeCount(upgradeCount - 1)
                    return;
                }
            }
    }

    
    let upgradeList = Object.keys(upgrades).filter((upgrade) => UpgradeMatchesWeapon(activeWeapon, upgrade))
    upgradeList.sort((a: string, b: string) => (upgrades[a].name < upgrades[b].name ? -1 : 1))

    let show = props.tab == "Builder" ? "block" : "none"

    return (
        <span style={{display: show, height: "100%"}}>
            <div className='side-div' style={{ width: "20%" }}>
                <WeaponList list={weaponList} setWeapon={setActiveWeaponCallback} show={true} active/>
            </div>
            <div className='side-div' style={{ width: "50%" }}>
                
                <div style={{height:"10%"}}>
                    <h1>{weapons[activeWeapon] == undefined ? "" : weapons[activeWeapon].name}</h1>
                </div>
                <div style={{height:"30%"}}>
                    <WeaponDetails weapon={weapons[activeWeapon]} />
                </div>
                <h2>Upgrades {upgradeCount}/{maxUpgradeCount}</h2>
                <ul className='scrolling-wrapper' style={{height:"30%"}}>
                    {upgradeBlocks}
                </ul>
            </div>
            <div className='side-div' style={{ width: "30%" }}>
                <div style={{height:"30%"}}>
                    <UpgradeList upgradeList={upgradeList} callback={setActiveUpgradeCallback} />
                </div>
                <div style={{height:"60%"}}>
                    <UpgradeDetails name={activeUpgrade} truncate={true}/>
                </div>
                <div style={{height:"10%"}}>
                    <button style={{width: "50%", height: "100%", backgroundColor: "#115522", color: "#dddddd"}} onClick={addUpgrade}>Add Upgrade</button>
                    <button style={{width: "50%", height: "100%", backgroundColor: "#552219", color: "#dddddd"}} onClick={() => removeUpgrade("")}>Remove Upgrade</button>
                </div>
            </div>
        </span>

    )
}


function HomepageWrapper(props) {
    let show = props.tab == "Home" ? "block" : "none"

    
    let headings = document.querySelectorAll('h2, h3, h4, h5, h6');
    let headingList: [string, number, string][] = [];

    for (let i = 0; i < headings.length; i++) {
        let heading = headings[i];
        let id = heading.getAttribute("id") + "";
        let level = parseInt(heading.getAttribute("data-level") + "");
        let title = heading.getAttribute("data-title") + "";
        headingList.push([title, level, id])
    }

    let toc = headingList.map(([title, level, id]) => (title == "null") ? (<></>) : (<li style={{marginLeft: level + "em"}}><u><a href={"#" + id.replace(/ /g, "")}>{title}</a></u></li>))
    

    return (
        <span className='scrolling-wrapper' style={{ display: show, height: "100%", width: "100%"}}>
            <nav className='side-div' style={{width: "20%", lineHeight: "1.6"}}>
                {toc}
            </nav>
            <div className='side-div' style={{ width: "60%", height: "100%", lineHeight: "1.6"}}>
                <h1  id="home" >Welcome to Boueny's Weapons Expanded</h1>
                <p>&emsp;&emsp;
                    This is a collection of weapons and upgrades for Dungeons and Dragons 5th Edition. The weapons are designed to be balanced and flavorful, with a focus on providing a variety of options for players and DMs, while the upgrades are designed to be powerful and unique, greatly expanding 5e's weapon customization, and giving your players the chance to make their weapons truly legendary. This module is a work in progress, and will be updated and refined periodically.
                </p>
                <h2 id="weaponsCategories" data-title="Weapon Categories"  data-level="0">Weapons Categories</h2>
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
                <h2 id="weaponsProficiencies" data-title="Weapon Proficiencies" data-level="0">Weapon Proficiencies</h2>
                <p>&emsp;&emsp;
                    Weapon proficiencies are also handled differently in Boueny's Weapons Expanded. Rather than gaining blanket proficiency with a wide variety of weapons, players gain proficiency with specific weapon categories in stages. There are four sequential stages of weapon proficiency, each granting access to a new selection of weapons. <br/>
                </p>
                <ul style={{width: "80%", marginLeft: "10%"}}>
                    <li style={{marginBottom: "1em"}}><b>General Weapons Proficiency</b> - Grants proficiency with all weapons in the <em>Basic</em> category. All adventurers start with this proficiency, though most commoners will lack even this basic training. <br/> </li>
                    <li style={{marginBottom: "1em"}}><b>Basic Proficiency</b> - Given a character has General Weapons Proficiency they can then gain Basic Proficiency in a weapon category. This grants proficiency with all <em>Green</em> weapons in that category. Basic proficiency represents a basic understanding of a weapon type and the ability to use it effectively in combat. This level of proficiency is expected among even low-level soldiers and bandits. <br/> </li>
                    <li style={{marginBottom: "1em"}}><b>Advanced Proficiency</b> - Given a character has Basic Proficiency in a weapon category they can then gain Advanced Proficiency in that category. This grants proficiency with all <em>Yellow</em> weapons in that category. Advanced proficiency represents a deep understanding of a weapon type and the ability to use it to its full potential. This level of proficiency is expected among elite soldiers and experienced adventurers. <br/></li>
                    <li style={{marginBottom: "1em"}}><b>Expert Proficiency</b> - Finally, given a character has Advanced Proficiency in a weapon category they can then gain Expert Proficiency for a  that category. This grants proficiency with a <b><em>SINGLE</em></b> <em>Red</em> weapon in that category. Expert proficiency represents an unprecedented degree of synchronicty and mastery over a single weapon, allowing the wielder to perform feats of martial prowess that would be impossible for lesser warriors. This level of proficiency is rarely found except among legendary warriors and heroes, and is the pinnacle of martial skill. A character may take multiple expert proficiencies, in a single weapon category or in multiple weapon categories. <br/> </li>
                </ul>
                <h3 id="classProficiencies" data-title="Class Proficiencies" data-level="1">Class Proficiencies</h3>
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

                <div className="feat">
                    <h4 id="weaponsTraining" data-title="Feat: Weapons Training" data-level="2">Feat: Weapons Training</h4>
                    You have practiced extensively with a specific weapon or type of weapon, gaining the following benefits:<br/>
                    &emsp;&emsp; - Increase your Strength or Dexterity score by 1, to a maximum of 20. <br/>
                    &emsp;&emsp; - You gain two weapon proficiencies of your choice. <br/>
                    This feat may be taken multiple times.
                </div>

                <h2 id="upgrades" data-title="Upgrades" data-level="0">Upgrades</h2>
                <p>&emsp;&emsp;
                    Those who are especially skilled in the arts of martial combat often find themselves limited, not by their own skill, but by the weapons they wield. To remedy this, many warriors seek out master craftsmen to imbue their weapons with powerful upgrades, granting them new abilities and enhancing their existing ones. These upgrades are powerful, unique, and can greatly enhance a weapon's capabilities, making them a valuable asset to any warrior. <br/>
                </p>
                <h3 id="upgradeRequirements" data-title="Upgrade Requirements" data-level="1">Upgrade Requirements</h3>
                <p>&emsp;&emsp; Different upgrades have different requirements that must be met before they can even be applied to a weapon. Many upgrades have restrictions on the categories and attributes of the weapon they can be applied to, while others are less restrictive. Beyond that, upgrading weapons is far from free, and even once the upgrade is applied, it requires a certain degree of proficiency to use effectively. <br/></p>
                <h3 id="proficiencyCost" data-title="Proficiency Cost" data-level="1">Proficiency Cost</h3>
                <p>&emsp;&emsp; Upgrades have a proficiency cost that must met in order to use the upgrade effectively. This proficiency cost is represented by a number of X's in the upgrades description. A weapons proficiency cost is equal to the sum of the proficiency costs of all upgrades applied to it. In order to benefit from any of  a weapon's upgrades, a character must have proficiency with that weapon, and must have a proficiency bonus greater than or equal to the weapon's proficiency cost. <br/></p>
                <h3 id="upgradePricing" data-title="Upgrade Pricing" data-level="1">Upgrade Pricing</h3>
                <p>&emsp;&emsp; Upgrades are not cheap. There is a reason that most weapons are not upgraded, and those with multiple upgrades are even rarer. The skill and materials required to apply an upgrade to a weapon are expensive, and the process is extremely difficult, such that only the most skilled craftsmen can even attempt it. <br/>
                Upgrades are not priced based on the upgrades themselves, but rather how they affect the value of the weapon they are applied to. Therefore, the market price for an upgrade is typically the value of the weapon after the upgrade is applied, minus the value of the weapon before the upgrade is applied. <br/> </p>
                &emsp;&emsp;The market value of a weapon is determined by: <br/>
                &emsp;&emsp;&emsp;&emsp; - The base cost of the weapon × the square of the number of upgrades applied to it. <br/>
                <p>
                    &emsp;&emsp;For example, a weapon with a base cost of 10 GP that has 2 upgrades applied to it would have a market value of 10 GP × 2^2 = 40 GP. This only represents the market value of the weapon, and the actual price of the weapon may be higher or lower depending on other circumstances. For example, applying upgrades to especially cheap weapons, most shopkeeps will charge as if the weapon's base cost was 10 GP, regardless of the actual base cost of the weapon, and for especially expensive weapons part of the cost may not represent actual gold spent, but rather specialty materials or tools that must be acquired before a craftsman can even attempt the upgrade. <br/>
                </p>
                <h3 id="applyingUpgrades" data-title="Applying Upgrades" data-level="1">Applying Upgrades</h3>
                <p>&emsp;&emsp; Applying upgrades to a weapon is a difficult and time-consuming process. It typically requires a skilled craftsman, a well-equipped workshop, and a significant amount of time. Most upgrades take at least a week to apply, and some may take even longer. Your DM will determine the exact time and cost of applying an upgrade, as well as if the process requires any special materials or tools. <br/>
                &emsp;&emsp;Most adventurers will not have the skill or equipment required to apply upgrades themselves, and will need to seek out a skilled craftsman to do the work for them. Trivial upgrades can be applied by any skilled craftsman, while more complex upgrades may require someone with more specialized knowledge. When hiring a craftsman to apply an upgrade, the cost of their labor is included in the price of the upgrade, however they may grant discounts or charge premiums based on the circumstances. For example, if a kingdom is at war, the cost of applying upgrades may be higher, while if a craftsman is a friend of the party, they may offer a discount. The more skilled a craftsman is, the faster they can apply upgrades, and the more likely they are to charge a premium. <br/>
                &emsp;&emsp;Some adventurers may choose to attempt to apply upgrades themselves, however this is a risky process, and failure can result in the waste of valuable time and materials. To apply an upgrade yourself, you must be proficient with artisan's tools relevant to weapon as listed below: <br/>
                </p>
                <ul style={{width: "80%", marginLeft: "10%"}}>
                    <li style={{marginBottom: "1em"}}><b>Smith's Tools</b> - Used to apply upgrades to simple weapons made of metal such as swords, axes, and hammers. </li>
                    <li style={{marginBottom: "1em"}}><b>Carpenter's Tools</b> - Used to apply upgrades to crude weapons made of wood such as clubs and simple staves. </li>
                    <li style={{marginBottom: "1em"}}><b>Woodcarver's Tools</b> - Used to apply upgrades to delicate weapons made of wood such as bows and crossbows. </li>
                    <li style={{marginBottom: "1em"}}><b>Leatherworker's Tools</b> - Used to apply upgrades to weapons made of leather such as whips and slings. </li>
                    <li style={{marginBottom: "1em"}}><b>Tinker's Tools</b> - Used to apply upgrades to complex weapons made of metal such as firearms and explosives. </li>
                </ul>
                <p>
                    &emsp;&emsp;If a character is proficient with the relevant artisan's tools, they may attempt to apply an upgrade themselves. To do so, they must collect materials equal to half the market price of the upgrade, as well as any special materials the DM deems necessary. They must then make a series of checks with the relevant artisan's tools with a DC of DC 20 + the # of upgrades already on the weapon. There are a number of factors that can affect the DC of these checks. For example: <br/>
                    <br/>
                    <table style={{width: "60%", marginLeft: "20%", border: "1px solid grey", borderCollapse: "collapse", textAlign: "center"}}>
                        <tr style={{border: "1px solid grey"}}>
                            <td style={{border: "1px solid grey"}}>Factor</td>
                            <td style={{border: "1px solid grey"}}>DC Modifier</td>
                        </tr>
                        <tr>
                            <td style={{border: "1px solid grey"}}>You are working in a well-equipped workshop</td>
                            <td style={{border: "1px solid grey"}}>-7</td>
                        </tr>
                        <tr>
                            <td style={{border: "1px solid grey"}}>You have a skilled assistant</td>
                            <td style={{border: "1px solid grey"}}>-5</td>
                        </tr>
                        <tr>
                            <td style={{border: "1px solid grey"}}>You are working with high-quality materials</td>
                            <td style={{border: "1px solid grey"}}>-3</td>
                        </tr>
                        <tr>
                            <td style={{border: "1px solid grey"}}>You have received advice from a master craftsman</td>
                            <td style={{border: "1px solid grey"}}>-3</td>
                        </tr>
                        <tr>
                            <td style={{border: "1px solid grey"}}>You have an unskilled assistant</td>
                            <td style={{border: "1px solid grey"}}>-2</td>
                        </tr>
                        <tr>
                            <td style={{border: "1px solid grey"}}>You are working with substandard materials</td>
                            <td style={{border: "1px solid grey"}}>+3</td>
                        </tr>
                        <tr>
                            <td style={{border: "1px solid grey"}}>You are missing some important tool or material</td>
                            <td style={{border: "1px solid grey"}}>+5</td>
                        </tr>
                        <tr>
                            <td style={{border: "1px solid grey"}}> You are working while injured or exhausted</td>
                            <td style={{border: "1px solid grey"}}>+5</td>
                        </tr>
                        <tr>
                            <td style={{border: "1px solid grey"}}> The weapon is enchanted or has special properties</td>
                            <td style={{border: "1px solid grey"}}>+7</td>
                        </tr>
                    </table>
                    <br/>
                    &emsp;&emsp; The number of successful checks required is equal to final proficiency cost of the weapon after the upgrade is applied. If at any point they fail three of these checks, the upgrade fails and half the materials are wasted. If they reach the required number of successful checks, the upgrade is applied successfully.
                </p>
                <h3 id="advancedUpgrades" data-title="Advanced Upgrades" data-level="1">Advanced Upgrades</h3>
                <p>&emsp;&emsp;
                    In addition to the standard upgrades available to weapons, there are a number of advanced upgrades that can be applied to weapons to grant them even more powerful abilities. These upgrades replace their standard counterparts, and are typically more difficult to apply, more expensive, and require more proficiency to use effectively. Additionally for purposes of calculating the market value of a weapon and  the difficulty of applying the upgrade, advanced upgrades count as two standard upgrades. <br/>
                </p>
            </div>
        </span>
    )
}

function App() {
    const [initialized, setInitialized] = useState(false)
    const [tab, setTab] = useState("")

    function goToHome(){
        setTab("Home")
        window.location.href = "#home"
    }

    function initialize(){
        if(!initialized){
            setInitialized(true)
            setTab("Home")
        }
    }

    useEffect(() => {
        initialize()
    })

    return (
        <>
            <div className='main-body'>
                
                    <header className='header' >
                        <button onClick={() => setTab("Builder")} className="header-tab">Builder (WIP)</button>
                        <button onClick={() => setTab("Upgrades")} className="header-tab">Upgrades</button>
                        <button onClick={() => setTab("Weapons")} className="header-tab">Weapons</button>
                        <button onClick={() => setTab("Home")} className="header-tab">Home</button>
                        <h1 onClick={() => goToHome()} style={{cursor: "pointer" }}>
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
