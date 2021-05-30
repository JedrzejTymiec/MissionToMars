export const state = () => ({
    list: [],
    photo: {},
    loading: true,
    photoLoad: true
})

export const mutations = {
    getPhotos: (state, photos) => {
        state.list = photos
        state.loading = false
    },

    clearPhotos: (state) => {
        state.list = [],
        state.loading = true
    },

    getPhoto: (state, photo) => {
        state.photo = photo,
        state.photoLoad = false
    },

    clearPhoto: (state) => {
        state.photo = {}
    }
}