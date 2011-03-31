$(document).ready(function() {
	for (var i = 0; i < 500; i++) {
		$('<div class="mass-animate"></div>').appendTo($("body"));
	}

	var massanimate = $.massanimate("div.mass-animate").css({width: 50, height: 50, opacity: 0});

	$('<div id="start">Click Me!</div>').appendTo($("body")).click(function() {
		var $this = $(this);
		$this.hide();
		massanimate.animate({width: 100, height: 100, opacity: 1}, 1500)
		.animate({width: 50, height: 50, opacity: 0}, 1500, function() {
			$this.fadeIn();
            $('<div id="comparilla">Comparilla.com</div>').appendTo($('body'))
            .hide().fadeIn(1000);
		});
	});
});