require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

// function #1
// function searchByName(searchTerm){
//   knexInstance
//     .select('*')
//     .from('shopping_list')
//     .where('name','ILIKE',`%${searchTerm}%`)
//     .then(result => {
//       console.log(result)
//     })
// };

// searchByName('fish');

// function #2
// function paginateProducts(pageNumber) {
//   const itemsPerPage = 6;
//   const offset = itemsPerPage * (pageNumber -1);
//   knexInstance
//     .select('*')
//     .from('shopping_list')
//     .limit(itemsPerPage)
//     .offset(offset)
//     .then(result => {
//       console.log(result);
//     });
// };

// paginateProducts(5);

// function 3
// function numberOfDaysAgo(daysAgo) {
//   knexInstance
//     .select('*')
//     .from('shopping_list')
//     .where('date_added','<',knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo))
//     .then(result => {
//       console.log(result);
//     })
// };

// numberOfDaysAgo(20);

// function 4
function totalCost() {
  knexInstance
    .select('category')
    .sum('price as total')
    .from('shopping_list')
    .groupBy('category')
    .then(result => {
      console.log(result);
    })
};

totalCost();

