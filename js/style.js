let enFont = 'Montserrat'
let zhTwFont = 'Courier'
let jaFont = 'M PLUS Rounded 1c'

// console.log(myLocale);

const setEnFont = () => {
  $('.container').css('font-family', enFont)
  localStorage.setItem('my-locale', 'en')
}

const setZhTwFont = () => {
  $('.container').css('font-family', zhTwFont)
  localStorage.setItem('my-locale', 'zh-tw')
}

const setJaFont = () => {
  $('.container').css('font-family', jaFont)
  localStorage.setItem('my-locale', 'ja')
}

// set default font

$('.btn-en').click(function() {
  setEnFont()
  console.log('en!')
})

$('.btn-zh-tw').click(function() {
  setZhTwFont()
  console.log('zh-tw!')
})

$('.btn-ja').click(function() {
  setJaFont()
  console.log('ja!')
})
