# Fanimate - is Fast Animate

## About

jQuery Fanimate is a tiny (~100 lines) but very powerful jQuery extension.
It allows to animate hundreds of elements at once by using stylesheet rules
(instead of animating each element style like jQuery does).

[**Demo**](http://medihack.github.com/jquery-fanimate/demo.html)

## Dependencies

Tested with jQuery 1.5.1, but it should work with jQuery >= 1.4.3

## Usage

Simply add a class (e.g. "fanimate") to all elements you would like to animate (this is usually pretty fast).
Then use Fanimate like below:

    $.fanimate("div.fanimate") // creates a new style rule
	.css({width: 50, height: 50, opacity: 0}) // sets some style attributes
	.animate({width: 100, height: 100, opacity: 1}, 2000) // animate those attributes
	.animate({width: 50, height: 50, opacity: 0}, 2000, function() { // another animation
		// do something afterwards
	})
	.remove(); // removes the added style rule

Keep in mind that Fanimate can't animate already set element styles. This is because Fanimate uses normal style
sheet definitions which can never override element styles.


## Credits

Thanks to David Tang and his very nice Javascript Stylesheet rule library [JSS](https://github.com/Box9/jss).
Fanimate reuses some of his code to setup the CSS rules.

## License

Dual licensed under the MIT and GPL licenses: http://www.opensource.org/licenses/mit-license.php http://www.gnu.org/licenses/gpl.html

Copyright(c) 2011 Kai Schlamp
