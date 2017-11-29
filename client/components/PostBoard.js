import React, { Component } from 'react'
import {
    Button,
    Grid,
    Row,
    Thumbnail,
    Col,
    Tooltip,
    OverlayTrigger,
    Jumbotron
} from 'react-bootstrap'
import no_avatar from '../images/noavatar.jpg'
import Post from './Post'
import '../css/Dashboard.css'

class PostBoard extends Component {
    componentDidMount() {
        this.props.getAllPosts();
    }

    render() {
        const {
            posts,
            deletePost,
            postsLoaded
         } = this.props
        const tooltipEdit = (<Tooltip id="dashboard-tooltip">{'Click to edit'}</Tooltip>);
        const listItems = posts.map((post, index) =>
            <li
                key={index}
            >
                {postsLoaded?<Post
                    post={post}
                    deletePost={deletePost}
                />:
                <h1>Loading</h1>
                }
            </li>
        );

        return (
            <Col sm={7}>
                <ul className="no-bullets">
                    {listItems}
                </ul>
            </Col>
        )
    }
}

export default PostBoard