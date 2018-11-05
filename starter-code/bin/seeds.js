// To execute this file:
//   $ node bin/seeds.js
// just do this once manually like that because it's a one time thing


const mongoose = require('mongoose');
const Celebrity = require('../models/celebrity');
const Movie = require('../models/movie');

const dbName = 'celebrity-project';
mongoose.connect(`mongodb://localhost/${dbName}`);

// const celebrities = [
//   {
//     name: 'John Lennon',
//     occupation: 'musician',
//     catchPhrase: 'Just imagine'
//   },
//   {
//     name: 'John Giorno',
//     occupation: 'poet',
//     catchPhrase: "It doesn't get better"
//   },
//   {
//     name: 'Thora Birch',
//     occupation: 'actress',
//     catchPhrase: 'Not again!'
//   }

// ]

// Save in the database all the books from the array "books"
// Celebrity.create(celebrities, (err) => {
//   if (err) { throw (err) }
//   console.log(`Created ${celebrities.length} celebrities`)
//   mongoose.connection.close()
// });


const movies = [
  {
    title: 'Fake 1',
    genre: 'fakeness 1',
    plot: 'unreal 1'
  },
  {
    title: 'Fake 2',
    genre: 'fakeness 2',
    plot: 'unreal 2'
  },
  {
    title: 'Fake 3',
    genre: 'fakeness 3',
    plot: 'unreal 3'
  },
]

Movie.create(movies, (err) => {
  if (err) { throw (err) }
  console.log(`Created ${movies.length} movies`)
  mongoose.connection.close()
});