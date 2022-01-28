import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiChevronDown, BiChevronRight } from "react-icons/bi"
import { useSelector } from "react-redux";
import { menuState } from "../../config/store";
import { baseApiUrl } from "./../../global";
import { TreeView, TreeItem } from '@material-ui/lab';
import { useNavigate, useLocation } from "react-router-dom";
import "./Menu.css";

export default props => {

    const navigate = useNavigate()
    const history = useLocation() 


    const isVisibleMenu = useSelector(menuState)

    const [treeData, setTreeData] = useState({})

    function getTreeData() {
        const url = `${baseApiUrl}/categories/tree`
        axios.get(url).then(res => setTreeData(res.data[0]))
        console.log(treeData)
    }

    const renderTree = (nodes) => {
         return <TreeItem key={nodes.id} nodeId={String(nodes.id)} label={nodes.name}>
            {Array.isArray(nodes.children)
                ? nodes.children.map((node) => renderTree(node))
                : null}
        </TreeItem>
    };

    const handleSelect = (event, nodeId) => {
        navigate(`/categories/${nodeId}/articles`)
    }

    return (
        <>
            {isVisibleMenu ? <aside className="menu">
                <TreeView
                    aria-label="rich object"
                    defaultCollapseIcon={<BiChevronDown />}
                    defaultExpanded={['root']}
                    defaultExpandIcon={<BiChevronRight />}
                    sx={{ height: 110, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
                    onNodeSelect={handleSelect}
                >
                    {renderTree(treeData)}
                </TreeView>
                <button onClick={() => getTreeData()}>carregar</button>
                <button onClick={() => console.log(history)}>location</button>
            </aside> : false}
        </>
    )
}