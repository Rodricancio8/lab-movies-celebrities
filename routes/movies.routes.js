const router = require("express").Router();
const Celebrities = require('../models/Celebrity.model.js')
const Movie = require('../models/Movie.model.js');


router.get('/movies/create', (req, res) => {
    Celebrities.find()
      .then((celebrities) => {
        res.render('movies/new-movie', { celebrities });
      })
      .catch((error) => {
        console.error(error);
      });
  });


  router.post('/movies/create', (req, res) => {
    const { title, genre, plot, cast } = req.body;
  
    const newMovie = new Movie({
      title,
      genre,
      plot,
      cast,
    });
  
    newMovie
      .save()
      .then(() => {
        res.redirect('/movies')
      })
      .catch((error) => {
        console.error(error);
      });
  });


  router.get('/movies', (req, res) => {
    Movie.find()
      .then((movies) => {
        res.render('movies/movies', { movies });
      })
      .catch((error) => {
        console.error(error);
      });
  });

  router.get('/movies/:id', (req, res) => {
    const movieId = req.params.id;
  
    Movie.findById(movieId)
      .populate('cast')
      .then((movie) => {
        if (!movie) {
         
          return res.render('error', { message: 'Movie not found' });
        }
  
        res.render('movies/movie-details', { movie });
      })
      .catch((error) => {
        console.log(error);
      });

    })

    router.post('/movies/:id/delete', (req, res) => {
        const movieId = req.params.id;
      
        Movie.findByIdAndRemove(movieId)
          .then(() => {
            res.redirect('/movies');
          })
          .catch((error) => {
            console.log(error);
          });
      });

      router.get('/movies/:id/edit', (req, res) => {
        const movieId = req.params.id;
      
        Movie.findById(movieId)
          .then((movie) => {
            if (!movie) {
              return res.render('error', { message: 'Movie not found' }); 
            }
      
            Celebrity.find()
              .then((celebrities) => {
                res.render('movies/edit-movie', { movie, celebrities });
              })
              .catch((error) => {
                console.error(error);
            
              });
          })
          .catch((error) => {
            console.error(error);
          });
      });


      // routes/movies.routes.js
// ... (previous code)

// Update the details of a specific movie
router.post('/movies/:id', (req, res) => {
    const movieId = req.params.id;
    const { title, genre, plot, cast } = req.body;
  
    Movie.findByIdAndUpdate(
      movieId,
      {
        title,
        genre,
        plot,
        cast,
      },
      { new: true }
    )
      .then((updatedMovie) => {
        if (!updatedMovie) {
          return res.render('error', { message: 'Movie not found' }); 
        }
  
        res.redirect(`/movies/${updatedMovie._id}`)
      })
      .catch((error) => {
        console.error(error);
       
      });
  });
  
  module.exports = router;
  
module.exports = router;