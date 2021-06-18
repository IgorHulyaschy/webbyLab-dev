const Router = require('koa-joi-router');

const joi = Router.Joi;

const createSchema = {
  films_name: joi.string().min(3).max(20).required(),
  date_of_release: joi.string().min(4).max(4).required(),
  format: joi.string().min(3).max(8).required(),
  actors: joi.array().items(joi.object({
    fname: joi.string().min(3).max(30).required(),
    lname: joi.string().min(3).max(30).required(),
  })).required(),
  
}
exports.createFilm = {
  validate: {
    type: "json",
    body: {
      ...createSchema,
    }
  }
}