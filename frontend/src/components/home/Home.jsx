import React, { useEffect, useState } from "react";
import PageTitle from "../template/PageTitle";
import { FaHome, FaFolder, FaFile,FaUser } from "react-icons/fa";
import Stat from "./Stat";
import axios from "axios";
import { baseApiUrl } from "../../global";
import "./Home.css"


export default props => {

    useEffect(() => {
        getStats()
    }, [])

    const [stat, setStat] = useState({})

    function getStats(){
        axios.get(`${baseApiUrl}/stats`)
            .then(res => setStat(res.data))
    }

    return (
        <div className="home">
            <PageTitle icon={<FaHome size={35} />} main="Dashboard" sub="Base de Conhecimento" />
            <div className="stats">
                <Stat title="Categorias" value={stat.categories} icon={<FaFolder color="#d54d50" fontSize="4rem" />} />
                <Stat title="Artigos" value={stat.articles} icon={<FaFile color="#3bc480" fontSize="4rem"/>} />
                <Stat title="Usuários" value={stat.users} icon={<FaUser color="#3282cd" fontSize="4rem"/>} />
            </div>
        </div>
    )
}