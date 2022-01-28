import React from "react";
import { Route, Routes } from "react-router-dom"
import Home from "../components/home/Home"
import ArticlesByCategories from "../components/Articles/ArticlesByCategories";
import ArticleById from "../components/Articles/ArticleById";
import Auth from "../components/auth/Auth";
import ProtectRoute from "./ProtectRoute";

export default props =>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<ProtectRoute />} />
        <Route path="/categories/:id/articles" element={<ArticlesByCategories />} />
        <Route path="/articles/:id" element={<ArticleById />} />
        <Route path="/auth" element={<Auth />} />
    </Routes>




