import $ from "jquery"
import Velocity from "velocity-animate"
import "velocity-animate/velocity.ui"


$(window).on("load", () => {
  setTimeout(() => {
    $("#preloader").velocity({
      opacity: 0.1,
      translateY: "-80px"
    }, {
      duration: 400,
      complete: function() {
        $("#hola").velocity({translateY: "-100%"}, {
          duration: 700,
          easing: [
            0.7, 0, 0.3, 1
          ],
          complete: function() {
            $(".home").addClass("animate-border divide")
          }
        })
      }
    })
  }, 1000)
})
