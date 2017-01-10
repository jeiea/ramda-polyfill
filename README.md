# ramda-polyfill
ramda.js Object prototype polyfill library.

Insert ramda functions to Object's prototype.

Due to name collision, 'R' appended to name. e.g. `anyR`

It uses 'this' as last regular argument.

Unary function is evaluated without call parenthesis.

So what you can do with this is
```javascript
function getAccessibleVisibleFramesSizeDesc(win) {
  return win
    .mapR(w => w) // .toArray()
    // for ease of processing recursive frame.
    .unfoldR(([frame = null, ...rest]) => {
      if (!frame) return false;
      try { // for CORS blocked exception.
        return [
          $(frame.frameElement).is(':visible') ? frame : null,
          rest.concat(R.map(w => w, frame))
        ];
      } catch (e) {
        return [null, rest];
      }
    })
    .filter(w => w) // filter blocked or invisible frame.
    .appendR(win) // include itself.
    // size descending sort.
    .sortByR({x: frameElement} => -x.clientWidth * x.clientHeight);
}
```
