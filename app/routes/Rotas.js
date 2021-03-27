module.exports = function(application){
   application.get('/GetMarvelComics', function(req, res){
        application.app.controllers.GetComics.getComics(application,req,res);
   });

  
}