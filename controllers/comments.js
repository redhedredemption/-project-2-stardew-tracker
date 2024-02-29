const BundleModel = require('../models/bundle')

module.exports = {
  create,
  delete: deleteComment,
  edit,
  update
}

async function update(req, res) {
  const bundleDoc = await BundleModel.findOne({'comments._id': req.params.id});
  console.log(bundleDoc, "<-- bundleDoc");
  const commentSubdoc = bundleDoc.comments.id(req.params.id);
  if (!commentSubdoc.user.equals(req.user._id)) return res.redirect(`/bundles/${bundleDoc._id}`);
  // Update the text of the comment
  console.log(req.body);
  commentSubdoc.content = req.body.content;
  try {
    await bundleDoc.save();
  } catch (e) {
    console.log(e.message);
  }
  // Redirect back to the book's show view
  res.redirect(`/bundles/${bundleDoc._id}`);
}

async function edit(req, res) {
   const bundleDoc = await BundleModel.findOne({'comments._id': req.params.id});
   const comment = bundleDoc.comments.id(req.params.id);
   res.render('bundles', { comment });
}

async function deleteComment(req,res) {
  try{
    const bundleDoc = await BundleModel.findOne({'comments._id': req.params.id})
    if (!bundleDoc) return res.redirect(`/bundles`)
    bundleDoc.comments.remove(req.params.id)
    bundleDoc.save()
    res.redirect(`/bundles/${bundleDoc._id}`)
  } catch(err) {
    res.send(err)
  }
}



async function create(req, res) {
  console.log(req.user)

  try{
    const bundleDoc = await BundleModel.findById(req.params.id)

    req.body.user = req.user._id
		req.body.userName = req.user.name
		req.body.userAvatar = req.user.avatar

    bundleDoc.comments.push(req.body);
    await bundleDoc.save()
    res.redirect(`/bundles/${req.params.id}`)

  } catch(err) {
    res.send(err)
  }
}