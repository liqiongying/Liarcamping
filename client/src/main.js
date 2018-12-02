import Vue from 'vue'
import App from './App.vue'
import './assets/css/bootstrap.min.css'
import './assets/css/cheater-index.css'
import './assets/css/cheater-header.css'
import './assets/css/cheater-footer.css'
// import './assets/css/cheater-login.css'
import './assets/js/jquery.min.js'
import './assets/js/bootstrap.min.js'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
