import axios from "axios";

export const state = () => ({
    manifests: [],
    loading: true
})

export const actions = {
    async getManifests({commit}) {
        const spirit = await axios.get("api/manifest/spirit");
        const opportunity = await axios.get("api/manifest/opportunity");
        const curiosity = await axios.get("api/manifest/curiosity");

        const manifests = [spirit.data.photo_manifest, opportunity.data.photo_manifest, curiosity.data.photo_manifest];

        commit("setManifests", manifests)
    }
}

export const mutations = {
    setManifests: (state, manifests) => {
        state.manifests = manifests
        state.loading = false
    }
}