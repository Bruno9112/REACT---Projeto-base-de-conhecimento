import React from "react";
import { Route, Routes, useParams } from "react-router-dom"
import Home from "../components/home/Home"
import AdminPages from "../components/admin/AdminPages";
import ArticlesByCategories from "../components/Articles/ArticlesByCategories";

export default props => {

    const { id } = useParams()

    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/admin" element={<AdminPages/>}/>
            <Route path="/categories/:id/articles" element={<ArticlesByCategories id={id}/>}/>
        </Routes>
    )
}