export const store = () => ({
    list: [],
    loading: true
})

export const mutations = {
    getPhotos: (state, photos) => {
        state.list = photos
        state.loading = false
    },

    clearPhotos: (state) => {
        state.photos = [],
        state.loading = true
    }
}