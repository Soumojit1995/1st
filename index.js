// this is needed for importing expressjs into our application
const express = require('express')
const appConfig = require('./config/appConfig')
const mongoose = require('mongoose')

const fs =require('fs')
// declaring an instance or crating an application instance
const app = express()
// Bootstrap router
let routesPath ='./routes' 
fs.readdirSync(routesPath).forEach(function (file){
    if (~file.indexOf('.js')){
        console.log('including the following file');
        console.log(routesPath+'/'+file);
        let route = require(routesPath + '/'+ file);
        route.setRouter(app);;
    }
});
// end bootstrap route

// Bootstrap Models
let modelsPath = './models'
fs.readdirSync(modelsPath).forEach(function (file){
    if(~file.indexOf('js')) require(modelsPath + '/'+ file)
    console.log(modelsPath + '/'+ file)
})

//end Bootstrap Models

// listening the server - creating a local server
app.listen(appConfig.port, () => {
    console.log(`Example app listening on port 3000!`);

    let db = mongoose.connect(appConfig.db.url, { useNewUrlParser: true});
})
// handling mongoose connection error
mongoose.connection.on('error', function(err){
    console.log('database connection error');
    console.log(err)
}); // end mongoose connection error

// handling mongoose success event
mongoose.connection.on('open', function (err){
    if(err){
        console.log('database error');
        console.log(err);
    }
    else{
        console.log('database connection open success')
    }
})// end mongoose connection open handle