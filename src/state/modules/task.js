import { mockTasksData } from '../mockdata/tasks';
import MethodService from "../../service/MethodService";

export const state = {
    tasks: [],
    detail: {},
};

export const getters = {
    tasks: state => state.tasks,
    detail: state => state.detail,
};

export const mutations = {
    setTasks(state, value) {
        state.tasks = value;
    },
    setTaskDetail(state, value) {
        state.detail = value
    },
};

export const actions = {
    fetchTasks({ commit }) {
        commit('setTasks', mockTasksData);
    },
    setTaskDetail({ commit }, data) {
        commit('setTaskDetail', data)
    },
    addTask({ commit, state }, data) {
        const tasks = MethodService.copyObject(state.tasks);
        tasks.unshift({
            ...mockTasksData,
            ...data
        });

        commit('setTasks', tasks);
    },
    editTask({ commit, state }, data) {
        const tasks = MethodService.copyObject(state.tasks);
        const objIdx = tasks.findIndex(x => x.id === data.id);

        tasks[objIdx] = {
            ...tasks[objIdx],
            ...data
        }

        commit('setTaskDetail', tasks[objIdx]);
        commit('setTasks', tasks);
    },
    deleteTask({ commit, state }, id) {
        const tasks = MethodService.copyObject(state.tasks);
        const objIdx = tasks.findIndex(x => x.id === id);

        tasks.splice(objIdx, 1);

        commit('setTasks', tasks);
    }
};
