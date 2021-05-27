import axios from 'axios'

export const state = () => ({
    weathers: [],
    loading: true
});

export const actions = {
    async getWeather({ commit }) {
        const res = await axios.get("/api/weather");

        commit("setWeather", res.data)
    }
};

export const mutations = {
    setWeather: (state, weathers) => {
        state.weathers = weathers
        state.loading = false
    }
};
