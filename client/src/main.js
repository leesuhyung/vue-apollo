import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import apolloProvider from './plugins/apollo-provider'
import * as _ from 'lodash'

Vue.config.productionTip = false
Vue.mixin({
    computed: {
        _: () => _,
    }
})

new Vue({
    router,
    store,
    vuetify,
    apolloProvider,
    render: h => h(App)
}).$mount('#app')
