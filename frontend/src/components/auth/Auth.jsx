import React, { useState } from "react";
import axios from "axios";
import img from "../../assets/logo-react.png";
import { baseApiUrl, showError, userKey } from "../../global";
import { useDispatch } from "react-redux";
import { setUser } from "../../config/store";
import { defaultSucess } from "../admin/msgs";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify"
import "./Auth.css"

export default props => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const[showSignUp, setShowSignUp] = useState(false)
    const[name, setName] = useState("")
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[confirmPassword, setConfirmPassword] = useState("")

    function signin(){

        const user = {email: email, password: password}

        axios.post(`${baseApiUrl}/signin`, user)
        .then(res => {
            dispatch(setUser(res.data))
            localStorage.setItem(userKey, JSON.stringify(res.data))
            navigate("/")
        })
        .catch(showError)
    }

    function signup(){

        const user = {name: name, email: email, password: password, confirmPassword: confirmPassword}

        axios.post(`${baseApiUrl}/signup`, user)
        .then(() => {
            defaultSucess()
            reset()
            setShowSignUp(false)
        })
        .catch(showError)
    }

    function reset(){
        setName("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
    }

    function toggle(e) {
        e.preventDefault()
        setShowSignUp(!showSignUp)
        reset()
    }


    return (
        <div className="auth-content">
            <ToastContainer/>
            <div className="auth-modal">
                <img src={img} width="200" alt="Logo"></img>
                <hr/>
                <div className="auth-title">{showSignUp ? "Cadastro" : "Login"}</div>
                
                { showSignUp ? <input type="text" onChange={e => setName(e.target.value)} value={name} placeholder="Informe seu nome..."></input> : false}
                <input  type="email" onChange={e => setEmail(e.target.value)} value={email} placeholder="Informe seu email..."></input>
                <input  type="password" onChange={e => setPassword(e.target.value)} value={password} placeholder="Informe sua senha..."></input>
                { showSignUp ? <input type="password" onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword} placeholder="Confirme sua senha..."></input> : false}
                { showSignUp ? <button onClick={() => signup()} >Registrar</button> : <button onClick={() => signin()}>Entrar</button>}
                <a href="" onClick={e => toggle(e)}>
                    { showSignUp ? <span>Ja tem cadastro? Acesse o Login</span> : 
                    <span>Não tem cadastro? Registre-se aqui!</span>}
                </a>
            </div>
        </div>
    )
}