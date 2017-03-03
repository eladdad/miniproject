var Portfolio = require('../model/portfolio');
var Project = require('../model/project');
var projectController = require('./projectController');



let portfolioController = {
	createPortfolio:function(req){
		let portfolio = new Portfolio(req);

		portfolio.save(function(err, portfolio){
            if(err){
                res.send(err.message)
                console.log(err);
            }
            else{
                console.log(portfolio);
                //res.redirect('/portfolio');
            }
        });
	},

	getPortfolio:function(req,res){
		var id = req.cookies.id;
		//console.log(id);
		Portfolio.findOne({id: id}, function(err, portfolio){
			//console.log(portfolio);
			if(!portfolio)
				res.send(err);
			else{
				Project.find({id: id}, function(err, projects){
					//console.log(projects);
					res.render('portfolioTemp', {portfolio,projects});	
				});
				
			}
		});
	},

	visitPortfolio:function(req,res,id){
		//console.log(id);
		Portfolio.findOne({id: id}, function(err, portfolio){
			//console.log(portfolio);
			if(!portfolio){
				console.log(id);
				res.send(err);
			}
			else{
				Project.find({id: id}, function(err, projects){
					
					var visitor = 1;
					res.render('portfolioTemp', {portfolio,projects,visitor});	
				});
				
			}
		});
	},

	all:function(uId,page, res, s){
		
		
		const cursor = Portfolio.find().cursor();

		recur(cursor.next(), page, res, [], 0);


		function recur(promise, page, res, results, i){
			
				promise.then(doc => {
					if(doc!=null)
					{
							
								var id = doc.id;
								var name = doc.name;
								var profile_picture = doc.profile_picture;
										
								var element = {
									id: id,
									name: name,
									profile_picture: profile_picture,
								};

								Project.find({id:id}).limit(2).exec().then(function(works){
									element.works = works;
									results.push(element);
									
									recur(cursor.next(), page, res, results, i+1);
								});
							}
							else{
								res.render('index',{results,s,page,uId});
							}

				});

				//console.log(results);
				
			}
			

		//console.log(results);
		
		

		/*var results = [];
		results.push("hello");
		var i = 0;
		Portfolio.find().limit(page*10).cursor().on('data',function(doc){
		
					if(i>=(page-1)*10)
					{


						Project.find({id:doc.id}).limit(2,function(err,works){
							var element = {
								name: doc.name,
								profile_picture: doc.profile_picture,
								projects: works
							};
							results.push("hello");
							results.push(element);
						});


						
					}

				i++;
			});

		console.log(results);
		return results;*/


	},
	hasPortofolio:function(req,res){
		Portfolio.find({id:req.cookies.id},function(err,p){
			if(p.length>0)
				res.redirect('portfolio');
			else
				res.render('createPortfolioTemp');
		})
	}
}

module.exports = portfolioController;