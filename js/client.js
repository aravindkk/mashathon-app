$(document).ready(function(){
	console.log('here');
	$('#iscool').hide();
	$('#isuncool').hide();
	var lat, lon, msg="This is a cool place.", age="youth";
	function showLocation(position)
	{
       lat = position.coords.latitude;
       lon = position.coords.longitude;
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
            	lat = result.results[0].geometry.location.lat;
            	lon = result.results[0].geometry.location.lng;
            	console.log(lat);
            	console.log(lon);
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
	$('#ref').click(function(){
		$('#loader').show();
		$('#out').html('');
		$('#out').hide();
	});
	$('#ref2').click(function(){
		$('#loader').show();
		$('#out').html('');
		$('#out').hide();
	});

	function abc(data)
	{
		//console.log(JSON.stringify(data));
		//alert('here in abc');
		//alert(data);
		var d = JSON.stringify(data);
		d = JSON.parse(d);
		//console.log(d);
		var category= {"child":"children","adult":"health","elderly":"outside","youth":"sport"};
		msg = d.random_recommendations? data.random_recommendations[category[age]]:"This is a cool place.";
		$.ajax({type:"POST",url:"https://api.idolondemand.com/1/api/sync/analyzesentiment/v1",data:{apikey:"eeb2cede-9d34-4318-9211-af9ba51ac9b2",text:msg}}).done(function(body){
              	console.log(body);
              	$('#loader').hide();
              	if(body.aggregate.sentiment=="positive")
              	{
                   $('#out').show();$('#out').html('<p id="iscool" class="iscool">Cool, this place is just the perfect fit for you.</p>'+'<p>'+msg+'</p>');
              	}	  
                else
                {
                   	  $('#out').show();$('#out').html('<p id="isuncool" class="isuncool">Oh no, this place is not a great fit for you.</p>'+'<p>'+msg+'</p>');	
                }
              });
	}
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
            	lat = result.results[0].geometry.location.lat;
            	lon = result.results[0].geometry.location.lng;
            	console.log(lat);
            });
		}
		//Call /new post api to get url of cloudinary
		//$.ajax({url:"/new",method:"POST"});

        $.ajax({url:"https://api.idolondemand.com/1/api/sync/detectfaces/v1", type:"POST", data:{apikey: "eeb2cede-9d34-4318-9211-af9ba51ac9b2",url:"https://res.cloudinary.com/dpoft0dyi/image/upload/v1440155869/sample.jpg"}}).done(
        	function(body){
           console.log('inside ajax return call');
           console.log(body);
           //var b = JSON.parse(body);
           //console.log(b);
           console.log(lat);
           console.log(lon);
           age = body.face[0].additional_information?body.face[0].additional_information.age:"youth";
           console.log('age is '+age);
           $.ajax({type:"GET",crossDomain: true,url:"http://api-beta.breezometer.com/baqi/",data:{key:"632a2994a483403cba69b4ffad82dadb",lat:lat,lon:lon},success:abc});
        });
	});
});
