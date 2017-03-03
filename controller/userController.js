var User = require('../model/user');
var Portfolio = require('../model/portfolio');

let userController = {

    createUser:function(req, res){
        let user = new User(req.body);

        user.save(function(err, user){
            if(err){
                res.send(err.message)
                res.render('register',{error:1});
            }
            else{

                console.log(user);
                res.redirect('/?success=register');
            }
        });
    },

    login:function(req,res){
        User.find(req.body,function(err,user){
            if(err|user.length==0)
                res.render('loginTemp',{error:1});
            else
            {
                //console.log(user);
                var id = user[0]._id;
                Portfolio.find({id:id},function(err,portfolio){
                    if(err|portfolio.length==0){
                        //console.log(id);
                        //console.log(portfolio);
                        res.cookie('id', id, {encode:String});
                        
                        res.redirect('/createPortfolio');

                    }
                    else{
                        //console.log(portfolio);
                        res.cookie('id', id, {encode:String});
                        res.cookie('name', portfolio[0].name, {encode:String});
                        
                        res.redirect('/portfolio');
                    }
                });
                
            }
        });
    }
}

module.exports = userController;
