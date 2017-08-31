const request = require('request');
 

var geocode = function (address, cb) {
    request({
        url:'https://maps.googleapis.com/maps/api/geocode/json?address='+address,
        json: true    
    }, function (error, response, body) {
    
    if(error) {
        
        cb ('Unable to connect to google servers ',{});
        
    } else if (body.status == 'OK'){
        
        cb (null,{
            formatted_add: body.results[0].formatted_address,
            lat : body.results[0].geometry.location.lat,
            lan : body.results[0].geometry.location.lng
            
        });
    
    } else if(body.status == 'ZERO_RESULTS') {
        
       cb ('Unable to find address',{});
    }

    });
};

var weather = function (input , cb) {
    
    request({
        url:'https://api.darksky.net/forecast/515b776214f82fccaeeec2a35305bb59/'+input.lat+','+input.lan,
        json: true
    }, function (error, response, body) {
        
        if (error || response.statusCode != 200) {
            cb (error,{});
        } else {
            cb (null , body.currently.temperature);
        }
        
    });
}


module.exports = {
    geocode : geocode,
    weather : weather
};