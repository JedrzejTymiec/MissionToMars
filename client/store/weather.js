import axios from 'axios'

export const state = () => ({
    weathers: []
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
    }
};
