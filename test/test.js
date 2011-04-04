(function($) {
	function getSheet() {
		var elem = $('style[rel="mass-animate"]')[0];
		return elem.sheet || elem.styleSheet;
	}

	function getRules() {
		var sheet = getSheet();
		return rules = sheet.cssRules || sheet.rules;
	}

	module("MassAnimate", {
		setup: function() {
		},
		teardown: function() {
		}
	});

	test("new style element is initially appended to document", function() {
		expect(2);
		ok($("head").has($('style[rel="mass-animate"]')));
		equal($('style[rel="mass-animate"]').length, 1);
	});

	test("inserts new empty style rule", function() {
		expect(3);
		$.massanimate('.mass');
		equal(getRules().length, 1);
		equal(getRules()[0].selectorText, '.mass');
		equal(getRules()[0].style.length, 0);
	});

	test("sets new style in style rule", function() {
		expect(3);
		$.massanimate('.mass').css({
			width: 100
		});
		equal(getRules()[0].style.length, 1);
		equal(getRules()[0].style[0], 'width');
		equal(getRules()[0].style.getPropertyValue('width'), '100px');
	});

	test("sets new style on elements", function() {
		expect(2);
		$.massanimate('.mass').css({
			width: 100
		});
		equal($('div#one').width(), 100);
		equal($('div#two').width(), 100);
	});

	test("animates width in style rule", function() {
		expect(3);
		$.massanimate('.mass').css({
			width: 100
		}).animate({
			width: 70
		}, 0);
		equal(getRules()[0].style.length, 1);
		equal(getRules()[0].style[0], 'width');
		equal(getRules()[0].style.getPropertyValue('width'), '70px');
	});

	test("animates width on elements", function() {
		expect(2);
		$.massanimate('.mass').css({
			width: 100
		}).animate({
			width: 70
		}, 0);
		equal($('div#one').width(), 70);
		equal($('div#two').width(), 70);
	});

	test("removes style rule", function() {
		expect(1);
		$.massanimate('.mass').remove();
		equal(getRules().length, 0);
	});

	test("removes style on elements", function() {
		expect(2);
		$.massanimate('.mass').remove();
		equal($('div#one').width(), 0);
		equal($('div#two').width(), 0);
	});

	test("removes style rule after animation", function() {
		expect(3);
		stop();
		$.massanimate('.mass').css({
			width: 100
		}).animate({
			width: 70
		}, 500, function() {
			var result = this.remove();
			ok(result);
		});

		window.setTimeout(function() {
			equal(getRules().length, 1, "style rule present in animation");
		}, 250);

		window.setTimeout(function() {
			equal(getRules().length, 0, "style rule removed after animation");
			start();
		}, 750);
	});

	test("removing style rule during animation is ignored", function() {
		expect(3);
		stop();
		var massanimate = $.massanimate('.mass').css({
			width: 100
		}).animate({
			width: 70
		}, 250);

		equal(getRules().length, 1);
		var result = massanimate.remove();
		ok(!result);
		equal(getRules().length, 1);

		window.setTimeout(function() {
			start();
			massanimate.remove(); // cleanup
		}, 500);
	});
	
	test("does not insert style rule if already preset", function() {
		expect(2);
		$.massanimate('.mass');
		equal(getRules().length, 1);
		$.massanimate('.mass');
		equal(getRules().length, 1);
	});

	test("sets opacity correctly", function() {
		expect(5);
		$.massanimate('.mass').css({
			opacity: 0.5
		});
		equal(getRules()[0].style.length, 1);
		equal(getRules()[0].style[0], 'opacity');
		equal(getRules()[0].style.getPropertyValue('opacity'), '0.5');
		equal($('div#one').css('opacity'), 0.5);
		equal($('div#two').css('opacity'), 0.5);
	});

})(jQuery);
