import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import {ApolloServer} from "apollo-server-express"
import faker from 'faker/locale/ko'
import _ from 'lodash'
import typeDefs from './graphql/schema'
import resolvers from './graphql/resolvers'

import models, {sequelize} from "./models"

const app = express()
app.use(cors());

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        models,
    },
    engine: {
        apiKey: process.env.ENGINE_API_KEY,
    },
})

server.applyMiddleware({app, path: '/graphql'})

let argv = process.argv[process.argv.length - 1]
let argvSplit = argv.split('=')
let promise

// migration
if (argvSplit[0] === '--migration' && argvSplit[1] === 'true') {
    promise = sequelize.sync({
        force: true // true -> 전체 테이블 삭제 후 재생성
    })
        .then(() => {
            models.Team.bulkCreate(
                _.times(10, () => ({
                    name: faker.internet.userName(),
                }))
            ).then(() => {
                const TRIBE_LIST = ['terran', 'zerg', 'protoss', 'random']
                const TIER_LIST = ['triple', 'minor', 'major', 'challenger']

                models.User.bulkCreate(
                    _.times(10, () => ({
                        name: `${faker.name.firstName()}${faker.random.number()}`,
                        tribe: _.sample(TRIBE_LIST),
                        tier: _.sample(TIER_LIST),
                        teamId: _.random(1, 10),
                    }))
                )
            })
        })
} else {
    promise = sequelize.sync()
}

promise.then(() => {
    app.listen({port: 8000}, () => {
        console.log(`🚀Graphql Server Running: http://localhost:8000/graphql`)
    })
})
