// import S from "skylake"
//
// class HomeSticky {
//   constructor() {
//     // console.log("G")
//     // console.log("Entrypoint", S)
//     // console.log(HomeSticky.init)
//     S.BindMaker(this, ["menuOpen", "menuClose"])
//   }
//   init() {
//     // console.log("init")
//     this.first = !1
//     this.listeners("add")
//   }
//   listeners(e) {
//     // console.log(homesticky.listeners)
//     S.Listen("#nav-link-submenu", e, "mouseenter", this.menuOpen)
//     S.Listen("#nav-link-submenu", e, "mouseleave", this.menuClose)
//   }
//   menuOpen(e) {
//     this.first = !0
//     this.isOver = !0
//     S.Geb.id("nav-container").className = "active"
//     this.isOver && !this.isAnimated && this.open()
//   }
//   menuClose(e) {
//     this.first && (this.isOver = !1, S.Geb.id("nav-container").className = "", this.isOver || this.isAnimated || this.close())
//   }
//   open(e) {
//     let i = this
//     function myCallback() {
//       const morph1Animation = new S.Morph({
//         type: "path",
//         element: S.Geb.id("nav-morph-path"),
//         end: "M 0,0 L 10,0 L 10,10 C 10,10 10,10 5,10 C 0,10 0,10 0,10 Z",
//         duration: 600,
//         ease: "ExpoOut",
//         callback: () => {
//           i.isAnimated = !1
//           i.isOver || i.close()
//         }
//       })
//       morph1Animation.play()
//     }
//     this.isAnimated = !0
//     S.Geb.id("nav-wrap").className = "active"
//     S.Geb.id("nav-morph-path").setAttribute("d", "M 0,0 L 10,0 L 10,0 C 10,0 10,0 5,0 C 0,0 0,0 0,0 Z")
//     const morphAnimation = new S.Morph({
//       type: "path",
//       element: S.Geb.id("nav-morph-path"),
//       end: "M 0,0 L 10,0 L 10,0 C 10,0 10,5 5,5 C 0,5 0,0 0,0 Z",
//       duration: 300,
//       ease: "Power3In",
//       callback: myCallback
//     })
//     const tl = new S.Timeline()
//     tl.from("#nav-submenu-extend-bottom", "3dy", -200, 0)
//     tl.from("#nav-submenu-extend-left", "3dy", -200, 0)
//     tl.from(".nav-submenu-link-title", "3dy", -100, 0, 500, "Power4Out", {delay: 400})
//     tl.from(".nav-submenu-link-no", "opacity", -100, 0, 500, "Power4Out", {Delay: 50})
//     tl.play()
//     morphAnimation.play()
//   }
//
//   close(e) {
//     let i = this
//     function myCallback() {
//       const morph3Animation = new S.Morph({
//         type: "path",
//         element: S.Geb.id("nav-morph-path"),
//         end: "M 10,0 L 10,0 C 10,0 10,0 5,0 C 0,0 0,0 0,0 L 0,0 Z",
//         duration: 600,
//         ease: "ExpoOut",
//         callback: () => {
//           i.isAnimated = !1
//           i.isOver || i.open()
//         }
//       })
//       morph3Animation.play()
//     }
//     this.isAnimated = !0
//     S.Geb.id("nav-wrap").className = ""
//     S.Geb.id("nav-morph-path").setAttribute("d", "M 10,0 L 10,10 C 10,10 10,10 5,10 C 0,10 0,10 0,10 L 0,0 Z")
//     const morph2Animation = new S.Morph({
//       type: "path",
//       element: S.Geb.id("nav-morph-path"),
//       end: "M 10,0 L 10,10 C 10,10 10,5 5,5 C 0,5 0,10 0,10 L 0,0 Z",
//       duration: 300,
//       ease: "Power3In",
//       callback: myCallback
//     })
//     const tl = new S.Timeline()
//     tl.from("#nav-submenu-extend-left", "3dy", 0, -200)
//     tl.from(".nav-submenu-link-title", "3dy", 0, -100, 160, "Power2In")
//     tl.from(".nav-submenu-link-no", "3dy", 0, -100, 160, "Power2In")
//     tl.from("#nav-submenu-extend-bottom", "3dy", 0, -200, {delay: 160})
//     tl.play()
//     morph2Animation.play()
//   }
//
//   destroy() {
//     this.listeners("remove")
//     this.morphAnimation && this.morphAnimation.pause()
//     this.morph1Animation && this.morph1Animation.pause()
//     this.morph2Animation && this.morph2Animation.pause()
//     this.morph3Animation && this.morph3Animation.pause()
//   }
// }
//
// let homesticky = new HomeSticky()
// homesticky.init()
// // (_ => new HomeSticky())()
// export default HomeSticky
