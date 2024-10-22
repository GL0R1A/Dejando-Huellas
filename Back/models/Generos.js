const db = require('../config/db');

const Genero = {

  findGeneros: (callback) => {
    db.query('SELECT * FROM generos order by genero_id asc',  callback);
  },
};

module.exports = Genero;