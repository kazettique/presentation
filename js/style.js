let enFont = "'Montserrat', sans-serif"
let zhTwFont = "'Noto Sans TC', sans-serif"
let jaFont = "'M PLUS Rounded 1c', sans-serif"
let myLocale = localStorage.getItem('my-locale')

const setFonts = (font, locale) => {
  $('.container').css('font-family', font)
  localStorage.setItem('my-locale', locale)
}

// set default font
switch (myLocale) {
  case 'zh-tw':
    setFonts(zhTwFont, 'zh-tw')
    break
  case 'ja':
    setFonts(jaFont, 'ja')
    break
  default:
    setFonts(enFont, 'en')
}

$('.btn-en').click(function() {
  setFonts(enFont, 'en')
})

$('.btn-zh-tw').click(function() {
  setFonts(zhTwFont, 'zh-tw')
})

$('.btn-ja').click(function() {
  setFonts(jaFont, 'ja')
})
