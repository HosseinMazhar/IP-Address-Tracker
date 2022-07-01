let IP; //we get this from an API (https://api.ipify.org?format=json)
let longitude; //by the help of IP and another API (https://api.ipgeolocation.io)
let latitude; //by the help of IP and another API (https://api.ipgeolocation.io)
let cityName; //another information in our API (https://api.ipgeolocation.io)
let map_init; //define our map
let osm; //define the shape of our map
let marker; //define the marker of our map

let ipDisplay = document.getElementById('ipShowing');
let locationDisplay = document.getElementById('locationShowing');
let callingcodeDisplay = document.getElementById('callingcodeShowing');
let ispDisplay = document.getElementById('ispShowing');
let searchedIP = document.getElementById('searchedIP'); //input value which must be an IP


window.addEventListener('load',getIP); //we want user's to see their location information by loading the page

function getIP(){
    fetch('https://api.ipify.org?format=json') //get ip
    .then(result=>result.json())
    .then(data=>{
        IP=data.ip;
    })
    .then(()=>console.log(IP))
    .then(getInformationFromIP); //this function (getInformationFromIP) uses another api to get more infortion
}

function getInformationFromIP(){
    let userKey="950c659e13b147b2bed0998044580fe4";
    fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${userKey}&ip=${IP}`)
    .then(result=>result.json())
    .then((data)=>{
        console.log(data);
        cityName=data.city;
        longitude=data.longitude;
        latitude=data.latitude;
        mapMaker(latitude,longitude);
        displayInformations(data);
    })
}


function searchIP(){
    if(searchedIP.value=="")
    {
        alert("please Enter something")
    }
    else{
        IP=searchedIP.value;
        let userKey="950c659e13b147b2bed0998044580fe4";
        fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${userKey}&ip=${IP}`)
        .then(result=>result.json())
        .then((data)=>{
        console.log(data);
        if(data.message=="IP to geolocation lookup for domain or service name is not supported on your free subscription. This feature is available to all paid subscriptions only.")
        {
            alert("it's not a valid IP");
        }
        else
        {

            cityName=data.city;
            longitude=data.longitude;
            latitude=data.latitude;
            map_init.remove();
            mapMaker(latitude,longitude);
            displayInformations(data);
        }
    })

    }

}


function mapMaker(lat,long)
{
    map_init = L.map('map',{
        center: [lat, long],
        zoom:8
    });
    osm = L.tileLayer ('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo (map_init);
    marker = L.marker([lat, long]).addTo(map_init);
}

function displayInformations(info)
{
    ipDisplay.innerHTML=info.ip;
    locationDisplay.innerHTML=info.city;
    callingcodeDisplay.innerHTML=info.calling_code;
    ispDisplay.innerHTML=info.isp;
}
