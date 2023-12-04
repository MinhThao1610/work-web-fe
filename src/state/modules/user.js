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
    fetchUsers({ commit, rootState }) {
        const dataUser = mockUsers.map(x => ({
            ...x,
            check: (rootState.task.tasks.filter(y => y.owner_id === x.id) ?? []).length > 0
        }))
        .sort((a, b) => (a.check === b.check) ? 0 : a.check ? -1 : 1);

        commit('setUsers', dataUser);

        localStorage.setItem('users', JSON.stringify(dataUser));
    }
};
