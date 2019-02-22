import * as types from './mutation-type'
const mutations ={
    [types.SET_CHEATER](state,cheater){
        state.cheater=cheater
    },
    [types.submitComment](state,comment){
        state.comment=comment
    },
    [types.SET_CONTENT](state,content){
        state.content=content
    }

    // showHeader(state){
    //     state.header=true
    // },
    // hideHeader(state){
    //     state.header=false
    // }
};
export default mutations