const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const PostSchema = new Schema(
  {
    title: {type: String, min: 3, max: 35, required: true},
    author: {type: Schema.Types.ObjectId, ref:'User', required: true},
    date_created: {type: Date, default: Date.now, required: true},
    message: {type: String, min:3, max: 300, required: true},
  }
)
PostSchema
.virtual('added_ago')
.get(function() {
  return moment(this.date_created).fromNow();
});

PostSchema
.virtual('authors_posts')
.get(function() {
  return '/search/' + this.author;
})

PostSchema
.virtual('delete_link')
.get(function() {
  return '/delete/post/' + this._id;
});


module.exports = mongoose.model('Post',PostSchema);
