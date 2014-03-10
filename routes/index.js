
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'IndexCards - v1.0' });
};