import { mockUsers } from '../mockdata/users';

export const state = {
    users: [],
};

export const getters = {
    users: state => state.users,
};

export const mutations = {
    setUsers(state, value) {
        state.users = value;
    },
};

export const actions = {
    fetchUsers({ commit }) {
        commit('setUsers', mockUsers);
    }
};
