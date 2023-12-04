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
        const dataUser = mockUsers.sort((a, b) => (a.check === b.check) ? 0 : a.check ? -1 : 1);

        commit('setUsers', dataUser);

        localStorage.setItem('users', JSON.stringify(dataUser));
    }
};
