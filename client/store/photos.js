export const state = () => ({
    list: [],
    photo: {},
    loading: true,
    photoLoad: true,
    errorMsg: ""
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
    },

    errorPhoto: (state, error) => {
        state.error = error,
        state.loading = false
    }
}