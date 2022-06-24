import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const state = {
    improveIndex:true
}
const actions = {

}

const mutations = {
    setIndex(state){
        state.improveIndex = false
    }
}

const getters = {

}

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
})