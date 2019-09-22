// Youbike API: https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.json
let allData
let stationLocation
;(function() {
  fetch('https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.json')
    .then(res => res.json())
    .then(data => {
      allData = data.retVal
      // console.log(allData)
      // console.log(allData['0001'].lng)
    })
    .then()
    .catch(err => {
      console.log(err)
    })
})()

const handleClick = () => {
  let sno = document.querySelector('.sno').value
  let oneData = allData[sno]
  console.log(oneData)
  // export let dataExport = allData
  // 如果沒有輸入站台編號，顯示'NA'
  if (sno === '') {
    document.querySelector('.sna').innerHTML = 'NA'
    document.querySelector('.tot').innerHTML = 'NA'
    document.querySelector('.sbi').innerHTML = 'NA'
    document.querySelector('.bemp').innerHTML = 'NA'
  } else {
    // 顯示站台名稱、總車數、可借數量、空車位數量
    document.querySelector('.sna').innerHTML = oneData.sna
    document.querySelector('.tot').innerHTML = oneData.tot
    document.querySelector('.sbi').innerHTML = oneData.sbi
    document.querySelector('.bemp').innerHTML = oneData.bemp
  }
}

// show map in body
let baseMapLayer = new ol.layer.Tile({
  source: new ol.source.OSM(),
})

let map = new ol.Map({
  target: 'map',
  layers: [baseMapLayer],
  view: new ol.View({
    center: ol.proj.fromLonLat([121.56, 25.03]),
    zoom: 12,
  }),
})

// Show all station markers on map
setTimeout(() => {
  let markerArr = []
  for (let item in allData) {
    let lon = parseFloat(allData[item].lng)
    let lat = parseFloat(allData[item].lng)
    let marker = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat])),
    })
    markerArr.push(marker)
  }
  let tempArr = []
  let objIndex = []

  // Make iterable index for allData
  for (let item in allData) {
    objIndex.push(allData[item].sno)
  }

  // Push all geolocation of stations into array
  for (let i = 0; i < Object.keys(allData).length; i++) {
    let lon2 = parseFloat(allData[objIndex[i]].lng)
    let lat2 = parseFloat(allData[objIndex[i]].lat)
    let marker = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([lon2, lat2])),
    })
    tempArr.push(marker)
  }

  let tempObj = { features: tempArr }
  let vectorSource = new ol.source.Vector(tempObj)
  let markerVectorLayer = new ol.layer.Vector({
    source: vectorSource,
  })
  map.addLayer(markerVectorLayer)
}, 3000)
