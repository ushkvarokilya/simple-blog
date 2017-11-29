import express from 'express'
import crypto from 'crypto'
import PostCollection from '../models/postSchema'
import config from '../config'

export async function addNewPost(req, res) {
    const { text, title, uId } = req.body;
    const _id = crypto.randomBytes(10).toString('hex');
    const postTemplate = {
      _id,
      title,
      text,
      uId
    }
    const newPost = await new PostCollection(postTemplate);
    newPost.save();
    return res.status(200).send({ title, text });
  }

  export async function deletePost(req, res) {
    const { id } = req.params
    await PostCollection.remove({ _id: id }).exec((err, result) => {
      if (err) {
        throw err;
      }
      else {
        res.status(200).send({result});
      }
    })
  }

  export async function getAllUsersPosts(req, res) {
    const { uId } = req.params;
    const posts = await PostCollection.find({ uId });
    return res.status(200).send({ posts });
  }

export const routes = express();
routes.put('/', addNewPost);
routes.delete('/:id', deletePost);
routes.get('/:uId', getAllUsersPosts);
