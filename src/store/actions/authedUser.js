import * as actionType from './actionTypes'

export const setAuthedUser = (id) => {
    return {
        type: actionType.SET_AUTHED_USER,
        id
    }
}