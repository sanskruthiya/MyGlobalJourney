import * as maplibregl from "maplibre-gl";
import * as pmtiles from 'pmtiles';
import 'maplibre-gl/dist/maplibre-gl.css';
//import MaplibreGeocoder from '@maplibre/maplibre-gl-geocoder';
//import '@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css';
import './style.css';

const protocol = new pmtiles.Protocol();
maplibregl.addProtocol("pmtiles",protocol.tile);

const init_bearing = 0;
const init_pitch = 0;
const viewset_init = [4, 35.681252, 139.767129];
const viewset_hash = (location.hash ? location.hash.slice(1).split('/') : viewset_init);

const map = new maplibregl.Map({
    container: 'map',
    style: 'https://tile.openstreetmap.jp/styles/osm-bright-ja/style.json',
    center: [viewset_hash[2],viewset_hash[1]],
    interactive: true,
    zoom: viewset_hash[0],
    minZoom: 1,
    maxZoom: 20,
    bearing: init_bearing,
    pitch: init_pitch,
    attributionControl: false,
    renderWorldCopies: false,
    hash: true,
    //projection: "globe"
    //useSpecialProjectionForSymbols: true
    //projection: {"type": "globe"}
});

map.on('load', () => {
    map.addSource('pb_point', {
        'type': 'vector',
        'url': 'pmtiles://app/data/phonebooth_osm_cluster.pmtiles',
        'minzoom': 1,
        'maxzoom': 14,
        'cluster': true,
        'clusterMaxZoom': 14,
        'clusterRadius': 50
    });
    map.addLayer({
        'id': 'poi_point',
        'type': 'circle',
        'source':'pb_point',
        'source-layer':'phonebooth_osm',
        'layout': {
            'visibility': 'visible',
        },
        'paint': {
            'circle-color':'#1e90ff',
            'circle-stroke-color':'#fff',
            'circle-stroke-width':1,
            'circle-opacity': 0.8,
            'circle-radius': ['interpolate',['linear'],['zoom'],1,5,20,10]
        }
    });

    map.setProjection({"type": "globe"});
  
    map.on('click', 'poi_point', function (e){
        const feat = map.queryRenderedFeatures(e.point, { layers: ['poi_point']})[0];
        const fx = feat.geometry["coordinates"][1].toFixed(6);
        const fy = feat.geometry["coordinates"][0].toFixed(6);
        map.panTo([fy, fx], {duration:1000});
    
        let popupContent;
        popupContent = '<p class="tipstyle01"><a href="https://www.google.com/maps/search/?api=1&query=' + fx +',' + fy + '&zoom=18" target="_blank" rel="noopener">Google Map</a></p><hr>';
        popupContent += '<p class="tipstyle01"><a href="https://www.google.com/maps/@?api=1&map_action=pano&parameters&viewpoint=' + fx +',' + fy + '" target="_blank" rel="noopener">Google Street View</a></p>';
        
        new maplibregl.Popup({closeButton:true, focusAfterOpen:false, className:'t-popup', maxWidth:'360px', anchor:'bottom'})
        .setLngLat([fy, fx])
        .setHTML(popupContent)
        .addTo(map);
    });
});

const geocoderApi = {
    forwardGeocode: async (config) => {
        const features = [];
        try {
            const request =
        `https://nominatim.openstreetmap.org/search?q=${
            config.query
        }&format=geojson&polygon_geojson=1&addressdetails=1`;
            const response = await fetch(request);
            const geojson = await response.json();
            for (const feature of geojson.features) {
                const center = [
                    feature.bbox[0] +
                (feature.bbox[2] - feature.bbox[0]) / 2,
                    feature.bbox[1] +
                (feature.bbox[3] - feature.bbox[1]) / 2
                ];
                const point = {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: center
                    },
                    place_name: feature.properties.display_name,
                    properties: feature.properties,
                    text: feature.properties.display_name,
                    place_type: ['place'],
                    center
                };
                features.push(point);
            }
        } catch (e) {
            console.error(`Failed to forward Geocode with error: ${e}`);
        }

        return {
            features
        };
    }
};
/*
const geocoder = new MaplibreGeocoder(geocoderApi, {
        maplibregl,
        zoom: 10,
        placeholder: 'Search location',
        collapsed: true
    }
);
map.addControl(geocoder, 'top-right');
*/

map.addControl(
    new maplibregl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    })
);

const attCntl = new maplibregl.AttributionControl({
    customAttribution: '<a href="https://github.com/sanskruthiya/phonebooth_osm" target="_blank">GitHub</a>',
    compact: true
});

map.addControl(attCntl, 'bottom-right');
