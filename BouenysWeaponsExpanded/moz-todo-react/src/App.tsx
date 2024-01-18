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

            <div style={{height: "90%"}}>
                <div className='side-div' style={{width: "66%"}}>
                    <WeaponTable list={weaponList} setWeapon={setActiveWeaponCallback} />
                </div>
                <div className='side-div' style={{width: "33%"}}>
                    <WeaponDetails name={activeWeapon}/>
                    
                </div>
            </div>
        </>
    )
}

function WeaponTable(props) {
    const weaponElements = props.list.map(([weapon, show]) => <WeaponRow weapon={weapon} show={show} setWeapon={props.setWeapon}/>)
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
                <UpgradeList upgradeList={upgradeList} callback={setActiveUpgradeCallback}/>
            </div>
            <div className='side-div' style={{ width: "66%" }}>
                <UpgradeDetails name={activeUpgrade}/>
            </div>
        </>
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
    console.log(props.name)
    console.log(upgrades[props.name])
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
        if(goodUpgrade(weaponNames[i], props.name))
            weaponList.push([weaponNames[i], true])
    }   

    return (
        <div style={{height: "100%", margin: 0, padding: 0}}>
            <div className='scrolling-wrapper' style={{height: "50%"}}>
                <h1 style={{margin: "0px"}}>{upgrade.name}</h1>
                <b>
                    Proficiency Cost: {"X".repeat(upgrade.proficiencyCost)} <br/>
                    Attribute Prerequisites: {upgrade.attributePrereqs == undefined ? "None" : upgrade.attributePrereqs.join(", ")} <br/>
                    Weapon Type Prerequisites: {upgrade.typePrereq ? upgrade.typePrereq.toString() : "None"} <br/>
                    Damage Type Prerequisites: {upgrade.damagePrereqs == undefined ? "None" : upgrade.damagePrereqs.join(" or ")} <br/><br/>
                    Description:
                </b>
                <p style={{margin: 0}}>{upgrade.description}</p>
                <div hidden={upgrade.advanceCost == undefined}>
                    <br/>
                    <b>
                        Advance Cost: {"X".repeat(upgrade.advanceCost)} <br/>
                        Advance Description:
                    </b>
                    <p style={{margin: 0}}>{upgrade.advanceDescription}</p>
                </div>
            </div>
            <div style={{height: "50%"}}>
                <WeaponTable list={weaponList} setWeapon={setActiveWeaponCallback}/>
            </div>
        </div>
    )
}


function App() {

    const [tab, setTab] = useState("Weapons")

    return (
        <>
            <div className='main-body'>
                <header className='header'>
                    <button onClick={() => setTab("Weapons")} className="header-tab">Weapons</button>
                    <button onClick={() => setTab("Upgrades")} className="header-tab">Upgrades</button>
                    <button onClick={() => setTab("Attributes")} className="header-tab">Attributes</button>
                    <h1>
                        Boueny's Weapons Expanded
                    </h1>
                </header>

                <div style={{ height: "89%" }}>
                    <WeaponTableWrapper tab={tab} />
                    <UpgradeListWrapper tab={tab} />
                </div>
            </div>
        </>
    );
}

function goodUpgrade(weaponName: string, upgradeName: string) {
    let upgrade = upgrades[upgradeName]
    if(weapons[weaponName].upgrade <= 0)
        return false
    if(upgrade.attributePrereqs != undefined){
        for (const attribute of upgrade.attributePrereqs) {
            if(attribute == AttributeName.DelFin){
                if(!weapons[weaponName].attributes.map((attribute) => (attribute.name)).includes(AttributeName.Fine)&& !weapons[weaponName].attributes.map((attribute) => (attribute.name)).includes(AttributeName.Deli)){
                    return false
                } else {
                    continue
                }
            }
            if(attribute == AttributeName.OneVer){
                if(weapons[weaponName].attributes.map((attribute) => (attribute.name)).includes(AttributeName.Two)){
                    return false
                } else {
                    continue
                }
            }
            if(attribute == AttributeName.ReAmmo){
                if( !weapons[weaponName].attributes.map((attribute) => (attribute.name)).includes(AttributeName.Ammo) && 
                    !weapons[weaponName].attributes.map((attribute) => (attribute.name)).includes(AttributeName.Reach) &&
                    !weapons[weaponName].attributes.map((attribute) => (attribute.name)).includes(AttributeName.Thrown)){
                    return false
                } else {
                    continue
                }
            }

            if(attribute == AttributeName.Melee){
                if(weapons[weaponName].attributes.map((attribute) => (attribute.name)).includes(AttributeName.Ammo)){
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
        for(const damageType of upgrade.damagePrereqs)
            if (weapons[weaponName].formula.types.includes(damageType)) {
                damageFound = true;
            }
        return damageFound;
    }
    return true
}


export default App
