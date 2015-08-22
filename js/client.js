$(document).ready(function(){
	console.log('here');
	
	function showLocation(position)
	{
       var lat = position.coords.latitude;
       var lon = position.coords.longitude;
       $('#result').html('Latitude '+lat+' Longitude '+lon);
	}
	function errorHandler(err)
	{
		if(err.code==1)
		{
			alert('access is denied');
		}
		else if(err.code ==2)
		{
			alert('position is unavailable');
		}
	}
	$('#loc').click(function(){
		if($('#place').val())
		{
            $.ajax({type: "GET", url:'http://maps.googleapis.com/maps/api/geocode/json?address='+ $('#place').val()                  
            }).done(function(result){
            	console.log(result);
            	console.log(result.results[0].geometry.location);
            });
		}
		else
		{
            if(navigator.geolocation)
		    {
             var options = {timeout:60000};
             navigator.geolocation.getCurrentPosition(showLocation, errorHandler, options);
		    }
		    else
		    {
		     alert('Sorry browser does not support geolocation');
		    }
		}
	});
	$('#photo').change(function(e)
	{
		F = e.target.files[0];
		console.log(F);
	})
	$('#cool').click(function()
	{
		if($('#place').val())
		{
            $.ajax({type: "GET", url:'http://maps.googleapis.com/maps/api/geocode/json?address='+ $('#place').val()                  
            }).done(function(result){
            	console.log(result);
            	console.log(result.results[0].geometry.location);
            });
		}
		//Call /new post api to get url of cloudinary
		//$.ajax({url:"/new",method:"POST"});
        var formData = new FormData();

        formData.append("apikey", "eeb2cede-9d34-4318-9211-af9ba51ac9b2");
        formData.append("additional", "true");
        formData.append("url","https://res.cloudinary.com/dpoft0dyi/image/upload/v1440155869/sample.jpg");

        console.log('here before ajax');
        $.ajax({url:"https://api.idolondemand.com/1/api/sync/detectfaces/v1", type:"POST", processData: false, contentType: 'multipart/form-data',data: formData
        	,mimeType: 'multipart/form-data'}).done(
        	function(body){
           console.log('inside ajax return call');
           console.log(body);
           var b = JSON.parse(body);
        });
        	//e.preventDefault();
	});
});