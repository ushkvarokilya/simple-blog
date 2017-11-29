import { 
    ADD_NEW_POST,
    SHOW_POST_MODAL,
    SAVE_POST_TO_BLOG,
    UPDATE_POST_DATA,
    GET_ALL_POSTS,
    LOAD_ALL_POSTS,
    DELETE_POST,
    SIGN_OUT,
    SIGN_IN
} from '../common/constants'

const initialState ={
    title: '',
    text: '',
    showPostModal: false,
    temporaryPostData: '',
    temporaryPostTitle: '',
    postsLoaded:false,
    posts:[]
};

export default function blogReducer (state = initialState, action){
    const {type, payload} = action;
    switch (type) {
        case ADD_NEW_POST:{
            return{
                ...state,
                title: payload.title,
                text: payload.text,
                postsLoaded:false
            }
        }
        case SHOW_POST_MODAL: {
            return {
                ...state,
                showPostModal: payload.show,
            }
        }
        case SAVE_POST_TO_BLOG:{
            return {
                ...state,
                showPostModal: false
            }
        }
        case GET_ALL_POSTS:{
            return {
                ...state,
                postsLoaded:false
            }
        }
        case LOAD_ALL_POSTS:{
            return {
                ...state,
                posts: payload.posts,
                postsLoaded: true
            }
        }
        case DELETE_POST:{
            return {
                ...state,
                postsLoaded:false
            }
        }
        case UPDATE_POST_DATA: {
            return {
                ...state,
                ...payload,
            }
        }
        case SIGN_IN:{
            return {
                ...state,
                postsLoaded:true
            }
        }
        case SIGN_OUT:{
            return {
                ...state,
                title: '',
                text: '',
                showPostModal: false,
                temporaryPostData: '',
                temporaryPostTitle: '',
                postsLoaded:false,
                posts:[]
            }
        }
        default:
            return state
    }

}