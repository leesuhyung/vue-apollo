import {Op} from "sequelize";

const resolvers = {
    Query: {
        users: async (_, args, {models}) => {
            return models.User.findAll({
                where: args.hasOwnProperty('name')
                    ? {name: {[Op.like]: `%${args.name}%`}}
                    : args,
                include: [{model: models.Team}]
            });
        },
        teams: async (_, args, {models}) => {
            return models.Team.findAll({
                where: args,
                include: [{model: models.User}]
            })
        },
        user: async (_, {id}, {models}) => {
            return models.User.findByPk(id, {include: [{model: models.Team}]});
        },
        team: async (_, {id}, {models}) => {
            return models.Team.findByPk(id, {include: [{model: models.User}]})
        }
    },

    Mutation: {
        createUser: async (_, {name, teamId}, {models}) => {
            const team = await models.Team.findByPk(teamId)
            if (teamId && !team) {
                throw new Error(`The team with ID: ${teamId} does not exist.`)
            }

            try {
                return await models.User.create({
                    name,
                    teamId,
                }, {
                    include: [{model: models.Team}]
                }).then(user => user.reload())
            } catch (e) {
                throw new Error(e)
            }
        },
        updateUser: async (_, {id, name, teamId}, {models}) => {
            /*try {
                return await models.User.findByPk(id, {
                    include: [{model: models.Team}]
                }).then(async (user) => {
                    if (!user) {
                        throw new Error(`The user with ID: ${id} does not exist.`)
                    }

                    await models.User.update({
                        name,
                        teamId,
                    }, {
                        where: {id},
                    })

                    return user
                })
            } catch (e) {
                throw new Error(e)
            }*/

            return models.User.update({
                name,
                teamId,
            }, {
                where: {id},
            });
        },
        deleteUser: async (_, {id}, {models}) => {
            return models.User.destroy({where: {id}})
        },
        createTeam: async (_, {name, emblem}, {models}) => {
            try {
                return await models.Team.create({
                    name,
                    emblem
                }, {
                    include: [{model: models.User}]
                }).then(team => team.reload())
            } catch (e) {
                throw new Error(e)
            }
        },
        updateTeam: async (_, {id, name, emblem}, {models}) => {
            return models.Team.update({
                name,
                emblem,
            }, {
                where: {id},
            });
        },
        deleteTeam: async (_, {id}, {models}) => {
            return models.Team.destroy({where: {id}})
        },
    }
}

export default resolvers

