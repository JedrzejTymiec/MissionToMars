export const state = () => ({
    apod: {},
    loading: true
});

export const mutations = {
    getApod: (state, apod) => {
        state.apod = apod[0]
        state.loading = false
    },
    clearApod: (state) => {
        state.apod = {}
        state.loading = true
    }
}