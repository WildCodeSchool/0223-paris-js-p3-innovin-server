const db = require("../../config/db-config");

const findAll = () => {
  return db.execute("SELECT * FROM user").then((data) => {
    return data;
  });
};

const findById = (id) => {
  return db.execute("SELECT * FROM user WHERE id = ? ", [id]).then(([data]) => {
    return data;
  });
};

const insert = (user) => {
  const { firstname, lastname, email, password, age } = user;
  return db.execute(
    `insert into user (firstname, lastname, email, password, age) values (?, ?, ?, ?, ?)`,
    [firstname, lastname, email, password, age]
  );
};

const findByMail = async (email) => {
    const [data] = await db.execute(`select * from user where email = ? `, [email])
    return data
};

module.exports = {
  findAll,
  findById,
  insert,
  findByMail,
};
