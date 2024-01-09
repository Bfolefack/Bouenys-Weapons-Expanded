import { useState } from 'react'
import './App.css'
import { weapons } from './Weapon'
import React from 'react'
import { Weapon } from './Weapon'
import { Attribute } from './Weapon'
import { DiceFormula } from './Weapon'
import { AttributeName } from './Weapon'
import { WeaponType } from './Weapon'

function NavBar() {
    return (
        <div className='header'>
            <h1>Boueny's Weapons Expanded</h1>
        </div>
    )
}



function WeaponTables(){
    const weaponList = Object.keys(weapons)
    weaponList.sort((a: string, b: string) => (weapons[a].tier == weapons[b].tier ? (weapons[a].name < weapons[b].name ? -1: 1) : weapons[a].tier - weapons[b].tier))
    const [weaponCategory, setWeaponCategory] = useState("Basic")
    const weaponElements = weaponList.map((weapon) => <WeaponRow weapon={weapon} category={weaponCategory}/>)


    return (
        <>
        <span className='weapon-tab-container'>
            <button onClick={() => setWeaponCategory("All")} className="weapon-tab">All</button>
            <button onClick={() => setWeaponCategory("Basic")} className="weapon-tab">Basic</button>
            <button onClick={() => setWeaponCategory("Agile")} className="weapon-tab">Agile</button>
            <button onClick={() => setWeaponCategory("Polearm")} className="weapon-tab">Polearm</button>
            <button onClick={() => setWeaponCategory("Cleaving")} className="weapon-tab">Cleaving</button>
            <button onClick={() => setWeaponCategory("Brutal")} className="weapon-tab">Brutal</button>
            <button onClick={() => setWeaponCategory("Throwing")} className="weapon-tab">Throwing</button>
            <button onClick={() => setWeaponCategory("Archery")} className="weapon-tab">Archery</button>
            <button onClick={() => setWeaponCategory("Firearm")} className="weapon-tab">Firearm</button>
        </span>
        <table className='weapon-table'>
            <thead>
                <tr className='weapon-element'>
                    <th>Name</th>
                    <th>Cost</th>
                    <th>Damage</th>
                    <th>Crit</th>
                    <th>Upgrade Slots</th>
                    <th>Attributes</th>
                </tr>
            </thead>
            {weaponElements}
        </table>
        </>
    )
}

function WeaponRow(props){
    const weapon = weapons[props.weapon]
    console.log(typeof weapon)
    console.log(weapons)

    let weaponColor = {color: "white"};
    switch (weapon.tier) {
        case 0:
            weaponColor = {color: "green"}
            break;
        case 1:
            weaponColor = {color: "yellow"}
            break;
        case 2:
            weaponColor = {color: "red"}
            break;
        default:
            break;
    }

    if(weapon.category != props.category && props.category != "All"){
        return (<></>)
    }

    return(
    <tbody style={weaponColor}>
        <tr className='weapon-element'>
            <td>{weapon.name}</td>
            <td>{weapon.cost + " GP"}</td>
            <td>{weapon.formula.toString()}</td>
            <td>{weapon.critRange == 20 ? "x" + weapon.critPower : weapon.critRange + "-20/x" + weapon.critPower}</td>
            <td>{weapon.upgrade}</td>
            <td>{weapon.attributes.map((attribute) => attribute.toString()).join(", ")}</td>
        </tr>
    </tbody>)
}

function App() {

    return(
        <>
        <NavBar/>
        <div>
            <WeaponTables/>
        </div>
        </>
    );
}



export default App
