/**
 * This is the main js functions file for the Envato Rating Calculator
 * @author Zauan ( ThemeFuzz/Hogash )
 * @link http://themeforest.net/user/hogash
 * @link http://themeforest.net/user/ThemeFuzz
 */
$(document).ready(function(){
	function precise_round(num, decimals) {
		var t=Math.pow(10, decimals);
		return (Math.round((num * t) + (decimals>0?1:0)*(Math.sign(num) * (10 / Math.pow(100, decimals)))) / t).toFixed(decimals);
	}

	// Set form values
	$('.five_star').val( localStorage.zn_five_stars );
	$('.four_star').val( localStorage.zn_four_star );
	$('.three_star').val( localStorage.zn_three_star );
	$('.two_star').val( localStorage.zn_two_star );
	$('.one_star').val( localStorage.zn_one_star );


	$( '#rating_form' ).submit( function(e){

		e.preventDefault();

		var five_star = parseInt( $('.five_star').val() ) || 0;
		var four_star = parseInt(  $('.four_star').val() ) || 0;
		var three_star = parseInt(  $('.three_star').val() ) || 0;
		var two_star = parseInt(  $('.two_star').val() ) || 0;
		var one_star = parseInt(  $('.one_star').val() ) || 0;

		var total = ( ( five_star * 5 ) + ( four_star * 4 ) + ( three_star * 3 ) + ( two_star * 2 ) + ( one_star * 1 ) ) / ( five_star + four_star + three_star + two_star + one_star );

		$('.total').html( 'Your total rating value is ' + precise_round( total, 2) );

		// save the data
		if(typeof(Storage) !== "undefined") {
	    	// Code for localStorage/sessionStorage.
	    	localStorage.setItem("zn_five_stars", five_star);
	    	localStorage.setItem("zn_four_star", four_star);
	    	localStorage.setItem("zn_three_star", three_star);
	    	localStorage.setItem("zn_two_star", two_star);
	    	localStorage.setItem("zn_one_star", one_star);
		}

	}).trigger('submit');

})