import S from 'skylake'

(function() {
  "use strict";

  function createCommonjsModule(e, t) {
    return t = {
      exports: {}
    },
    e(t, t.exports),
    t.exports
  }
  var index = createCommonjsModule(function(e) {
    var t = {};
    e.exports = t,
    t.Merom = function(e, i, o, n, r, a, s) {
      if (this.prop = i,
          this.start = o,
          this.end = n,
          this.el = t.Selector.el(e),
          this.elL = this.el.length, t.Is.object(r) ? (this.duration = 0, this.ease = "linear", this.opts = r) : (this.duration = r || 0, this.ease = a || "linear", this.opts = s || !1),
          this.noMultiT = !t.Is.array(this.prop), !this.noMultiT || "3dx" !== this.prop && "3dy" !== this.prop) {
          this.updateQty = this.prop.length;
        for (var l = 0; l < this.updateQty; l++) "3dx" === this.prop[l] ? this.unitX = this.t3dUnit(this.start[l]) : "3dy" === this.prop[l] && (this.unitY = this.t3dUnit(this.start[l]))
      } else this.unit = this.t3dUnit(this.start);
      this.update = this.noMultiT ? this.singleUp() : this.multiT,
      this.deltaTimeAtPause = 0,
      this.easePack = t.EasePack,
      this.raf = new t.RafIndex,
      this.delaysInit(),
      t.BindMaker(this, ["getRaf", "loop"])
    },
    t.Merom.prototype = {
      play: function() {
        var e = this;
        e.isPaused = !1,
        t.Delay(function() {
          e.getRaf()
        }, e.delay)
      },
      pause: function(e) {
        "on" === e ? (this.isPaused = !0, this.deltaTimeSave = this.deltaTime) : (this.deltaTimeAtPause = this.deltaTimeSave, this.delay = 0, this.play())
      },
      reverse: function(e) {
        this.pause("on"), void 0 !== e && (this.newEnd = e.newEnd || !1, this.duration = e.duration || this.duration, this.ease = e.ease || this.ease, this.opts = e.opts || !1), this.getReset()
      },
      reset: function(e) {
        this.pause("on"), this.duration = 0, this.ease = "linear", this.opts = e || !1, this.getReset()
      },
      getRaf: function() {
        this.startTime = t.Win.perfNow, this.raf.start(this.loop)
      },
      loop: function() {
        if (!this.isPaused) {
          var e = t.Win.perfNow;
          this.deltaTime = e - this.startTime + this.deltaTimeAtPause;
          var i = Math.min(this.deltaTime / this.duration, 1),
            o = this.easePack[this.ease](i);
          if (this.noMultiT) this.value = t.Lerp.init(+this.start, +this.end, o);
          else {
            this.value = [];
            for (var n = 0; n < this.updateQty; n++) this.value[n] = t.Lerp.init(+this.start[n], +this.end[n], o)
          }
          this.update(this.value), i < 1 ? this.raf.start(this.loop) : (this.raf.cancel(), this.update(this.end), this.opts.callback && t.Delay(this.opts.callback, this.callbackDelay))
        }
      },
      singleUp: function() {
        switch (this.prop) {
          case "3dx":
          case "3dy":
          case "scale":
          case "rotate":
          case "rotateX":
          case "rotateY":
            return this.singleT;
          case "scrollTop":
            return this.setScrollTop;
          default:
            return this.setStyle
        }
      },
      multiT: function(e) {
        for (var t = 0, i = 0, o = "", n = "", r = 0; r < this.updateQty; r++) "3dx" === this.prop[r] ? t = e[r] + this.unitX : "3dy" === this.prop[r] ? i = e[r] + this.unitY : "rotate" === this.prop[r].substring(0, 6) ? o = this.prop[r] + "(" + e[r] + "deg)" : "scale" === this.prop[r] && (n = "scale(" + e[r] + ")");
        var a = "translate3d(" + t + "," + i + ",0)",
          s = a + " " + o + " " + n;
        this.updateDom("t", s)
      },
      singleT: function(e) {
        var t;
        if ("3dx" === this.prop || "3dy" === this.prop) {
          var i = e + this.unit;
          t = "translate3d(" + ("3dx" === this.prop ? i + ",0" : "0," + i) + ",0)"
        } else t = "rotate" === this.prop.substring(0, 6) ? this.prop + "(" + e + "deg)" : "scale(" + e + ")";
        this.updateDom("t", t)
      },
      setScrollTop: function(e) {
        this.el[0][this.prop] = e, this.opts.during && this.opts.during(e)
      },
      setStyle: function(e) {
        this.updateDom(this.prop, e)
      },
      updateDom: function(e, t) {
        for (var i = 0; i < this.elL; i++) "t" === e ? (this.el[i].style.webkitTransform = t, this.el[i].style.transform = t) : "x" === e || "y" === e || "r" === e ? this.el[i].setAttribute(e, t) : this.el[i].style[e] = t
      },
      delaysInit: function() {
        this.delay = this.opts.delay || 0, this.callbackDelay = this.opts.callbackDelay || 0
      },
      getReset: function() {
        this.end = this.newEnd || this.start, this.start = this.value || this.start, this.delaysInit(), this.play()
      },
      t3dUnit: function(e) {
        return t.Is.string(e) ? "px" : "%"
      }
    },
    t.AnimatedLine = function(e) {
      this.shape = t.Selector.el(e), this.shapeL = this.shape.length, this.merom = []
    },
    t.AnimatedLine.prototype = {
      play: function(e, t, i) {
        this.type = "play", this.run(e, t, i)
      },
      reverse: function(e, t, i) {
        this.type = "reverse", this.run(e, t, i)
      },
      run: function(e, t, i) {
        this.duration = e, this.ease = t, this.callback = i;
        for (var o = 0; o < this.shapeL; o++) this.animationLine(this.shape[o], o)
      },
      pause: function(e) {
        for (var t = 0; t < this.shapeL; t++) this.merom[t].pause(e)
      },
      reset: function() {
        for (var e = 0; e < this.shapeL; e++) this.shape[e].style = ""
      },
      animationLine: function(e, i) {
        var o, n, r = this.getShapeLength(e);
        if ("reverse" === this.type) {
          var a = e.style.strokeDashoffset;
          o = "x" === a.charAt(a.length - 1) ? +a.substring(0, a.length - 2) : +a, n = r
        } else o = r, n = 0;
        e.style.strokeDasharray = r, e.style.opacity = 1, this.merom[i] = new t.Merom(e, "strokeDashoffset", o, n, this.duration, this.ease, {
          callback: this.callback
        }), this.merom[i].play()
      },
      getShapeLength: function(e) {
        var t;
        if ("circle" === e.tagName) {
          t = 2 * e.getAttribute("r") * Math.PI
        } else t = e.getTotalLength();
        return t
      }
    },
    t.Morph = function(e) {
      var e = e;
      this.type = "polygon" === e.type ? "points" : "d",
      this.el = e.element,
      this.newCoords = e.newCoords,
      this.duration = e.duration,
      this.ease = e.ease,
      this.delay = e.delay,
      this.callbackDelay = e.callbackDelay,
      this.callback = e.callback,
      this.coordsStart = this.getCoordsArr(this.el.getAttribute(this.type)),
      this.coordsEnd = this.getCoordsArr(this.newCoords),
      this.easePack = t.EasePack,
      this.raf = new t.RafIndex,
      t.BindMaker(this, ["getRaf", "loop"])
    },
    t.Morph.prototype = {
      play: function() {
        var e = this.delay ? this.delay : 0;
        t.Delay(this.getRaf, e)
      },
      pause: function() {
        this.isPaused = !0
      },
      getRaf: function() {
        this.startTime = t.Win.perfNow,
        this.raf.start(this.loop)
      },
      loop: function() {
        if (!this.isPaused) {
          for (var e = t.Win.perfNow, i = e - this.startTime, o = Math.min(i / this.duration, 1), n = this.easePack[this.ease](o), r = [], a = [], s = "", l = 0; l < this.coordsStart.length; l++) r[l] = this.isLetter(this.coordsStart[l]), a[l] = r[l] ? this.coordsStart[l] : t.Lerp.init(+this.coordsStart[l], +this.coordsEnd[l], n), s += a[l] + " ";
          this.el.setAttribute(this.type, s.trim()), o < 1 ? this.raf.start(this.loop) : (this.raf.cancel(), this.el.setAttribute(this.type, this.newCoords), this.getCallback())
        }
      },
      getCoordsArr: function(e) {
        for (var t = e.split(" "), i = [], o = 0; o < t.length; o++)
          for (var n = t[o].split(","), r = 0; r < n.length; r++) i.push(n[r]);
        return i
      },
      isLetter: function(e) {
        return "M" === e || "L" === e || "C" === e || "Z" === e
      },
      getCallback: function() {
        if (this.callback) {
          var e = this.callbackDelay ? this.callbackDelay : 0;
          t.Delay(this.callback, e)
        }
      }
    },
    t.Timeline = function() {
      this.content = [], this.contentL = function() {
        return this.content.length
      }
    },
    t.Timeline.prototype = {
      from: function(e, i, o, n, r, a, s) {
        if (this.contentL() > 0) {
          var s = s || {},
            l = this.content[this.contentL() - 1].delay,
            c = r && t.Is.object(r);
          c && r.delay ? r.delay = l + r.delay : c ? r.delay = l : s.delay ? s.delay = l + s.delay : s.delay = l
        }
        this.content.push(new t.Merom(e, i, o, n, r, a, s))
      },
      play: function() {
        for (var e = 0; e < this.contentL(); e++) this.content[e].play()
      },
      pause: function(e) {
        for (var t = 0; t < this.contentL(); t++) this.content[t].pause(e)
      },
      reverse: function(e) {
        for (var t = 0; t < this.contentL(); t++) this.content[t].reverse(e[t])
      },
      reset: function(e) {
        for (var t = 0; t < this.contentL(); t++) this.content[t].reset(e)
      }
    },
    t.BindMaker = function(e, t) {
      for (var i = t.length, o = 0; o < i; o++) e[t[o]] = e[t[o]].bind(e)
    },
    t.Delay = function(e, t) {
      window.setTimeout(function() {
        e()
      }, t)
    };
    var i = {
      s: 1.70158,
      q: 2.25,
      r: 1.525,
      u: .984375,
      v: 7.5625,
      w: .9375,
      x: 2.75,
      y: 2.625,
      z: .75
    };
    t.EasePack = {
      linear: function(e) {
        return e
      },
      Power1In: function(e) {
        return 1 - Math.cos(e * (Math.PI / 2))
      },
      Power1Out: function(e) {
        return Math.sin(e * (Math.PI / 2))
      },
      Power1InOut: function(e) {
        return -.5 * (Math.cos(Math.PI * e) - 1)
      },
      Power2In: function(e) {
        return e * e
      },
      Power2Out: function(e) {
        return e * (2 - e)
      },
      Power2InOut: function(e) {
        return e < .5 ? 2 * e * e : (4 - 2 * e) * e - 1
      },
      Power3In: function(e) {
        return e * e * e
      },
      Power3Out: function(e) {
        return --e * e * e + 1
      },
      Power3InOut: function(e) {
        return e < .5 ? 4 * e * e * e : (e - 1) * (2 * e - 2) * (2 * e - 2) + 1
      },
      Power4In: function(e) {
        return e * e * e * e
      },
      Power4Out: function(e) {
        return 1 - --e * e * e * e
      },
      Power4InOut: function(e) {
        return e < .5 ? 8 * e * e * e * e : 1 - 8 * --e * e * e * e
      },
      Power5In: function(e) {
        return e * e * e * e * e
      },
      Power5Out: function(e) {
        return 1 + --e * e * e * e * e
      },
      Power5InOut: function(e) {
        return e < .5 ? 16 * e * e * e * e * e : 1 + 16 * --e * e * e * e * e
      },
      ExpoIn: function(e) {
        return 0 === e ? 0 : Math.pow(2, 10 * (e - 1))
      },
      ExpoOut: function(e) {
        return 1 === e ? 1 : 1 - Math.pow(2, -10 * e)
      },
      ExpoInOut: function(e) {
        return 0 === e ? 0 : 1 === e ? 1 : (e /= .5) < 1 ? .5 * Math.pow(2, 10 * (e - 1)) : .5 * (2 - Math.pow(2, -10 * --e))
      },
      CircIn: function(e) {
        return -(Math.sqrt(1 - e * e) - 1)
      },
      CircOut: function(e) {
        return Math.sqrt(1 - Math.pow(e - 1, 2))
      },
      CircInOut: function(e) {
        return (e /= .5) < 1 ? -.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1)
      },
      BackIn: function(e) {
        return e * e * ((i.s + 1) * e - i.s)
      },
      BackOut: function(e) {
        return (e -= 1) * e * ((i.s + 1) * e + i.s) + 1
      },
      BackInOut: function(e) {
        return (e /= .5) < 1 ? e * e * ((1 + (i.s *= i.r)) * e - i.s) * .5 : .5 * ((e -= 2) * e * ((1 + (i.s *= i.r)) * e + i.s) + 2)
      },
      Elastic: function(e) {
        return -1 * Math.pow(4, -8 * e) * Math.sin((6 * e - 1) * (2 * Math.PI) / 2) + 1
      },
      SwingFromTo: function(e) {
        return (e /= .5) < 1 ? e * e * ((1 + (i.s *= i.r)) * e - i.s) * .5 : .5 * ((e -= 2) * e * ((1 + (i.s *= i.r)) * e + i.s) + 2)
      },
      SwingFrom: function(e) {
        return e * e * ((i.s + 1) * e - i.s)
      },
      SwingTo: function(e) {
        return (e -= 1) * e * ((i.s + 1) * e + i.s) + 1
      },
      Bounce: function(e) {
        return e < 1 / i.x ? i.v * e * e : e < 2 / i.x ? i.v * (e -= 1.5 / i.x) * e + i.z : e < 2.5 / i.x ? i.v * (e -= i.q / i.x) * e + i.w : i.v * (e -= i.y / i.x) * e + i.u
      },
      BouncePast: function(e) {
        return e < 1 / i.x ? i.v * e * e : e < 2 / i.x ? 2 - (i.v * (e -= 1.5 / i.x) * e + i.z) : e < 2.5 / i.x ? 2 - (i.v * (e -= i.q / i.x) * e + i.w) : 2 - (i.v * (e -= i.y / i.x) * e + i.u)
      }
    },
    t.Is = function() {
      return {
        string: function(e) {
          return "string" == typeof e
        },
        object: function(e) {
          return e === Object(e)
        },
        array: function(e) {
          return e.constructor === Array
        }
      }
    }(),
    t.Lerp = {
      init: function(e, t, i) {
        return e + (t - e) * i
      },
      extend: function(e, t, i, o, n) {
        return o + (n - o) / (i - t) * (e - 1)
      }
    },
    t.Sniffer = {
      uA: navigator.userAgent.toLowerCase(),
      get isAndroid() {
        var e = /android.*mobile/.test(this.uA);
        return e || !e && /android/i.test(this.uA)
      },
      get isFirefox() {
        return this.uA.indexOf("firefox") > -1
      },
      get safari() {
        return this.uA.match(/version\/[\d\.]+.*safari/)
      },
      get isSafari() {
        return !!this.safari && !this.isAndroid
      },
      get isSafariOlderThan8() {
        var e = 8;
        if (this.isSafari) {
          e = +this.safari[0].match(/version\/\d{1,2}/)[0].split("/")[1]
        }
        return e < 8
      },
      get isIEolderThan11() {
        return this.uA.indexOf("msie") > -1
      },
      get isIE11() {
        return navigator.appVersion.indexOf("Trident/") > 0
      },
      get isIE() {
        return this.isIEolderThan11 || this.isIE11
      },
      get isTouch() {
        return "ontouchend" in window
      },
      get isPageError() {
        for (var e = t.Geb.tag("meta"), i = e.length, o = !1, n = 0; n < i; n++)
          if ("error" === e[n].name) {
            o = !0;
            break
          }
        return o
      }
    },
    t.Throttle = function(e) {
      this.timeout = !1, this.timer = 0, this.opts = e,
      t.BindMaker(this, ["atEndController"])
    },
    t.Throttle.prototype = {
      init: function() {
        this.startTime = t.Win.perfNow, this.timeout || (this.timeout = !0,
          t.Delay(this.atEndController, this.opts.delay))
      },
      atEndController: function() {
        t.Win.perfNow - this.startTime < this.opts.delay ? (this.timer = t.Delay(this.atEndController, this.opts.delay), this.opts.atEnd || this.opts.callback()) : (clearTimeout(this.timer), this.timeout = !1, this.opts.callback())
      }
    },
    t.Geb = function() {
      var e = document;
      return {
        id: function(t) {
          return e.getElementById(t)
        },
        class: function(t) {
          return e.getElementsByClassName(t)
        },
        tag: function(t) {
          return e.getElementsByTagName(t)
        }
      }
    }(),
    t.Dom = {
      html: document.documentElement,
      body: document.body
    },
    t.Selector = function() {
      return {
        el: function(e) {
          var i = [];
          if (t.Is.string(e)) {
            var o = e.substring(1);
            "#" === e.charAt(0) ? i[0] = t.Geb.id(o) : i = t.Geb.class(o)
          } else i[0] = e;
          return i
        },
        type: function(e) {
          return "#" === e.charAt(0) ? "id" : "class"
        },
        name: function(e) {
          return e.substring(1)
        }
      }
    }(),
    t.MM = function(e) {
      this.callback = e, this.posX = 0, this.posY = 0, this.rafTicking = new t.RafTicking,
      t.BindMaker(this, ["getRAF", "run"])
    },
    t.MM.prototype = {
      on: function() {
        this.listeners("add")
      },
      off: function() {
        this.listeners("remove")
      },
      listeners: function(e) {
        t.Listen(document, e, "mousemove", this.getRAF)
      },
      getRAF: function(e) {
        this.event = e, this.rafTicking.start(this.run)
      },
      run: function() {
        this.posX = this.event.pageX, this.posY = this.event.pageY, this.callback(this.posX, this.posY)
      }
    },
    t.RO = function(e) {
      this.opts = e, this.callback = this.opts.callback, this.isTouch = t.Sniffer.isTouch,
      t.BindMaker(this, ["getThrottle", "getRAF"]), this.throttle = new t.Throttle({
        callback: this.getRAF,
        delay: this.opts.throttle.delay,
        atEnd: this.opts.throttle.atEnd
      }), this.rafTicking = new t.RafTicking
    },
    t.RO.prototype = {
      on: function() {
        this.listeners("add")
      },
      off: function() {
        this.listeners("remove")
      },
      listeners: function(e) {
        this.isTouch ? t.Listen(window, e, "orientationchange", this.getThrottle) : t.Listen(window, e, "resize", this.getThrottle)
      },
      getThrottle: function() {
        this.throttle.init()
      },
      getRAF: function() {
        this.rafTicking.start(this.callback)
      }
    },
    t.Scroll = function(e) {
      this.opts = e, this.callback = this.opts.callback,
      t.BindMaker(this, ["getThrottle", "getRAF", "run"]), this.throttle = new t.Throttle({
        callback: this.getRAF,
        delay: this.opts.throttle.delay,
        atEnd: this.opts.throttle.atEnd
      }), this.rafTicking = new t.RafTicking
    },
    t.Scroll.prototype = {
      on: function() {
        this.startScrollY = t.Win.pageY, this.listeners("add")
      },
      off: function() {
        this.listeners("remove")
      },
      listeners: function(e) {
        t.Listen(window, e, "scroll", this.getThrottle)
      },
      getThrottle: function() {
        this.throttle.init()
      },
      getRAF: function() {
        this.rafTicking.start(this.run)
      },
      run: function() {
        var e = window.pageYOffset,
          t = -(e - this.startScrollY);
        this.startScrollY = e, this.callback(e, t)
      }
    },
    t.WTDisable = function() {
      function e(e) {
        var o = t.Sniffer.isTouch,
          n = document;
        o ? t.Listen(n, e, "touchmove", i) : t.Listen(n, e, "mouseWheel", i)
      }

      function i(e) {
        e.preventDefault()
      }
      return {
        on: function() {
          e("add")
        },
        off: function() {
          e("remove")
        }
      }
    }(),
    t.WT = function(e) {
      this.callback = e, this.isTouch = t.Sniffer.isTouch, this.rafTicking = new t.RafTicking,
      t.BindMaker(this, ["touchStart", "getRAF", "run"])
    },
    t.WT.prototype = {
      on: function() {
        t.WTDisable.off(), this.listeners("add")
      },
      off: function() {
        t.WTDisable.on(), this.listeners("remove")
      },
      listeners: function(e) {
        var i = document;
        this.isTouch ? (t.Listen(i, e, "touchstart", this.touchStart),
        t.Listen(i, e, "touchmove", this.getRAF)) : t.Listen(i, e, "mouseWheel", this.getRAF)
      },
      getRAF: function(e) {
        e.preventDefault(), this.event = e, this.rafTicking.start(this.run)
      },
      run: function() {
        var e = this.event.type;
        "wheel" === e ? this.onWheel() : "mousewheel" === e ? this.onMouseWheel() : "touchmove" === e && this.touchMove()
      },
      onWheel: function() {
        this.type = "scroll", this.delta = this.event.wheelDeltaY || -1 * this.event.deltaY,
        t.Sniffer.isFirefox && 1 === this.event.deltaMode && (this.delta *= 40), this.getCallback()
      },
      onMouseWheel: function() {
        this.type = "scroll", this.delta = this.event.wheelDeltaY ? this.event.wheelDeltaY : this.event.wheelDelta, this.getCallback()
      },
      touchStart: function(e) {
        this.start = e.targetTouches[0].pageY
      },
      touchMove: function() {
        this.type = "touch", this.delta = this.event.targetTouches[0].pageY - this.start, this.getCallback()
      },
      getCallback: function() {
        this.callback(this.delta, this.type, this.event)
      }
    },
    t.Listen = function(e, i, o, n) {
      var r, a = document,
        s = t.Selector.el(e),
        l = s.length;
      r = "mouseWheel" === o ? "onwheel" in a ? "wheel" : void 0 !== a.onmousewheel ? "mousewheel" : "DOMMouseScroll" : "focusOut" === o ? t.Sniffer.isFirefox ? "blur" : "focusout" : o;
      for (var c = 0; c < l; c++) s[c][i + "EventListener"](r, n)
    },
    t.Raf = function(e) {
      window.requestAnimationFrame(e)
    },
    t.RafIndex = function() {
      this.start = function(e) {
        this.rafCallback = t.Raf(e)
      }, this.cancel = function() {
        window.cancelAnimationFrame(this.rafCallback)
      }
    },
    t.RafTicking = function() {
      this.ticking = !1, this.rafIndex = new t.RafIndex,
      t.BindMaker(this, ["getCallback"])
    },
    t.RafTicking.prototype = {
      start: function(e) {
        this.callback = e, this.ticking || (this.ticking = !0, this.rafIndex.start(this.getCallback))
      },
      getCallback: function() {
        this.callback(), this.destroy()
      },
      destroy: function() {
        this.rafIndex.cancel(), this.ticking = !1
      }
    },
    t.ScrollToTop = function(e) {
      var i = e,
        o = t.Win.pageY,
        n = {
          destination: 0,
          duration: function() {
            var e = t.Lerp.init(300, 1500, o / i.totalHeight);
            return 0 === o ? 0 : e
          }(),
          ease: function() {
            return o <= 2500 ? "Power" + Math.ceil(o / 500) + "InOut" : "ExpoInOut"
          }(),
          during: i.during,
          callback: i.callback
        };
      t.ScrollTo(n)
    },
    t.ScrollTo = function(e) {
      function i() {
        t.WTDisable.off(), o.callback && o.callback()
      }
      var o = e,
        n = t.Sniffer.isFirefox || t.Sniffer.isIE ? document.documentElement : t.Dom.body,
        r = t.Win.pageY,
        a = new t.Merom(n, "scrollTop", r, o.destination, o.duration, o.ease, {
          callback: i,
          during: o.during
        });
      o.destination === r ? i() : (t.WTDisable.on(), a.play())
    },
    t.ScrollZero = function() {
      window.scrollTo(0, 0)
    },
    t.TopWhenRefresh = function() {
      window.onbeforeunload = function() {
        window.scrollTo(0, 0)
      }
    },
    t.Win = {
      get w() {
        return window.innerWidth
      },
      get h() {
        return window.innerHeight
      },
      get path() {
        return window.location.pathname
      },
      get hostname() {
        return window.location.hostname
      },
      get href() {
        return window.location.href
      },
      get perfNow() {
        return window.performance.now()
      },
      get pageY() {
        return window.pageYOffset
      }
    }
  }),
  classCallCheck = function(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  },
  createClass = function() {
    function e(e, t) {
      for (var i = 0; i < t.length; i++) {
        var o = t[i];
        o.enumerable = o.enumerable || !1,
        o.configurable = !0, "value" in o && (o.writable = !0),
        Object.defineProperty(e, o.key, o)
      }
    }
    return function(t, i, o) {
      return i && e(t.prototype, i), o && e(t, o), t
    }
  }(),
  Support = function() {
    function e() {
      classCallCheck(this, e)
    }
    return createClass(e, null, [{
      key: "init",
      value: function() {
        (index.Sniffer.isIEolderThan11 || index.Sniffer.isSafariOlderThan8) && (index.Dom.html.className = "old-browser"), index.Sniffer.isTouch || (index.Dom.body.className = "no-touch")
      }
    }]), e
  }(),
  HomeSticky = function() {
    function e() {
      classCallCheck(this, e), index.BindMaker(this, ["menuOpen", "menuClose"])
    }
    return createClass(e, [{
      key: "init",
      value: function() {
        this.first = !1, this.listeners("add")
      }
    }, {
      key: "listeners",
      value: function(e) {
        index.Listen("#nav-link-submenu", e, "mouseenter", this.menuOpen), index.Listen("#nav-link-submenu", e, "mouseleave", this.menuClose)
      }
    }, {
      key: "menuOpen",
      value: function(e) {
        this.first = !0, this.isOver = !0, index.Geb.id("nav-container").className = "active", this.isOver && !this.isAnimated && this.open()
      }
    }, {
      key: "menuClose",
      value: function(e) {
        this.first && (this.isOver = !1, index.Geb.id("nav-container").className = "", this.isOver || this.isAnimated || this.close())
      }
    }, {
      key: "open",
      value: function(e) {
        function t() {
          i.morph2Animation = new index.Morph({
            type: "path",
            element: index.Geb.id("nav-morph-path"),
            newCoords: "M 0,0 L 10,0 L 10,10 C 10,10 10,10 5,10 C 0,10 0,10 0,10 Z",
            duration: 600,
            ease: "ExpoOut",
            callback: function(e) {
              i.isAnimated = !1, i.isOver || i.close()
            }
          }),
          i.morph2Animation.play()
        }
        var i = this;
        this.isAnimated = !0,
        index.Geb.id("nav-wrap").className = "active",
        index.Geb.id("nav-morph-path").setAttribute("d", "M 0,0 L 10,0 L 10,0 C 10,0 10,0 5,0 C 0,0 0,0 0,0 Z"),
        this.morph1Animation = new index.Morph({
          type: "path",
          element: index.Geb.id("nav-morph-path"),
          newCoords: "M 0,0 L 10,0 L 10,0 C 10,0 10,5 5,5 C 0,5 0,0 0,0 Z",
          duration: 300,
          ease: "Power3In",
          callback: t
        });
        var o = new index.Timeline;
        o.from("#nav-submenu-extend-bottom", "3dy", -200, 0),
        o.from("#nav-submenu-extend-left", "3dy", -200, 0),
        o.from(".nav-submenu-link-title", "3dy", -100, 0, 500, "Power4Out", {
          delay: 400
        }),
        o.from(".nav-submenu-link-no", "3dy", -100, 0, 500, "Power4Out", {
          delay: 50
        }),
        o.play(),
        this.morph1Animation.play()
      }
    }, {
      key: "close",
      value: function(e) {
        function t() {
          i.morph4Animation = new index.Morph({
            type: "path",
            element: index.Geb.id("nav-morph-path"),
            newCoords: "M 10,0 L 10,0 C 10,0 10,0 5,0 C 0,0 0,0 0,0 L 0,0 Z",
            duration: 600,
            ease: "ExpoOut",
            callback: function(e) {
              i.isAnimated = !1, i.isOver && i.open()
            }
          }),
          i.morph4Animation.play()
        }
        var i = this;
        this.isAnimated = !0,
        index.Geb.id("nav-wrap").className = "",
        index.Geb.id("nav-morph-path").setAttribute("d", "M 10,0 L 10,10 C 10,10 10,10 5,10 C 0,10 0,10 0,10 L 0,0 Z"),
        this.morph3Animation = new index.Morph({
          type: "path",
          element: index.Geb.id("nav-morph-path"),
          newCoords: "M 10,0 L 10,10 C 10,10 10,5 5,5 C 0,5 0,10 0,10 L 0,0 Z",
          duration: 300,
          ease: "Power3In",
          callback: t
        });
        var o = new index.Timeline;
        o.from("#nav-submenu-extend-left", "3dy", 0, -200),
        o.from(".nav-submenu-link-title", "3dy", 0, -100, 160, "Power2In"),
        o.from(".nav-submenu-link-no", "3dy", 0, -100, 160, "Power2In"),
        o.from("#nav-submenu-extend-bottom", "3dy", 0, -200, {
          delay: 160
        }),
        o.play(), this.morph3Animation.play()
      }
    }, {
      key: "destroy",
      value: function() {
        this.listeners("remove"),
        this.morph1Animation && this.morph1Animation.pause(),
        this.morph2Animation && this.morph2Animation.pause(),
        this.morph3Animation && this.morph3Animation.pause(),
        this.morph4Animation && this.morph4Animation.pause()
      }
    }]),
    e
  }()
})();
