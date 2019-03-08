import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource'
import VeeValidate from 'vee-validate'
import messages from 'vee-validate/dist/locale/zh_CN'

import { setCookie,getCookie,delCookie } from './assets/js/cookie.js'
import VueLazyload from 'vue-lazyload'
import store from './store'
import Croppa from 'vue-croppa'
import SocialSharing from 'vue-social-sharing'

Vue.use(Croppa)
 Vue.use(SocialSharing)
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
Vue.use(VeeValidate,{
    locale:'zh_CN',
    dictionary:{
        zh_CN:{messages}
    }
});
Vue.use(VueResource);
// import Toastr from 'vue-toastr';
// require('vue-toastr/dist/vue-toastr.css');
//
// Vue.component('vue-toastr',Toastr);
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
