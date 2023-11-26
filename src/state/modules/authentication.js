import { postDataApi } from "../../api/fetchAPI";

export const state = {
    auth: [],
};

export const getters = {
    auth: state => state.auth,
};

export const mutations = {
    setAuth(state, newValue) {
        state.auth = newValue
    },
};

export const actions = {
    fetchAuthen({ commit }, { data }) {
        const result = postDataApi('auth/login', data)

        console.log('auth', result);
        commit('setAuth', result.data)
    },
};
