import express from 'express'
import path from 'path'
import {routes as users} from './users'
import {routes as posts} from './posts'
export const routes = express();

routes.use('/api/1/posts', posts);
routes.use('/api/1/users', users);
routes.get(/.*/, (req, res) => {
  res.sendFile(path.resolve('public', 'index.html'))
});