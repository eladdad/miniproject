var express = require('express');
var multer = require('multer');
var userController = require('./controller/userController');
var portfolioController = require('./controller/portfolioController');
var projectController = require('./controller/projectController');

var upload = multer({ dest: 'public/' })
var router = express.Router();


router.post('/visit', function(req,res){
	var id = req.body.next;

	if(req.body.next)
		portfolioController.visitPortfolio(req,res, id);
	else
		res.redirect('/');
});



router.get('/register', function(req,res){
  res.render('registerTemp');
});

router.get('/',function(req,res){
	var id = req.cookies.name;
	console.log(id);
	var s = req.query.success;
	var page = 1;
	portfolioController.all(id,page,res,s);
    //res.render('index',req.query);
});

router.get('/login', function(req,res){
  res.render('loginTemp');
});

router.post('/login', function(req,res){
	//console.log(req.body);
  userController.login(req,res);
});

router.post('/register',function(req,res){
  console.log(req.body);
  userController.createUser(req,res);
});

router.post('/',function(req,res){
	var id = req.cookies.name;
	var s = "";
	var page = 1;

	if(req.body.next)
		page = req.body.next;
	portfolioController.all(id,page,res,s);
    //res.render('index',req.query);
});


router.all('*', function(req,res,next){
	if(req.cookies.id)
		next();
	else
		res.redirect('/');
})


router.get('/createPortfolio',function(req,res){
		portfolioController.hasPortofolio(req,res);
});



router.post('/createPortfolio',upload.any(),function(req,res){
		console.log(req.files[0]);
		console.log(req.body);
		console.log(req.cookies);
		var pp = 'avatar.jpeg';
		var screenshot = '';
		for (var i = 0; i < req.files.length; i++) {
			if(req.files[i].fieldname=='pp')
				pp = req.files[i].filename;
			else
				screenshot = req.files[i].filename;
		}
		portfolioController.createPortfolio({id: req.cookies.id, name: req.body.name, profile_picture: pp});
		res.cookie('name', req.body.name, {encode:String});
		var link = '';
		if(req.body.radio=='link')
			link = req.body.link;
		projectController.createProject({id: req.cookies.id, title: req.body.title, URL: link, screenshot: screenshot},res);
});

router.get('/portfolio',function(req,res){
	portfolioController.getPortfolio(req,res);
	
});

router.post('/portfolio', upload.any(),function(req,res){
	var screenshot = '';
	for (var i = 0; i < req.files.length; i++) {
		screenshot = req.files[i].filename;
	}
	var link = '';
	if(req.body.radio=='link')
		link = req.body.link;
	projectController.createProject({id: req.cookies.id, title: req.body.title, URL: link, screenshot: screenshot},res);
});

router.get('/logout', function(req,res){
	req.session.destroy();
	res.redirect('/');
});



module.exports = router;
