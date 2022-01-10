require('dotenv').config()
const passportJwt = require("passport-jwt")
const passport = require("passport")
const { Strategy, ExtractJwt } = passportJwt

module.exports = app => {
    const params = {
        secretOrKey: process.env.SIGNIN_TOKEN,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const strategy = new Strategy(params, (payload, done) => {
        app.db("users")
            .where({ id: payload.id })
            .first()
            .then(user => done(null, user ? {...payload} : false))
            .catch(err => done(err, false))
    })

    passport.use(strategy)

    return {
        authenticate: () => passport.authenticate("jwt", { session: false })
    }
}