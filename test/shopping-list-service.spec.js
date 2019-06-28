const ShoppingService = require('../src/shopping-list-service');
const knex = require('knex');

describe(`Shopping service object`, function() {
  let db
  let testShoppingItems = [
    {
      id: 1,
      name: 'Meow Mix',
      price: '14.34',
      date_added: new Date('2029-01-22T16:28:32.615Z'),
      checked: true,
      category: 'Breakfast'
    },
    {
      id: 2,
      name: 'Chicken',
      price: '6.45',
      date_added: new Date('2100-05-22T16:28:32.615Z'),
      checked: false,
      category: 'Lunch'
    },
    {
      id: 3,
      name: 'Liver',
      price: '4.09',
      date_added: new Date('1919-12-22T16:28:32.615Z'),
      checked: false,
      category: 'Snack'
    },
  ]

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
  })

  before(() => db('shopping_list').truncate())

  afterEach(() => db('shopping_list').truncate())

  after(() => db.destroy())

  context(`getAllShoppingItems()`, () => {
    beforeEach(() => {
      return db
        .into('shopping_list')
        .insert(testShoppingItems)
    })

    it(`getAllShoppingItems() resolves all items from 'shopping_list' table`, () => {
      //test that ShoppingService.getAllShoppingItems() gets data from table
      return ShoppingService.getAllShoppingItems(db)
        .then(actual => {
          expect(actual).to.eql(testShoppingItems)
        })
    })

    it(`getById() resolves an item by id from 'shopping_;list' table`, () => {
      const secondId = 3
      const secondTestItem = testShoppingItems[secondId - 1]
      return ShoppingService.getById(db,secondId)
      .then(actual => {
        expect(actual).to.eql({
          id: secondId,
          name: secondTestItem.name,
          price: secondTestItem.price,
          date_added: secondTestItem.date_added,
          checked: secondTestItem.checked,
          category: secondTestItem.category,
        })
      })
    })

    it(`updateShoppingItem() updates a shopping item from the 'shopping_list'`, () => {
      const idOfShoppingItemToUpdate = 2
      const newShoppingItemData = {
        name: 'updated title',
        price: '1.99',
        date_added: new Date('2029-01-22T16:28:32.615Z'),
        checked: false,
        category: 'Breakfast'
      }
      return ShoppingService.updateShoppingItem(db,idOfShoppingItemToUpdate, newShoppingItemData)
        .then(() => ShoppingService.getById(db,idOfShoppingItemToUpdate))
        .then(item => {
          expect(item).to.eql({
            id: idOfShoppingItemToUpdate,
            ...newShoppingItemData,
          })
        })
    })

    it(`deleteShoppingItem() removes teh shopping item by id from 'shopping_list' table`, () => {
      const shoppingId = 3
      return ShoppingService.deleteShoppingItem(db, shoppingId)
        .then(() => ShoppingService.getAllShoppingItems(db))
        .then(allItems => {
          // copy the test items array without the 'deleted' item
          const expected = testShoppingItems.filter(item => item.id !== shoppingId)
          expect(allItems).to.eql(expected)
        })
    })
  })

  it(`insertShoppingItem()`, () => {
    const newItem = {
      name: 'Gummy Bears',
      price: '0.99',
      date_added: new Date('2029-01-22T16:28:32.615Z'),
      checked: false,
      category: 'Snack'
    }
    return ShoppingService.insertShoppingItem(db,newItem)
      .then(actual => {
        expect(actual).to.eql({
          id: 1,
          name: newItem.name,
          price: newItem.price,
          date_added: newItem.date_added,
          checked: newItem.checked,
          category: newItem.category,
        })
      })
  })
})
