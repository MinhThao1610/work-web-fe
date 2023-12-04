import { mockTasksData, mockTaskData } from '../mockdata/tasks';
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

        localStorage.setItem('tasks', JSON.stringify(mockTasksData));
    },
    setTaskDetail({ commit }, data) {
        commit('setTaskDetail', data)
    },
    addTask({ commit, state }, data) {
        const tasks = MethodService.copyObject(state.tasks);
        tasks.unshift({
            ...mockTaskData,
            ...data
        });

        console.log({
            ...mockTaskData,
            ...data
        })

        commit('setTasks', tasks);

        localStorage.setItem('tasks', JSON.stringify(tasks));
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

        localStorage.setItem('tasks', JSON.stringify(tasks));
    },
    deleteTask({ commit, state }, id) {
        const tasks = MethodService.copyObject(state.tasks);
        const objIdx = tasks.findIndex(x => x.id === id);

        tasks.splice(objIdx, 1);

        commit('setTasks', tasks);

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
};
