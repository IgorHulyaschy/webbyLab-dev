const {Film} = require('./film')
const {Actor} = require('./actor')
const db = require('../../database/database');

class FilmDB {
  static async createFilm(films_name, date_of_release, format, actors) {
    const filmResponse = await db.query(
      `INSERT INTO "films" (films_name, date_of_release, format)
      VALUES ('${films_name}', '${date_of_release}', '${format}')
      RETURNING *`
    )

    actors.map( async (item)=> {
      const actorResponse = await db.query(
        `INSERT INTO "actors" (fname, lname)
        VALUES ('${item.fname}', '${item.lname}') 
        RETURNING *`
      )
      await db.query(
        `INSERT INTO "film_actor" (id_film, id_actor)
        VALUES (${{...filmResponse.rows[0]}.id}, ${{...actorResponse.rows[0]}.id})`
      )
    })
    return new Film(filmResponse.rows[0]).getCreatedFilm();
  }

  static async listFilms() {
    const listResponse = await db.query(
      `SELECT *
      FROM "films"
      ORDER BY films_name`
    )
    const films_id =[];
    listResponse.rows.forEach((item) => {
      films_id.push(item.id)
    })
    const result = [];
    for await (const id of films_id) {
      const response = await db.query(
        `SELECT *
        FROM actors
        JOIN film_actor
        ON actors.id = id_actor
        WHERE id_film = ${id}`
      )
      result.push({...response.rows})
    }
    const films = listResponse.rows.map((dataDB) => new Film(dataDB).getCreatedFilm());
    return {films, result}
  }

  static async findByName(name) {
    const resultResponse = await db.query(
      `SELECT *
      FROM "films"
      WHERE films_name ILIKE '%${name}%'`
    )
    
    return resultResponse.rows.map((dataDB) => new Film(dataDB).getCreatedFilm());
  }

  static async findByActor(actor) {
    const resultResponse = await db.query(
      `SELECT *
      FROM "actors"
      WHERE fname ILIKE '%${actor}%'`
    )
    const res = [];
    resultResponse.rows.forEach(item => {
      res.push(item.id)
    });
    const result = [];
    for await (let id of res) {
      const response = await db.query(
        `SELECT *
        FROM films
        JOIN film_actor
        ON films.id = id_film
        WHERE id_actor = ${id}`
      )
      result.push({...response.rows[0]})
    }
    return result;
  }

  static async deleteFilm(id) {
    const actors_id = await db.query(
      `SELECT id_actor
      FROM film_actor
      WHERE id_film = ${id}`
    )
    const deleteRes = [];
    actors_id.rows.forEach((item) => {
      deleteRes.push(item.id_actor)
    })
    await db.query(
      `DELETE FROM film_actor
      WHERE id_film = ${id}`
    )
    deleteRes.forEach(async (id) => {
      await db.query(
        `DELETE FROM actors
        WHERE id = ${id}`
      )}
    )
    await db.query(
      `DELETE FROM films
      WHERE id = ${id}`
    )
  }

  static async getFilmInfo(id) {
    const filmResponse = await db.query(
      `SELECT *
      FROM films
      WHERE id = ${id}`
    )
    const actorsResponse = await db.query(
      `SELECT *
      FROM actors
      JOIN film_actor
      ON id_actor = actors.id
      WHERE id_film = ${id}`
    )
    const actors = actorsResponse.rows.map((dataDB) => new Actor(dataDB).getActorsOfFilm())
    const film = new Film({...filmResponse.rows[0]}).getCreatedFilm();
    return {film, actors}
  }
}

module.exports = { FilmDB }