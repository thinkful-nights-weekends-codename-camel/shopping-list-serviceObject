
const ShoppingService = {
  getAllShoppingItems(knex) {
    return knex.select('*').from('shopping_list')
  },
  getById(knex, id){
    return knex
      .select('*')
      .from('shopping_list')
      .where('id', id)
      .first()
  },
  insertShoppingItem(knex, newItem) {
    return knex
      .insert(newItem)
      .into('shopping_list')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  updateShoppingItem(knex,id,newShoppingData){
    return knex('shopping_list')
      .where({ id })
      .update(newShoppingData)
  },
  deleteShoppingItem(knex,id) {
    return knex('shopping_list')
      .where({ id })
      .delete()
  }
}

module.exports = ShoppingService;