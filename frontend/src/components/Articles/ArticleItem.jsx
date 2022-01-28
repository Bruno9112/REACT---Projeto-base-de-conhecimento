import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import defaultImage from "./../../assets/article.png"
import "./ArticleItem.css"

export default props => {


    const [ article, setArticle] = useState({})

    useEffect(() => {
        setArticle(props.article)
    }, [])


    return(
        <div className="article-item">
            <Link to={`/articles/${article.id}`}>
                 <div className="article-item-image">
                    {
                        article.imageUrl ? <img src={article.imageUrl} height="150" width="150" alt="Article"></img> :
                        <img src={defaultImage} height="150" width="150" alt="Article"></img>
                    }
                 </div>
                 <div className="article-item-info">
                    <h2>{article.name}</h2>
                    <p>{article.description}</p>
                    <span className="article-item-author">
                        <strong>Autor: </strong>{article.author}
                    </span>
                 </div>
            </Link>
        </div>
    )
}