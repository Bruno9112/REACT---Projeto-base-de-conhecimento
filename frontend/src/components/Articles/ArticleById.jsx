import React, {useState, useEffect} from "react";
import { baseApiUrl } from "../../global";
import axios from "axios";
import PageTitle from "../template/PageTitle";
import { FaFile } from "react-icons/fa";
import { useParams } from "react-router-dom"
import "./ArticleById"

export default props => {

    const { id } = useParams()

    const [article, setArticle] = useState({})

    useEffect(() => {
        const url = `${baseApiUrl}/articles/${id}`
        axios.get(url).then(res => setArticle(res.data))
    }, [])

    return(
        <div className="article-by-id">
            <PageTitle icon={<FaFile/>} main={article.name} sub={article.description}/> 
            <div className="article.content">{article.content}</div>
        </div>
    )
}