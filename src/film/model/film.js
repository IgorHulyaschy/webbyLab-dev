class Film {
  constructor(dataDB) {
    this.id = dataDB.id;
    this.films_name = dataDB.films_name;
    this.date_of_release = dataDB.date_of_release;
    this.format = dataDB.format;
    this.id_film_actor = dataDB.id_film_actor;
  }

  getCreatedFilm() {
    const responseData = {
      id: this.id,
      films_name: this.films_name,
      date_of_release: this.date_of_release,
      format: this.format,
      id_film_actor: this.id_film_actor,
    }
    return responseData;
  }
}
module.exports = { Film }