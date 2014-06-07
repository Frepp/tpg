/**
 * Helpers and tools to ease your JavaScript day.
 *
 * @author Fredrik Peterson
 */
window.Frepp = (function(window, document, undefined ) {
	var Frepp = {};

	Frepp.random = function (min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};
 

  // Expose public methods
  return Frepp;
  
})(window, window.document);