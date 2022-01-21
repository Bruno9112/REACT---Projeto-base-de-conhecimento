import React from "react";
import { BiChevronDown, BiChevronLeft } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { changeToggle, menuState } from "../../config/store"
import UserDropdown from "./UserDropdown";
import { Link } from "react-router-dom";
import "./Header.css"


export default props => {
    const isVisibleMenu = useSelector(menuState)
    const dispatch = useDispatch()

    function ToggleMenu() {
        dispatch(changeToggle())
        console.log(isVisibleMenu)
    }

    return (
        <header className="header">
            { !props.hideToggle ? <a className="toggle" onClick={ToggleMenu}>
                {isVisibleMenu ? <BiChevronLeft size={25}/> : <BiChevronDown size={25} />}
            </a> : false}
            <h1 className="title">
                <Link to="/">{props.title}</Link>
            </h1>
            { !props.hideUserDropdown ? <UserDropdown/> : false}
        </header>
    )
}

