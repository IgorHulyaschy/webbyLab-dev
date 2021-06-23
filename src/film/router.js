const Router = require("koa-joi-router");

const {Controller} = require('./controller')
const Validator = require('./validator')

const router = new Router();

router.post('film', Validator.createFilm, Controller.createFilm)
router.get('films', Controller.getFilmsInOrder)
router.get('film/:films_name', Controller.findByName)
router.get('film/actor/:actor', Controller.findByActor)
router.delete('film', Controller.deleteFilm)
router.get('film/info/:id', Controller.getFilmInfo)
router.post('films', Controller.createFilmWithFile)

module.exports = router;
