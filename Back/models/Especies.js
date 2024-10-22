const db = require('../config/db');

const Especies = {

  findEspecies: (callback) => {
    db.query('SELECT * FROM especies order by especie_id asc',  callback);
  },
};

module.exports = Especies;