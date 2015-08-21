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
		if(navigator.geolocation)
		{
            var options = {timeout:60000};
            navigator.geolocation.getCurrentPosition(showLocation, errorHandler, options);
		}
		else
		{
			alert('Sorry browser does not support geolocation');
		}
	});
});