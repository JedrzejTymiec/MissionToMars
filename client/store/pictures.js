import axios from "axios";

export const state = () => ({
    photos: [],
    loading: true,
    currentSol: null
})

export const actions = {
    async getSpiritBySol({ commit }, sol) {
        const res = await axios.get(`/api/photos/sol/spirit/${sol}`)

        commit("setPictures", res.data.photos)
        commit("setSol", sol)
    },

    async getOpportunityBySol({ commit }, sol) {
        const res = await axios.get(`/api/photos/sol/opportunity/${sol}`)

        commit("setPictures", res.data.photos)
        commit("setSol", sol)
    },

    async getCuriosityBySol({ commit }, sol) {
        const res = await axios.get(`/api/photos/sol/curiosity/${sol}`)

        commit("setPictures", res.data.photos)
        commit("setSol", sol)
    },

    async spiritFilter({ commit }, { sol, cam }) {
        const res = await axios.get(`/api/photos/sol/spirit/${sol}/${cam}`)
        console.log(`/api/photos/sol/spirit/${sol}/${cam}`)
        console.log("action")
        console.log(res)
        commit("setPictures", res.data.photos)
        commit("setSol", sol)
    },

    async opportunityFilter({ commit }, sol) {
        const res = await axios.get(`/api/photos/sol/opportunity/${sol}`)

        commit("setPictures", res.data.photos)
        commit("setSol", sol)
    },

    async curiosityFilter({ commit }, sol) {
        const res = await axios.get(`/api/photos/sol/curiosity/${sol}`)

        commit("setPictures", res.data.photos)
        commit("setSol", sol)
    },
}

export const mutations = {
    setPictures: (state, pics) => {
        console.log("mutation")
        state.photos = pics
        state.loading = false
    },

    removePictures: (state) => {
        state.photos = []
        state.loading = true
    },

    setSol: (state, sol) => {
        state.currentSol = sol
    }

    
}