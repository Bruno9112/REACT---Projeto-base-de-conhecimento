import React, {useEffect, useState} from "react";
import { baseApiUrl } from "./../../global"
import axios from "axios";
import PageTitle from "../template/PageTitle";
import { FaFolder } from "react-icons/fa";
import { useParams } from "react-router-dom";

export default props => {

    const [page, setPage] = useState(1)
    const [quant, setQuant] = useState(0)

    const [category, setCategory] = useState({})
    const [articles, setArticles] = useState([])

    const [loadMore, setLoadMore] = useState(true)

    const { id } = useParams()

    useEffect(() => {
        console.log(id)
        getCategory()
    }, [])

    function getCategory(){
        const url = `${baseApiUrl}/categories/${id}`
        axios(url).then(res => setCategory(res.data))
        console.log(category)
    }

    return (
        <div className="article-by-category">
            <PageTitle icon={<FaFolder/>} main={category.name} sub="Categoria"/>
        </div>
    )
}