const BundleModel = require('../models/bundle')
const ItemModel = require('../models/item');



// SHOW FUNCTION
async function show(req, res) {
  try{
    const bundleFromTheDatabase = await BundleModel
    .findById(req.params.id)
    .populate('list')
    .exec();
    
    
    console.log(bundleFromTheDatabase);
    
    const itemsNotInTheBundle = await ItemModel.find({_id: {$nin: bundleFromTheDatabase.list}});
    
    res.render('bundles/show', {
      bundle: bundleFromTheDatabase,
      items: itemsNotInTheBundle
    })
  } catch(err) {
    res.send(err)
  }
}

// INDEX FUNCTION
async function index(req, res) {
  try{
    const bundleFromTheDB = await BundleModel.find({})
    
    res.render('bundles/index', {bundleDocs: bundleFromTheDB})
  } catch(err) {
    res.redirect('/')
  }
}

// CREATE FUNCTION
async function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === "") delete req.body[key];
  }
  try{
    const bundleFromTheDatabase = await BundleModel.create(req.body);
    
    res.redirect(`/bundles/${bundleFromTheDatabase._id}`);
  } catch(err) {
    res.render("bundles/add", { errorMsg: err.message });
  }
}

// NEW FUNCTION
function addBundle(req, res) {
  res.render('bundles/add')
}

module.exports = {
    add: addBundle,
    create,
    index,
    show,
  }
  
  