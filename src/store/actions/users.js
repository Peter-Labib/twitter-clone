import * as actionType from './actionTypes'

export const recieveUsers = (users)=> {
    return {
        type: actionType.RECIEVE_USERS,
        users
    }
}