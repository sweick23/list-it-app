const mongoose = require('mongoose');

const listSchema = mongoose.Schema({
  item: {type: String, required: true},
  category: {type: String, required: false}
});



listSchema.methods.apiRepr = function() {
  return {
    id: this._id,
   item: this.item,
   category: this.category
  };
}

const Todo = mongoose.model('lists', listSchema);

module.exports = {Todo};
