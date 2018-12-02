import Vue from 'vue'
import App from './App.vue'
import './css/bootstrap.min.css'
import './js/jquery.min.js'
import './js/bootstrap.min.js'


Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')
