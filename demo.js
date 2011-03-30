$(document).ready(function() {
	for (var i = 0; i < 500; i++) {
		$('<div class="fanimate"></div>').appendTo($("body"));
	}

	$('<div id="start">Click Me!</div>').appendTo($("body")).click(function() {
		var $this = $(this);
		$this.hide();
		$.fanimate("div.fanimate")
		.css({width: 50, height: 50, opacity: 0})
		.animate({width: 100, height: 100, opacity: 1}, 2000)
		.animate({width: 50, height: 50, opacity: 0}, 2000, function() {
			$this.fadeIn();
            $('<div id="comparilla">Comparilla.com</div>').appendTo($('body'))
            .hide().fadeIn(1000);
		})
		.remove();
	});
});