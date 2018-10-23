$(document).ready(function () {


    
    var topics = ["SpaceBalls", "Rocky", "Avengers", "Zombieland", "Jurrasic Park", 
    "Forrest Gump", "The Matrix", "Indiana Jones", "The Princess Bride", "Batman Begins"];


    function showButtons() {
        $(document).on("click", ".action", searchGame);
        $("#buttonContainer").empty();
        for (i = 0; i < topics.length; i++) {
            var topicBtn = $("<button>");
            topicBtn.addClass("action");
            topicBtn.addClass("btn btn-outline-warning");
            topicBtn.attr("data-name", topics[i]);
            topicBtn.text(topics[i]);
            $("#buttonContainer").append(topicBtn);
            console.log("hello world");

        }
    }

    function newButton() {
        $("#run-search").on("click", function () {
            var action = $("#search-term").val();
            
            if (action == "") {
                return false;
            }
            topics.push(action);
            showButtons();
            return false;
        })
    }

    function clearButton() {
        
        $("#run-clear").on("click", function () {
            var action = $("#search-term").val();
           
            
           topics.pop(action);
           showButtons();
        //    return false;

        })}
// search function
    function searchGame(event) {
        var action = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            action + "&api_key=JCa8ZEU6NEdHvmo0YZAr9nWycAX0B5uI&limit=10";


        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function (response) {
                console.log(queryURL);
                $(".gifHold").empty();

                event.preventDefault();
                // storing the data from the AJAX request in the results variable
                var results = response.data;

                console.log(response.data);
                for (i = 0; i < results.length; i++) {
                    var giphDiv = $("<div>");//add a col-md-5 to see if that changes it to 2 pictures
                    var useRates = $("<p>")
                    giphDiv.addClass("img-responsive");
                    useRates.text("Ratings: " + results[i].rating);
                    
                    var giphImg = $("<img>");
                    giphImg.attr("src", results[i].images.fixed_height_still.url);
                    giphImg.attr("data-still", results[i].images.fixed_height_still.url);
                    giphImg.attr("data-animate", results[i].images.fixed_height.url);
                    giphImg.attr("data-state", "still");
                    giphImg.addClass("image");



                    giphDiv.append(useRates);

                    giphDiv.append(giphImg);



                    $(".gifHold").prepend(giphDiv);
                    console.log(results[i].ratings);

                }
                $(".image").on("click", function () {
                    var state = $(this).attr("data-state");
                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");


                    }
                })





            })

    }
    newButton();
    showButtons();
    searchGame();
    clearButton();
});