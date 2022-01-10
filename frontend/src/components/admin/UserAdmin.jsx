import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseApiUrl, showError } from "../../global";
import { defaultSucess } from "./msgs"
import { Table, Form, Col, Row, Button } from "react-bootstrap"
import { ToastContainer } from "react-toastify"
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import "./UserAdmin.css"

export default props => {

    const [users, setUsers] = useState([])
    
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirm] = useState("")
    const [buttonState, setButtonState] = useState("save")
    
    const [user, setUser] = useState({})

    function save() {
    
        setUser({name: name, email: email, password: password, confirmPassword: confirmPassword})

        console.log(user)

        const method = user.id ? "put" : "post"
        const id = user.id ? `/${user.id}` : ""

        console.log(method, id)

        axios[method](`${baseApiUrl}/users${id}`, user)
            .then(() => {
                defaultSucess()
                reset()
            })
            .catch(showError)
    }

    function remove() {
        const id = user.id
        axios.delete(`${baseApiUrl}/users/${id}`)
            .then(() => {
                defaultSucess()
                reset()
            })
            .catch(showError)
    }

    function reset() {
        setButtonState("save")
        setName("")
        setEmail("")
        setPassword("")
        setConfirm("")
        loadUsers()
    }

    function loadUser(user, mode = "save"){
        setButtonState(mode)
        setUser({...user})
        setName(user.name)
        setEmail(user.email)
        console.log(user)
    }

    useEffect(() => {
        loadUsers()
    }, [])

    function loadUsers() {
        const url = `${baseApiUrl}/users`
        axios.get(url).then(res => {
            setUsers(res.data)
        })
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

    function renderAction(user) {
        return (
            <td className="tableaction">
                <Button variant="warning" onClick={() => loadUser(user)}><FaPencilAlt color="green"/></Button>
                <Button variant="danger" onClick={() => loadUser(user, "remove")}><FaTrashAlt color="white" /></Button>
            </td>
        )
    }

    function renderBody() {
        return users.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.admin == 1 ? "Sim" : "Não"}</td>
                    {renderAction(user)}
                </tr>
            )
        })
    }

    return (
        <div className="user-admin">
            <ToastContainer/>
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
                <Form.Check type="checkbox" label="Adminstrador" id="user-admin" className="mb-3 mt-3" />
                { buttonState === "save" ? 
                <Row>
                    <Col md="6" sm="12">
                        <Form.Group>
                            <Form.Label>Senha</Form.Label>
                            <Form.Control id="user-password" type="password" onChange={e => setPassword(e.target.value)} value={password} placeholder="Informe a Senha do Usuário..." required />
                        </Form.Group>
                    </Col>
                    <Col md="6" sm="12">
                        <Form.Group>
                            <Form.Label>Confirmar Senha</Form.Label>
                            <Form.Control id="user-password-confirm" type="password" onChange={e => setConfirm(e.target.value)} value={confirmPassword} placeholder="Confirme a Senha do usuário..." required />
                        </Form.Group>
                    </Col>
                </Row> : false
                }
                <div className="buttons">
                    {
                        buttonState === "save" ? <Button onClick={() =>save()} variant="primary">Salvar</Button> :
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

