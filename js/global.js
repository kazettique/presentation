jQuery(function($) {
  $.extend($.i18n.parser.emitter, {
    abbr: function(nodes) {
      return '<abbr title="' + nodes[1] + '">' + nodes[0] + '</abbr>'
    },
  })

  // Translate all words
  const do_translate = function() {
    let x = document.querySelectorAll('*[id]:not([id=""])')
    for (let i = 0; i < x.length; i++) {
      let id_name = x[i].id
      $(`#${id_name}`).html($.i18n(id_name))
    }
  }

  // Loading translation json files
  $.i18n()
    .load({
      en: `${window.location.origin}/i18n/en.json`,
      'zh-tw': `${window.location.origin}/i18n/zh-tw.json`,
      ja: `${window.location.origin}/i18n/ja.json`,
    })
    .done(function() {
      $('.locale-item').on('click', function(e) {
        e.preventDefault()
        $.i18n().locale = $(this).data('locale')
        do_translate()
      })
      do_translate()
    })

  if (!localStorage.getItem('my-locale')) {
    localStorage.setItem('my-locale', navigator.language)
    console.log(localStorage.getItem('my-locale'))
  }
  let myLocale = localStorage.getItem('my-locale')
  $.i18n().locale = myLocale
})
