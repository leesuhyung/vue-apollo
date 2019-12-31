import Vue from 'vue'
import VueApollo from 'vue-apollo'
import ApolloClient from 'apollo-boost'

const apolloProvider = new ApolloClient({
    uri: 'http://localhost:8000/graphql'
})

Vue.use(VueApollo)

export default new VueApollo({
    defaultClient: apolloProvider
})

