export const state = {
    detail: [],
};

export const getters = {
    detail: state => state.detail,
};

export const mutations = {
    setTask(state, newValue) {
        state.detail = newValue
    },
};

export const actions = {
    async setTaskDetail({ commit }, data) {
        commit('setTask', data)
    },
};
