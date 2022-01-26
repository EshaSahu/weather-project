const express=require("express");
const bodyParser=require("body-parser");
const https = require("https");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
   res.sendFile(__dirname + "/index.html");
    });
app.post("/", function(req, res){
    console.log("post request recieved");
    const query=req.body.cityName;
        const url="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=0102463263937c8e32129722c5aea8dc&units=metric";
   https.get(url, function(response){
       console.log(response.statusCode);
       response.on("data", function(data){
           const weatherData=JSON.parse(data)
           const temp=weatherData.main.temp
           const weatherDescription=weatherData.weather[0].description
           const pressure=weatherData.main.pressure
           const humidity=weatherData.main.humidity
           const icon=weatherData.weather[0].icon
           const imageURL="http://openweathermap.org/img/wn/" + icon + "@2x.png"
           console.log(weatherData);
           console.log(temp);
           console.log(humidity);
           console.log(pressure);
           res.write("<h1> City: " + query + "</h1>");
           res.write("<h1> Current Weather: " + weatherDescription + "</h1>");
           res.write("<h1> Temperature (in degree celcius): " + temp + "</h1>");
           res.write("<h1> Humidity: " + humidity + "</h1>");
           res.write("<h1> Pressure: " + pressure + "</h1>");
           res.write("<img src=" + imageURL + ">");
           res.send()
       });
   });
});
app.listen(8000, function(){
        console.log("Server running at port 8000.");
    });











