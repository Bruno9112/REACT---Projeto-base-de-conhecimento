import React from "react";
import "./PageTitle.css"
import { FaHome } from "react-icons/fa";

export default props => 
<div className="page-title">
    <h1>{props.icon} {props.main}</h1>
    <h2>{props.sub}</h2>
    <hr/>
</div>