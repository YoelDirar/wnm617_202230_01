const makeMap = async (target, center={ lat: 37.751917, lng: -122.447489 }) => {
   await checkData(()=>window.google);

   let map_el = $(target);

   if(!map_el.data("map")) map_el.data({
      "map": new google.maps.Map(map_el[0], {
         center,
         zoom: 12,
         disableDefaultUI: true,
      })
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
}