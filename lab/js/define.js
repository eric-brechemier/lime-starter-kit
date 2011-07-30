/*
 * File: define.js
 * A Basic implementation of CommonJS Asynchronous Module Definition (AMD)
 * for LIME TV.
 *
 * This basic implementation supports only a subset of AMD:
 *
 * - define(id, factory) with two explicit arguments included, with their
 *   types fixed to string and function
 *
 * - the factory function will always receive the following arguments:
 *   require function and exports object (no module argument is provided)
 *
 * - require function only supports absolute identifiers
 *
 * - the return value of the factory is not considered for exports, only the
 *   exports object is taken into account
 *
 * - module would only contain the "id" property, with is provided in the call
 *   to define(). This argument is thus unnecessary and is not provided.
 *
 * - the property define.amd is not set, because this basic implementation is
 *   not compliant with the full AMD specification
 *
 * This implementation triggers the callback functions registered with define()
 * immediately, without checking if all dependencies have actually been defined
 * in previous calls; undefined values will be returned by require() for
 * missing modules.
 *
 * This basic implementation is intended to be used in LIME TV environment,
 * which allows only the definition of named functions at the global level. To
 * overcome this limitation while preserving the privacy of each module, this
 * define() function cleans up the global space by deleting any global property
 * whose name starts with the given id followed by an underscore after running
 * the factory function.
 *
 * In this context, the three examples of the AMD API Specification would have
 * to be adapted to call define(id,factory), use require() to get dependencies
 * and declare (transient) global functions deleted after use in define():
 *
 * Example 1:
 * The name of all global functions is prefixed with the identifier of the
 * module, to avoid conflicts with other modules caused by function hoisting
 * and allow automatic clean-up of global scope in define():
 *
 * | function alpha_verb() {
 * |   return require("beta").verb();
 * | }
 * |
 * | function alpha_factory(require, exports) {
 * |   exports.verb = module1_verb;
 * | }
 * |
 * | define("alpha", alpha_factory);
 *
 * Example 2 (now similar to Example 1):
 *
 * | function module2_verb(){
 * |   return require("alpha").verb() + 2;
 * | }
 * |
 * | function module2_factory(require, exports) {
 * |   exports.verb = module2_verb;
 * | }
 * |
 * | define("module2", module2_factory);
 *
 * Example 3 (now similar to Example 1 and Example 2):
 *
 * | function module3_add(x, y){
 * |   return x + y;
 * | }
 * |
 * | function module3_factory(exports){
 * |   exports.add = module3_add;
 * | }
 * |
 * | define("module3",module3_factory);
 *
 * Notes:
 *   o all arguments must be set explicitly for this implementation of define()
 *   o object literal notation {} is not supported, it must be replaced with
 *     new Object(). The same applies to array literal notation [], which must
 *     be replaced with new Array();
 *   o line comments are not supported and must be replaced with block comments
 *   o strict comparison operators === and !== are not supported; typeof can be
 *     used in combination with == and != to ensure strict equality.
 *   o try/catch is not supported
 *   o function.apply() and function.call() are not supported
 *
 * Reference:
 * https://github.com/amdjs/amdjs-api/wiki/AMD
 *
 * Author:
 * Eric Bréchemier <lime@eric.brechemier.name>
 *
 * License:
 * BSD License
 * http://creativecommons.org/licenses/BSD/
 *
 * Version:
 * 2011-07-30
 */
/*global require, define */

function require(id){
  /* Function: require(id)
   * Get the module with given id.
   *
   * Parameter:
   *   id - string, absolute module identifier
   *
   * Returns:
   *   object, the exports of the corresponding module,
   *   or undefined if no module has been defined with given id.
   */

  return require.exports[id];
}

/* define.exports - object, hash of module id => exports */
require.exports = new Object();

function define(id, factory){
  /* Function: define(id, factory)
   * Define a module created by a factory.
   *
   * Parameters:
   *   id - string, absolute identifier of the module.
   *   factory - function(require,exports,module): any, callback which will be
   *             called immediately, with
   *             o require - function, the global require function
   *             o exports - object, the module object holding the public
   *                         properties set in the factory, which will be
   *                         associated with the given identifier and returned
   *                         in calls to require() with the given id
   */

  var name,
      prefix = id + '_',      /* string, prefix for global scope clean-up */
      exports = new Object(); /* object, exports object of the new module */

  /* call the factory immediately */
  require.exports[id] = exports;

  document.getElementById('bezen.log').firstChild.data += "Call factory for "+id+": "+factory+"\n";
  factory(require, exports);

  /* Clean-up globals */
  for (name in this) {
    if ( name.indexOf(prefix) == 0 ) { /* name starts with prefix */
      delete this[name];
    }
  }

}

