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
    // $("#greeting").text($.i18n("greeting"));
    // $("#name").text($.i18n("name"));
    // $("#title-education").text($.i18n("title-education"));
  };

  // Loading translation json files
  $.i18n()
    .load({
      en: "http://127.0.0.1:5500/i18n/en.json",
      "zh-tw": "http://127.0.0.1:5500/i18n/zh-tw.json",
      jp: "http://127.0.0.1:5500/i18n/jp.json"
    })
    .done(function() {
      $(".locale-btns").on("click", "button", function(e) {
        // console.log('click')
        e.preventDefault();
        console.log($(this).data("locale"));
        $.i18n().locale = $(this).data("locale");
        do_translate();
      });

      do_translate();
    });

  // to make default local
  $.i18n({
    locale: "en"
  });
});
