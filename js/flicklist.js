

var model = {
  watchlistItems: [],
  browseItems: []
}


var api = {
  root: "https://api.themoviedb.org/3",
  token: "c665d840e21dbe2b26215f0b92b9d678" // TODO 0 put your api key here
}


/**
 * Makes an AJAX request to themoviedb.org, asking for some movies
 * if successful, updates the model.browseItems appropriately, and then invokes
 * the callback function that was passed in
 */
function discoverMovies(callback) {
	$.ajax({
		url: api.root + "/discover/movie",
		data: {
			api_key: api.token,
		},
		success: function(response) {

			$.each(response['results'],function(i,v){
				model.browseItems.push(v);
			});
			// TODO 2
			// update the model, setting its .browseItems property equal to the movies we recieved in the response
			
			// invoke the callback function that was passed in. 
			callback();
		}
	});
  
}


/**
 * re-renders the page with new content, based on the current state of the model
 */
function render() {
  // TODO 7
  // clear everything from both lists
  	$("ul").empty();
  // TODO 6
  // for each movie on the user's watchlist, insert a list item into the <ul> in the watchlist section
  $.each(model.watchlistItems,function(movie,data) {
			var mymovie = $('<li></li>').append($('<p></p>').text(data));
			$("#section-watchlist ul").append(mymovie);
  });	
  // for each movie on the current browse list, 
  $.each(model.browseItems,function(movie,data) {
		// TODO 3
		// insert a list item into the <ul> in the browse section
			var mymovie = $('<li></li>').append($('<p></p>').text(data.title));
		//	$("#section-browse ul").append(mymovie);
		// TODO 4
		// the list item should include a button that says "Add to Watchlist"
			var mybutton = $('<button></button>').text("Add to Watchlist");
			$("#section-browse ul").append(mymovie).append(mybutton);
		// TODO 5
		// when the button is clicked, this movie should be added to the model's watchlist and render() should be called again
  		mybutton.click(function(e){
  			model.watchlistItems.push(data.title);
  			render();
  		});
  	
  	
  });
  
}


// When the HTML document is ready, we call the discoverMovies function,
// and pass the render function as its callback
$(document).ready(function() {
  discoverMovies(render);
});

