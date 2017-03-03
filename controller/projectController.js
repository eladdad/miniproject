var Project = require('../model/project');



let projectController = {
	createProject:function(req,res){
		let project = new Project(req);

		project.save(function(err, project){
            if(err){
                res.send(err.message)
                console.log(err);
            }
            else{
                //console.log(project);
                res.redirect('/portfolio');
            }
        });
	},

    getWorks:function(element){
        Project.find({id:element.id}).limit(2).exec(function(err,works){
            element.works = works;
        });
    }
}

module.exports = projectController;