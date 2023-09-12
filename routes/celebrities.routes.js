const router = require("express").Router();
const Celebrities = require('../models/Celebrity.model.js')
// all your routes here
router.get('/celebrities/create', (req, res) => {
    res.render('celebrities/new-celebrities');
  });

  router.post('/celebrities/create', (req,res,next)=>{
    const newCelebrity = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
      };
    
      Celebrities.create(newCelebrity)
    .then((newCelebrity) => {
      res.redirect('/celebrities');
    })
    .catch(error => {
      console.error('Error creating celebrity:', error);
      res.render('celebrities/new-celebrities', { error: 'Error creating celebrity' });
    });
  })

  router.get('/celebrities', (req, res) => {
    Celebrities.find()
      .then((celebrities) => {
        res.render('celebrities/celebrities', { celebrities });
      })
      .catch((error) => {
        console.error(error);
      });
  });



  
module.exports = router;