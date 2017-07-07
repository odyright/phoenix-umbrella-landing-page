// import S from "skylake"
// import HomeSticky from "./HomeMenu.js"
//
//
// class Home {
//   constructor() {
//     S.BindMaker(this, ["addListeners"])
//     this.RO = new S.RO({
//       throttle: {
//         delay: 100,
//         atEnd: !0
//       }
//     })
//   }
//
//   init() {
//     // let t = this
//     this.homeSubmenu = new HomeMenu()
//     this.homeSubmenu.init()
//     this.addListeners()
//   }
//
//   addListeners() {
//     this.listeners("add")
//   }
//
//   listeners(e) {
//     e === "add" ? this.RO.on() : this.RO.off()
//   }
//
//   destroy() {
//     this.listeners("remove")
//     this.homeSubmenu.destroy()
//   }
// }
// //
// const hom = new Home()
// hom.init()
//
//
// export default Home
