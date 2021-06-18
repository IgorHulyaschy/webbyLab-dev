const db = require("../database/database");

const {FilmDB} = require('./model/service')

class Controller {
  static async createFilm(ctx) {
    const {films_name, date_of_release, format, actors} = ctx.request.body;
    
    const film = await FilmDB.createFilm(films_name, date_of_release, format, actors)
    ctx.status = 201;
    ctx.body = {
      film
    }
  }

  static async getFilmsInOrder(ctx) {
    ctx.status = 200;
    ctx.body = (
      await FilmDB.listFilms()
    )
  }

  static async findByName(ctx) {
    const {films_name} = ctx.request.params
    ctx.status = 200;
    ctx.body = (
      await FilmDB.findByName(films_name)
    )
  }

  static async findByActor(ctx) {
    const {actor} = ctx.request.params
    ctx.status = 200;
    ctx.body = (
      await FilmDB.findByActor(actor)
    )
  }

  static async deleteFilm(ctx) {
    const {id} = ctx.request.body
    ctx.status = 200;
    await FilmDB.deleteFilm(id)
  }

  static async getFilmInfo(ctx) {
    const {id} = ctx.request.params
    ctx.status = 200;
    ctx.body = (
      await FilmDB.getFilmInfo(id)
    )
  }
}

module.exports = {Controller}