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

  static getData(data) {
    const arr = [];

    data.forEach((item) => {
      if(item.includes('Title: ')) {
        arr.push((item.split('Title: ')).splice(1, 1)) 
      }
      if(item.includes('Release Year: ')) {
        arr.push((item.split('Release Year: ')).splice(1, 1))
      }
      if(item.includes('Format: ')) {
        arr.push((item.split('Format: ')).splice(1, 1))
      }
      if(item.includes('Stars: ')) {
        arr.push((item.split('Stars: ')).splice(1, 1))
      }
    })
    const res = [];
    let i = 0;
    while(i < arr.length) {
      let obj = {};
      obj.films_name = arr[i][0]
      obj.date_of_release = arr[i+1][0]
      obj.format = arr[i+2][0]
      let actors = arr[i+3][0].split(', ')
      const result = [];
      actors.forEach((item) => {
        result.push(item.split(" "))
      })
      const actor = [];
      result.forEach((item) => {
        const o2 = {};
        o2.fname = item[0]
        o2.lname = item[1]
        actor.push(o2)
      })
      obj.actors = actor;
      res.push(obj)
      i+=4;
    }
    return res;
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