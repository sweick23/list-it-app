const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const {router: usersRouter} = require('./users');

mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config');
const {Todo} = require('./model');
const app = express();

// logging
app.use(express.static('public'));
app.use(morgan('common'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/users/', usersRouter);




app.get('/lists', (req, res) => {
    console.log(DATABASE_URL);
  Todo
    .find()

    .exec()

    .then(todolist => {
      res.json({
        todolist: todolist.map(
          (list) => list.apiRepr())
      });
    })
    .catch(
      err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    });
});


app.get('/lists/:id', (req, res) => {
  Todo

    .findById(req.params.id)
    .exec()
    .then(post =>res.json(post.apiRepr()))
    .catch(err => {
      console.error(err);
        res.status(500).json({message: 'Internal server error'})
    });
});


app.post('/lists', (req, res) => {

  const requiredFields = ['item', 'category'];
  for(var i = 0; i < requiredFields; i++){
    const fields = requiredFields[i];
    if (!(fields in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }



  Todo
    .create({
    item: req.body.item,
  category: req.body.category})
    .then(
      todolist => res.status(201).json(todolist.apiRepr()))
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
});


app.put('/lists/:id', (req, res) => {

  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    const message = (
      `Request path id (${req.params.id}) and request body id ` +
      `(${req.body.id}) must match`);
    console.error(message);
    res.status(400).json({message: message});
  }


  const toUpdate = {};
  const updateableFields = ['item'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });

  Todo

    .findByIdAndUpdate(req.params.id, {$set: toUpdate})
    .exec()
    .then(app => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

app.delete('/lists/:id', (req, res) => {
  Todo
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(post => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});


/*app.use('*', function(req, res) {
  res.status(404).json({message: 'Not Found'});
});*/



let server;

function runServer() {
  return new Promise((resolve, reject) => {
    mongoose.connect(DATABASE_URL, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(PORT, () => {
        console.log(`Your app is listening on port ${PORT}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};
