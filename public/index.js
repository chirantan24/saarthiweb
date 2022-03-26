var map = L.map('map').setView([55.892325, 37.52000], 15);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var xlng = 0.000256;
var xlat = 0.000200;

map.on('click', function(e) {
  console.log(e.latlng.lat,e.latlng.lng);
  //var c = L.circle([e.latlng.lat,e.latlng.lng], {radius: 15}).addTo(map);
  L.polygon([
    [e.latlng.lat-xlat,e.latlng.lng-xlng],
    [e.latlng.lat+xlat,e.latlng.lng-xlng],
    [e.latlng.lat-xlat,e.latlng.lng+xlng],
    [e.latlng.lat+xlat,e.latlng.lng+xlng],
  ]).addTo(map);
  
    L.polyline([
    [e.latlng.lat,e.latlng.lng-xlng],
    [e.latlng.lat,e.latlng.lng+xlng]
  ]).addTo(map);
  
});