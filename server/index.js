import express from 'express'
import bodyParser from 'body-parser'
import {routes as ApplicationRouter} from './routes/index'
import {initDB} from './setup'
import config from './config'

export const app = express();
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({extended: false, limit: '1mb'}));
app.use(express.static(__dirname + '/../public'));
app.use(ApplicationRouter);
app.listen(config.port, () => {
console.log(`Server running at port ${config.port}`)
  initDB()
})
.on('error', e => console.log(e));

