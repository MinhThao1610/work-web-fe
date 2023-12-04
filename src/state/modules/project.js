import { mockProjects, mockProject } from '../mockdata/projects';
import MethodService from "../../service/MethodService";

export const state = {
    projects: [],
};

export const getters = {
    projects: state => state.projects,
};

export const mutations = {
    setProjects(state, value) {
        state.projects = value;
    },
};

export const actions = {
    fetchProjects({ commit }) {
        commit('setProjects', mockProjects);

        localStorage.setItem('projects', JSON.stringify(mockProjects));
    },
    addProject({ commit, state }, data) {
        const projects = MethodService.copyObject(state.projects);
        projects.unshift({
            ...mockProject,
            ...data
        });

        commit('setProjects', projects);

        localStorage.setItem('projects', JSON.stringify(projects));
    },
    editProject({ commit, state }, data) {
        const projects = MethodService.copyObject(state.projects);
        const objIdx = projects.findIndex(x => x.id === data.id);

        projects[objIdx] = {
            ...projects[objIdx],
            ...data
        }

        commit('setProjects', projects);

        localStorage.setItem('projects', JSON.stringify(projects));
    },
    deleteProject({ commit, state }, id) {
        const projects = MethodService.copyObject(state.projects);
        const objIdx = projects.findIndex(x => x.id === id);

        projects.splice(objIdx, 1);

        commit('setProjects', projects);

        localStorage.setItem('projects', JSON.stringify(projects));
    }
};
