
const makeMap = async (target, center={ lat: 37.751917, lng: -122.447489 }) => {
   await checkData(()=>window.google);

   let map_el = $(target);

   if(!map_el.data("map")) map_el.data({
      "map": new google.maps.Map(map_el[0], {
         center,
         zoom: 12,
         disableDefaultUI: true,
         styles: mapstyles,
      }),
      "infoWindow": new google.maps.InfoWindow({content:''}),
   });

   return map_el;
}


const makeMarkers = (map_el, map_locs=[]) => {
   let {map,markers} = map_el.data();

   if(markers) markers.forEach(m=>m.setMap(null));

   markers = [];

   map_locs.forEach(l=>{
      let m = new google.maps.Marker({
         position: l,
         map,
         icon: {
            url: l.icon,
            scaledSize: {
               width:40,
               height:40,
            }
         }
      });
      markers.push(m);
   });

   map_el.data({markers});
   setTimeout(()=>{ setMapBounds(map_el,map_locs); }, 150);
}



const setMapBounds = (map_el,map_locs) => {
   let {map} = map_el.data();
   let zoom = 14;

   if(map_locs.length === 1) {
      map.setCenter(map_locs[0]);
      map.setZoom(zoom);
   } else if(map_locs.length === 0) {
      if(window.location.protocol !== "https:") return;
      else {
         navigator.geolocation.getCurrentPosition(p=>{
            let pos = {
               lat:p.coords.latitude,
               lng:p.coords.longitude,
            };
            map.setCenter(pos);
            map.setZoom(zoom);
         },
         (...args)=>{
            console.log(args)
         },
         {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 0,
         })
      }
   } else {
      let bounds = new google.maps.LatLngBounds(null);
      map_locs.forEach(l => {
         bounds.extend(l);
      });
      map.fitBounds(bounds);
   }
}




const mapstyles = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
]