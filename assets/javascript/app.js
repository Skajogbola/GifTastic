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
                var sportsDiv = $("<div>");
                $('#buttons-view').append(sportsDiv);

                // Retrieves the Rating Data
                console.log(response.data[i].rating);
                var rating = results[i].rating;
                var ratedText = $("<p>").text("Rating: " + rating);
                sportsDiv.prepend(ratedText);

                //Retrieves the image Data
                var sportImage = $("<img class='gif'>");
                sportImage.attr("src", results[i].images.fixed_height_still.url);
                sportImage.attr("data-state", "still");
                sportImage.attr("data-still", results[i].images.fixed_height_still.url);
                sportImage.attr("data-animate", results[i].images.fixed_height.url)

                sportsDiv.append(sportImage);
                $(".insert-gif").append(sportsDiv);
                
            }
        }).fail(function (err) {
            throw err;
        });
    });

    //function stores input to data-search and create a button
    function createButton() {
        //delete prior gifs to add over gif buttons
        $("#buttons-view").empty();
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
    createButton();

    $(document).on("click", ".gif", function () {
        var state = $(this).attr("data-state");

        if (state === 'still') {
            var animate = $(this).attr("data-animate");
            $(this).attr("src", animate);
            $(this).attr("data-state", "animate");

        } else if (state != 'still') {
            var still = $(this).attr("data-still");

            $(this).attr("src", still);
            $(this).attr("data-state", "still");
        }
    });
});
