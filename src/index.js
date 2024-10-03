import * as maplibregl from "maplibre-gl";
import 'maplibre-gl/dist/maplibre-gl.css';
import './style.css';

const init_center = [139.93003, 35.72164-1];
const init_coord = [139.93003, 35.72164];
const init_zoom = 5;
const init_bearing = 0;
const init_pitch = 0;

const map = new maplibregl.Map({
    container: 'map',
    style: 'https://tile.openstreetmap.jp/styles/osm-bright-ja/style.json',
    center: init_center,
    interactive: true,
    zoom: init_zoom,
    bearing: init_bearing,
    pitch: init_pitch,
    attributionControl: false,
    renderWorldCopies: false
});

const attCntl = new maplibregl.AttributionControl({
    customAttribution:'<a href="https://github.com/sanskruthiya/MyGlobalJourney" target="_blank">GitHub</a>',
    compact: true
});
map.addControl(attCntl, 'bottom-right');

map.on('load', () => {
    map.setProjection({"type": "globe"})
    map.panBy([0,10]);
});

const chapters = {
    '2011 Chiba, Japan': {
        center: init_center,
        zoom: init_zoom,
        bearing: init_bearing,
        pitch: init_pitch,
        speed: 1,
        coordinates: init_coord,
        caption: '<img class="photo" loading="lazy" src="app/image/01_Ichikawa.jpg" width="100%"><p class="tipstyle01">2011</p><p class="tipstyle02">Ichikawa-city, Chiba-prefecture, Japan<br><span class="style01">Tap this popup and fly to the next chapter!</span></p>',
        popup_flag: 'top',
    },
    '2012 Kandy Sri Lanka': {
        center: [80.63856,7.29355-1.5],
        zoom: 2,
        bearing: 0,
        pitch: 0,
        speed: 0.5,
        coordinates: [80.63856,7.29355],
        caption: '<img class="photo" loading="lazy" src="app/image/11_Kandy.jpg" width="100%"><p class="tipstyle01">2012</p><p class="tipstyle02">Kandy, Sri Lanka</p>',
        popup_flag: 'top',
    },
    '2013 Birmingham, UK': {
        center: [-1.93057, 52.45003-1.5],
        zoom: 2,
        bearing: 0,
        pitch: 0,
        speed: 0.3,
        coordinates: [-1.93057, 52.45003],
        caption: '<img class="photo" loading="lazy" src="app/image/06_Birmingham.jpg" width="100%"><p class="tipstyle01">2013</p><p class="tipstyle02">Birmingham, England</p>',
        popup_flag: 'top',
    },
    '2014 Lusaka, Zambia': {
        center: [28.33094, -15.40405-2],
        zoom: 2,
        bearing: 0,
        pitch: 0,
        speed: 0.3,
        coordinates: [28.33094, -15.40405],
        caption: '<img class="photo" loading="lazy" src="app/image/07_Zambia.jpg" width="100%"><p class="tipstyle01">2014</p><p class="tipstyle02">Lusaka, Zambia</p>',
        popup_flag: 'top',
    },
    '2015 Kyiv, Ukraine': {
        center: [30.46044, 50.42192-1.5],
        zoom: 2,
        bearing: 0,
        pitch: 0,
        speed: 0.3,
        coordinates: [30.46044, 50.42192],
        caption: '<img class="photo" loading="lazy" src="app/image/09_Kyiv.jpg" width="100%"><p class="tipstyle01">2015</p><p class="tipstyle02">Kyiv, Ukraine</p>',
        popup_flag: 'top',
    },
    '2016 Kigali, Rwanda': {
        center: [30.10493, -1.95826-1],
        zoom: 2,
        bearing: 0,
        pitch: 0,
        speed: 0.3,
        coordinates: [30.10493, -1.95826],
        caption: '<img class="photo" loading="lazy" src="app/image/10_Kigali.jpg" width="100%"><p class="tipstyle01">2016</p><p class="tipstyle02">Kigali, Rwanda</p>',
        popup_flag: 'top',
    },
    '2017 Port Moresby, Papua New Guinea': {
        center: [147.18250, -9.44634-2],
        zoom: 3,
        bearing: 0,
        pitch: 0,
        speed: 0.3,
        coordinates: [147.18250, -9.44634],
        caption: '<img class="photo" loading="lazy" src="app/image/12_PapuaNewGuinea.jpg" width="100%"><p class="tipstyle01">2017</p><p class="tipstyle02">Port Moresby, Papua New Guinea</p>',
        popup_flag: 'top',
    },
    '2018 Dili, East Timor': {
        center: [125.54692, -8.55419-2],
        zoom: 3,
        bearing: 0,
        pitch: 0,
        speed: 0.3,
        coordinates: [125.54692, -8.55419],
        caption: '<img class="photo" loading="lazy" src="app/image/13_EastTimor.jpg" width="100%"><p class="tipstyle01">2018</p><p class="tipstyle02">Dili, East Timor</p>',
        popup_flag: 'top',
    },
    '2019 Bucharest, Romania': {
        center: [26.10317, 44.43653-0.5],
        zoom: 2,
        bearing: 0,
        pitch: 0,
        speed: 0.5,
        coordinates: [26.10317, 44.43653],
        caption: '<img class="photo" loading="lazy" src="app/image/15_Bucharest.jpg" width="100%"><p class="tipstyle01">2019</p><p class="tipstyle02">Bucharest, Romania</p>',
        popup_flag: 'top',
    },
    '2020 Palo Alto, USA': {
        center: [-122.14537, 37.43386-0.1],
        zoom: 4,
        bearing: 0,
        pitch: 0,
        speed: 0.5,
        coordinates: [-122.14537, 37.43386],
        caption: '<img class="photo" loading="lazy" src="app/image/14_PaloAlto.jpg" width="100%"><p class="tipstyle01">2020</p><p class="tipstyle02">Palo Alto, USA</p>',
        popup_flag: 'top',
    },
    '2021 Kashiwa-shi, Japan': {
        center: [139.73872, 35.71625-1],
        zoom: 5,
        bearing: 0,
        pitch: 0,
        speed: 0.3,
        coordinates: [139.73872, 35.71625],
        caption: '<img class="photo" loading="lazy" src="app/image/16_KashiwaTanaka.jpg" width="100%"><p class="tipstyle01">2021</p><p class="tipstyle02">Kashiwa-shi, Japan</p>',
        popup_flag: 'top',
    },
}

