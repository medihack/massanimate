# jQuery Mass Animate

## About

jQuery Mass Animate is a tiny (~120 lines) but very powerful jQuery extension.
It allows to animate hundreds of elements at once and synchronously by using stylesheet rules
(instead of animating each element style like normally jQuery does).

[**Demo**](http://medihack.github.com/jquery-massanimate/demo/demo.html)

## Dependencies

It should work with jQuery >= 1.4.3. Tested with Firefox 3/4, Chrome, Opera 11, IE 7/8/9 on Windows and Linux.


## Usage

Simply add a class (e.g. "mass-animate") to all elements you would like to animate (this is usually pretty fast).
Then use `massanimate` like below:

    $.massanimate("div.mass-animate") // creates a new empty style rule
	.css({width: 50, height: 50, opacity: 0}) // set some initial style attributes
	.animate({width: 100, height: 100, opacity: 1}, 2000) // animate those attributes
	.animate({width: 50, height: 50, opacity: 0}, 2000, function() { // another animation
		// do something afterwards
	})
	.remove(); // remove the added style rule and all its style attributes

I hardly recommend setting the initial style attributes with the `css` method that you want to animate. You can also
set the styles using `css` between the `animate` methods.

`remove` deletes the rule after all animations are finished. After that you can't add new animations to that rule. The
`remove` is optional. You can also use Mass Animate to just set styles without any animations.

Keep in mind that *Mass Animate* can't animate already set element styles. This is because *Mass Animate* uses normal style
sheet definitions which can't override element styles (`!important` does not seem to work with jQuery animations).


## Credits

Thanks to David Tang and his very nice Javascript Stylesheet rule library [JSS](https://github.com/Box9/jss).
*Mass Animate* reuses some of his code to setup the CSS rules.

## License

Dual licensed under the MIT and GPL licenses: http://www.opensource.org/licenses/mit-license.php http://www.gnu.org/licenses/gpl.html

Copyright(c) 2011 Kai Schlamp
