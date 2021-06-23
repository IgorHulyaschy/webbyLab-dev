class Film {
  constructor(dataDB) {
    this.id = dataDB.id;
    this.films_name = dataDB.films_name;
    this.date_of_release = dataDB.date_of_release;
    this.format = dataDB.format;
  }

  getCreatedFilm() {
    const responseData = {
      id: this.id,
      films_name: this.films_name,
      date_of_release: this.date_of_release,
      format: this.format,
    }
    return responseData;
  }
}
module.exports = { Film }