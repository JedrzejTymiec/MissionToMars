export const state = () => ({
    list: [],
    loading: true
});

export const mutations = {
    setWeather: (state, weathers) => {
        state.list = weathers
        state.loading = false
    }
}