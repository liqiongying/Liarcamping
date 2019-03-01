import Vue from 'vue'
import Vuex from 'vuex'
import search from './modules/search'
import previous from './modules/previous'
// import * as actions from './actions'
// import * as getters from './getters'
//
//
// import state from './state'
// import mutations from './mutation'
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex);

const debug =process.env.NODE_ENV!=='production';
export default new Vuex.Store({
    modules:{
      search:{
          modules: {
              search:search
          }
      },
        previous: {
            modules: {
                previous:previous
            }
        }
    },
    // actions,
    // getters,
    // state,
    // mutations,
    strict:debug,
    plugins:debug ? [createLogger()]:[]
})
