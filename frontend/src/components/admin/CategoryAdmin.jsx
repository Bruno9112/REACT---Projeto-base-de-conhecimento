import React, { useEffect, useState } from "react";
import { Form, Table, Button, FormSelect, Pagination } from "react-bootstrap";
import { baseApiUrl, showError } from "./../../global"
import { defaultSucess } from "./msgs"
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import axios from "axios";

export default props => {

    const [categoriesPage, setCategoriesPage] = useState([])
    const [categories, setCategories] = useState([])

    const [page, setPage] = useState(1)
    const [quant, setQuant] = useState(0)

    const [identi, setIdenti] = useState("")
    const [name, setName] = useState("")
    const [parentId, setParentId] = useState("")

    const [buttonState, setButtonState] = useState("save");

    useEffect(() => {
        loadCategories()
    }, [])

    useEffect(() => {
        loadCategoriesPage()
    }, [page])

    function loadCategoriesPage() {
        
        const url = `${baseApiUrl}/categories?page=${page}`
        axios.get(url).then(res => {
            setCategoriesPage(res.data.categories)
            setQuant(res.data.quant)
            console.log(res.data.categories)
        })
        
    }

    function loadCategories() {
        const url = `${baseApiUrl}/categories`
        axios.get(url).then(res => {
            setCategories(res.data)
        })
    }

    function paginationItens() {
        console.log("Quantidade:" + quant)
        let items = [];
        for (let num = 1; num <= quant; num++) {
            items.push(
                <Pagination.Item onClick={e => setPage(parseInt(e.target.text))} key={num} active={num === page}>{num}</Pagination.Item>
            )
        }
        return (items)
    }

    function save() {
        const category = { name: name, parentId: parentId }

        const method = identi ? "put" : "post"
        const id = identi ? `/${identi}` : ""

        axios[method](`${baseApiUrl}/categories${id}`, category)
            .then(() => {
                defaultSucess()
                reset()
            })
            .catch(showError)
    }

    function remove() {
        const url = `${baseApiUrl}/categories/${identi}`
        axios.delete(url)
            .then(() => {
                defaultSucess()
                reset()
            })
            .catch(showError)
    }

    function reset() {
        setButtonState("save")
        setName("")
        setIdenti("")
        setParentId("")
        loadCategoriesPage()
        loadCategories()
    }

    function loadCategory(category, mode = "save") {
        setButtonState(mode)
        setName(category.name)
        setIdenti(category.id)
        setParentId(category.parentId)
        renderAction()
    }

    function renderOptions() {
        return categories.map(category => {
            return (
                <option selected={parentId === category.id} value={category.id}>{category.path}</option>
            )
        })
    }

    function renderHead() {
        return (
            <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Caminho</th>
                <th>Ações</th>
            </tr>
        )
    }

    function renderBody() {
        return categoriesPage.map(category => {
            console.log(category)
            return (
                <tr key={category.id}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>{category.path}</td>
                    {renderAction(category)}
                </tr>
            )
        })
    }

    function renderAction(category) {
        return (
            <td>
                <Button variant="warning" onClick={() => loadCategory(category)}><FaPencilAlt color="black" /></Button>
                <Button variant="danger" className="actionButton" onClick={() => loadCategory(category, "remove")}><FaTrashAlt color="white" /></Button>
            </td>
        )
    }

    return (
        <div className="category-admin">
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Nome:</Form.Label>
                    <Form.Control type="text" onChange={e => setName(e.target.value)} value={name} placeholder="informe o nome da categoria..." required readOnly={buttonState === "remove"}></Form.Control>
                </Form.Group>
                {buttonState === "save" ?
                    <Form.Group className="mb-3">
                        <Form.Label>Categoria Pai:</Form.Label>
                        <FormSelect defaultValue={"default"} onChange={e => setParentId(e.target.value)}>
                            <option value={"default"}>Selecione uma Categoria...</option>
                            {renderOptions()}
                        </FormSelect>
                    </Form.Group> : false
                }
               
                    <Pagination >{paginationItens()}</Pagination>
               
                <div className="mt-3 mb-3">
                    {
                        buttonState === "save" ? <Button onClick={() => save()} variant="primary">Salvar</Button> :
                            <Button onClick={() => remove()} variant="danger">Excluir</Button>
                    }
                    <Button onClick={() => reset()} variant="secondary">Cancelar</Button>
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

