import {
    SHOW_SIGN_UP_FORM,
    USER_DATA_LOAD,
    SHOW_SIGN_IN_FORM,
    SHOW_INFO_MODAL,
    SHOW_EDIT_MODAL,
    UPDATE_USER_DATA,
    SAVE_USER_DATA,
    IMAGE_UPLOAD_MODAL,
    DATA_LOADED,
    SHOW_SUPER_USER_BOARD,
    ERASE_USER_DATA
} from '../common/constants'

const initialState = {
    showSignInForm: true,
    showSignUpForm: false,
    showInformationModal: false,
    informationModalBody: null,
    dataIsLoaded: false,
    uId: null,
    name: null,
    smth:null,
    age: null,
    avatar: null,
    temporaryAge: '',
    temporaryName: '',
    editModalEditedField: null,
    showEditModal: false,
    showUploadImageModal: false,
    avatarForUpload: null,
    users: [],
    isAdmin: false,
    isShowSuperUserBoard: false,
    isAccountDisabled: false
};

export default function applicationReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case USER_DATA_LOAD: {
            return {
                ...state,
                temporaryAge: '',
                temporaryName: '',
                editModalEditedField: null,
                ...payload
            }
        }
        case SHOW_SIGN_UP_FORM: {
            return {
                ...state,
                showSignUpForm: payload
            }
        }
        case SHOW_SIGN_IN_FORM: {
            return {
                ...state,
                showSignInForm: payload
            }
        }
         case SHOW_INFO_MODAL: {
            return {
                ...state,
                showInformationModal: payload.show,
                informationModalBody: payload.message
            }
        }
        case SHOW_EDIT_MODAL: {
            return {
                ...state,
                showEditModal: payload.show,
                editModalEditedField: payload.message
            }
        }
        case UPDATE_USER_DATA: {
            return {
                ...state,
                ...payload
            }
        }
        case SAVE_USER_DATA: {
            return {
                ...state,
                showEditModal: false
            }
        }
        case IMAGE_UPLOAD_MODAL: {
            return {
                ...state,
                showUploadImageModal: payload,
                avatarForUpload: null
            }
        }
        case DATA_LOADED: {
            return {
                ...state,
                dataIsLoaded: payload
            }
        }
        case SHOW_SUPER_USER_BOARD: {
            return {
                ...state,
                isShowSuperUserBoard: payload
            }
        }
        case ERASE_USER_DATA: {
            return {
                ...state,
                ...initialState
            }
        }
        default:
            return state
    }
}