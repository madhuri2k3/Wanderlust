mapboxgl.accessToken = mapToken;
  const map= new mapboxgl.Map({
        container: 'map',//containerID
        style:'mapbox://styles/mapbox/streets-v12',
        center:listing.geometry.coordinates,//starting pos[lng,lat]
        zoom:9
      });

  

const marker = new mapboxgl.Marker({color:"red"})
.setLnglat(listing.geometry.coordinates)
.setPopup(new mapboxgl.Popup({offset:25}))
.setHTML(`<h4>${listing.location}</h4><p>Exact location will beprovided after booking</p>`)
.addTo(map);      