const ItemModel = require("../models/item");
const BundleModel = require('../models/bundle')

module.exports = {
  new: newItem,
  create,
  addToList,
  delete: deleteOne
}


// DELETE FUNCTION

  async function deleteOne(req, res) {
    try{
      const bundleDoc = await BundleModel.findOne(req.params.bundleId)
      bundleDoc.items.remove(req.params.id)
      bundleDoc.save()
      res.redirect(`/bundles/${req.params.bundleId}`)

    } catch(err) {
      res.send(err)
    }
  }

// ADDTOLIST FUNCTION
async function addToList(req, res) {
  try{
    const bundleDoc = await BundleModel.findById(req.params.bundleId)
    bundleDoc.list.push(req.body.itemId)
    await bundleDoc.save()
    res.redirect(`/bundles/${req.params.bundleId}`)
  } catch(err) {
    res.send(err)
  }
}

// CREATE FUNCTION
async function create(req, res) {

  try{
    const createdItem = await ItemModel.create(req.body);
    console.log(createdItem, "<-- created Item")
    res.redirect('/items/new')
  } catch(err) {
    res.send(err)
  }
}

// NEW FUNCTION
async function newItem(req, res) {
  try{
    const allItems = await ItemModel.find({});
    res.render('items/new', {
      title: 'Add Item',
      items: allItems,
    });
  } catch(err) {
    res.send(err)
  }
}