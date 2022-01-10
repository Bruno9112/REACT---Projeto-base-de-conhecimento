import React from "react";
import "./Stat.css"

export default props => 
<div className="stat">
    <div className="stat-icon">
          {props.icon}
    </div>
    <div className="stat-info">
        <span className="stat-title">{props.title}</span>
        <span className="stat-value">{props.value}</span>
    </div>
</div>