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
    // for ease of adding recursive frame.
    .unfoldR(([frame = null, ...rest]) => {
      if (!frame) return false;
      try { // for CORS violated frame.
        return [
          $(frame.frameElement).is(':visible') ? frame : null,
          rest.concat(R.map(w => w, frame))
        ];
      } catch (e) {
        return [null, rest];
      }
    })
    .filter(R.identity) // filter denied or invisible frame.
    .sortByR(x => -x.frameElement.clientWidth * x.frameElement.clientHeight)
    .appendR(win) // include itself.
    .reverseR; // size descending sort.
}
```
