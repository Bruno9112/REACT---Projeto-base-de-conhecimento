import React from "react";
import {showError} from "./../../global"
import { ToastContainer } from "react-toastify"
import { useState } from "react";

export default props => {

    const [n1, setN1] = useState(0)
    const [n2, setN2] = useState(0)
    const [user, setUser] = useState({})

    function trans(){
        setUser({n1: n1, n2: n2})
        console.log(`${n1 === n2}`)
    }

    function mostrar(){
        console.log(n1)
        console.log(n2)
        console.log(user)
    }

    return (
        <div className="category-admin">
            <input type="number" onChange={e => setN1(e.target.value)}></input>
            <input type="number" onChange={e => setN2(e.target.value)}></input>
            <button onClick={() => trans()}>transmitir</button>
            <button onClick={() => mostrar()}>mostrar</button>
        </div>
    )
}
    
