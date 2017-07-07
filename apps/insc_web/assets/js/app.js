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
import S from "skylake"
import "./spinVelocity.js"
// import Home from "./Home.js"
// import HomeSticky from "./HomeSticky.js"
console.log(S)


class HomeMenu {
  constructor() {
    // console.log("G")
    // console.log("Entrypoint", S)
    // console.log(HomeSticky.init)
    S.BindMaker(this, ["menuOpen", "menuClose"])
  }
  init(t) {
    // console.log("init")
    this.first = !1
    this.listeners("add")
  }
  listeners(t) {
    // console.log(homesvg.listeners)
    S.Listen("#nav-link-submenu", t, "mouseenter", this.menuOpen)
    S.Listen("#nav-link-submenu", t, "mouseleave", this.menuClose)
  }
  menuOpen(t) {
    this.first = !0
    this.isOver = !0
    S.Geb.id("nav-container").className = "active"
    this.isOver && !this.isAnimated && this.open()
  }
  menuClose(t) {
    this.first && (this.isOver = !1, S.Geb.id("nav-container").className = "", this.isOver || this.isAnimated || this.close())
  }
  open(t) {
    let i = this
    function s() {
      i.morph1Animation = new S.Morph({
        type: "path",
        element: S.Geb.id("nav-morph-path"),
        end: "M 0,0 L 10,0 L 10,10 C 10,10 10,10 5,10 C 0,10 0,10 0,10 Z",
        duration: 600,
        ease: "ExpoOut",
        callback: t => {
          i.isAnimated = !1
          i.isOver || i.close()
        }
      })
      i.morph1Animation.play()
    }
    this.isAnimated = !0
    S.Geb.id("nav-wrap").className = "active"
    S.Geb.id("nav-morph-path").setAttribute("d", "M 0,0 L 10,0 L 10,0 C 10,0 10,0 5,0 C 0,0 0,0 0,0 Z")
    this.morphAnimation = new S.Morph({
      type: "path",
      element: S.Geb.id("nav-morph-path"),
      end: "M 0,0 L 10,0 L 10,0 C 10,0 10,5 5,5 C 0,5 0,0 0,0 Z",
      duration: 300,
      ease: "Power3In",
      callback: s
    })
    const tl = new S.Timeline()
    tl.from("#nav-submenu-extend-bottom", "3dy", -200, 0)
    tl.from("#nav-submenu-extend-left", "3dy", -200, 0)
    tl.from(".nav-submenu-link-title", "3dy", -100, 0, 500, "Power4Out", {delay: 400})
    tl.from(".nav-submenu-link-no", "opacity", -100, 0, 500, "Power4Out", {delay: 50})
    tl.play()
    this.morphAnimation.play()
  }

  close(t) {
    let i = this
    function s() {
      i.morph3Animation = new S.Morph({
        type: "path",
        element: S.Geb.id("nav-morph-path"),
        end: "M 10,0 L 10,0 C 10,0 10,0 5,0 C 0,0 0,0 0,0 L 0,0 Z",
        duration: 600,
        ease: "ExpoOut",
        callback: t => {
          i.isAnimated = !1
          i.isOver && i.open()
        }
      })
      i.morph3Animation.play()
    }
    this.isAnimated = !0
    S.Geb.id("nav-wrap").className = ""
    S.Geb.id("nav-morph-path").setAttribute("d", "M 10,0 L 10,10 C 10,10 10,10 5,10 C 0,10 0,10 0,10 L 0,0 Z")
    this.morph2Animation = new S.Morph({
      type: "path",
      element: S.Geb.id("nav-morph-path"),
      end: "M 10,0 L 10,10 C 10,10 10,5 5,5 C 0,5 0,10 0,10 L 0,0 Z",
      duration: 300,
      ease: "Power3In",
      callback: s
    })
    const tl = new S.Timeline()
    tl.from("#nav-submenu-extend-left", "3dy", 0, -200)
    tl.from(".nav-submenu-link-title", "3dy", 0, -100, 160, "Power2In")
    tl.from(".nav-submenu-link-no", "3dy", 0, -100, 160, "Power2In")
    tl.from("#nav-submenu-extend-bottom", "3dy", 0, -200, {delay: 160})
    tl.play()
    this.morph2Animation.play()
  }

  destroy(t) {
    // console.log(homesvg.destroy)
    this.listeners("remove")
    this.morphAnimation && this.morphAnimation.pause()
    this.morph1Animation && this.morph1Animation.pause()
    this.morph2Animation && this.morph2Animation.pause()
    this.morph3Animation && this.morph3Animation.pause()
  }
}


let homesvg = new HomeMenu()
homesvg.init()
// (_ => new HomeMenu())()
export default HomeMenu
