const Koa = require('koa')
const Router = require('koa-router')
const config = require('config')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')

const ErrorCatcher = require('./middleware/errorCatcher')

const app = new Koa();

app.use(cors())

const router = new Router();

app.use(bodyParser());
app.use(ErrorCatcher);

router.use('/', require('./film/router'))
app.use(router.middleware())

const port = config.get('app.port') || 3000

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});