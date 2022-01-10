import React from "react";
import Gravatar from "react-gravatar"
import { BiChevronDown } from "react-icons/bi"
import { FaCogs, FaSignOutAlt } from "react-icons/fa";
import { userState } from "../../config/store"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import "./UserDropdown.css"

export default props => {

const {name, email} = useSelector(userState)

    return (
        <div className="user-dropdown">
            <div className="user-button">
                <span>{name}</span>
                <div className="user-dropdown-img">
                    <Gravatar email={email} alt="User" />
                </div>
                <BiChevronDown size={25} />
            </div>
            <div className="user-dropdown-content">
                <Link to="/admin"><FaCogs/> Administração</Link>
                <a href=""><FaSignOutAlt/> Sair</a>
            </div>
        </div>

    )
}