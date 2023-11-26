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
    // Action là các hành động được gọi khi muốn thay đổi dữ liệu trong store
    async fetchAuthen({ commit }, data) {
        const result = await postDataApi('auth/login', data);

        console.log('auth', result);

        // Commit => Thực hiện gọi mutations để thay đổi giá trị trong store
        commit('setAuth', result.data)
    },
};
