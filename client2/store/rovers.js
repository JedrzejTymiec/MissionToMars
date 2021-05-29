export const state = () => ({
    list: [],
    loading: true
})

export const mutations = {
    getRovers: (state, rovers) => {
        state.list = rovers,
        state.loading = false
    }
}