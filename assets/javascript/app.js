$(document).ready(function () {
    var topics = ["Football", "Soccer", "Table Tennis", "Basketball", "Golf", "Tennis"];


    // displaySportInfo function re-renders the HTML to display the appropriate content
    function displaySportInfo() {

        var sport = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=mzMLBbFrsHPBj3ndFptu7JolNKod8Dsw&q=" + sport + "&limit=10&offset=0&rating=G&lang=en";

        // Creates AJAX call for the specific movie button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            for (var i = 0; i < 10; i++) {

                // Creates a div to hold the movie
                var sportsDiv = $("<div>");
                $('#buttons-view').prepend(sportsDiv);
                // Retrieves the Rating Data
                console.log(response.data[i].rating);
                // Creates an element to have the rating displayed
                var ratedText = $("<p>").text("Rating: " + response.data[i].rating);
                // Displays the rating
                sportsDiv.append(ratedText);

                //new image for images
                var gif = $("<img class='gif'>");
                //adds element src with paused gif
                gif.attr("src", response.data[i].images.fixed_height_still.url);
                //adds element data-state = still
                gif.attr("data-state", "still");
                //adds element data-still with paused gif
                gif.attr("data-still", response.data[i].images.fixed_height_still.url)
                //adds element data-animate with moving gif
                gif.attr("data-animate", response.data[i].images.fixed_height.url)

                sportsDiv.append(gif);
            }
        }).fail(function(err) {
            throw err;
        });
    }

    //function stores input to data-search and create a button
    function createButton() {
        //delete prior gifs to add over gif buttons
        $("#buttons-view").empty();
        //creates new button, creates gif-button class, and add into array
        for (var i = 0; i < topics.length; i++) {
            var a = $("<button>");
            a.addClass("gif-button");
            a.attr("data-name", topics[i]);
            a.text(topics[i]);
            $("#buttons-view").append(a);
        }
        console.log(topics);
    }
    // This function handles events where the add movie button is clicked
    $("#submitPress").on("click", function (event) {
        event.preventDefault();
        var newSports = $("#user-input").val().trim();
        topics.push(newSports);
        createButton();
    });

    // Calling the renderButtons function to display the initial list of movies
    createButton();
    displaySportInfo();

});
