// Youbike API: https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.json
let allData

// ==== START OF FUNCTIONS ====
// Get all data from API
const fetchData = () => {
  fetch('https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.json')
    .then(res => res.json())
    .then(data => (allData = data.retVal))
    .catch(err => console.log(err))
}

// Click to search
const searchClick = (selectedStation = '') => {
  // Get search filtered condition
  let districtSelected = document.querySelector('#districtMenu').value
  let keyword = document.querySelector('#keyword').value
  // Change color of station dot on map according to the condition
  showSearchResult(districtSelected, keyword, selectedStation)
  return false
}

// Function to show all station markers on map
const showSearchResult = (
  districtSelected = 'all',
  keyword,
  selectedStation = ''
) => {
  let colorAqua = '#DEFDFF'
  let colorOrange = 'rgb(251,101,33)'
  // Clean all contents in sideNav
  emptyDiv()
  // Array for markers
  let markerArr = []
  // ------- For test use ------
  // let x = 0
  // let y = 0
  // ---------------------------
  // Push all geoLocations of stations into array
  for (let item in allData) {
    // Transform data type to meet Open Layer's need
    let lng = parseFloat(allData[item].lng)
    let lat = parseFloat(allData[item].lat)
    // Generate a new marker
    let marker = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([lng, lat])),
    })
    // Condition initialization
    let conditionDistrict = false
    let conditionKeyword = false
    // Get keyword from station name
    let snaKeywordFound = allData[item].sna.search(keyword)
    // Get keyword from address
    let arKeywordFound = allData[item].ar.search(keyword)
    // Get keyword from district
    let sareaKeywordFound = allData[item].sarea.search(keyword)
    // If keyword is found, set condition to 'true'
    // Keyword not found: -1
    // Keyword not input: 0 (namely, no keyword condition)
    if (
      snaKeywordFound !== -1 ||
      snaKeywordFound === 0 ||
      arKeywordFound !== -1 ||
      arKeywordFound === 0 ||
      sareaKeywordFound !== -1 ||
      sareaKeywordFound === 0
    )
      conditionKeyword = true

    // If district selection is selected, set condition to 'true'
    if (districtSelected === allData[item].sarea || districtSelected === 'all')
      conditionDistrict = true

    // GATHERING ALL DOTS!!! WATCH OUT FOR CONDITIONS!!
    // Show others stations with aqua dots
    if (conditionDistrict && conditionKeyword) {
      if (allData[item].sno === selectedStation) {
        setMarkerColor(marker, colorOrange, 1)
      } else setMarkerColor(marker, colorAqua, 0.7)
      showInfo(allData[item])
      markerArr.push(marker)
    }
  }
  // ------- For test use ------
  // console.log('x: ' + x)
  // console.log('y: ' + y)
  // ---------------------------
  let layerName = 'markers'
  // Remove the old marker layer first
  removeMapLayer(layerName)
  let tempObj = { features: markerArr } // tempObj is an ARRAY
  let vectorSource = new ol.source.Vector(tempObj)
  let markerVectorLayer = new ol.layer.Vector({
    source: vectorSource,
    name: layerName,
  })
  // Generate new marker layer
  map.addLayer(markerVectorLayer)
}

// Colorize the marker
const setMarkerColor = (marker, colorCode, dotSize = 0.4) => {
  marker.setStyle(
    new ol.style.Style({
      image: new ol.style.Icon({
        color: colorCode,
        crossOrigin: 'anonymous',
        src: '/img/dot.png',
        scale: dotSize,
      }),
    })
  )
}

const showInfo = data => {
  let stationBlock = `
    <div class="stationBlock container-fluid">
      <p>
        <span class='stationInfo'><b>${data.sna}</b></span>
        <button 
          onclick="flyTo('${data.sno}',${data.lng},${data.lat})"
          class="goToBtn btn btn-warning">前往</button>
      </p>
      <p>
        <span class='stationInfo'>可借：<b>${data.sbi}</b></span>
        <span class='stationInfo'>可還：<b>${data.bemp}</b></span>
      </p>
      <p>位置：<small><b>${data.sarea}</b> ${data.ar}</small></p>
    </div>`
  $('#searchResultBlock').append(stationBlock)
}

const emptyDiv = () => $('#searchResultBlock').empty()

const dataLoading = () => {
  // Thanks for this codePen!!
  // https://codepen.io/luv2code/pen/evaBXm
  $(document).ready(() => {
    $('#loadMe').modal({
      backdrop: 'static', //remove ability to close modal with click
      keyboard: false, //remove option to close with keyboard
      show: true, //Display loader!
    })
    setTimeout(() => $('#loadMe').modal('hide'), 1500)
  })
}

const flyTo = (sno = '', geoLng = mapCenterLng, geoLat = mapCenterLng) => {
  let location = ol.proj.fromLonLat([geoLng, geoLat])
  let duration = 3500
  let zoom = 17
  view.animate({ center: location, duration: duration })
  // Paint the dots!
  searchClick(sno)
  // Flying animation
  view.animate(
    { zoom: zoom - 3, duration: duration / 2 },
    { zoom: zoom, duration: duration / 2 }
  )
}

// Haven't used yet
const showBikeIcon = (geoLng, geoLat) => {
  console.log('enter show bike')
  let layerName = 'image'
  let increment = 0.001
  let north = geoLat + increment
  let south = geoLat
  let east = geoLng - increment / 2
  let west = geoLng + increment / 2
  let extent = ol.proj.transformExtent(
    [east, north, west, south],
    'EPSG:4326',
    'EPSG:3857'
  )
  let image = new ol.source.ImageStatic({
    url: '/img/youbike-icon2.svg',
    imageExtent: extent,
  })
  let imageLayer = new ol.layer.Image({ source: image, name: layerName })
  removeMapLayer(layerName)
  map.addLayer(imageLayer)
}

const removeMapLayer = layerName => {
  map.getLayers().forEach(layer => {
    if (layer.get('name') == layerName) map.removeLayer(layer)
  })
}

// ==== THE END OF FUNCTIONS =====
// Set center of map
// 設定松山機場為中心點
let mapCenterLng = 121.5527
let mapCenterLat = 25.0676

// Show map on page
let baseMapLayer = new ol.layer.Tile({ source: new ol.source.OSM() })
let view = new ol.View({
  center: ol.proj.fromLonLat([mapCenterLng, mapCenterLat]),
  zoom: 12,
})
let map = new ol.Map({
  target: 'map',
  layers: [baseMapLayer],
  view: view,
})

// Get data the first time
fetchData()
// Get data from API with 5min interval
setInterval(fetchData(), 5 * 60 * 1000)

// Initialize marker at the first time
setTimeout(() => showSearchResult(), 1000)

dataLoading()

$('#keyword').keypress(e => {
  e.preventDefault()
  if (e.which == 13) $('#searchBtn').click()
})
