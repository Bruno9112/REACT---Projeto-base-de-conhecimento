import React, { useEffect, useState } from "react";
import { baseApiUrl } from "./../../global"
import axios from "axios";
import PageTitle from "../template/PageTitle";
import { FaFolder } from "react-icons/fa";
import { useParams, useLocation } from "react-router-dom";
import ArticleItem from "./ArticleItem";
import "./ArticlesByCategories.css"

export default props => {

    const history = useLocation()

    const [page, setPage] = useState(1)

    const [category, setCategory] = useState({})
    const [articles, setArticles] = useState([])

    const [loadMore, setLoadMore] = useState(true)

    const { id } = useParams()

    function getCategory() {
        const url = `${baseApiUrl}/categories/${id}`
        axios(url).then(res => setCategory(res.data))
        console.log("category: "+category)
    }

    function pagePlus() {
        setPage(page + 1)
    }

    function getArticles() {
        const url = `${baseApiUrl}/categories/${id}/articles?page=${page}`
        axios(url).then(res => {
            setArticles(articles.concat(res.data))
            pagePlus()

            if (res.data.length === 0) setLoadMore(false)
        })

    }

    function renderArticles() {
        return articles.map(article => {
            return <li key={article.id}><ArticleItem article={article} /></li>
        })
    }

    useEffect(() => {
        console.log("page:"+page)
        setArticles([])
        setLoadMore(true)
        setPage(1)

        getCategory()
        getArticles()
        console.log("id:"+id)
        console.log("articles: " + articles)
        console.log("category: " + category)
    }, [history.pathname])

    return (
        <div className="article-by-category">
            <PageTitle icon={<FaFolder />} main={category.name} sub="Categoria" />
            <ul>
                {renderArticles()}
            </ul>
            {loadMore ?
                <div className="load-more">
                    <button className="btn btn-lg btn-outline-primary" onClick={() => getArticles()}>carregar mais</button>
                </div>
                : false
            }
        </div>
    )
}