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


	$('input').change(function(){
		$( '#rating_form' ).trigger('submit');
	});
	$( '#rating_form' ).submit( function(e){

		e.preventDefault();

		var five_star = parseInt( $('.five_star').val() ) || 0;
		var four_star = parseInt(  $('.four_star').val() ) || 0;
		var three_star = parseInt(  $('.three_star').val() ) || 0;
		var two_star = parseInt(  $('.two_star').val() ) || 0;
		var one_star = parseInt(  $('.one_star').val() ) || 0;

		var total = ( ( five_star * 5 ) + ( four_star * 4 ) + ( three_star * 3 ) + ( two_star * 2 ) + ( one_star * 1 ) ) / ( five_star + four_star + three_star + two_star + one_star );
		var total_ratings = ( five_star * 5 ) + ( four_star * 4 ) + ( three_star * 3 ) + ( two_star * 2 ) + ( one_star * 1 );
		var found_ratings = five_star + four_star + three_star + two_star + one_star;

		// var percentage5 = ;
		$('.rating5').text( precise_round( five_star / found_ratings * 100, 2) + '%' );
		$('.rating4').text( precise_round( four_star / found_ratings * 100, 2) + '%' );
		$('.rating3').text( precise_round( three_star / found_ratings * 100, 2) + '%' );
		$('.rating2').text( precise_round( two_star / found_ratings * 100, 2) + '%' );
		$('.rating1').text( precise_round( one_star / found_ratings * 100, 2) + '%' );


		// Calculate how many ratings we need
		var current_average = precise_round( total, 2) > 0 ? precise_round( total, 2) : 5;
		var next_average = parseFloat(current_average) + 0.01;
			next_average = next_average > 5 ? 5 : next_average;
		var needed_ratings = 1;

		while(true){
			var new_rating = ( total_ratings + (5 * needed_ratings) ) / ( found_ratings + needed_ratings );
			new_rating = precise_round( new_rating, 2 );

			if( new_rating >= next_average ){
				break;
			}
			needed_ratings++;
		}

		$('.total').html( 'Your total rating value is ' + current_average );
		$('.total_needed').html( 'You will need '+needed_ratings+' extra more 5 stars ratings to reach ' + next_average );

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