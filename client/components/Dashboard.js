import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createAction } from '../utils/createAction'
import {
    Button,
    Grid,
    Row,
    Thumbnail,
    Col
} from 'react-bootstrap'
import {
    SIGN_IN,
    SIGN_UP,
    SHOW_SIGN_UP_FORM,
    CHANGE_FORM_DATA,
    SHOW_INFO_MODAL,
    CHECK_TOKEN,
    USER_DATA_LOAD,
    SIGN_OUT,
    SHOW_EDIT_MODAL,
    SHOW_POST_MODAL,
    UPDATE_USER_DATA,
    UPDATE_POST_DATA,
    SAVE_USER_DATA,
    SAVE_POST_TO_BLOG,
    IMAGE_UPLOAD_MODAL,
    UPLOAD_AVATAR,
    SHOW_SUPER_USER_BOARD,
    CHANGE_USER_STATUS,
    GET_ALL_POSTS,
    ADD_NEW_POST,
    DELETE_POST
} from '../common/constants'
import PostBoard from './PostBoard'
import UserBoard from './UserBoard'
import SuperUserBoard from './SuperUserBoard'
import EditModal from './modals/EditModal'
import PostModal from './modals/PostModal'
import ImageUploadModal from './modals/ImageUploadModal'


class Dashboard extends Component {

    componentDidMount() {
        const isDashboard = true
        this.props.checkToken(isDashboard)
    }


    render() {
        const {
            onLogOutClick,
            name,
            age,
            avatar,
            showEditModal,
            showPostModal,
            isShowEditModal,
            isShowPostModal,
            editModalEditedField,
            temporaryAge,
            temporaryName,
            temporaryBlogData,
            temporaryBlogTitle,
            onChangeValue,
            onChangePost,
            onClickSaveEditModal,
            onClickSavePostModal,
            isShowUploadImageModal,
            showImageUploadModal,
            uploadAvatar,
            avatarForUpload,
            dataIsLoaded,
            postsLoaded,
            isAdmin,
            isShowSuperUserBoard,
            showSuperUserBoard,
            users,
            changeUserStatus,
            isAccountDisabled,
            getAllPosts,
            deletePost,
            posts
         } = this.props
        return (
            <div>
                {isShowUploadImageModal && <ImageUploadModal
                    onChangeValue={onChangeValue}
                    uploadAvatar={uploadAvatar}
                    avatarForUpload={avatarForUpload}
                    showImageUploadModal={showImageUploadModal}
                />}
                {isShowEditModal && <EditModal
                    onClickCloseEditModal={showEditModal}
                    onClickSaveEditModal={onClickSaveEditModal}
                    editModalEditedField={editModalEditedField}
                    temporaryAge={temporaryAge}
                    temporaryName={temporaryName}
                    onChangeValue={onChangeValue}
                />}
                {isShowPostModal && <PostModal
                    onClickClosePostModal={showPostModal}
                    onClickSavePostModal={onClickSavePostModal}
                    onChangePost={onChangePost}
                    temporaryBlogData={temporaryBlogData}
                    temporaryBlogTitle={temporaryBlogTitle}
                />}
                {(dataIsLoaded && !isShowSuperUserBoard) && <Grid>
                    <Row>
                    <UserBoard
                        onLogOutClick={onLogOutClick}
                        name={name}
                        age={age ? age : 'No information'}
                        avatar={avatar}
                        showEditModal={showEditModal}
                        showPostModal={showPostModal}
                        showImageUploadModal={showImageUploadModal}
                        isAdmin={isAdmin}
                        showSuperUserBoard={showSuperUserBoard}
                        isAccountDisabled={isAccountDisabled}
                    />
                    <PostBoard
                        getAllPosts={getAllPosts}
                        posts={posts}
                        deletePost={deletePost}
                        postsLoaded={postsLoaded}
                    />
                    </Row>
                </Grid>
                }
                {isShowSuperUserBoard && <SuperUserBoard
                    users={users}
                    showSuperUserBoard={showSuperUserBoard}
                    onLogOutClick={onLogOutClick}
                    changeUserStatus={changeUserStatus}
                />}
            </div>
        )
    }
}

export default connect((store) => {
    return {
        name: store.applicationReducer.name,
        age: store.applicationReducer.age,
        avatar: store.applicationReducer.avatar,
        isShowEditModal: store.applicationReducer.showEditModal,
        isShowPostModal: store.blogReducer.showPostModal,
        editModalEditedField: store.applicationReducer.editModalEditedField,
        temporaryAge: store.applicationReducer.temporaryAge,
        temporaryName: store.applicationReducer.temporaryName,
        temporaryBlogData: store.blogReducer.temporaryBlogData,
        temporaryBlogTitle: store.blogReducer.temporaryBlogTitle,
        isShowUploadImageModal: store.applicationReducer.showUploadImageModal,
        avatarForUpload: store.applicationReducer.avatarForUpload,
        dataIsLoaded: store.applicationReducer.dataIsLoaded,
        postsLoaded: store.blogReducer.postsLoaded,
        isAdmin: store.applicationReducer.isAdmin,
        isShowSuperUserBoard: store.applicationReducer.isShowSuperUserBoard,
        users: store.applicationReducer.users,
        isAccountDisabled: store.applicationReducer.isAccountDisabled,
        posts: store.blogReducer.posts
    }
}, {
        onLogOutClick: createAction(SIGN_OUT),
        checkToken: createAction(CHECK_TOKEN),
        showEditModal: createAction(SHOW_EDIT_MODAL),
        showPostModal: createAction(SHOW_POST_MODAL),
        onChangeValue: createAction(UPDATE_USER_DATA),
        onChangePost: createAction(UPDATE_POST_DATA),
        onClickSaveEditModal: createAction(SAVE_USER_DATA),
        onClickSavePostModal: createAction(ADD_NEW_POST),
        showImageUploadModal: createAction(IMAGE_UPLOAD_MODAL),
        uploadAvatar: createAction(UPLOAD_AVATAR),
        showSuperUserBoard: createAction(SHOW_SUPER_USER_BOARD),
        changeUserStatus: createAction(CHANGE_USER_STATUS),
        getAllPosts: createAction(GET_ALL_POSTS),
        deletePost: createAction(DELETE_POST)
    })(Dashboard)