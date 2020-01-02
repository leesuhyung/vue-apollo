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
    tribe: [Tribe]!
    tier: [Tier]!
    createdAt: String
    updatedAt: String
  }

  type Team {
    id: ID!
    users: [User]
    name: String!
    emblem: String
    createdAt: String
    updatedAt: String
  }

  type Mutation {
    createUser(name: String!, teamId: ID, tribe: Tribe!, tier: Tier!): User!
    updateUser(id: ID!, name: String, teamId: ID, tribe: Tribe, tier: Tier): [Int!]!
    deleteUser(id: ID!): Int!
    createTeam(name: String!, emblem: String): Team!
    updateTeam(id: ID!, name: String!, emblem: String): [Int!]!
    deleteTeam(id: ID!): Int!
  }
  
  enum Tribe {
    terran
    zerg
    protoss
    random
  }
  
  enum Tier {
    triple
    minor
    major
    challenger
  }
`

module.exports = typeDefs
