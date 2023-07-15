const db = require("../../config/db-config");

const addOne = (recipe) => {
    const {recipeId, wineId, percent} = recipe
    return db.execute(`insert mix_wine (recipe_id, wine_id, percent_wine) values (?, ?, ?)`, [
      recipeId,
      wineId,
      percent
    ]);
  };

module.exports = {
    addOne,
};
