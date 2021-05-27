import axios from 'axios'

export const state = () => ({
    apod: {},
    loading: true
});

export const actions = {
    async getApodByDate({commit}, date) {
        const res = await axios.get(`/api/apod/${date}`)

        commit("setApod", res.data)
    },

    async getLastApod({commit}) {
        const res = await axios.get(`/api/apod/`)

        commit("setApod", res.data)
    }
};

export const mutations = {
    setApod: (state, apod) => {
        state.apod = apod
        state.loading = false
    }
};
