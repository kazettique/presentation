// Youbike API: https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.json
let allData
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

const handleClick = () => {
  let sno = document.querySelector('.sno').value
  let oneData = allData[sno]
  console.log(oneData)
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
