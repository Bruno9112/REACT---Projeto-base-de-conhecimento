module.exports = app => {

    const { existOrError, notExistsOrError } = app.api.validation

    const save = (req, res) => {
        const category = { ...req.body }
        if (req.params.id) category.id = req.params.id

        try {
            existOrError(category.name, "Nome não informado!")
        } catch (msg) {
            return res.send(400).send(msg)
        }

        if (category.id) {
            app.db("categories")
                .update(category)
                .where({ id: category.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db("categories")
                .insert(category)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            existOrError(req.params.id, "código de categoria não informado!")

            const subcategory = await app.db("categories")
                .where({ parentId: req.params.id })
            notExistsOrError(subcategory, "Categoria possui subcategoria")

            const articles = await app.db("articles")
                .where({ categoryId: req.params.id })
            notExistsOrError(articles, "Categoria possui artigo.")

            const rowsDeleted = await app.db("categories")
                .where({ id: req.params.id }).del()
            existOrError(rowsDeleted, "Categoria não foi encontrada")

            res.status(204).send()
        } catch (msg) {
            res.status(400).send(msg)
        }
    }

    const withPath = categories => {
        const getParent = (categories, parentId) => {
            const parent = categories.filter(parent => parent.id === parentId)
            return parent.length ? parent[0] : null
        }

        const categoriesWithPath = categories.map(category => {
            let path = category.name
            let parent = getParent(categories, category.parentId)

            while (parent) {
                path = `${parent.name} > ${path}`
                parent = getParent(categories, parent.parentId)
            }
            return { ...category, path }
        })

        categoriesWithPath.sort((a, b) => {
            if (a.path < b.path) return -1
            if (a.path > b.path) return 1
            return 0
        })

        return categoriesWithPath
    }

    const get = (req, res) => {
        app.db("categories")
            .then(categories => res.json(withPath(categories)))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db("categories")
            .where({ id: req.params.id })
            .first()
            .then(categories => res.json(categories))
            .catch(err => res.status(500).send(err))
    }

    const toTree = (categories, tree) => {
        if (!tree) tree = categories.filter(c => !c.parentId) // filtra pelas categorias que não possuem parentId setado (no caso as categorias que não tem pai)
        tree = tree.map(parentNode => {
            const isChild = node => node.parentId == parentNode.id // A função abaixo pega um elemento e verifica se ele é filho do do elemento acima. (Parent Node)
            //Então são cria-se o elemento children no parentNode e esse elemento recebe a chamada recursiva
            //da função toTree, Só que agora ao invés de passar TODAS as categorias, será feito um filter
            //que deixará passar apenas as filhas do parentNode.
            parentNode.children = toTree(categories, categories.filter(isChild))
            return parentNode
        })
        return tree
    }

    const getTree = (req, res) => {
        app.db("categories")
            .then(categories => res.json(toTree(withPath(categories))))
    }

    return { save, remove, get, getById, getTree }

}