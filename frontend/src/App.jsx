import React, { useEffect, useState } from "react";
import Header from "./components/template/Header";
import Menu from "./components/template/Menu";
import Content from "./components/template/Content";
import Footer from "./components/template/Footer";
import Loading from "./components/template/Loading";
import { useSelector, useDispatch } from "react-redux"
import { menuState, userState, setUser } from "./config/store"
import { useNavigate } from "react-router-dom"
import axios from "axios";
import { baseApiUrl, userKey } from "./global"
import "./App.css"

export default props => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [validatingToken, setValidatingToken] = useState(true)

    const isVisibleMenu = useSelector(menuState)
    const user = useSelector(userState)

    useEffect(() => {
        validateToken()
    }, [])

    async function validateToken() {
        setValidatingToken(true)

        const json = localStorage.getItem(userKey)
        const userData = JSON.parse(json)
        dispatch(setUser(null))

        if (!userData) {
            setValidatingToken(false)
            navigate("/auth")
            return
        }

        const res = await axios.post(`${baseApiUrl}/validateToken`, userData)

        if (res.data) {
            dispatch(setUser(userData))
        } else {
            localStorage.removeItem(userKey)
            console.log("userData: " + res.data, res)
            navigate("/auth")
        }
        setValidatingToken(false)
    }

    return (
        <div id="app" className={!isVisibleMenu || !user ? "hide-menu" : ""}>
            <Header title="Bruno - Projeto Final" hideToggle={!user} hideUserDropdown={!user} />
            <Menu />
            {validatingToken ? <Loading /> : <Content />}
            <Footer />
        </div>
    )
}
