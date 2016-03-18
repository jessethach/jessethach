var keystone = require('keystone');

exports = module.exports = function(req, res) {

  var view = new keystone.View(req, res),
    locals = res.locals;

  // Set locals
  locals.section = 'work';
  locals.filters = {
    post: req.params.post
  };
  locals.data = {
    posts: []
  };

  // Load the current post
  view.on('init', function(next) {

    var q = keystone.list('Work').model.findOne({
      state: 'published',
      slug: locals.filters.post
    }).populate('author categories');

    q.exec(function(err, result) {
      locals.data.post = result;
      next(err);
    });

  });

  // Load other posts
  view.on('init', function(next) {

    var q = keystone.list('Work').model.find().where('state', 'published').sort('-publishedDate').populate('author').limit('4');

    q.exec(function(err, results) {
      locals.data.posts = results;
      next(err);
    });

  });

  // Render the view
  view.render('workitem');

};
