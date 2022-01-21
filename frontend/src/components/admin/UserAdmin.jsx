import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseApiUrl, showError } from "../../global";
import { defaultSucess } from "./msgs"
import { Table, Form, Col, Row, Button, Pagination } from "react-bootstrap"
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

export default props => {
    const [usersPages, setUsersPages] = useState([])

    const [page, setPage] = useState(1)
    const [quant, setQuant] = useState(0)

    const [identi, setIdenti] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [admin, setAdmin] = useState(false)
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirm] = useState("")
    const [buttonState, setButtonState] = useState("save")

    useEffect(() => {
        loadUsersPages()
    }, [page])

    function loadUsersPages() {
        console.log("Pagina: " + page)
        const url = `${baseApiUrl}/users?page=${page}`
        axios.get(url).then(res => {
            setUsersPages(res.data.users)
            setQuant(res.data.quant)
        })
    }

    function paginationItens() {
        let items = [];
        for (let num = 1; num <= quant; num++) {
            items.push(
                <Pagination.Item onClick={e => setPage(parseInt(e.target.text))} key={num} active={num === page}>{num}</Pagination.Item>
            )
        }
        return (items)
    }

    function save() {
        const user = { name: name, email: email, password: password, confirmPassword: confirmPassword, admin: admin }

        const method = identi ? "put" : "post"
        const id = identi ? `/${identi}` : ""

        axios[method](`${baseApiUrl}/users${id}`, user)
            .then(() => {
                defaultSucess()
                reset()
            })
            .catch(showError)
    }

    function remove() {
        const id = identi
        axios.delete(`${baseApiUrl}/users/${id}`)
            .then(() => {
                defaultSucess()
                reset()
            })
            .catch(showError)
    }

    function reset() {
        setIdenti("")
        setButtonState("save")
        setName("")
        setEmail("")
        setPassword("")
        setConfirm("")
        setAdmin(false)
        loadUsersPages()
    }

    function loadUser(user, mode = "save") {
        setButtonState(mode)
        setName(user.name)
        setEmail(user.email)
        setIdenti(user.id)
        setAdmin(user.admin)
    }

    function renderHead() {
        return (
            <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Admin</th>
                <th>Ações</th>
            </tr>
        )
    }

    function renderBody() {
        return usersPages.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.admin === 1 ? "Sim" : "Não"}</td>
                    {renderAction(user)}
                </tr>
            )
        })
    }

    function renderAction(user) {
        return (
            <td>
                <Button variant="warning" onClick={() => loadUser(user)}><FaPencilAlt color="black" /></Button>
                <Button variant="danger" className="actionButton" onClick={() => loadUser(user, "remove")}><FaTrashAlt color="white" /></Button>
            </td>
        )
    }

    return (
        <div className="user-admin">
            <Form>
                <Row>
                    <Col md="6" sm="12">
                        <Form.Group>
                            <Form.Label>Nome</Form.Label>
                            <Form.Control id="user-name" type="text" onChange={e => setName(e.target.value)} value={name} placeholder="Informe o Nome do Usuário..." required readOnly={buttonState === "remove"} />
                        </Form.Group>
                    </Col>
                    <Col md="6" sm="12">
                        <Form.Group>
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control id="user-email" type="text" onChange={e => setEmail(e.target.value)} value={email} placeholder="Informe o Email do Usuário..." required readOnly={buttonState === "remove"} />
                        </Form.Group>
                    </Col>
                </Row>
                {buttonState === "save" ?
                    <>
                        <Form.Check type="checkbox" label="Administrador" id="user-admin" className="mb-3 mt-3" onChange={e => setAdmin(e.target.checked)} checked={admin} />
                        <Row>
                            <Col md="6" sm="12">
                                <Form.Group>
                                    <Form.Label>Senha</Form.Label>
                                    <Form.Control id="user-password" type="password" onChange={e => setPassword(e.target.value)} value={password} placeholder="Informe a Senha do Usuário..." required readOnly={identi != ""} />
                                </Form.Group>
                            </Col>
                            <Col md="6" sm="12">
                                <Form.Group >
                                    <Form.Label>Confirmar Senha</Form.Label>
                                    <Form.Control id="user-password-confirm" type="password" onChange={e => setConfirm(e.target.value)} value={confirmPassword} placeholder="Confirme a Senha do usuário..." required readOnly={identi != ""} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </> : false
                }

                <Pagination className="mt-3">{paginationItens()}</Pagination>

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

