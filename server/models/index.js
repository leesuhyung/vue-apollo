import {Sequelize} from "sequelize"

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD, {
        host: process.env.DATABASE_HOST,
        dialect: 'mysql'
    })

const models = {
    User: sequelize.import('./user'),
    Team: sequelize.import('./team'),
}

Object.keys(models).forEach(k => {
    if ('associate' in models[k]) {
        models[k].associate(models)
    }
})

export {sequelize}
export default models
