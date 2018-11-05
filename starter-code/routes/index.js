const express = require('express');
const router = express.Router();
const Celebrity = require("../models/Celebrity")
const Movie = require("../models/Movie")


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/celebrities/index', (req, res, next) => {
  Celebrity.find()
    .then(celebsFromDb => {
      res.render("celebrities/index", { listOfCelebs: celebsFromDb })
    })
    .catch(error => {
      console.log('Something went wrong in /celebrities/index')
      next(error)
    })
});

router.get('/celebrities/:id', (req, res, next) => {
  let id = req.params.id
  Celebrity.findById(id)
    .then(celebsFromDb => {
      let data = {
        celeb: celebsFromDb
      }
      res.render('celebrities/show', data)
    })
})


// The route to display the add celeb form ============================ //
router.get('/newceleb', (req, res, next) => {
  res.render('celebrities/new')
})

// The route to handle the add celeb form ============================ //
router.post('/newceleb', (req, res, next) => {
  // If there is an empty title
  if (!req.body.name) {
    res.render('celebrities/new', {
      error: "The name must be filled"
    })
    return
  }
  Celebrity.create({
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase,
  })
    .then(celebrity => {
      res.redirect('/celebrities/index' + celebrity._id)
    })
    .catch(error => {
      console.log('Something went wrong with adding a celeb')
      next(error)
    })
})


// Page to display the edit form ======================== //
router.get('/celebrities/:id/edit', (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then(celebrity => {
      res.render('celebrities/edit', celebrity)
    })
    .catch(error => {
      console.log('Something went wrong with edit')
      next(error)
    })
})

// Route to handle the edit form submission
router.post('/celebrities/:id/edit', (req, res, next) => {
  // Find the book and update it with the info from the form
  Celebrity.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase
  })
    .then(celebrity => {
      res.redirect('/celebrities/' + celebrity._id)
    })
    .catch(error => {
      console.log('Something went wrong with edit form handling')
      next(error)
    })
})



// Delete ================================================ //
router.get('/celebrities/:id/delete', (req, res, next) => {
  Celebrity.findByIdAndRemove(req.params.id)
    .then(celebrity => {
      res.redirect('/celebrities/index')
    })
    .catch(error => {
      console.log('Something went wrong with delete')
      next(error)
    })
})


// =================== MOVIES =========================== //
// ====================================================== //

router.get('/movies/index', (req, res, next) => {
  Movie.find()
    .then(moviesFromDb => {
      res.render("movies/index", { listOfMovies: moviesFromDb })
    })
    .catch(error => {
      console.log('Something went wrong in /movies/index')
      next(error)
    })
});

router.get('/movies/:id', (req, res, next) => {
  let id = req.params.id
  Movie.findById(id)
    .then(moviesFromDb => {
      let data = {
        movieKey: moviesFromDb
      }
      res.render('movies/show', data)
    })
})


// The route to display the add movie form ============================ //
router.get('/newmovie', (req, res, next) => {
  res.render('movies/new')
})

// The route to handle the add movie form ============================ //
router.post('/newmovie', (req, res, next) => {
  // If there is an empty title
  if (!req.body.title) {
    res.render('movies/new', {
      error: "The title must be filled"
    })
    return
  }
  Movie.create({
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
  })
    .then(movie => {
      res.redirect('/movies/' + movie._id)
    })
    .catch(error => {
      console.log('Something went wrong with adding a movie')
      next(error)
    })
})


// Page to display the edit form ======================== //
router.get('/movies/:id/edit', (req, res, next) => {
  Movie.findById(req.params.id)
    .then(movie => {
      res.render('movies/edit', movie)
    })
    .catch(error => {
      console.log('Something went wrong with edit')
      next(error)
    })
})

// Route to handle the edit form submission
router.post('/movies/:id/edit', (req, res, next) => {
  // Find the book and update it with the info from the form
  Movie.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot
  })
    .then(movie => {
      res.redirect('/movies/' + movie._id)
    })
    .catch(error => {
      console.log('Something went wrong with edit from handling')
      next(error)
    })
})


// Delete ================================================ //
router.get('/movies/:id/delete', (req, res, next) => {
  Movie.findByIdAndRemove(req.params.id)
    .then(movie => {
      res.redirect('/movies/index')
    })
    .catch(error => {
      console.log('Something went wrong with delete')
      next(error)
    })
})



module.exports = router;
