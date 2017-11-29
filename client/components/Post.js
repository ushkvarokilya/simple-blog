import React, { Component } from 'react'
import { Jumbotron, Button } from 'react-bootstrap'

const Post = ({ post, deletePost }) => {

    return (
        <Jumbotron className="post">
            <h3> {post.title} </h3>
            <h4> {post.date} </h4>
            <div> {post.text} </div>
            <Button onClick={deletePost.bind(null, post._id)}>Delete</Button>
        </Jumbotron>
    );
};

export default Post