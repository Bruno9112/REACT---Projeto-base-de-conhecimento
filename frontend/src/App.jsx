import React from "react";
import Header from "./components/template/Header";
import Menu from "./components/template/Menu";
import Content from "./components/template/Content";
import Footer from "./components/template/Footer";
import Router from "./config/Router";
import { useSelector } from "react-redux"
import { menuState } from "./config/store"
import { BrowserRouter } from "react-router-dom"
import "./App.css"

export default props => {
    const isVisibleMenu = useSelector(menuState)

    return (
        <BrowserRouter>
            <div id="app" className={!isVisibleMenu ? "hide-menu" : ""}>
                <Header title="Bruno - Projeto Final" hideToggle={false} hideUserDropdown={false} />
                <Menu />
                <Content />
                <Footer />
            </div>
        </BrowserRouter>
    )

}
