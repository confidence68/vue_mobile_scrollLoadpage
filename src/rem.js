(function(d, c) {
  const e = d.documentElement,
    a = 'orientationchange' in window ? 'orientationchange' : 'resize',
    b = function() {
      var f = e.clientWidth
      if (!f) { return }
      if (f >= 750) {
        e.style.fontSize = '100px'
      } else {
        e.style.fontSize = 100 * (f / 750) + 'px'
      }
    }
  if (!d.addEventListener) { return }
  b()
  c.addEventListener(a, b, false)
  d.addEventListener('DOMContentLoaded', b, false)
}
)(document, window)
