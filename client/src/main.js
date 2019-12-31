import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import apolloProvider from './plugins/apollo-provider'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    vuetify,
    apolloProvider,
    render: h => h(App)
}).$mount('#app')
