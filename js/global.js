jQuery(function($) {
  $.extend($.i18n.parser.emitter, {
    abbr: function(nodes) {
      return '<abbr title="' + nodes[1] + '">' + nodes[0] + "</abbr>";
    }
  });

  // Translate all words
  const do_translate = function() {
    let x = document.querySelectorAll('*[id]:not([id=""])');
    for (let i = 0; i < x.length; i++) {
      let id_name = x[i].id;
      // console.log(id_name);
      $(`#${id_name}`).html($.i18n(id_name));
    }
  };

  // Loading translation json files
  $.i18n()
    .load({
      en: `${window.location.origin}/i18n/en.json`,
      "zh-tw": `${window.location.origin}/i18n/zh-tw.json`,
      jp: `${window.location.origin}/i18n/jp.json`
    })
    .done(function() {
      $(".locale-btns").on("click", "button", function(e) {
        e.preventDefault();
        // console.log($(this).data("locale"));
        $.i18n().locale = $(this).data("locale");
        do_translate();
      });

      do_translate();
    });

  // to make default local
  $.i18n({
    locale: "en"
  });
  console.log(`my domain is: ${window.location.origin}`)
});
