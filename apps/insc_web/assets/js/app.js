// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in 'brunch-config.js'.
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from 'config.paths.watched'.
import 'phoenix_html'
import S from 'skylake'
// Import local files
//
// Local files can be imported directly using relative
// paths './socket' or full ones 'web/static/js/socket'.

// import socket from './socket'

$(window).load(function () {
  'use strict';
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


// class Support {
//
//     static init () {
//         if (S.Sniffer.isIEolderThan11 || S.Sniffer.isSafariOlderThan8) {
//             S.Dom.html.className = 'old-browser'
//         }
//
//         if (!S.Sniffer.isTouch) {
//             S.Dom.body.className = 'no-touch'
//         }
//     }
//
// }
//
// export default Support
//
// console.log(Support.init)



class HomeSticky {
  constructor() {
    S.BindMaker(this, ["menuOpen", "menuClose"])
  }

  init () {
    this.first = !1
    this.listeners("add")
  }

  listeners (opts) {
    S.Listen("#nav-link-submenu", opts, "mouseenter", this.menuOpen)
    S.Listen("#nav-link-submenu", opts, "mouseleave", this.menuClose)
  }

  menuOpen () {
    this.first = !0
    this.isOver = !0
    S.Geb.id("nav-container").className = "active"
    this.isOver && !this.isAnimated && this.open()
    console.info('This')
  }

  menuClose () {
    this.first && (this.isOver = !1, S.Geb.id("nav-container").className = "", this.isOver || this.isAnimated || this.close())
  }

  open () {
    function myCallback () {
      const morph2Animation = new S.Morph({
        type: 'path',
        element: '#nav-morph-path',
        start: 'M 10,0 L 10,0 C 10,0 10,0 5,0 C 0,0 0,0 0,0 L 0,0 Z',
        end: 'M 0,0 L 10,0 L 10,10 C 10,10 10,10 5,10 C 0,10 0,10 0,10 Z',
        duration: 600,
        ease: 'ExpoOut',
        delay: 700,
        callback: (t) => {
            this.isAnimated = !1,
            this.isOver || this.close()
        }
      })
      morph2Animation.play()

    }
    // _ => this
    // this.isAnimated = !0
    S.Geb.id('nav-wrap').className = 'active'
    S.Geb.id('nav-morph-path').setAttribute('d', 'M 0,0 L 10,0 L 10,0 C 10,0 10,0 5,0 C 0,0 0,0 0,0 Z')
    const morph1Animation = new S.Morph({
      type: 'path',
      element: '#nav-morph-path',
      start: 'M 10,0 L 10,10 C 10,10 10,5 5,5 C 0,5 0,10 0,10 L 0,0 Z',
      end: 'M 10,0 L 10,0 C 10,0 10,0 5,0 C 0,0 0,0 0,0 L 0,0 Z',
      duration: 600,
      ease: 'ExpoOut',
      delay: 700,
      callbackDelay: myCallback,
      callback: myCallback
    })
    const tl = new S.Timeline()
    tl.from('#nav-submenu-extend-bottom', '3dy', -200, 0)
    tl.from('#nav-submenu-extend-left', '3dy', -200, 0)
    tl.from('.nav-submenu-link-title', '3dy', -100, 0, 500, 'Power4Out', {delay: 400})
    tl.from('.nav-submenu-link-no', 'opacity', -100, 0, 500, 'Power4Out', {Delay: 50})
    tl.play()
    morph1Animation.play()
    console.log(morph1Animation)
  }

  close () {
    function myCallback () {
      const morph4Animation = new S.Morph({
        type: 'path',
        element: '#nav-morph-path',
        end: 'M 10,0 L 10,0 C 10,0 10,0 5,0 C 0,0 0,0 0,0 L 0,0 Z',
        duration: 600,
        ease: 'ExpoOut',
        delay: 700,
        callback: (t) => {
            this.isAnimated = !1,
            this.isOver || this.open()
        }
      })
      morph4Animation.play()
    }
    // _ => this
    // this.isAnimated = !0
    const navWrap = S.Geb.id("nav-wrap").className = ""
    const navMorphPath = S.Geb.id("nav-morph-path").setAttribute("d", "M 10,0 L 10,10 C 10,10 10,10 5,10 C 0,10 0,10 0,10 L 0,0 Z")
    const morph3Animation = new S.Morph({
      type: 'path',
      element: '#nav-morph-path',
      end: 'M 10,0 L 10,10 C 10,10 10,5 5,5 C 0,5 0,10 0,10 L 0,0 Z',
      duration: 300,
      ease: 'Power3In',
      delay: 700,
      callbackDelay: myCallback,
      callback: myCallback
    })
    const tl = new S.Timeline()
    tl.from("#nav-submenu-extend-left", "3dy", 0, -200)
    tl.from(".nav-submenu-link-title", "3dy", 0, -100, 160, "Power2In")
    tl.from(".nav-submenu-link-no", "3dy", 0, -100, 160, "Power2In")
    tl.from("#nav-submenu-extend-bottom", "3dy", 0, -200, { delay: 160 })
    tl.play()
    morph3Animation.play()
  }

  destroy (opts) {
    this.listeners("remove"),
    this.morph1Animation && this.morph1Animation.pause()
    this.morph2Animation && this.morph2Animation.pause()
    this.morph3Animation && this.morph3Animation.pause()
    this.morph4Animation && this.morph4Animation.pause()
  }
}

export default HomeSticky