let popup_top = new maplibregl.Popup({closeButton: true, closeOnClick: false, focusAfterOpen: false, anchor:"top", className:"t-popup", maxWidth:'320px'});
let popup_btm = new maplibregl.Popup({closeButton: true, closeOnClick: false, focusAfterOpen: false, anchor:"bottom", className:"t-popup", maxWidth:'320px'});

const chapterNames = Object.keys(chapters);
for (let i = 0; i < chapterNames.length; i++) {
    const selectChapter = document.getElementById('chapter-id');
    const optionName = document.createElement('option');
    optionName.value = chapterNames[i];
    optionName.textContent = chapterNames[i];
    selectChapter.appendChild(optionName);
}

if (chapters[chapterNames[0]]["popup_flag"]==='top'){
    popup_top.setLngLat(chapters[chapterNames[0]]["coordinates"]).setHTML(chapters[chapterNames[0]]["caption"]).setOffset([0,10]).addTo(map);
}else{
    popup_btm.setLngLat(chapters[chapterNames[0]]["coordinates"]).setHTML(chapters[chapterNames[0]]["caption"]).setOffset([0,-10]).addTo(map);
};

let select_flag = 0;
let chapter_i = 1;

const changePopup = function changePopup() {
    select_flag = 1;
    popup_top.remove();
    popup_btm.remove();
    if (chapter_i < chapterNames.length) {
        let chapter_id = chapterNames[chapter_i];
        map.flyTo({
            center: chapters[chapter_id]["center"],
            zoom: chapters[chapter_id]["zoom"],
            bearing: chapters[chapter_id]["bearing"],
            pitch: chapters[chapter_id]["pitch"],
            speed: chapters[chapter_id]["speed"],
            //curve: 1.5,
        });
        if (chapters[chapter_id]["popup_flag"]==='top'){
            popup_top.setLngLat(chapters[chapter_id]["coordinates"]).setHTML(chapters[chapter_id]["caption"]).setOffset([0,10]).addTo(map);
        }else{
            popup_btm.setLngLat(chapters[chapter_id]["coordinates"]).setHTML(chapters[chapter_id]["caption"]).setOffset([0,-10]).addTo(map);
        };
        let trigger = document.getElementsByClassName("t-popup");
        triggers = Array.from(trigger);
        triggers.forEach(function(target) {
            target.addEventListener('click', changePopup);
        });
        const select = document.getElementById('chapter-id');        
	    select.options[chapter_i].selected = true;
        chapter_i++;
    }else {
        popup_top.setLngLat([139.73872, 35.71625]).setHTML('<img class="photo" loading="lazy" src="app/image/00_Ichikawa.jpg" width="100%"><p class="tipstyle01">Thank you!</p>').setOffset([0,20]).addTo(map);
    };
    select_flag = 0;
}

window.changePopup = changePopup;

const selectedChapter = document.querySelector('.chapter-set');
selectedChapter.addEventListener('change', function () {
    if (select_flag === 0){
        chapter_i = selectedChapter.selectedIndex;
        changePopup();
    }else{
        chapter_i = selectedChapter.selectedIndex;
        select_flag = 0;
    };
});

let trigger = document.getElementsByClassName("t-popup");
let triggers = Array.from(trigger);
triggers.forEach(function(target) {
  target.addEventListener('click', function () {
      changePopup();
  });
});
