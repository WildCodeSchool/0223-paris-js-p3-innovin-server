const db = require("../../config/db-config");

const findAll = () => {
  return db.execute("SELECT * FROM user").then((data) => {
    return data;
  });
};

const findById = (id) => {
  return db
    .execute(
      "SELECT * FROM user join user_has_tag on user_has_tag.user_id = user.id join tag on tag.id = user_has_tag.tag_id WHERE user.id = ? ",
      [id]
    )
    .then((data) => {
      return data;
    });
};

const insert = (user) => {
  const { firstname, lastname, email, password, age } = user;
  return db.execute(`insert into user (firstname, lastname, email, password, age) values (?, ?, ?, ?, ?)`, [
    firstname,
    lastname,
    email,
    password,
    age,
  ]);
};

const findByMail = async (email) => {
  const [data] = await db.execute(`select * from user where email = ? `, [email]);
  return data;
};

const updateOne = (users, id) => {
  return db.query("update user set ? WHERE id = ?", [users, id]).then(([result]) => result);
};

const updateOneComment = (comment, id) => {
  return db.query("update user set comment=? WHERE id = ?", [comment, id]).then(([result]) => result);
};

const deleteOne = (id) => {
  return db.execute("delete from user where id = ?", [id]).then(([result]) => {
    return result;
  });
};
module.exports = {
  findAll,
  findById,
  insert,
  findByMail,
  updateOne,
  updateOneComment,
  deleteOne,
};
