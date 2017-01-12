# ramda-polyfill [![npm version](https://badge.fury.io/js/ramda-polyfill.svg)](https://badge.fury.io/js/ramda-polyfill)

ramda.js Object prototype polyfill library.

It inserts ramda functions to Object's prototype.
Maybe not suitable for production.

## So what you can do with this is
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
    // size descending sort.
    .sortByR(({ frameElement: x }) => -x.clientWidth * x.clientHeight)
    .prependR(win); // include itself.
}
```
See test/test.js for more examples.

## Precautions
- Due to name collision, 'R' is appended to name. e.g. `anyR`
- It uses 'this' as last regular argument.
- Unary function is evaluated without call parenthesis.
- It imports side effects by default and can toggle features by specific function.
