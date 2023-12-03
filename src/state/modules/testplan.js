import { mockTestplans, mockTestplan } from '../mockdata/testplans';
import MethodService from "../../service/MethodService";

export const state = {
    testplans: [],
};

export const getters = {
    testplans: state => state.testplans,
};

export const mutations = {
    setTestplans(state, value) {
        state.testplans = value;
    },
};

export const actions = {
    fetchTestplans({ commit }) {
        commit('setTestplans', mockTestplans);
    },
    addTestplan({ commit, state }, data) {
        const testplans = MethodService.copyObject(state.testplans);
        testplans.unshift({
            ...mockTestplan,
            ...data
        });

        commit('setTestplans', testplans);
    },
    editTestplan({ commit, state }, data) {
        const testplans = MethodService.copyObject(state.testplans);
        const objIdx = testplans.findIndex(x => x.id === data.id);

        testplans[objIdx] = {
            ...testplans[objIdx],
            ...data
        }

        commit('setTestplans', testplans);
    },
    deleteTestplan({ commit, state }, id) {
        const testplans = MethodService.copyObject(state.testplans);
        const objIdx = testplans.findIndex(x => x.id === id);

        testplans.splice(objIdx, 1);

        commit('setTestplans', testplans);
    }
};
