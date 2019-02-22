import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource'
import VeeValidate from 'vee-validate'
import { setCookie,getCookie,delCookie } from './assets/js/cookie.js'
import VueLazyload from 'vue-lazyload'
import store from './store'

Vue.use(VueLazyload,{
    loading: 'assets/img/sunny.jpg'
});
Vue.prototype.$cookie={
    setCookie,
    getCookie,
    delCookie
};
var hub = new Vue();
export default hub;
Vue.use(VeeValidate);
Vue.use(VueResource);
import './assets/css/bootstrap.min.css'
import './assets/css/cheater-index.css'
import './assets/css/cheater-header.css'
import './assets/css/cheater-footer.css'
import './assets/js/jquery.min.js'
import './assets/js/bootstrap.min.js'
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
    store

}).$mount('#app');
