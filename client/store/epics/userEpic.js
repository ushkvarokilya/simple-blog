import {
    SIGN_UP,
    SIGN_IN,
    USER_DATA_LOAD,
    USER_DATA_CHANGE,
    SHOW_SIGN_UP_FORM,
    SHOW_SIGN_IN_FORM,
    SHOW_EDIT_MODAL,
    ERASE_FORM_DATA,
    SHOW_INFO_MODAL,
    CHECK_TOKEN,
    UPDATE_USER_DATA,
    GET_ALL_POSTS,
    // SAVE_POST_TO_BLOG,
    SAVE_USER_DATA,
    SIGN_OUT,
    UPLOAD_AVATAR,
    IMAGE_UPLOAD_MODAL,
    DATA_LOADED,
    CHANGE_USER_STATUS,
    ERASE_USER_DATA,
    SHOW_POST_MODAL,
    ADD_NEW_POST,
    LOAD_ALL_POSTS,
    DELETE_POST
} from '../../common/constants'
import { combineEpics } from 'redux-observable'
import { createAction } from '../../utils/createAction'
import { Observable } from 'rxjs/Rx'
import { routerMiddleware, push } from 'react-router-redux'

const showSignUpFormEpic = (action$, storeAPI$) => action$.ofType(SHOW_SIGN_UP_FORM)
    .mergeMap(action => {
        return [
            createAction(SHOW_SIGN_IN_FORM)(!action.payload),
            createAction(ERASE_FORM_DATA)()
        ]
    })


const signUpEpic = (action$, storeAPI$) => action$.ofType(SIGN_UP)
    .mergeMap(() => {
        const { name, password } = storeAPI$.getState().authorizationReducer

        return Observable.from(fetch('api/1/users/registration', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, password })
        }).then(response => response))
            .mergeMap(response => {
                const responseSuccess = response.status === 200
                return Observable.from(response.json().then(data => data))
                    .mergeMap(response => {
                        const { message } = response
                        const modalData = {
                            show: true,
                            message
                        }
                        const arrayOfActions = [createAction(ERASE_FORM_DATA)(), createAction(SHOW_INFO_MODAL)(modalData)]
                        if (responseSuccess) {
                            arrayOfActions.push(createAction(SHOW_SIGN_UP_FORM)(false))
                        }
                        return arrayOfActions
                    })
            })
    })

const signInEpic = (action$, storeAPI$) => action$.ofType(SIGN_IN)
    .mergeMap(() => {
        const { name, password } = storeAPI$.getState().authorizationReducer

        return Observable.from(fetch('api/1/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, password })
        }).then(response => response))
            .mergeMap(response => {
                const responseSuccess = response.status === 200
                return Observable.from(response.json().then(data => data))
                    .mergeMap(response => {
                        const arrayOfActions = [createAction(ERASE_FORM_DATA)()]
                        if (responseSuccess) {
                            const { token } = response
                            localStorage.setItem('jwtToken', token);
                            storeAPI$.dispatch(push('dashboard'))
                            arrayOfActions.push(createAction(SHOW_SIGN_UP_FORM)(false))
                            return arrayOfActions
                        }

                        const { message } = response
                        const modalData = {
                            show: true,
                            message
                        }
                        arrayOfActions.push(createAction(SHOW_INFO_MODAL)(modalData))
                        return arrayOfActions
                    })
            })
    })

const checkToken = (action$, storeAPI$) => action$.ofType(CHECK_TOKEN)
    .mergeMap(action => {
        const token = localStorage.getItem('jwtToken')
        return Observable.from(fetch(`api/1/users/check/${token}`, {
            method: 'GET'
        }).then(response => response))
            .mergeMap(response => {
                const responseSuccess = response.status === 200
                return Observable.from(response.json().then(data => data))
                    .mergeMap(response => {
                        const isDashboard = action.payload
                        const arrayOfActions = [createAction(ERASE_FORM_DATA)()]
                        if (responseSuccess) {
                            if (!isDashboard) {
                                storeAPI$.dispatch(push('dashboard'))
                            }
                            arrayOfActions.push(createAction(USER_DATA_LOAD)(response))
                            return arrayOfActions
                        }

                        if (!isDashboard) {
                            storeAPI$.dispatch(push('/'))
                            return arrayOfActions
                        }

                        const { message } = response
                        const modalData = {
                            show: true,
                            message
                        }
                        storeAPI$.dispatch(push('/'))
                        arrayOfActions.push(createAction(SHOW_INFO_MODAL)(modalData))
                        return arrayOfActions
                    })
            })
    })

