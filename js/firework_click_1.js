( () => {
    const n = document.querySelector(".fireworks");
    if (!n)
      return;
    const e = "false" === n.getAttribute("mobile")
      , t = /Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(navigator.userAgent);
    if (e && t)
      return;
    ( () => {
        var n, e;
        n = this,
          e = function() {
            "use strict";
            var n = {
              update: null,
              begin: null,
              loopBegin: null,
              changeBegin: null,
              change: null,
              changeComplete: null,
              loopComplete: null,
              complete: null,
              loop: 1,
              direction: "normal",
              autoplay: !0,
              timelineOffset: 0
            }
              , e = {
              duration: 1e3,
              delay: 0,
              endDelay: 0,
              easing: "easeOutElastic(1, .5)",
              round: 0
            }
              , t = ["translateX", "translateY", "translateZ", "rotate", "rotateX", "rotateY", "rotateZ", "scale", "scaleX", "scaleY", "scaleZ", "skew", "skewX", "skewY", "perspective", "matrix", "matrix3d"]
              , r = {
              CSS: {},
              springs: {}
            };
            function a(n, e, t) {
              return Math.min(Math.max(n, e), t)
            }
            function o(n, e) {
              return -1 < n.indexOf(e)
            }
            function i(n, e) {
              return n.apply(null, e)
            }
            var u = {
              arr: function(n) {
                return Array.isArray(n)
              },
              obj: function(n) {
                return o(Object.prototype.toString.call(n), "Object")
              },
              pth: function(n) {
                return u.obj(n) && n.hasOwnProperty("totalLength")
              },
              svg: function(n) {
                return n instanceof SVGElement
              },
              inp: function(n) {
                return n instanceof HTMLInputElement
              },
              dom: function(n) {
                return n.nodeType || u.svg(n)
              },
              str: function(n) {
                return "string" == typeof n
              },
              fnc: function(n) {
                return "function" == typeof n
              },
              und: function(n) {
                return void 0 === n
              },
              nil: function(n) {
                return u.und(n) || null === n
              },
              hex: function(n) {
                return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(n)
              },
              rgb: function(n) {
                return /^rgb/.test(n)
              },
              hsl: function(n) {
                return /^hsl/.test(n)
              },
              col: function(n) {
                return u.hex(n) || u.rgb(n) || u.hsl(n)
              },
              key: function(t) {
                return !n.hasOwnProperty(t) && !e.hasOwnProperty(t) && "targets" !== t && "keyframes" !== t
              }
            };
            function s(n) {
              return (n = /\(([^)]+)\)/.exec(n)) ? n[1].split(",").map((function(n) {
                  return parseFloat(n)
                }
              )) : []
            }
            function c(n, e) {
              var t = s(n)
                , o = a(u.und(t[0]) ? 1 : t[0], .1, 100)
                , i = a(u.und(t[1]) ? 100 : t[1], .1, 100)
                , c = a(u.und(t[2]) ? 10 : t[2], .1, 100)
                , l = (t = a(u.und(t[3]) ? 0 : t[3], .1, 100),
                Math.sqrt(i / o))
                , d = c / (2 * Math.sqrt(i * o))
                , f = d < 1 ? l * Math.sqrt(1 - d * d) : 0
                , h = d < 1 ? (d * l - t) / f : -t + l;
              function p(n) {
                var t = e ? e * n / 1e3 : n;
                return t = d < 1 ? Math.exp(-t * d * l) * (+Math.cos(f * t) + h * Math.sin(f * t)) : (1 + h * t) * Math.exp(-t * l),
                  0 === n || 1 === n ? n : 1 - t
              }
              return e ? p : function() {
                var e = r.springs[n];
                if (e)
                  return e;
                for (var t = 0, a = 0; ; )
                  if (1 === p(t += 1 / 6)) {
                    if (16 <= ++a)
                      break
                  } else
                    a = 0;
                return e = t * (1 / 6) * 1e3,
                  r.springs[n] = e
              }
            }
            function l(n) {
              return void 0 === n && (n = 10),
                function(e) {
                  return Math.ceil(a(e, 1e-6, 1) * n) * (1 / n)
                }
            }
            var d = function(n, e, t, r) {
              if (0 <= n && n <= 1 && 0 <= t && t <= 1) {
                var a = new Float32Array(11);
                if (n !== e || t !== r)
                  for (var o = 0; o < 11; ++o)
                    a[o] = h(.1 * o, n, t);
                return function(o) {
                  return n === e && t === r || 0 === o || 1 === o ? o : h(function(e) {
                    for (var r = 0, o = 1; 10 !== o && a[o] <= e; ++o)
                      r += .1;
                    var i = r + (e - a[--o]) / (a[o + 1] - a[o]) * .1
                      , u = p(i, n, t);
                    if (.001 <= u) {
                      for (var s = e, c = i, l = n, d = t, f = 0; f < 4; ++f) {
                        var g = p(c, l, d);
                        if (0 === g)
                          return c;
                        c -= (h(c, l, d) - s) / g
                      }
                      return c
                    }
                    if (0 === u)
                      return i;
                    for (var m, v, y = e, b = r, x = r + .1, w = n, M = t, P = 0; 0 < (m = h(v = b + (x - b) / 2, w, M) - y) ? x = v : b = v,
                    1e-7 < Math.abs(m) && ++P < 10; )
                      ;
                    return v
                  }(o), e, r)
                }
              }
            };
            function f(n, e) {
              return 1 - 3 * e + 3 * n
            }
            function h(n, e, t) {
              return ((f(e, t) * n + (3 * t - 6 * e)) * n + 3 * e) * n
            }
            function p(n, e, t) {
              return 3 * f(e, t) * n * n + 2 * (3 * t - 6 * e) * n + 3 * e
            }
            g = {
              linear: function() {
                return function(n) {
                  return n
                }
              }
            },
              m = {
                Sine: function() {
                  return function(n) {
                    return 1 - Math.cos(n * Math.PI / 2)
                  }
                },
                Expo: function() {
                  return function(n) {
                    return n ? Math.pow(2, 10 * n - 10) : 0
                  }
                },
                Circ: function() {
                  return function(n) {
                    return 1 - Math.sqrt(1 - n * n)
                  }
                },
                Back: function() {
                  return function(n) {
                    return n * n * (3 * n - 2)
                  }
                },
                Bounce: function() {
                  return function(n) {
                    for (var e, t = 4; n < ((e = Math.pow(2, --t)) - 1) / 11; )
                      ;
                    return 1 / Math.pow(4, 3 - t) - 7.5625 * Math.pow((3 * e - 2) / 22 - n, 2)
                  }
                },
                Elastic: function(n, e) {
                  void 0 === e && (e = .5);
                  var t = a(n = void 0 === n ? 1 : n, 1, 10)
                    , r = a(e, .1, 2);
                  return function(n) {
                    return 0 === n || 1 === n ? n : -t * Math.pow(2, 10 * (n - 1)) * Math.sin((n - 1 - r / (2 * Math.PI) * Math.asin(1 / t)) * (2 * Math.PI) / r)
                  }
                }
              },
              ["Quad", "Cubic", "Quart", "Quint"].forEach((function(n, e) {
                  m[n] = function() {
                    return function(n) {
                      return Math.pow(n, e + 2)
                    }
                  }
                }
              )),
              Object.keys(m).forEach((function(n) {
                  var e = m[n];
                  g["easeIn" + n] = e,
                    g["easeOut" + n] = function(n, t) {
                      return function(r) {
                        return 1 - e(n, t)(1 - r)
                      }
                    }
                    ,
                    g["easeInOut" + n] = function(n, t) {
                      return function(r) {
                        return r < .5 ? e(n, t)(2 * r) / 2 : 1 - e(n, t)(-2 * r + 2) / 2
                      }
                    }
                    ,
                    g["easeOutIn" + n] = function(n, t) {
                      return function(r) {
                        return r < .5 ? (1 - e(n, t)(1 - 2 * r)) / 2 : (e(n, t)(2 * r - 1) + 1) / 2
                      }
                    }
                }
              ));
            var g, m, v = g;
            function y(n, e) {
              if (u.fnc(n))
                return n;
              var t = n.split("(")[0]
                , r = v[t]
                , a = s(n);
              switch (t) {
                case "spring":
                  return c(n, e);
                case "cubicBezier":
                  return i(d, a);
                case "steps":
                  return i(l, a);
                default:
                  return i(r, a)
              }
            }
            function b(n) {
              try {
                return document.querySelectorAll(n)
              } catch (n) {}
            }
            function x(n, e) {
              for (var t, r = n.length, a = 2 <= arguments.length ? e : void 0, o = [], i = 0; i < r; i++)
                i in n && (t = n[i],
                  e.call(a, t, i, n)) && o.push(t);
              return o
            }
            function w(n) {
              return n.reduce((function(n, e) {
                  return n.concat(u.arr(e) ? w(e) : e)
                }
              ), [])
            }
            function M(n) {
              return u.arr(n) ? n : (n = u.str(n) && b(n) || n)instanceof NodeList || n instanceof HTMLCollection ? [].slice.call(n) : [n]
            }
            function P(n, e) {
              return n.some((function(n) {
                  return n === e
                }
              ))
            }
            function k(n) {
              var e, t = {};
              for (e in n)
                t[e] = n[e];
              return t
            }
            function C(n, e) {
              var t, r = k(n);
              for (t in n)
                r[t] = (e.hasOwnProperty(t) ? e : n)[t];
              return r
            }
            function I(n, e) {
              var t, r = k(n);
              for (t in e)
                r[t] = (u.und(n[t]) ? e : n)[t];
              return r
            }
            function O(n) {
              if (n = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(n))
                return n[1]
            }
            function B(n, e) {
              return u.fnc(n) ? n(e.target, e.id, e.total) : n
            }
            function F(n, e) {
              return n.getAttribute(e)
            }
            function A(n, e, t) {
              var a, o, i;
              return P([t, "deg", "rad", "turn"], O(e)) ? e : (a = r.CSS[e + t],
                u.und(a) ? (o = document.createElement(n.tagName),
                  (n = n.parentNode && n.parentNode !== document ? n.parentNode : document.body).appendChild(o),
                  o.style.position = "absolute",
                  o.style.width = 100 + t,
                  i = 100 / o.offsetWidth,
                  n.removeChild(o),
                  n = i * parseFloat(e),
                  r.CSS[e + t] = n) : a)
            }
            function D(n, e, t) {
              var r;
              if (e in n.style)
                return r = e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
                  e = n.style[e] || getComputedStyle(n).getPropertyValue(r) || "0",
                  t ? A(n, e, t) : e
            }
            function E(n, e) {
              return u.dom(n) && !u.inp(n) && (!u.nil(F(n, e)) || u.svg(n) && n[e]) ? "attribute" : u.dom(n) && P(t, e) ? "transform" : u.dom(n) && "transform" !== e && D(n, e) ? "css" : null != n[e] ? "object" : void 0
            }
            function T(n) {
              if (u.dom(n)) {
                for (var e, t = n.style.transform || "", r = /(\w+)\(([^)]*)\)/g, a = new Map; e = r.exec(t); )
                  a.set(e[1], e[2]);
                return a
              }
            }
            function S(n, e, t, r) {
              switch (E(n, e)) {
                case "transform":
                  return function(n, e, t, r) {
                    var a = o(e, "scale") ? 1 : 0 + (o(a = e, "translate") || "perspective" === a ? "px" : o(a, "rotate") || o(a, "skew") ? "deg" : void 0)
                      , i = T(n).get(e) || a;
                    return t && (t.transforms.list.set(e, i),
                      t.transforms.last = e),
                      r ? A(n, i, r) : i
                  }(n, e, r, t);
                case "css":
                  return D(n, e, t);
                case "attribute":
                  return F(n, e);
                default:
                  return n[e] || 0
              }
            }
            function N(n, e) {
              var t = /^(\*=|\+=|-=)/.exec(n);
              if (!t)
                return n;
              var r = O(n) || 0
                , a = parseFloat(e)
                , o = parseFloat(n.replace(t[0], ""));
              switch (t[0][0]) {
                case "+":
                  return a + o + r;
                case "-":
                  return a - o + r;
                case "*":
                  return a * o + r
              }
            }
            function L(n, e) {
              var t;
              return u.col(n) ? function(n) {
                var e, t, r, a, o, i, s;
                return u.rgb(n) ? (e = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(t = n)) ? "rgba(" + e[1] + ",1)" : t : u.hex(n) ? (e = (e = n).replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (function(n, e, t, r) {
                    return e + e + t + t + r + r
                  }
                )),
                  e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e),
                "rgba(" + parseInt(e[1], 16) + "," + parseInt(e[2], 16) + "," + parseInt(e[3], 16) + ",1)") : u.hsl(n) ? (t = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(t = n) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(t),
                  n = parseInt(t[1], 10) / 360,
                  i = parseInt(t[2], 10) / 100,
                  s = parseInt(t[3], 10) / 100,
                  t = t[4] || 1,
                  0 == i ? r = a = o = s : (r = c(i = 2 * s - (s = s < .5 ? s * (1 + i) : s + i - s * i), s, n + 1 / 3),
                    a = c(i, s, n),
                    o = c(i, s, n - 1 / 3)),
                "rgba(" + 255 * r + "," + 255 * a + "," + 255 * o + "," + t + ")") : void 0;
                function c(n, e, t) {
                  return t < 0 && (t += 1),
                  1 < t && --t,
                    t < 1 / 6 ? n + 6 * (e - n) * t : t < .5 ? e : t < 2 / 3 ? n + (e - n) * (2 / 3 - t) * 6 : n
                }
              }(n) : /\s/g.test(n) ? n : (t = (t = O(n)) ? n.substr(0, n.length - t.length) : n,
                e ? t + e : t)
            }
            function j(n, e) {
              return Math.sqrt(Math.pow(e.x - n.x, 2) + Math.pow(e.y - n.y, 2))
            }
            function W(n) {
              for (var e, t = n.points, r = 0, a = 0; a < t.numberOfItems; a++) {
                var o = t.getItem(a);
                0 < a && (r += j(e, o)),
                  e = o
              }
              return r
            }
            function q(n) {
              if (n.getTotalLength)
                return n.getTotalLength();
              switch (n.tagName.toLowerCase()) {
                case "circle":
                  return 2 * Math.PI * F(n, "r");
                case "rect":
                  return 2 * F(t = n, "width") + 2 * F(t, "height");
                case "line":
                  return j({
                    x: F(t = n, "x1"),
                    y: F(t, "y1")
                  }, {
                    x: F(t, "x2"),
                    y: F(t, "y2")
                  });
                case "polyline":
                  return W(n);
                case "polygon":
                  return e = n.points,
                  W(n) + j(e.getItem(e.numberOfItems - 1), e.getItem(0))
              }
              var e, t
            }
            function $(n, e) {
              var t = (n = (e = e || {}).el || function(n) {
                for (var e = n.parentNode; u.svg(e) && u.svg(e.parentNode); )
                  e = e.parentNode;
                return e
              }(n)).getBoundingClientRect()
                , r = F(n, "viewBox")
                , a = t.width;
              return t = t.height,
                {
                  el: n,
                  viewBox: e = e.viewBox || (r ? r.split(" ") : [0, 0, a, t]),
                  x: +e[0],
                  y: +e[1],
                  w: a,
                  h: t,
                  vW: e[2],
                  vH: e[3]
                }
            }
            function H(n, e) {
              var t = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g
                , r = L(u.pth(n) ? n.totalLength : n, e) + "";
              return {
                original: r,
                numbers: r.match(t) ? r.match(t).map(Number) : [0],
                strings: u.str(n) || e ? r.split(t) : []
              }
            }
            function V(n) {
              return x(n ? w(u.arr(n) ? n.map(M) : M(n)) : [], (function(n, e, t) {
                  return t.indexOf(n) === e
                }
              ))
            }
            function X(n) {
              var e = V(n);
              return e.map((function(n, t) {
                  return {
                    target: n,
                    id: t,
                    total: e.length,
                    transforms: {
                      list: T(n)
                    }
                  }
                }
              ))
            }
            function Y(n, e) {
              var t, r = [], a = e.keyframes;
              for (t in e = a ? I(function(n) {
                for (var e = x(w(n.map((function(n) {
                    return Object.keys(n)
                  }
                ))), (function(n) {
                    return u.key(n)
                  }
                )).reduce((function(n, e) {
                    return n.indexOf(e) < 0 && n.push(e),
                      n
                  }
                ), []), t = {}, r = 0; r < e.length; r++)
                  !function(r) {
                    var a = e[r];
                    t[a] = n.map((function(n) {
                        var e, t = {};
                        for (e in n)
                          u.key(e) ? e == a && (t.value = n[e]) : t[e] = n[e];
                        return t
                      }
                    ))
                  }(r);
                return t
              }(a), e) : e)
                u.key(t) && r.push({
                  name: t,
                  tweens: function(n, e) {
                    var t, r = k(e), a = (/^spring/.test(r.easing) && (r.duration = c(r.easing)),
                    u.arr(n) && (2 !== (t = n.length) || u.obj(n[0]) ? u.fnc(e.duration) || (r.duration = e.duration / t) : n = {
                      value: n
                    }),
                      u.arr(n) ? n : [n]);
                    return a.map((function(n, t) {
                        return n = u.obj(n) && !u.pth(n) ? n : {
                          value: n
                        },
                        u.und(n.delay) && (n.delay = t ? 0 : e.delay),
                        u.und(n.endDelay) && (n.endDelay = t === a.length - 1 ? e.endDelay : 0),
                          n
                      }
                    )).map((function(n) {
                        return I(n, r)
                      }
                    ))
                  }(e[t], n)
                });
              return r
            }
            var G = {
              css: function(n, e, t) {
                return n.style[e] = t
              },
              attribute: function(n, e, t) {
                return n.setAttribute(e, t)
              },
              object: function(n, e, t) {
                return n[e] = t
              },
              transform: function(n, e, t, r, a) {
                var o;
                r.list.set(e, t),
                e !== r.last && !a || (o = "",
                  r.list.forEach((function(n, e) {
                      o += e + "(" + n + ") "
                    }
                  )),
                  n.style.transform = o)
              }
            };
            function Z(n, e) {
              X(n).forEach((function(n) {
                  for (var t in e) {
                    var r = B(e[t], n)
                      , a = n.target
                      , o = S(a, t, i = O(r), n)
                      , i = (r = N(L(r, i || O(o)), o),
                      E(a, t));
                    G[i](a, t, r, n.transforms, !0)
                  }
                }
              ))
            }
            function z(n, e) {
              return x(w(n.map((function(n) {
                  return e.map((function(e) {
                      var t, r, a = n, o = E(a.target, e.name);
                      if (o)
                        return r = (t = function(n, e) {
                          var t;
                          return n.tweens.map((function(r) {
                              r = function(n, e) {
                                var t, r = {};
                                for (t in n) {
                                  var a = B(n[t], e);
                                  u.arr(a) && 1 === (a = a.map((function(n) {
                                      return B(n, e)
                                    }
                                  ))).length && (a = a[0]),
                                    r[t] = a
                                }
                                return r.duration = parseFloat(r.duration),
                                  r.delay = parseFloat(r.delay),
                                  r
                              }(r, e);
                              var a = r.value
                                , o = u.arr(a) ? a[1] : a
                                , i = O(o)
                                , s = S(e.target, n.name, i, e)
                                , c = t ? t.to.original : s
                                , l = u.arr(a) ? a[0] : c;
                              return s = O(l) || O(s),
                                i = i || s,
                              u.und(o) && (o = c),
                                r.from = H(l, i),
                                r.to = H(N(o, l), i),
                                r.start = t ? t.end : 0,
                                r.end = r.start + r.delay + r.duration + r.endDelay,
                                r.easing = y(r.easing, r.duration),
                                r.isPath = u.pth(a),
                                r.isPathTargetInsideSVG = r.isPath && u.svg(e.target),
                                r.isColor = u.col(r.from.original),
                              r.isColor && (r.round = 1),
                                t = r
                            }
                          ))
                        }(e, a))[t.length - 1],
                          {
                            type: o,
                            property: e.name,
                            animatable: a,
                            tweens: t,
                            duration: r.end,
                            delay: t[0].delay,
                            endDelay: r.endDelay
                          }
                    }
                  ))
                }
              ))), (function(n) {
                  return !u.und(n)
                }
              ))
            }
            function Q(n, e) {
              function t(n) {
                return n.timelineOffset || 0
              }
              var r = n.length
                , a = {};
              return a.duration = r ? Math.max.apply(Math, n.map((function(n) {
                  return t(n) + n.duration
                }
              ))) : e.duration,
                a.delay = r ? Math.min.apply(Math, n.map((function(n) {
                    return t(n) + n.delay
                  }
                ))) : e.delay,
                a.endDelay = r ? a.duration - Math.max.apply(Math, n.map((function(n) {
                    return t(n) + n.duration - n.endDelay
                  }
                ))) : e.endDelay,
                a
            }
            var R, _ = 0, J = [], K = ("undefined" != typeof document && document.addEventListener("visibilitychange", (function() {
                  en.suspendWhenDocumentHidden && (nn() ? R = cancelAnimationFrame(R) : (J.forEach((function(n) {
                      return n._onDocumentVisibility()
                    }
                  )),
                    K()))
                }
              )),
                function() {
                  !(R || nn() && en.suspendWhenDocumentHidden) && 0 < J.length && (R = requestAnimationFrame(U))
                }
            );
            function U(n) {
              for (var e = J.length, t = 0; t < e; ) {
                var r = J[t];
                r.paused ? (J.splice(t, 1),
                  e--) : (r.tick(n),
                  t++)
              }
              R = 0 < t ? requestAnimationFrame(U) : void 0
            }
            function nn() {
              return document && document.hidden
            }
            function en(t) {
              var r, o = 0, i = 0, u = 0, s = 0, c = null;
              function l(n) {
                var e = window.Promise && new Promise((function(n) {
                    return c = n
                  }
                ));
                return n.finished = e
              }
              d = C(n, t = t = void 0 === t ? {} : t),
                f = Y(h = C(e, t), t),
                h = Q(f = z(t = X(t.targets), f), h),
                p = _,
                _++;
              var d, f, h, p, g = I(d, {
                id: p,
                children: [],
                animatables: t,
                animations: f,
                duration: h.duration,
                delay: h.delay,
                endDelay: h.endDelay
              });
              function m() {
                var n = g.direction;
                "alternate" !== n && (g.direction = "normal" !== n ? "normal" : "reverse"),
                  g.reversed = !g.reversed,
                  r.forEach((function(n) {
                      return n.reversed = g.reversed
                    }
                  ))
              }
              function v(n) {
                return g.reversed ? g.duration - n : n
              }
              function y() {
                o = 0,
                  i = v(g.currentTime) * (1 / en.speed)
              }
              function b(n, e) {
                e && e.seek(n - e.timelineOffset)
              }
              function w(n) {
                for (var e = 0, t = g.animations, r = t.length; e < r; ) {
                  for (var o = t[e], i = o.animatable, u = o.tweens, s = u[c = u.length - 1], c = (c && (s = x(u, (function(e) {
                      return n < e.end
                    }
                  ))[0] || s),
                  a(n - s.start - s.delay, 0, s.duration) / s.duration), l = isNaN(c) ? 1 : s.easing(c), d = s.to.strings, f = s.round, h = [], p = s.to.numbers.length, m = void 0, v = 0; v < p; v++) {
                    var y = void 0
                      , b = s.to.numbers[v]
                      , w = s.from.numbers[v] || 0;
                    y = s.isPath ? function(n, e, t) {
                      function r(t) {
                        return n.el.getPointAtLength(1 <= e + (t = void 0 === t ? 0 : t) ? e + t : 0)
                      }
                      var a = $(n.el, n.svg)
                        , o = r()
                        , i = r(-1)
                        , u = r(1)
                        , s = t ? 1 : a.w / a.vW
                        , c = t ? 1 : a.h / a.vH;
                      switch (n.property) {
                        case "x":
                          return (o.x - a.x) * s;
                        case "y":
                          return (o.y - a.y) * c;
                        case "angle":
                          return 180 * Math.atan2(u.y - i.y, u.x - i.x) / Math.PI
                      }
                    }(s.value, l * b, s.isPathTargetInsideSVG) : w + l * (b - w),
                    !f || s.isColor && 2 < v || (y = Math.round(y * f) / f),
                      h.push(y)
                  }
                  var M = d.length;
                  if (M) {
                    m = d[0];
                    for (var P = 0; P < M; P++) {
                      d[P];
                      var k = d[P + 1]
                        , C = h[P];
                      isNaN(C) || (m += k ? C + k : C + " ")
                    }
                  } else
                    m = h[0];
                  G[o.type](i.target, o.property, m, i.transforms),
                    o.currentValue = m,
                    e++
                }
              }
              function M(n) {
                g[n] && !g.passThrough && g[n](g)
              }
              function P(n) {
                var e = g.duration
                  , t = g.delay
                  , d = e - g.endDelay
                  , f = v(n);
                if (g.progress = a(f / e * 100, 0, 100),
                  g.reversePlayback = f < g.currentTime,
                  r) {
                  var h = f;
                  if (g.reversePlayback)
                    for (var p = s; p--; )
                      b(h, r[p]);
                  else
                    for (var y = 0; y < s; y++)
                      b(h, r[y])
                }
                !g.began && 0 < g.currentTime && (g.began = !0,
                  M("begin")),
                !g.loopBegan && 0 < g.currentTime && (g.loopBegan = !0,
                  M("loopBegin")),
                f <= t && 0 !== g.currentTime && w(0),
                (d <= f && g.currentTime !== e || !e) && w(e),
                  t < f && f < d ? (g.changeBegan || (g.changeBegan = !0,
                    g.changeCompleted = !1,
                    M("changeBegin")),
                    M("change"),
                    w(f)) : g.changeBegan && (g.changeCompleted = !0,
                    g.changeBegan = !1,
                    M("changeComplete")),
                  g.currentTime = a(f, 0, e),
                g.began && M("update"),
                e <= n && (i = 0,
                g.remaining && !0 !== g.remaining && g.remaining--,
                  g.remaining ? (o = u,
                    M("loopComplete"),
                    g.loopBegan = !1,
                  "alternate" === g.direction && m()) : (g.paused = !0,
                  g.completed || (g.completed = !0,
                    M("loopComplete"),
                    M("complete"),
                  !g.passThrough && "Promise"in window && (c(),
                    l(g)))))
              }
              return l(g),
                g.reset = function() {
                  var n = g.direction;
                  g.passThrough = !1,
                    g.currentTime = 0,
                    g.progress = 0,
                    g.paused = !0,
                    g.began = !1,
                    g.loopBegan = !1,
                    g.changeBegan = !1,
                    g.completed = !1,
                    g.changeCompleted = !1,
                    g.reversePlayback = !1,
                    g.reversed = "reverse" === n,
                    g.remaining = g.loop,
                    r = g.children;
                  for (var e = s = r.length; e--; )
                    g.children[e].reset();
                  (g.reversed && !0 !== g.loop || "alternate" === n && 1 === g.loop) && g.remaining++,
                    w(g.reversed ? g.duration : 0)
                }
                ,
                g._onDocumentVisibility = y,
                g.set = function(n, e) {
                  return Z(n, e),
                    g
                }
                ,
                g.tick = function(n) {
                  P(((u = n) + (i - (o = o || u))) * en.speed)
                }
                ,
                g.seek = function(n) {
                  P(v(n))
                }
                ,
                g.pause = function() {
                  g.paused = !0,
                    y()
                }
                ,
                g.play = function() {
                  g.paused && (g.completed && g.reset(),
                    g.paused = !1,
                    J.push(g),
                    y(),
                    K())
                }
                ,
                g.reverse = function() {
                  m(),
                    g.completed = !g.reversed,
                    y()
                }
                ,
                g.restart = function() {
                  g.reset(),
                    g.play()
                }
                ,
                g.remove = function(n) {
                  rn(V(n), g)
                }
                ,
                g.reset(),
              g.autoplay && g.play(),
                g
            }
            function tn(n, e) {
              for (var t = e.length; t--; )
                P(n, e[t].animatable.target) && e.splice(t, 1)
            }
            function rn(n, e) {
              var t = e.animations
                , r = e.children;
              tn(n, t);
              for (var a = r.length; a--; ) {
                var o = r[a]
                  , i = o.animations;
                tn(n, i),
                i.length || o.children.length || r.splice(a, 1)
              }
              t.length || r.length || e.pause()
            }
            return en.version = "3.2.2",
              en.speed = 1,
              en.suspendWhenDocumentHidden = !0,
              en.running = J,
              en.remove = function(n) {
                for (var e = V(n), t = J.length; t--; )
                  rn(e, J[t])
              }
              ,
              en.get = S,
              en.set = Z,
              en.convertPx = A,
              en.path = function(n, e) {
                var t = u.str(n) ? b(n)[0] : n
                  , r = e || 100;
                return function(n) {
                  return {
                    property: n,
                    el: t,
                    svg: $(t),
                    totalLength: q(t) * (r / 100)
                  }
                }
              }
              ,
              en.setDashoffset = function(n) {
                var e = q(n);
                return n.setAttribute("stroke-dasharray", e),
                  e
              }
              ,
              en.stagger = function(n, e) {
                var t = (e = void 0 === e ? {} : e).direction || "normal"
                  , r = e.easing ? y(e.easing) : null
                  , a = e.grid
                  , o = e.axis
                  , i = e.from || 0
                  , s = "first" === i
                  , c = "center" === i
                  , l = "last" === i
                  , d = u.arr(n)
                  , f = d ? parseFloat(n[0]) : parseFloat(n)
                  , h = d ? parseFloat(n[1]) : 0
                  , p = O(d ? n[1] : n) || 0
                  , g = e.start || 0 + (d ? f : 0)
                  , m = []
                  , v = 0;
                return function(n, e, u) {
                  if (s && (i = 0),
                  c && (i = (u - 1) / 2),
                  l && (i = u - 1),
                    !m.length) {
                    for (var y, b, x, w = 0; w < u; w++)
                      a ? (y = c ? (a[0] - 1) / 2 : i % a[0],
                        b = c ? (a[1] - 1) / 2 : Math.floor(i / a[0]),
                        y -= w % a[0],
                        b -= Math.floor(w / a[0]),
                        x = Math.sqrt(y * y + b * b),
                      "x" === o && (x = -y),
                        m.push(x = "y" === o ? -b : x)) : m.push(Math.abs(i - w)),
                        v = Math.max.apply(Math, m);
                    r && (m = m.map((function(n) {
                        return r(n / v) * v
                      }
                    ))),
                    "reverse" === t && (m = m.map((function(n) {
                        return o ? n < 0 ? -1 * n : -n : Math.abs(v - n)
                      }
                    )))
                  }
                  return g + (d ? (h - f) / v : f) * (Math.round(100 * m[e]) / 100) + p
                }
              }
              ,
              en.timeline = function(n) {
                var t = en(n = void 0 === n ? {} : n);
                return t.duration = 0,
                  t.add = function(r, a) {
                    var o = J.indexOf(t)
                      , i = t.children;
                    function s(n) {
                      n.passThrough = !0
                    }
                    -1 < o && J.splice(o, 1);
                    for (var c = 0; c < i.length; c++)
                      s(i[c]);
                    return (o = I(r, C(e, n))).targets = o.targets || n.targets,
                      r = t.duration,
                      o.autoplay = !1,
                      o.direction = t.direction,
                      o.timelineOffset = u.und(a) ? r : N(a, r),
                      s(t),
                      t.seek(o.timelineOffset),
                      s(a = en(o)),
                      i.push(a),
                      r = Q(i, n),
                      t.delay = r.delay,
                      t.endDelay = r.endDelay,
                      t.duration = r.duration,
                      t.seek(0),
                      t.reset(),
                    t.autoplay && t.play(),
                      t
                  }
                  ,
                  t
              }
              ,
              en.easing = y,
              en.penner = v,
              en.random = function(n, e) {
                return Math.floor(Math.random() * (e - n + 1)) + n
              }
              ,
              en
          }
          ,
          "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : n.anime = e()
      }
    )();
    const r = n.getContext("2d")
      , a = ["#FF1461", "#18FF92", "#5A87FF", "#FBF38C"];
    let o = 0
      , i = 0;
    const u = btf.debounce(( () => {
        const {innerWidth: e, innerHeight: t} = window;
        n.width = e,
          n.height = t,
          n.style.width = `${e}px`,
          n.style.height = `${t}px`,
          r.scale(1, 1)
      }
    ), 500)
      , s = anime({
      duration: 1 / 0,
      update: () => {
        r.clearRect(0, 0, n.width, n.height)
      }
    })
      , c = "ontouchstart"in window || navigator.maxTouchPoints ? "touchstart" : "mousedown";
    document.addEventListener(c, (n => {
        ["sidebar", "toggle-sidebar"].includes(n.target.id) || ["A", "IMG"].includes(n.target.nodeName) || (s.play(),
          l(n),
          h(o, i))
      }
    ), !1),
      u(),
      window.addEventListener("resize", u, !1);
    const l = e => {
      const t = n.getBoundingClientRect();
      o = (e.clientX || e.touches[0].clientX) - t.left,
        i = (e.clientY || e.touches[0].clientY) - t.top
    }
      , d = n => {
      const e = anime.random(0, 360) * Math.PI / 180
        , t = anime.random(50, 180)
        , r = [-1, 1][anime.random(0, 1)] * t;
      return {
        x: n.x + r * Math.cos(e),
        y: n.y + r * Math.sin(e)
      }
    }
      , f = n => {
      n.animatables.forEach((n => n.target.draw()))
    }
      , h = (n, e) => {
      const t = ( (n, e) => {
          const t = {
            x: n,
            y: e,
            color: "#F00",
            radius: .1,
            alpha: .5,
            lineWidth: 6,
            draw: () => {
              r.globalAlpha = t.alpha,
                r.beginPath(),
                r.arc(t.x, t.y, t.radius, 0, 2 * Math.PI, !0),
                r.lineWidth = t.lineWidth,
                r.strokeStyle = t.color,
                r.stroke(),
                r.globalAlpha = 1
            }
          };
          return t
        }
      )(n, e)
        , o = Array.from({
        length: 30
      }, ( () => ( (n, e) => {
          const t = {
            x: n,
            y: e,
            color: a[anime.random(0, a.length - 1)],
            radius: anime.random(16, 32),
            endPos: d({
              x: n,
              y: e
            }),
            draw: () => {
              r.beginPath(),
                r.arc(t.x, t.y, t.radius, 0, 2 * Math.PI, !0),
                r.fillStyle = t.color,
                r.fill()
            }
          };
          return t
        }
      )(n, e)));
      anime.timeline().add({
        targets: o,
        x: n => n.endPos.x,
        y: n => n.endPos.y,
        radius: .1,
        duration: anime.random(1200, 1800),
        easing: "easeOutExpo",
        update: f
      }).add({
        targets: t,
        radius: anime.random(80, 160),
        lineWidth: 0,
        alpha: {
          value: 0,
          easing: "linear",
          duration: anime.random(600, 800)
        },
        duration: anime.random(1200, 1800),
        easing: "easeOutExpo",
        update: f
      }, 0)
    }
  }
)();
