/*
 * jQuery Fanimate, version 0.1 (2011-03-30)
 *
 * Copyright(c) 2011 Kai Schlamp
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
(function($) {
	var oldCss = $.css;
	$.css = function(elem, name, extra) {
		if (!(elem.selectorText)) {
			return oldCss(elem, name, extra);
		}
		else {
			var origName = $.camelCase(name),
			prop = $.cssProps[origName] || origName;
			return elem.style[prop];
		}
	}

	var sheet = null;
	$(document).ready(function() {
		var elem = $('<style rel="fanimate" type="text/css"></style>')
		.appendTo($('head'))[0];

		if (elem.sheet) {
			sheet = elem.sheet;
		}
		else {
			sheet = elem.styleSheet;
		}
	});

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

		// IE<9 support
		if (rule && !rule.parentStyleSheet) {
			rule.parentStyleSheet = sheet;
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

	$.fanimate = function(selector) {
		var rule = insertRule(sheet, selector);

		return {
			css: function(name, value) {
				setStyle(rule, name, value);
				return this;
			},
			animate: function(properties, duration, easing, callback) {
				$.fn.animate.call($(rule), properties, duration, easing, callback);
				return this;
			},
			remove: function() {
				var queue = $.queue(rule);
				if (queue && queue[0] === "inprogress") {
					$.queue(rule, "fx", function(next) {
						deleteRule(rule);
						next();
					});
				}
				else {
					deleteRule(rule);
				}
			}
		}
	}
})(jQuery)
