/*
 * jQuery Mass Animate, version 0.3 (2011-03-30)
 *
 * Copyright(c) 2011 Kai Schlamp
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
(function($) {
	// hack $.css for getting styles from CSS rule
	var oldCss = $.css;
	$.css = function(elem, name, extra) {
		if (!(elem.selectorText)) {
			return oldCss(elem, name, extra);
		}
		else {
			if (name == "opacity" && elem.style.filter) {
				// use hook for IE inside jQuery
				return oldCss(elem, name, extra);
			}
			else {
				var origName = $.camelCase(name),
				prop = $.cssProps[origName] || origName;
				return elem.style[prop];
			}
		}
	}

	// hack $.data for animations in IE 7, IE 8
	var cache = {};
	var mediator = function(original){
		return function (elem) {
			var id = elem.selectorText;
			if (id) {
				arguments[0] = cache[id] = cache[id] || {};
			}
			return original.apply($, arguments);
		};
	};
	$.data = mediator($.data);
	$.removeData = mediator($.removeData);

	// add additional style sheet that massanimate acts on
	var sheet = null;
	$(document).ready(function() {
		var elem = $('<style rel="mass-animate" type="text/css"></style>')
		.appendTo($('head'))[0];

		sheet = elem.sheet || elem.styleSheet;
	});

	function fetchRule(sheet, selector) {
		var rules = sheet.cssRules || sheet.rules;
		for (var i = 0, length = rules.length; i < length; i++) {
			// TODO: selectorText may not be correct in IE<9
			// as it splits selectors with ',' into multiple rules
			if (rules[i].selectorText.toLowerCase() == selector.toLowerCase()) {
				return rules[i];
			}
		}
		return null;
	}

	function insertRule(sheet, selector) {
		if (sheet.insertRule) {
			sheet.insertRule(selector + ' { }', 0);
		}
		else if (sheet.addRule) {
			sheet.addRule(selector, null, 0);
		}

		var rule = null;
		if (sheet.cssRules) {
			rule = sheet.cssRules[0];
		} else {
			rule = sheet.rules[0];
		}

		return rule;
	}

	function deleteRule(rule) {
		var rules = sheet.cssRules || sheet.rules;
		for (var i = 0, length = rules.length; i < length; i++) {
			if (rules[i] === rule) {
				if (sheet.deleteRule) {
					sheet.deleteRule(i);
				}
				else if (sheet.removeRule) {
					sheet.removeRule(i);
				}
				break;
			}
		}
	}

	function setStyle(rule, name, value) {
		$.access([rule], name, value, true, function(elem, name, value) {
			$.style(elem, name, value);
		});
	}

	$.massanimate = function(selector) {
		var rule = fetchRule(sheet, selector);
		if (!rule) {
			rule = insertRule(sheet, selector);
		}

		return {
			css: function(name, value) {
				setStyle(rule, name, value);
				return this;
			},
			animate: function(properties, duration, easing, callback) {
				var self = this;

				var opt = duration && typeof duration === "object" ? $.extend({}, duration) : {
					callback: callback || !callback && easing ||
						$.isFunction(duration) && duration,
					duration: duration,
					easing: callback && easing || easing && !$.isFunction(easing) && easing
				};

				$.fn.animate.call($(rule), properties, opt.duration, opt.easing, function() {
					if (opt.callback && $.isFunction(opt.callback)) {
						opt.callback.apply(self, arguments);
					}
				});

				return this;
			},
			remove: function() {
				var queue = $.queue(rule);
				if (queue && queue[0] === "inprogress") {
					/* TODO: not working, see issue #1.
					   Just ignore the remove now when an animation is in progress.
					$.queue(rule, "fx", function(next) {
						deleteRule(rule);
						next();
					}); */
				}
				else {
					deleteRule(rule);
					return true;
				}
				return false;
			}
		}
	}
})(jQuery)
