import React from "react";
import PageTitle from "../template/PageTitle";
import { FaCogs, FaSignOutAlt } from "react-icons/fa";
import {Tab, Tabs} from "react-bootstrap"
import ArticlesAdmin from "./ArticlesAdmin";
import CategoryAdmin from "./CategoryAdmin";
import UserAdmin from "./UserAdmin";


export default props =>
    <div className="admin-pages">
        <PageTitle icon={<FaCogs size={35} />} main="Administração do sistema" sub="Cadastro & Cia" />
        <div className="admin-page-tabs">
            <Tabs defaultActiveKey="article" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="article" title="Artigo">
                    <ArticlesAdmin/>
                </Tab>
                <Tab eventKey="category" title="Categoria">
                    <CategoryAdmin/>
                </Tab>
                <Tab eventKey="user" title="Usuário" >
                    <UserAdmin/>
                </Tab>
            </Tabs>
        </div>
    </div>