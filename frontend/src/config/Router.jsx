import React from "react";
import { Route, Routes } from "react-router-dom"
import Home from "../components/home/Home"
import AdminPages from "../components/admin/AdminPages";

export default props => {
 
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/admin" element={<AdminPages/>}/>
        </Routes>
    )
}