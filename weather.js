const request = require('request');

var weather = function (input , cb) {
    
    request({
        url:'https://api.darksky.net/forecast/515b776214f82fccaeeec2a35305bb59/'+input.lat+','+input.lan,
        json: true
    }, function (error, response, body) {
        
        if (error || response.statusCode != 200) {
            cb (error,{});
        } else {
            cb (null , { temp:body.currently.temperature,
                         summ:body.hourly.summary
                       });
        }
        
    });
};

module.exports = {
    weatherapi:weather
};