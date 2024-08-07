import { useEffect, useState } from 'react'
import './App.css'
import { weapons } from './WeaponList'
import { upgrades } from './UpgradeList'
import { attributes } from './AttributeList'
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
                <button onClick={() => setWeaponCategory("General")} className="weapon-tab">General</button>
                <button onClick={() => setWeaponCategory("Agile")} className="weapon-tab">Agile</button>
                <button onClick={() => setWeaponCategory("Polearm")} className="weapon-tab">Polearm</button>
                <button onClick={() => setWeaponCategory("Cleaving")} className="weapon-tab">Cleaving</button>
                <button onClick={() => setWeaponCategory("Brutal")} className="weapon-tab">Brutal</button>
                <button onClick={() => setWeaponCategory("Thrown")} className="weapon-tab">Thrown</button>
                <button onClick={() => setWeaponCategory("Elastic")} className="weapon-tab">Elastic</button>
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
    const weapon = (typeof props.weapon) == "string" ? weapons[props.weapon] : props.weapon;

    if (!props.show || weapon == undefined) {
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

    let weaponTypeToString = (type: WeaponType) => {
        switch (type) {
            case WeaponType.General:
                return "General Weapon"
            case WeaponType.Agile:
                return "Agile Weapon"
            case WeaponType.Polearm:
                return "Polearm"
            case WeaponType.Cleaving:
                return "Cleaving Weapon"
            case WeaponType.Brutal:
                return "Brutal Weapon"
            case WeaponType.Thrown:
                return "Thrown Weapon"
            case WeaponType.Elastic:
                return "Elastic Weapon"
            case WeaponType.Firearm:
                return "Firearm"
        }
    }

    let weaponTierToString = (tier: number) => {
        switch (tier) {
            case 0:
                return "Basic"
            case 1:
                return "Advanced"
            case 2:
                return "Expert"
        }
    }

    let weapon : Weapon = props.weapon
    let description = weapon.description ? weapon.description : "No description available."
    let key = weapon.name.replace(/[^a-zA-Z]/g, '')
    return (
        <div className='scrolling-wrapper'>
            <h2 style={{paddingBottom: 0, marginBottom: 0}}>{weapon.name}</h2>
            <em>{weaponTypeToString(weapon.category) == "General Weapon" ? "" : weaponTierToString(weapon.tier)} {weaponTypeToString(weapon.category)}</em> <br />
            <p style={{marginLeft: "2em"}}><em>{description}</em></p>
            <b>Cost:</b> {weapon.cost < 1 ? (weapon.cost * 10) + " SP" : weapon.cost + " GP"} <br />
            <b>Damage:</b> {weapon.formula.toString()} <br />
            <b>Critical:</b> {weapon.critPower == 0 ? "-" : (weapon.critRange == 20 ? "x" + weapon.critPower : weapon.critRange + "-20/x" + weapon.critPower)} <br />
            <h3>Attributes:</h3>
            <ul>
                {weapon.attributes.map((attribute) => (attribute.name != "Special" ? (<><li><b>{attribute.name}: </b>{attribute.description} </li><br/></>) : (<></>)))}
                {weapon.attributes.map((attribute) => (attribute.name == "Special" ? (<><li><b>{attribute.name}: </b>{special[key]} </li><br/></>) : (<></>)))}
            </ul>
            {weapon.upgradeList && weapon.upgradeList.length > 0 ? 
            <>
            <h3>Upgrades:</h3> 
            <ul> 
                {weapon.upgradeList.map(
                    ([upgrade, count]) => 
                    <li style={{marginBottom: "0.5em"}}><b>{upgrades[upgrade].name + "+".repeat(count - 1)}:</b> {count > 1 ? upgrades[upgrade].advanceDescription ? upgrades[upgrade].advanceDescription : upgrades[upgrade].description : upgrades[upgrade].description} </li>
                )}
            </ul>
            </>

            : <></>}
            
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
                        Proficiency Cost: {upgrade.proficiencyCost} <br />
                        Attribute Prerequisites: {upgrade.attributePrereqs == undefined ? "None" : upgrade.attributePrereqs.join(", ")} <br />
                        Weapon Type Prerequisites: {upgrade.typePrereq ? upgrade.typePrereq.toString() : "None"} <br />
                        Damage Type Prerequisites: {upgrade.damagePrereqs == undefined ? "None" : upgrade.damagePrereqs.join(" or ")} <br /><br />
                        Description:
                    </b>
                    <p style={{ margin: 0 }}>{upgrade.description}</p>
                    <div hidden={upgrade.advanceCost == undefined}>
                        <br />
                        <b>
                            Advanced Cost: {upgrade.advanceCost} <br />
                            Advanced Description:
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
                if(!(weaponName == "HookSword" && attribute == AttributeName.Reach))
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


function UpgradeWeapon(weapon: Weapon, upgradeList: [string, number][]) : Weapon {
    if(upgradeList == undefined || upgradeList.length == 0)
        return weapon;
    //Stat Upgrades: Balanced, Critical, Extended Stock, Intuitive, Longshot, Reliable
    let out_weapon = weapon.copy();
    out_weapon.upgradeList = upgradeList
    let key = weapon.name.replace(/[^a-zA-Z]/g, '')
    for (let i = 0; i < upgradeList.length; i++) {
        let upgrade = upgrades[upgradeList[i][0]]
        switch (upgrade.name) {
            case "Balanced":
                out_weapon.formula.formula[0] = out_weapon.attributes.filter((attribute) => attribute.name == AttributeName.Ver)[0].stats;
                out_weapon.attributes = out_weapon.attributes.filter((attribute) => attribute.name != AttributeName.Ver)
                if(upgradeList[i][1] == 1){
                    out_weapon.attributes.push(new Attribute(AttributeName.Heavy));
                }
                break;
            case "Critical":
                out_weapon.critRange -= upgradeList[i][1];
                break;
            case "Extended Stock":
                for(let j = 0; j < out_weapon.attributes.length; j++){
                    if(out_weapon.attributes[j].name == AttributeName.Rel){
                        console.log("Extended Stock", weapons[key].attributes[j].stats[0])
                        out_weapon.attributes[j].stats[0] = weapons[key].attributes[j].stats[0] + upgradeList[i][1] * weapons[key].attributes[j].stats[0] * 0.5;
                        out_weapon.attributes[j].stats[0] = Math.floor(out_weapon.attributes[j].stats[0]);
                    }
                }
                break;
            case "Longshot":
                for(let j = 0; j < out_weapon.attributes.length; j++){
                    if(out_weapon.attributes[j].name == AttributeName.Ammo){
                        if(out_weapon.attributes[j].stats.length == 2){
                            out_weapon.attributes[j].stats[0] = out_weapon.attributes[j].stats[1]
                        } else if (out_weapon.attributes[j].stats.length == 3){
                            out_weapon.attributes[j].stats[1] = out_weapon.attributes[j].stats[2]
                        }
                    }
                }
                break;
            case "Reliable":
                for(let j = 0; j < out_weapon.attributes.length; j++){
                    if(out_weapon.attributes[j].name == AttributeName.Mis){
                        out_weapon.attributes[j].stats[0] -= upgradeList[i][1];
                        out_weapon.attributes[j].stats[0] = Math.max(1, out_weapon.attributes[j].stats[0]);
                    }
                }
                break;
        }
    }
    out_weapon.attributes.sort((a: Attribute, b: Attribute) => (a.name < b.name ? -1 : 1))
    return out_weapon;
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
        setBuilderUpgradeList([]);
        setUpgradeCount(0);
        setUpgradeBlocks([]);
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
        if (activeUpgrade == "") {
            return;
        }

        for (let i = 0; i < builderUpgradeList.length; i++) {
            if (builderUpgradeList[i][0] == activeUpgrade) {
                switch (activeUpgrade) {
                    case "Cleave":
                    case "Concealed":
                    case "Concuss":
                    case "Demolish":
                    case "Disarm":
                    case "Explosive":
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
                    case "Feint":
                    case "Steady" :
                        // Singly advanceable upgrades
                        if (builderUpgradeList[i][1] == 2) {
                            return;
                        } else {
                            builderUpgradeList[i][1]++;
                            setBuilderUpgradeListCallback(builderUpgradeList);
                            return;
                        }
                    case "ExtendedStock" :
                    case "Reliable" :
                        // Infinitely advanceable upgrades
                        builderUpgradeList[i][1]++;
                        setBuilderUpgradeListCallback(builderUpgradeList);
                        return;
                    case "Critical" :
                        // Advanceable upgrades with special rules
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

    let upgradeSum = 0;
    for(let i = 0; i < builderUpgradeList.length; i++){
        upgradeSum += builderUpgradeList[i][1]
    }

    let show = props.tab == "Builder" ? "block" : "none"

    let builtWeapon = UpgradeWeapon(weapons[activeWeapon], builderUpgradeList);
    console.log("Built Weapon: ", builtWeapon)

    let proficiencyCost = 0;
    for(let i = 0; i < builderUpgradeList.length; i++){
        if (builderUpgradeList[i][0] == "Critical"){
            proficiencyCost += builderUpgradeList[i][1] * 2
        } else if(builderUpgradeList[i][0] == "Reliable" || builderUpgradeList[i][0] == "ExtendedStock"){
            proficiencyCost += builderUpgradeList[i][1]
        } else {
            if(builderUpgradeList[i][1] == 1){
                proficiencyCost += upgrades[builderUpgradeList[i][0]].proficiencyCost
            } else {
                proficiencyCost += upgrades[builderUpgradeList[i][0]].advanceCost
            }
        }
    }
    // get intuitive from upgrades
    let intuitive = false;
    for(let i = 0; i < builderUpgradeList.length; i++){
        if(builderUpgradeList[i][0] == "Intuitive"){
            intuitive = true;
        }
    }
    if(intuitive){
        proficiencyCost = Math.floor(proficiencyCost / 2);
    }

    let weaponCost = 0;
    if(weapons[activeWeapon] != undefined){
        weaponCost = weapons[activeWeapon].cost + ((weapons[activeWeapon].cost > 10 ? weapons[activeWeapon].cost : 10)) * (upgradeSum ** 2)
    }
    console.log(weapons[activeWeapon])
    console.log(weaponCost)

    return (
        <span style={{display: show, height: "100%"}}>
            <div className='side-div' style={{ width: "20%" }}>
                <WeaponList list={weaponList} setWeapon={setActiveWeaponCallback} show={true} active/>
            </div>
            <div className='side-div' style={{ width: "50%", height:"100%" }}>
                
                <div style={{height:"10%"}}>
                    <h1>{weapons[activeWeapon] == undefined ? "" : weapons[activeWeapon].name}</h1>
                </div>
                <div style={{height:"30%"}}>
                    <WeaponDetails weapon={builtWeapon} />
                </div>
                <table style={{height:"5%", width: "100%"}}>
                    <WeaponRow weapon={builtWeapon} show={true}/>
                </table>
                <h3 style={{height:"5%"}}>Upgrades {upgradeCount}/{maxUpgradeCount}</h3>
                <div style={{height:"25%"}}>
                    <ul className='scrolling-wrapper'>
                        {upgradeBlocks}
                    </ul>
                </div>
                <div style={{height:"10%", textAlign: "center"}}>
                    <h3> Weapon Market Value: {weaponCost} GP</h3>
                    <h3> Proficiency Cost: {proficiencyCost} </h3>
                </div>
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
                <div>{toc}</div>
            </nav>
            <div className='side-div' style={{ width: "60%", height: "100%", lineHeight: "1.6"}}>
                <h1  id="home" >Welcome to Boueny's Weapons Expanded</h1>
                <p>&emsp;&emsp;
                    This is a collection of weapons and upgrades for Dungeons and Dragons 5th Edition. The weapons are designed to be balanced and flavorful, with a focus on providing a variety of options for players and DMs, while the upgrades are designed to be powerful and unique, greatly expanding 5e's weapon customization, and giving your players the chance to make their weapons truly legendary. This module is a work in progress, and will be updated and refined periodically.
                </p>
                <h2 id="weaponsCategories" data-title="Weapon Categories"  data-level="0">Weapons Categories</h2>
                <p>&emsp;&emsp;
                    Weapons and weapon proficiencies work a little differently in Boueny's Weapons Expanded. Rather than being split into the classic four classifiers Simple, Martial, Melee, and Ranged, the weapons in this module are divided into eight categories based on their properties and design. These categories are as follows:
                </p>
                <ul style={{width: "80%", marginLeft: "10%"}}>
                    <li style={{margin: "0.5em"}}>&emsp;&emsp;<b>Basic</b> - Simple weapons that require no or very little special, Basic weapons are straightforward in design and function, making them accessible to nearly anyone. They tend to be simple, cheap, and easy to use, and as such, are the most common weapons in the world, and can be found in the hands of most commoners and soldiers. </li>
                    <li style={{margin: "0.5em"}}>&emsp;&emsp;<b>Agile</b> - Lightweight weapons that rely on dexterity and finesse to kill, Agile weapons are fast, precise, and deadly in the hands of a skilled user. These weapons are designed for quick strikes and fluid movements, allowing the wielder to outmaneuver opponents and exploit weaknesses with speed and accuracy. Whether used in close combat by a skilled duelist or from the shadows by a stealthy assassin, Agile weapons are the choice of those who value speed and precision over raw power.</li>
                    <li style={{margin: "0.5em"}}>&emsp;&emsp;<b>Polearm</b> - Long armed weapons with a far reach, Polearms are extremely dangerous when paired with careful positioning and planning. Weapons that excel in formations and defensive stances, they're ideal for both individual combat and large-scale battles. Their extended reach provides a tactical advantage, enabling the user to strike from a distance and control the battlefield. Mastery of Polearms requires strategic thinking and precise coordination, transforming these versatile weapons into formidable tools of warfare.</li>
                    <li style={{margin: "0.5em"}}>&emsp;&emsp;<b>Cleaving</b> - Heavy weapons made to cut through flesh and leave severe bleeding wounds, Cleaving Weapons are formidable tools of destruction. With the weight and sharp edges to enable the wielder to deliver devastating strikes that can cleave through armor and bone alike, Cleaving Weapons are favored by warriors who rely on strength and overwhelming force to dominate their foes. Each swing carries the potential to inflict grievous injuries, making these weapons particularly effective in close-quarters combat. </li>
                    <li style={{margin: "0.5em"}}>&emsp;&emsp;<b>Brutal</b> - Weapons made to bludgeon, bruise, and crush bone, Brutal Weapons are known for leaving enemies incapacitated, but alive. Their design emphasizes weight and momentum, allowing the wielder to smash through defenses and disable opponents effectively. Brutal Weapons are ideal for combatants who seek to subdue or incapacitate their foes without necessarily killing them. The raw power and crushing blows of these weapons can overwhelm even the toughest adversaries, making them a favored choice for those who rely on sheer physical dominance in battle. </li>
                    <li style={{margin: "0.5em"}}>&emsp;&emsp;<b>Throwing</b> - Weapons launched via muscle alone without the assistance of tension or explosives, Throwing Weapons rely on the skill and strength of the user for effectiveness. Lightweight and balanced, throwing weapons can be used to strike at range, allowing the wielder to engage foes from a distance and maintain the upper hand in combat. Mastery of Throwing Weapons requires keen aim and control, turning these seemingly simple tools into deadly projectiles in the hands of a skilled user. </li>
                    <li style={{margin: "0.5em"}}>&emsp;&emsp;<b>Elastic</b> - Weapons made from stiff materials and taut string to launch piercing ammunition, Elastic Weapons are known for their accuracy at range and penetrative power. The combination of flexible materials and precise engineering allows Elastic Weapons to strike targets at considerable distances with remarkable precision. Favored by hunters, archers, and ranged combatants, these weapons excel in both hunting and warfare, offering a silent and deadly means of engaging enemies from afar. Mastery of Elastic Weapons involves understanding the mechanics of tension and release, as well as developing the skill to aim and shoot with consistent accuracy. </li>
                    <li style={{margin: "0.5em"}}>&emsp;&emsp;<b>Firearms</b> - Metallic weapons made to launch specialized ammunition with explosive force, Firearms tear through enemies to devastating effect. The combination of advanced metallurgy and chemical propellants enables Firearms to deliver powerful and precise shots that cause catastrophic damage. Despite their formidable capabilities, Firearms are still very expensive and experimental weapons that are prone to failure. The high cost of production and maintenance, coupled with the complexity of their mechanisms, makes them exceptionally rare. Users must contend with the risk of misfires and the need for specialized ammunition. Nevertheless, in the hands of a skilled marksman, Firearms can dominate the battlefield, bringing a new era of ranged combat with unmatched lethality and precision. <br/> 
                    <em><b>Note:</b> Some DMs may choose to exclude Firearms from their campaigns due to the way they clash with some settings. </em> </li>
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
                    <li style={{marginBottom: "1em"}}><b>Expert Proficiency</b> - Finally, given a character has Advanced Proficiency in a weapon category they can then gain Expert Proficiency for a  that category. This grants proficiency with a <b><em>SINGLE</em></b> <em>Red</em> weapon in that category. Expert proficiency represents an unprecedented degree of synchronicty and mastery over a single weapon, allowing the wielder to perform feats of martial prowess that would be impossible for lesser warriors. This level of proficiency is rarely found except among the most elite combatants, and is the pinnacle of martial skill. A character may take multiple expert proficiencies in a single weapon category, or in multiple weapon categories. <br/> </li>
                </ul>
                <h3 id="classProficiencies" data-title="Class Proficiencies" data-level="1">Class Proficiencies</h3>
                <p>&emsp;&emsp;The altered proficiency system above clashes with how D&D classically defines weapon proficiencies. Under this ruleset, martial classes (defined as any class/subclass that never gains 5th spell slots) can take a new weapon proficiency alongside each ability score increase (if a feat is taken instead, the proficiency is not gained). This means taking Basic proficiency in a new category, Advanced proficiency in a category you already have Basic proficiency for, or an Expert proficiency in a category you already have Advanced proficiency for. Any class can also gain proficiencies via the weapons training feat described below. Finally, weapon proficiencies may be gained at any time by training under a master of a given weapon or weapon type. Rules for starting proficiency by class, as well as clarifications for special weapon categories are provided below. Each class gains a number of Basic and/or Advanced proficiencies to start. Any adventurer automatically has General Weapons Proficiency. These proficiencies are gained from your primary class and <em>cannot</em> be gained by multi-classing<br/> </p>
                <ul style={{width: "80%", marginLeft: "10%", fontSize: "0.9em"}}>
                <li style={{marginBottom: "0.5em"}}><b>Artificer</b> - May choose one basic proficiency from Firearms and Elastic.</li>
                <li style={{marginBottom: "0.5em"}}><b>Barbarian</b> - Gains basic proficiency in any two categories, and advanced proficiency in any other two categories.</li>
                <li style={{marginBottom: "0.5em"}}><b>Bard</b> - May choose one basic proficiency and one advanced proficiency from Agile, Throwing, or Elastic.</li>
                <li style={{marginBottom: "0.5em"}}><b>Cleric</b> - May choose two basic proficiencies from Brutal, Polearm, Cleaving, or Throwing.</li>
                <li style={{marginBottom: "0.5em"}}><b>Druid</b> - May choose two basic proficiencies from Agile, Brutal, Polearm, Cleaving, or Throwing.</li>
                <li style={{marginBottom: "0.5em"}}><b>Fighter</b> - Gains basic proficiency in any three categories, and advanced proficiency in any other two categories.</li>
                <li style={{marginBottom: "0.5em"}}><b>Monk</b> - May choose one basic proficiency and one advanced proficiency from Agile, Polearm, Cleaving, or Throwing. <br/>
                <div style={{marginLeft: "2em"}}>Note: A Monk weapon is any basic melee weapon that does not have the two-handed or heavy properties.</div></li>
                <li style={{marginBottom: "0.5em"}}><b>Paladin</b> - Gains basic proficiency in any two categories, and advanced proficiency in any other two categories.</li>
                <li style={{marginBottom: "0.5em"}}><b>Ranger</b> - Gains basic proficiency in any two categories, and advanced proficiency in any other two categories.</li>
                <li style={{marginBottom: "0.5em"}}><b>Rogue</b> - May choose any two basic proficiencies, as well as two advanced proficiencies from Agile, Throwing, Elastic, or Firearms.</li>
                <li style={{marginBottom: "0.5em"}}><b>Sorcerer</b> - May choose one basic proficiency from any category.</li>
                <li style={{marginBottom: "0.5em"}}><b>Warlock</b> - May choose any two basic proficiencies from any category. <br/>
                <div style={{marginLeft: "2em"}}>Note: Pact of the Blade Warlocks cannot choose an expert (red) weapon as their pact weapon unless they already have proficiency with that weapon. </div> </li>
                <li style={{marginBottom: "0.5em"}}><b>Wizard</b> - May choose one basic proficiency from any category.</li>
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
                    Those who are especially skilled in the arts of martial combat often find themselves limited, not by their own skill, but by the weapons they wield. To remedy this, many warriors seek out master craftsmen to imbue their weapons with powerful upgrades, granting them new abilities and enhancing their existing ones. These upgrades are powerful, unique, and can greatly enhance a weapon's capabilities, making them a valuable asset to any adventurer. <br/>
                    <em>&emsp;&emsp;<b>Note:</b> Some upgrades require a saving throw to resist their effects. The DC for these saving throws is equal to 8 + your bonus to hit with the weapon.</em>
                </p>
                <h3 id="upgradeRequirements" data-title="Upgrade Requirements" data-level="1">Upgrade Requirements</h3>
                <p>&emsp;&emsp; Different upgrades have different requirements that must be met before they can even be applied to a weapon. Most upgrades can only be applied to weapons of a certain category, that deal a certain type of damage, or that have certain attributes. Furthermore, any given weapon can only have so many upgrades applied to it as denoted by the weapon's upgrade value. This value denotes how many upgrades a given weapon can typically have applied to it, though specially crafted or enchanted weapons may also come with additional upgrade slots. Upgrading weapons is far from free, and even once an upgrade is applied to a weapon you must meet the combined proficiency cost of all upgrades on a weapon to benefit from any of them. <br/></p>
                <h3 id="proficiencyCost" data-title="Proficiency Cost" data-level="1">Proficiency Cost</h3>
                <p>&emsp;&emsp; Upgrades have a proficiency cost that must met in order to use the upgrade effectively. A weapon's proficiency cost is equal to the sum of the proficiency costs of all upgrades applied to it. In order to benefit from any of a weapon's upgrades, a character must have proficiency with that weapon, and must have a proficiency bonus greater than or equal to the weapon's proficiency cost. <br/></p>
                <h3 id="upgradePricing" data-title="Upgrade Pricing" data-level="1">Upgrade Pricing</h3>
                <p>&emsp;&emsp; Upgrades are not cheap. There is a reason that most weapons are not upgraded, and those with multiple upgrades are even rarer. The skill and materials required to apply an upgrade to a weapon are expensive, and the process is extremely difficult, such that only the most skilled craftsmen can even attempt it. <br/>
                Upgrades are not priced based on the upgrades themselves, but rather how they affect the value of the weapon they are applied to. Therefore, the market price for an upgrade is typically the value of the weapon after the upgrade is applied, minus the value of the weapon before the upgrade is applied. <br/> </p>
                &emsp;&emsp;The market value of a weapon is determined by: <br/>
                &emsp;&emsp;&emsp;&emsp; - The base cost of the weapon × the square of the number of upgrades applied to it. <br/>
                <p>&emsp;&emsp;For example, a weapon with a base cost of 10 GP that has 2 upgrades applied to it would have a market value of 10 GP × 2^2 = 40 GP. This only represents the market value of the weapon, and the actual price of the weapon may be higher or lower depending on other circumstances. For example, applying upgrades to especially cheap weapons, most shopkeeps will charge as if the weapon's base cost was 10 GP, regardless of the actual base cost of the weapon.
                <em><b>Note:</b> The base cost of a magic weapon will often far exceed its mundane counterpart, and as such the market value of a magical weapon after upgradeswill also be far greater. Refer to page 135 of the Dungeon Master's Guide for more information on pricing magic items. Furthermore, magic weapons may interact with upgrades in strange and interesting ways. Be creative!</em> <br/>
                &emsp;&emsp; In general, if the market value of a weapon exceeds 10,000 GP, the weapon will be considered legendary among craftsmen regardless of any actual magical properties. When a weapon reaches this level of notoriety, it will be highly sought after by collectors and adventurers alike, and may even be the subject of bardsongs and stories. Finding a craftsman both capable of and willing to apply upgrades to such a weapon will be a difficult task, and even once they are found, the market price of applying the upgrade represents more than just the labor involved, and will often include rare materials the craftsman must acquire, as well as the risk they are taking in working on such a valuable weapon. At this level, pricing for upgrades becomes very unpredictable, and acquiring the materials and labor required to apply an upgrade may become an adventure in and of itself. <br/> </p>
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
                    &emsp;&emsp;If a character is proficient with the relevant artisan's tools, they may attempt to apply an upgrade themselves. To do so, they must collect materials equal to half the market price of the upgrade, as well as any special materials the DM deems necessary. They must then make a series of checks with the relevant artisan's tools with a DC of 20 + the number of upgrades already applied to the weapon (with upgrade advancement counting as an additional upgrade). There are a number of factors that can affect the DC of these checks. For example: <br/>
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
                            <td style={{border: "1px solid grey"}}> The weapon is enchanted or otherwise has special properties</td>
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

    //Print the length of the weapons object
    console.log(Object.keys(weapons))
    console.log(Object.keys(weapons).length)
    console.log(Object.keys(upgrades).length)
    console.log(Object.keys(attributes).length)
    
    return (
        <>
            <div className='main-body'>
                
                    <header className='header' >
                        <button onClick={() => setTab("Builder")} className="header-tab">Builder</button>
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
