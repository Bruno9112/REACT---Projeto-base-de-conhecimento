const schedule = require("node-schedule")

module.exports = app => {

    schedule.scheduleJob("*/1 * * * *", async function () {
        const usersCount = await app.db("users").count("id").first()
        const categoriesCount = await app.db("categories").count("id").first()
        const articlesCount = await app.db("articles").count("id").first()

        const { Stat } = app.api.stat

        const lastStat = await Stat.findOne({}, {}, { sort: { "creatdAt": -1 } })

        const stat = new Stat({
            users: usersCount['count(`id`)'],
            categories: categoriesCount['count(`id`)'],
            articles: articlesCount['count(`id`)'],
            createdAt: new Date()
        })

        const changeUsers = !lastStat || stat.users !== lastStat.users
        const changeCategories = !lastStat || stat.categories !== lastStat.categories
        const changeArticles = !lastStat || stat.articles !== lastStat.articles

        if (changeUsers || changeCategories || changeArticles) {
            stat.save().then(() => console.log("[Stats] Estatísticas Atualizadas!"))
        }
    })
}