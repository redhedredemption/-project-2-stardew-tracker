const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  // One to many relationship on the belongs to side
  user: {
    type: Schema.Types.ObjectId, // this is from mongoose
    ref: 'User' // this references this line mongoose.model('User', userSchema);
  },
  userName: String,
  userAvatar: String
}, {
  timestamps: true
})




// Enforces the shape of the documents (Think of objects)
// in our mongodb movies collection
const bundleSchema = new Schema({
  bundle: {
    type: String,
    enum: ['<Boiler Room - Adventurer>', '<Boiler Room - Blacksmith>', '<Boiler Room - Geologist>', '<Bulletin Board - Chef>', '<Bulletin Board - Dye>', '<Bulletin Board - Enchanter>', '<Bulletin Board - Field Research>', '<Bulletin Board - Fodder>', '<Crafts Room - Construction>', '<Crafts Room - Exotic Foraging>', '<Crafts Room - Fall Foraging>', '<Crafts Room - Spring Foraging>', '<Crafts Room - Summer Foraging>', '<Crafts Room - Winter Foraging>', '<Crafts Room - Winter Foraging>', '<Fish Tank - Lake Fish>', '<Fish Tank - Night Fishing>', 'Fish Tank - Ocean Fish', '<Fish Tank - River Fish>', '<Fish Tank - Specialty Fish>', '<Fish Tank - Crab Pot>', '<Pantry - Animal>', '<Pantry - Artisan>', '<Pantry - Fall Crops>', '<Pantry - Quality Crops>', '<Pantry - Spring Crops>', '<Pantry - Summer Crops>', '<Vault - 2,500g>', '<Vault - 5,000g>', '<Vault - 10,000g>', '<Vault - 25,000g>']

  },

  // Many to Many Relationship
  // Bundle has many Items, Items have many Bundles
  // using referencing!
  list: [{
    type: Schema.Types.ObjectId, // this is from mongoose
    ref: 'Item' // Item is referencing the model name that 
    // you are creating the relationship with, mongoose.model('Item', ItemSchema);
  }],
  // One movie has many reviews, A review belongs to a movie 
  // Using embedding on the one side of the relationship
  comments: [commentSchema]
}, {
  timestamps: true
});

// Compile the schema into a model and export it
// Movie, creates a movies collection in our movies database
module.exports = mongoose.model('bundle', bundleSchema);