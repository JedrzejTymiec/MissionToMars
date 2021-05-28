import axios from "axios";

export const state = () => ({
    manifests: [],
    loading: true,
    called: false
})

export const actions = {
    async getManifests({commit}) {
        const res = await axios.get("/api/manifest")

        commit("setManifests", res.data)
    }
}

export const mutations = {
    manifestCalled: (state) => {
        state.called = true
    },

    setManifests: (state, manifests) => {
        state.manifests = manifests
        state.loading = false
    }
}