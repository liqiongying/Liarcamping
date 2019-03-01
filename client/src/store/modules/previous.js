// import * as types from "../mutation-type";
const types={
    SET_CHEATER : 'SET_CHEATER',
    submitComment :'submitComment',
    SET_CONTENT:'SET_CONTENT'
}
const state = () => ({
    cheater:{},
    comment:{},
    content:{}
})
const actions = {}

const mutations = {
    [types.SET_CHEATER](state, cheater) {
        state.cheater = cheater
    },
    [types.submitComment](state, comment) {
        state.comment = comment
    },
    [types.SET_CONTENT](state, content) {
        state.content = content
    }
}

const getters = {
    ['cheatercomment'](state) {
        return state.cheater
    },
    ['content'](state) {
        return state.content
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}
