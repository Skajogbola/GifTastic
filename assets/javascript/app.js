$(document).ready(function () {
    var topics = ["Football", "Soccer", "Table Tennis", "Basketball", "Golf", "Tennis", "Baseball", "Cricket", "Volleyball", "Hockey"];


    // displaySportInfo function re-renders the HTML to display the appropriate content

    $(document).on("click", ".gif-button", function () {
        $(".insert-gif").empty();
        var sport = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=mzMLBbFrsHPBj3ndFptu7JolNKod8Dsw&limit=10&lang=en";

        // Creates AJAX call for the specific movie button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                // Creates a div to hold the movie
                var sportsDiv = $("<div>");
                $('#form').append(sportsDiv);

                // Retrieves the Rating Data
                console.log(response.data[i].rating);
                var rating = results[i].rating;
                // Creates an element to have the rating displayed
                var ratedText = $("<p>").text("Rating: " + rating);
                // Displays the rating
                sportsDiv.prepend(ratedText);

                //Retrieves the image Data
                var sportImage = $("<img class='gif'>");
                sportImage.attr("src", results[i].images.fixed_height_still.url);
                //adds element data-state = still
                sportImage.attr("data-state", "still");
                //adds element data-still with paused gif
                sportImage.attr("data-still", results[i].images.fixed_height_still.url)
                //adds element data-animate with moving gif
                sportImage.attr("data-animate", results[i].images.fixed_height.url)

                sportsDiv.append(sportImage);
            }
        }).fail(function (err) {
            throw err;
        });
    });
    //function stores input to data-search and create a button
    // $("#buttons-view").on("click",function(){
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

    $(document).on("click", ".gif", function () {

        //when gif is paused, it can animate when clicked
        var state = $(this).attr("data-state");

        if (state === 'still') {
            //create animate equals to value in element data-animate
            var animate = $(this).attr("data-animate");

            //overwrite element src with variable animate
            $(this).attr("src", animate);

            //overwrite element data-state to animate
            $(this).attr("data-state", "animate");

        } else if (state != 'still') {
            var still = $(this).attr("data-still");

            $(this).attr("src", still);
            $(this).attr("data-state", "still");
        }
    });
});
