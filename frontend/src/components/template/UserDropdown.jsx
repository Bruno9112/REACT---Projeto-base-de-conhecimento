import React from "react";
import Gravatar from "react-gravatar"
import { BiChevronDown } from "react-icons/bi"
import { FaCogs, FaSignOutAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { setUser, userState } from "../../config/store"
import { userKey } from "../../global"
import "./UserDropdown.css"

export default props => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector(userState)

    const { name, email } = useSelector(userState)

    function logout(e) {
        e.preventDefault()
        localStorage.removeItem(userKey)
        dispatch(setUser(null))
        navigate("/auth")
    }

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
                { user.admin == 1 ? <Link to="/admin" ><FaCogs /> Administração</Link> : false}
                <a href="" onClick={e => logout(e)}><FaSignOutAlt /> Sair</a>
            </div>
        </div>

    )
}