const addNewPost = (action$, storeAPI$) => action$.ofType(ADD_NEW_POST)
    .mergeMap(action => {
        const arrayOfActions = [createAction(SHOW_POST_MODAL)({ show: false })];
        const title = storeAPI$.getState().blogReducer.temporaryPostTitle
        const text = storeAPI$.getState().blogReducer.temporaryPostData
        const uId = storeAPI$.getState().applicationReducer.uId
        return Observable.from(fetch(`api/1/posts`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, uId, text })
        }).then(response => response))
            .mergeMap(response => {
                arrayOfActions.push(createAction(GET_ALL_POSTS)())
                return arrayOfActions
            })
    })

const getAllUserPosts = (action$, storeAPI$) => action$.ofType(GET_ALL_POSTS)
    .mergeMap(action => {
        const uId = storeAPI$.getState().applicationReducer.uId
        return Observable.from(fetch(`api/1/posts/${uId}`, {
            method: 'GET'
        }).
        then(response => response))
        .mergeMap(response => {
            const responseSuccess = response.status === 200
            return Observable.from(response.json().then(data => data))
                .mergeMap(response => {
                    return [createAction(LOAD_ALL_POSTS)(response)];
                })
        })
    })

const deletePost = (action$, storeAPI$) => action$.ofType(DELETE_POST)
    .mergeMap(action => {
        const _id = action.payload
        
        return Observable.from(fetch(`api/1/posts/${_id}`, {
            method: 'DELETE',
        }).then(response => response))
        .mergeMap(response => {
            return [createAction(GET_ALL_POSTS)()];
        })
    })    

const saveUserData = (action$, storeAPI$) => action$.ofType(SAVE_USER_DATA)
    .mergeMap(action => {
        const token = localStorage.getItem('jwtToken')
        const update = action.payload
        const uId = storeAPI$.getState().applicationReducer.uId

        return Observable.from(fetch(`api/1/users`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token, uId, update })
        }).then(response => response))
            .mergeMap(response => {
                const responseSuccess = response.status === 200
                return Observable.from(response.json().then(data => data))
                    .mergeMap(response => {
                        if (responseSuccess) {
                            return [createAction(USER_DATA_LOAD)(response)]
                        }

                        const { message } = response
                        const modalData = {
                            show: true,
                            message
                        }
                        return [createAction(SHOW_INFO_MODAL)(modalData)]
                    })
            })
    })

const signOut = (action$, storeAPI$) => action$.ofType(SIGN_OUT)
    .mergeMap(() => {
        localStorage.clear()
        storeAPI$.dispatch(push('/'))
        return [createAction(ERASE_FORM_DATA)(), createAction(ERASE_USER_DATA)()]
    })

const uploadAvatar = (action$, storeAPI$) => action$.ofType(UPLOAD_AVATAR)
    .mergeMap(() => {
        const update = { avatar: storeAPI$.getState().applicationReducer.avatarForUpload }
        return [createAction(IMAGE_UPLOAD_MODAL)(false), createAction(SAVE_USER_DATA)(update)]
    })

const dataIsLoaded = (action$, storeAPI$) => action$.ofType(USER_DATA_LOAD)
    .map(() => createAction(DATA_LOADED)(true))



const changeUserStatus = (action$, storeAPI$) => action$.ofType(CHANGE_USER_STATUS)
    .mergeMap(action => {
        const token = localStorage.getItem('jwtToken')
        const { _id, status } = action.payload

        return Observable.from(fetch(`api/1/users/activation`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token, _id, status })
        }).then(response => response))
            .mergeMap(response => {
                const responseSuccess = response.status === 200
                return Observable.from(response.json().then(data => data))
                    .mergeMap(response => {
                        if (responseSuccess) {
                            return [createAction(USER_DATA_LOAD)(response)]
                        }

                        const { message } = response
                        const modalData = {
                            show: true,
                            message
                        }
                        return [createAction(SHOW_INFO_MODAL)(modalData)]
                    })
            })
    })

export default combineEpics(
    signInEpic,
    showSignUpFormEpic,
    addNewPost,
    signUpEpic,
    checkToken,
    saveUserData,
    signOut,
    uploadAvatar,
    dataIsLoaded,
    changeUserStatus,
    getAllUserPosts,
    deletePost
)