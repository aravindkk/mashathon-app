var express=require('express');
var multer=require('multer');
var app=express();
app.use(multer({ dest: './uploads/', onFileUploadComplete: function(file){
  console.log('upload complete');
}}));
var bodyParser=require('body-parser');
var http=require('http');
var server=http.createServer(app);
var fs=require('fs');
var request = require('request');

var cloudinary=require('cloudinary');

var application_root=__dirname,
    path=require('path');


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(application_root));



cloudinary.config({
 cloud_name: process.env.cloudName,
 api_key: process.env.apiKey,
 api_secret: process.env.apiSecret
})


app.get('/',function(req,res)
{
 res.sendfile('index.html');
});

app.post('/new', function(req,res){
  var imageFile=req.files.photo;
  console.log(imageFile);     
  if(imageFile)
  {
      console.log('calling api'); 
    cloudinary.uploader.upload(
      imageFile.path,
      function(result) { console.log(result);
       console.log('***************************');
       console.log(result.secure_url);
       res.json({url: result.secure_url});
       /*
       //res.send('<p>Your image was uploaded to :'+result.secure_url +'</p>');
       //Call HP Idol Face Detection API
         var R =  request.post({url: "https://api.idolondemand.com/1/api/async/detectfaces/v1"
          , form: {url:result.secure_url,apikey:"eeb2cede-9d34-4318-9211-af9ba51ac9b2",additional:true
          }
          }, 
         function(error,response,body)
         {
           console.log('error: '+error);
           if(error)return;//do something
           console.log('response: '+response);
           res.json(response);;
           console.log('body: '+body);
           //res.json(body);
           /*
           var b = JSON.parse(body);
           console.log(b.jobID);
           
           var S = request.get({url: "https://api.idolondemand.com/1/job/status/"+b.jobID+'?apikey=eeb2cede-9d34-4318-9211-af9ba51ac9b2'},function(error,response,body){
              if(error)return;//do something
              console.log(body);
              console.log(body.status);
              console.log(body.actions[0].result.additional_information.age);
           });
           
           res.json(b.jobID);
           */
        // });
        
        //var form = R.form();
        //form.append('apikey',"eeb2cede-9d34-4318-9211-af9ba51ac9b2");
        //form.append('file',fs.createReadStream(imageFile.path));
        //form.append('url', result.secure_url);
        //var t = true;
        //form.append('additional',"true");
      },
      {
        public_id: 'sample', 
        crop: 'limit',
        width: 2000,
        height: 2000,                                    
        tags: ['special', 'for_homepage']
       }      
     );
  }
  else
  {
    //No image was uploaded
    //Assume adult age
    var age = "adult";
    //do something
  }
});


var port=process.env.PORT || 5000;
server.listen(port);
console.log("Listening on "+port);
