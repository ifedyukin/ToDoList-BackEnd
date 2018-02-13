const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { port, mongoDB } = require('./config');
const {
  getItems,
  deleteItem,
  changeItem,
  createEvent,
  completeAll,
  removeCompleted,
} = require('./itemControllers');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.Promise = Promise;

mongoose.connect(mongoDB)
  .then(() => {
    console.log('Mongo connected!');

    app.get('/', getItems);
    app.post('/', createEvent);
    app.get('/:filter', getItems);
    app.patch('/:id', changeItem);
    app.delete('/:id', deleteItem);
    app.put('/complete', completeAll);
    app.put('/clean', removeCompleted);
    app.put('/complete/:filter', completeAll);
    app.put('/clean/:filter', removeCompleted);

    app.listen(port, () => {
      console.log(`Express server is listening on ${port}`);
    });
  })
  .catch(error => console.log(error));
