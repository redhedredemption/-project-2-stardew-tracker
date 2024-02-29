const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// the schema enforces the shape of the documents we create
const itemSchema = new Schema({
  name: {type: String, required: true, unique: true},
  collected: {type: Boolean, default: false }, // Defaulting to false assuming it's not collected initially
  deposited: {type: Boolean, default: false }, // Defaulting to false assuming it's not collected initially
  bundle: {
    type: String,
    // <FOR REFERENCE>============
    // enum: ['bundle1', 'bundle2', etc]
    // FROM ADD VIEW:
    // <!-- <label>Bundle Name</label>
    // <select name="bundle">
    //   <option value="Spring Foraging">springForaging</option>
    //   <option value="Summer Foraging">summerForaging</option>
    //   <option value="Fall Foraging">fallForage</option>
    //   <option value="Winter Foraging">winterForage</option>
    //   <option value="Construction">construction</option>
    //   <option value="Exotic Foraging">exoticForaging</option>
    //   <option value="Fall Foraging">Fall Foraging</option>
    //   <option value="Fall Foraging">Fall Foraging</option> -->
    // NEED TO LINK/REFERENCE BUNDLES
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Item', itemSchema);