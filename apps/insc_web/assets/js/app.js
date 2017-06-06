// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"

$(window).load(function () {
  "use strict";
  setTimeout(function () {
    $('#preloader').velocity({
      opacity: 0.1,
      translateY: '-80px',
    }, {
      duration: 400,
      complete: function () {
        $('#hola').velocity({
          translateY: '-100%',
        }, {
          duration: 1000,
          easing: [
            0.7, 0, 0.3, 1,
          ],
          complete: function () {
            $('.home').addClass('animate-border divide');
          },
        });
      },
    });
  }, 1000);
});

//# sourceURL=pen.js
