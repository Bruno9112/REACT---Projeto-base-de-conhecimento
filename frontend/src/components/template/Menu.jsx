import React, { useState } from "react";
import "./Menu.css"
import { useSelector } from "react-redux"
import { menuState } from "../../config/store"

export default props => {
    const isVisibleMenu = useSelector(menuState)
    
    return (
        <>
            {isVisibleMenu ? <aside className="menu">
            </aside> : false}
        </>
    )
}