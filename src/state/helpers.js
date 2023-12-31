import { mapState, mapGetters, mapActions } from 'vuex'

export const authComputed = {
  ...mapState('auth', {
    currentUser: (state) => state.currentUser,
  }),
  ...mapGetters('auth', ['loggedIn']),
}

export const layoutComputed = {
  ...mapState('layout', {
    layoutType: (state) => state.layoutType,
    sidebarSize: (state) => state.sidebarSize,
    layoutWidth: (state) => state.layoutWidth,
    topbar: (state) => state.topbar,
    mode: (state) => state.mode,
    position: (state) => state.position,
    sidebarView: (state) => state.sidebarView,
    sidebarColor: (state) => state.sidebarColor
  })
}

export const authMethods = mapActions('auth', ['logIn', 'logOut', 'register', 'resetPassword'])

export const layoutMethods = mapActions('layout', 
['changeLayoutType', 'changeLayoutWidth', 'changeSidebarSize', 'changeTopbar', 'changeMode', 'changePosition', 'changeSidebarView',
 'changeSidebarColor'])

export const authFackMethods = mapActions('authfack', ['login', 'registeruser', 'logout'])

export const notificationMethods = mapActions('notification', ['success', 'error', 'clear'])

export const todoComputed = {
  ...mapState('todo', {
    todos: (state) => state.todos
  })
}
export const todoMethods = mapActions('todo', ['fetchTodos'])

// Authentication store => Danh sách các methods và các computed để sử dụng trong store. Import vào component vue và sử dụng tương tự như 1 computed và method bình thường
export const authenticationMethods = mapActions('authentication', ['fetchAuthen'])
export const authenticationComputed = {
  ...mapState('authentication', {
    auth: (state) => state.auth,
  })
}

// Projects store
export const projectMethods = mapActions('project', ['setProjects'])
export const projectComputed = {
  ...mapState('project', {
    projects: (state) => state.projects,
  })
}

// Testplans store
export const testplanMethods = mapActions('testplan', ['setTestplans'])
export const testplanComputed = {
  ...mapState('testplan', {
    testplans: (state) => state.testplans,
  })
}

// Tasks store
export const taskMethods = mapActions('task', ['setTasks', 'setTaskDetail'])
export const taskComputed = {
  ...mapState('task', {
    tasks: (state) => state.tasks,
  })
}

// Users store
export const userMethods = mapActions('user', ['setUsers'])
export const userComputed = {
  ...mapState('user', {
    users: (state) => state.users,
  })
}