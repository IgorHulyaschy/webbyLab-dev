class Actor {
  constructor(dataDB) {
    this.id = dataDB.id;
    this.fname = dataDB.fname;
    this.lname = dataDB.lname;
  }
  getActorsOfFilm() {
    const responseData = {
      id: this.id,
      fname: this.fname,
      lname: this.lname,
    }
    return responseData;
  }
}

module.exports = {Actor}