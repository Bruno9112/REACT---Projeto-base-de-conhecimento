import React, { useState, useEffect } from "react";
import { Form, Table, Button, FormSelect, Pagination } from "react-bootstrap";
import { baseApiUrl, showError } from "./../../global"
import { defaultSucess } from "./msgs"
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";

export default props => {

    const [articles, setArticles] = useState([])
    const [users, setUsers] = useState([])
    const [categories, setCategories] = useState([])

    const [page, setPage] = useState(1)
    const [quant, setQuant] = useState(0)

    const [identi, setIdenti] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [imgUrl, setImgUrl] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [userId, setUserId] = useState("")
    const [content, setContent] = useState("")
    const [buttonState, setButtonState] = useState("save")

    useEffect(() => {
        loadUsers()
        loadCategories()
    }, [])

    useEffect(() => {
        loadArticles()
    }, [page])


    function loadArticles() {
        const url = `${baseApiUrl}/articles?page=${page}`
        axios.get(url).then(res => {
            setArticles(res.data.data)
            setQuant(res.data.quant)
        })
    }

    function loadUsers() {
        const url = `${baseApiUrl}/users`
        axios.get(url).then(res => {
            setUsers(res.data)
        })
    }

    function loadCategories() {
        const url = `${baseApiUrl}/categories`
        axios.get(url).then(res => {
            setCategories(res.data)
        })
    }

    function paginationItens() {
        let items = [];
        for(let num = 1; num <= quant; num++) {
            items.push(
                <Pagination.Item onClick={e => setPage(parseInt(e.target.text))} key={num} active={num === page}>{num}</Pagination.Item> 
            )
        }
        return(items)
    }

    function save() {
        const article = { name: name, description: description, imageUrl: imgUrl, content: content, userId: userId, categoryId: categoryId }

        const method = identi ? "put" : "post"
        const id = identi ? `/${identi}` : ""

        console.log(article)

        axios[method](`${baseApiUrl}/articles${id}`, article)
            .then(() => {
                defaultSucess()
                reset()
            })
            .catch(showError)
    }

    function remove() {
        const url = `${baseApiUrl}/articles/${identi}`
        axios.delete(url)
            .then(() => {
                defaultSucess()
                reset()
            })
            .catch(showError)
    }

    function reset() {
        setIdenti("")
        setName("")
        setDescription("")
        setImgUrl("")
        setCategoryId("")
        setUserId("")
        setContent("")
        setButtonState("save")
        loadArticles()
    }

    function loadArticle(id, mode = "save") {
        const url = `${baseApiUrl}/articles/${id}`
        axios.get(url).then(res => {
            const article = res.data
            setIdenti(article.id)
            setName(article.name)
            setDescription(article.description)
            setImgUrl(article.imageUrl ?? "")
            setCategoryId(article.categoryId)
            setUserId(article.userId)
            setContent(article.content)
            setButtonState(mode)
            console.log(article)
        })

    }

    function renderUsers() {
        return users.map(user => {
            return (
                <option key={user.id} selected={userId === user.id} value={user.id}>{user.name}</option>
            )
        })
    }

    function renderCategories() {
        return categories.map(category => {
            return (
                <option key={category.id} selected={categoryId === category.id} value={category.id}>{category.path}</option>
            )
        })
    }

    function renderHead() {
        return (
            <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Descrição</th>
            </tr>
        )
    }

    function renderBody() {
        return articles.map(article => {
            return (
                <tr key={article.id}>
                    <td>{article.id}</td>
                    <td>{article.name}</td>
                    <td>{article.description}</td>
                    {renderAction(article)}
                </tr>
            )
        })
    }

    function renderAction(article) {
        return (
            <td>
                <Button variant="warning" onClick={() => loadArticle(article.id)}><FaPencilAlt color="black" /></Button>
                <Button variant="danger" onClick={() => loadArticle(article.id, "remove")}><FaTrashAlt color="white" /></Button>
            </td>
        )
    }

    return (
        <div className="article-admin">
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Nome:</Form.Label>
                    <Form.Control type="text" onChange={e => setName(e.target.value)} value={name} placeholder="informe o nome do artigo..." required readOnly={buttonState === "remove"}></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Descrição:</Form.Label>
                    <Form.Control type="text" onChange={e => setDescription(e.target.value)} value={description} placeholder="informe descrição do artigo..." required readOnly={buttonState === "remove"}></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Image URL:</Form.Label>
                    <Form.Control type="text" onChange={e => setImgUrl(e.target.value)} value={imgUrl} placeholder="informe o nome do artigo..." required readOnly={buttonState === "remove"}></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Autor:</Form.Label>
                    <FormSelect defaultValue={"default"} onChange={e => setUserId(e.target.value)}>
                    <option value={"default"} >Selecione um Autor...</option>
                        {renderUsers()}
                    </FormSelect>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Categorias:</Form.Label>
                    <FormSelect defaultValue={"default"} onChange={e => setCategoryId(e.target.value)}>
                        <option value={"default"} >Selecione uma Categoria...</option>
                        {renderCategories()}
                    </FormSelect>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Conteudo:</Form.Label>
                    <CKEditor
                        editor={ClassicEditor}
                        data={content}
                        onChange={(e, editor) => {
                            const data = editor.getData()
                            setContent(data)
                        }}
                    />
                </Form.Group >
                
                <Pagination>{paginationItens()}</Pagination>

                <div className="mt-3 mb-3">
                    {
                        buttonState === "save" ? <Button onClick={() => save()} variant="primary">Salvar</Button> :
                            <Button onClick={() => remove()} variant="danger">Excluir</Button>
                    }
                    <Button onClick={() => reset()} variant="secondary" className="ml-2" >Cancelar</Button>
                </div>
            </Form>
            <hr />
            <Table striped bordered hover>
                <thead>
                    {renderHead()}
                </thead>
                <tbody>
                    {renderBody()}
                </tbody>
            </Table>
        </div>
    )
}

