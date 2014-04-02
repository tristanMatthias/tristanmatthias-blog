// Various functions used in app

/**
 * Returns a string replaced with an associative array
 * Examples
 *     "My name is $name".dict({ name: "Tristan" }) -> "My name is Tristan"
 *
 * @param  {Object} dict
 * @return {String}
 */
String.prototype.dict = function(dict) {
  return this.replace(/(\$\w*)/g, function(text) {
    var v = /^\$(.*)/.exec(text)[1];
    if (!dict[v]) return text;
    return (typeof dict[v] === "object") ? JSON.stringify(dict[v]) : dict[v];
  });
};

/**
 * Repeats a string n number of times
 * Examples
 *  var str = "Hello";
 *  var repeated = str.repeat(4) -> "HelloHelloHelloHello";
 *
 * @param  {Integer} num
 * @return {String}
 */
String.prototype.repeat = function(n) {
    return new Array(n + 1).join(this);
};

/**
 * Extends object and overrides values
 * @param  {Object} override Extending object
 * @return {null}
 */
Object.prototype.extend = function(override) {
    var copy = JSON.parse(JSON.stringify(this));
    for(var k in override) {
        copy[k] = override[k] || copy[k];
    }
    return copy;
};
