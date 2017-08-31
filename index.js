const geocall = require('./geocall');
const weather = require('./weather');

const yargs = require('yargs');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            description: 'Area for weather',
            string: true
        }
    })
    .help()
    .alias('help','h')
    .argv;


var encodedaddress = encodeURIComponent(argv.a);


geocall.geocode(encodedaddress, function (errorMessage , result) {
    
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(result);
        weather.weatherapi(result, function(e, r){
            if (e) {
                console.log ('Error ', e);
            } else {
                console.log('temperature',r.temp);
                console.log('temperature',r.summ);
            }
        })
    }
});



