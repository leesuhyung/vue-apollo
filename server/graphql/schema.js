import {gql} from 'apollo-server-express'

const typeDefs = gql`
  type Query {
    users(name: String): [User]
    user(id: ID!): User
    teams: [Team]
    team(id: ID!): Team
  }

  type User {
    id: ID!
    team: Team
    name: String!
    createdAt: String
    updatedAt: String
  }

  type Team {
    id: ID!
    users: [User]
    name: String!
    createdAt: String
    updatedAt: String
  }

  type Mutation {
    createUser(name: String!, teamId: ID): User!
    updateUser(id: ID!, name: String, teamId: ID): [Int!]!
    deleteUser(id: ID!): Int!
    createTeam(name: String!): Team!
    updateTeam(id: ID!, name: String!): [Int!]!
    deleteTeam(id: ID!): Int!
  }
`

module.exports = typeDefs
