// Youbike API: https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.json
let allData
  // All data initialization
;(function() {
  fetch('https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.json')
    .then(res => res.json())
    .then(data => {
      allData = data.retVal
    })
    .catch(err => {
      console.log(err)
    })
})()

// ==== START OF FUNCTIONS ====

// Click to search
const handleClick = () => {
  console.log('click!')
  // Get search filtered condition
  let districtSelected = document.querySelector('#districtMenu').value
  let keyword = document.querySelector('#keyword').value
  if (keyword === '') keyword = false
  // Change color of station dot on map according to the condition
  showResults(districtSelected, keyword)
}

// Function to show all station markers on map
const showResults = (districtSelected, keyword) => {
  // Clean all contents in sideNav
  emptyDiv()
  // Array for markers
  let markerArr = []
  // Push all geoLocations of stations into array
  for (let item in allData) {
    // Transform data type to meet Open Layer's need
    let lon = parseFloat(allData[item].lng)
    let lat = parseFloat(allData[item].lat)
    let marker = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat])),
    })

    // Condition initialization
    let conditionDistrict = false
    let conditionKeyword = false
    // 在站台名稱找到相同關鍵字
    let snaKeywordFound = allData[item].sna.search(keyword)
    // 在地址裡找到相同關鍵字
    let arKeywordFound = allData[item].ar.search(keyword)
    // 如果有找到相同關鍵字，上色條件改為'true'
    if (
      // 找不到關鍵字：-1
      (snaKeywordFound !== -1 && snaKeywordFound !== false) ||
      (arKeywordFound !== -1 && arKeywordFound !== false)
    )
      conditionKeyword = true

    // 如果有設定地區條件限制，上色條件改為'true'
    if (districtSelected === allData[item].sarea || districtSelected === '')
      conditionDistrict = true

    // 站台上色，符合條件為橘色
    if (conditionDistrict && conditionKeyword) {
      setMarkerColor(marker, 'rgb(251,101,33)')
      showInfo(allData[item])
    }
    // 其他站台為水藍色
    else setMarkerColor(marker, 'aqua')

    markerArr.push(marker)
  }

  let tempObj = { features: markerArr }
  let vectorSource = new ol.source.Vector(tempObj)
  let markerVectorLayer = new ol.layer.Vector({
    source: vectorSource,
  })
  // 將生成的點加入地圖
  map.addLayer(markerVectorLayer)
}

// 站台上色
const setMarkerColor = (marker, colorCode) => {
  marker.setStyle(
    new ol.style.Style({
      image: new ol.style.Icon({
        color: colorCode,
        crossOrigin: 'anonymous',
        src: '/img/dot.png',
        scale: 0.4,
      }),
    })
  )
}

const showInfo = data => {
  if (data !== undefined) {
    let stationBlock = `<div class="stationBlock container-fluid">
                          <p><span class='stationInfo'>${data.sna}</span></p>
                          <p>總車數：<span class='stationInfo'>${data.tot}</span></p>
                          <p>可借車量：<span class='stationInfo'>${data.sbi}</span></p>
                          <p>空車位：<span class='stationInfo'>${data.bemp}</span></p>
                          <p>位置：<small>${data.sarea} ${data.ar}</small></p>
                        </div>`
    $('#searchResultBlock').append(stationBlock)
  } else $('#searchResultBlock').append('無搜尋結果')
}

const emptyDiv = () => $('#searchResultBlock').empty()

const dataLoading = () => {
  // Thanks for this codePen!!
  // https://codepen.io/luv2code/pen/evaBXm
  $(document).ready(function() {
    $('#loadMe').modal({
      backdrop: 'static', //remove ability to close modal with click
      keyboard: false, //remove option to close with keyboard
      show: true, //Display loader!
    })
    setTimeout(function() {
      $('#loadMe').modal('hide')
    }, 1500)
  })
}

// ==== THE END OF FUNCTIONS =====

// Show map on page
let baseMapLayer = new ol.layer.Tile({
  source: new ol.source.OSM(),
})

let map = new ol.Map({
  target: 'map',
  layers: [baseMapLayer],
  view: new ol.View({
    center: ol.proj.fromLonLat([121.5527, 25.0676]),
    // 以松山機場為中心點
    zoom: 12,
  }),
})

// Initialize marker at the first time
setTimeout(() => showResults(), 1000)

dataLoading()
