import React from "react";
import "./Loading.css"
import loading from "../../assets/loading.gif"

export default props => {



    return(
        <div className="loading">
            <img src={loading} alt="Loading"/>
        </div>
    )
}