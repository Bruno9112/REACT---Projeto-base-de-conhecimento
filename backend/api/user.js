const bcrypt = require("bcrypt-nodejs")

module.exports = app => {

    const { existOrError, notExistsOrError, equalsOrError } = app.api.validation

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt) // gera o hash do password
    }

    const save = async (req, res) => {
        const user = { ...req.body }
        if (req.params.id) user.id = req.params.id

        if (!req.originalUrl.startsWith("/users")) user.admin = false
        if (!req.user || !req.user.admin) user.admin = false

        try {
            existOrError(user.name, "Nome não informado")
            existOrError(user.email, "Email não informado")
            if (!user.id) {
                existOrError(user.password, 'Senha não informada')
                existOrError(user.confirmPassword, 'Confirmação de senha não informada')
                equalsOrError(user.password, user.confirmPassword, 'Senhas não conferem')
            } else {
                if (user.password || user.confirmPassword) {
                    existOrError(user.password, 'Senha não informada')
                    existOrError(user.confirmPassword, 'Confirmação de senha não informada')
                    equalsOrError(user.password, user.confirmPassword, 'Senhas não conferem')
                }
            }

            const userFromDB = await app.db("users")
                .where({ email: user.email }).first()
            if (!user.id) {
                notExistsOrError(userFromDB, "Usuario já cadastrado")
            }
        } catch (msg) {
            return res.status(400).send(msg)
        }
        user.password = encryptPassword(user.password)
        delete user.confirmPassword

        if (user.id) {
            app.db("users")
                .update(user)
                .where({ id: user.id })
                .whereNull("deletedAt")
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db("users")
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const limit = 3
    const get = async (req, res) => {
        if (req.query.page) {
            const page = req.query.page || 1

            const result = await app.db("users").count("id").whereNull("deletedAt").first() // pega a quantidade de registros da base
            const count = result["count(`id`)"] // converte em int a quantidade retornada

            app.db("users")
                .select("id", "name", "email", "admin")
                .whereNull("deletedAt")
                .limit(limit).offset(page * limit - limit)
                .then(users => res.json({ users: users, quant: Math.ceil(count / limit) }))
                .catch(err => res.status(500).send(err))
        } else {
            app.db("users")
                .select("id", "name", "email", "admin")
                .whereNull("deletedAt")
                .then(users => res.json(users))
                .catch(err => res.status(500).send(err))
        }
    }

    const getById = (req, res) => {
        app.db("users")
            .select("id", "name", "email", "admin")
            .where({ id: req.params.id })
            .whereNull("deletedAt")
            .first()
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const articles = await app.db("articles")
                .where({ userId: req.params.id })
            notExistsOrError(articles, "Usuário possui artigos.")

            const rowsUpdate = await app.db("users")
                .update({ deletedAt: new Date() })
                .where({ id: req.params.id })
            existOrError(rowsUpdate, "Usuário não foi encontrado.")

            res.status(204).send()
        } catch (msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getById, remove }
}