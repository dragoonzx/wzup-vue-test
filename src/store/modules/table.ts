import TableService from '@/services/TableService'

export const namespaced = true

type User = {
  id?: number;
  fullname?: string;
  company?: string;
  email?: string;
  uname?: string;
  address?: object;
}

interface State {
  info: Array<User>;
  user: User;
}

export const state: State = {
  info: [],
  user: {}
}

export const mutations = {
  SET_INFO (state: State, info: Array<User>) {
    state.info = info
  },
  SET_USER (state: State, userInfo: User) {
    state.user = userInfo
  }
}

export const actions = {
  fetchInfo ({ commit, dispatch, state }: any) {
    return TableService.getInfo()
      .then(response => {
        commit('SET_INFO', response.data)
      })
      .catch(error => {
        // ADD ERROR NOTIFICATION HANDLING FOR ERROR CASES
        console.log(error)
      })
  }
  // TODO: Add action fetchUserInfo for modal
}
