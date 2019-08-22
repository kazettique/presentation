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

// Progress bar
window.onscroll = function() {
  myFunction()
}

function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop
  var height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight
  var scrolled = (winScroll / height) * 100
  document.querySelector('.progress-bar').style.width = scrolled + '%'
}

// Scroll top button
$(window).scroll(function() {
  if ($(this).scrollTop() > 50) {
    $('.scrolltop:hidden')
      .stop(true, true)
      .fadeIn()
  } else {
    $('.scrolltop')
      .stop(true, true)
      .fadeOut()
  }
})
$(function() {
  $('.scroll').click(function() {
    $('html,body').animate({ scrollTop: 0 })
    return false
  })
})
