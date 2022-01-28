const queries = require("./queries")

module.exports = app => {

    const { existOrError } = app.api.validation

    const save = (req, res) => {
        const article = { ...req.body }
        if (req.params.id) article.id = req.params.id

        try {
            existOrError(article.name, "Nome não informado")
            existOrError(article.description, "Descrição não informado")
            existOrError(article.categoryId, "Categoria não informada")
            existOrError(article.userId, "Autor não informado")
            existOrError(article.content, "Conteudo não informado")
        } catch (msg) {
           return res.status(400).send(msg)
        }

        if (article.id) {
            app.db("articles")
                .update(article)
                .where({ id: article.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db("articles")
                .insert(article)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db("articles") // rowsDeleted retorna as linhas que sofreram alteração (as que foram excluidas)
                .where({ id: req.params.id }).del()

            try {
                existOrError(rowsDeleted, "Artigos não foi encontrado") // comparar para ver se houveram linhas modificadas, caso contrario o artigo não existe
            } catch (msg) {
                return res.status(400).send(msg)
            }

            res.status(204).send()
        } catch (msg) {
            res.status(500).send(msg)
        }
    }

    const limit = 2
    const get = async (req, res) => {
        const page = req.query.page || 1

        const result = await app.db("articles").count("id").first() // pega a quantidade de registros da base
        const count = result["count(`id`)"] // converte em int a quantidade retornada

        app.db("articles")
            .select("id", "name", "description")
            .limit(limit).offset(page * limit - limit) // offset a entender
            .then(articles => res.json({data: articles, quant: Math.ceil(count / limit)})) // retorna a lista dos artigos, a quantidade deles, e o limite
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db("articles")
            .where({ id: req.params.id })
            .first()
            .then(article => {
                article.content = article.content.toString() //converte os artigos de binario pra string
                return res.json(article)
            })
            .catch(err => res.status(500).send(err))
    }

    const getByCategory = async (req, res) => {
        const categoryId = req.params.id
        const page = req.query.page || 1
         const categories = await app.db.raw(queries.categoryWithChildren, categoryId)
         const ids = categories[0].map(c => c.id)

        app.db({a: 'articles', u: 'users'})
            .select('a.id', 'a.name', 'a.description', 'a.imageUrl', { author: 'u.name' })
            .limit(limit).offset(page * limit - limit)
            .whereRaw('?? = ??', ['u.id', 'a.userId'])
            .whereIn('categoryId', ids)
            .orderBy('a.id', 'desc')
            .then(articles => res.json(articles))
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, get, getById, getByCategory }

}