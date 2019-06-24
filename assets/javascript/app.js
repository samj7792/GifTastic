// apikey qSpzO28dzsyYVDZ7HvaUiBbsgvCN1OJ5

// Initial array of categories
var categories = ["Cat", "Dog", "Mouse"];




// displayGifs function re-renders the HTML to display the appropriate content
function displayGifs() {

    // gif is assigned the value of the data-name attribute of the button clicked
    var category = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + category + "&api_key=qSpzO28dzsyYVDZ7HvaUiBbsgvCN1OJ5&limit=10";

    // Creating an AJAX call for the specific category button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        console.log(response);

        // Empty the gifs-view div
        $("#gifs-view").empty();

        // A loop to display every gif in the response (limit at 10)
        for ( var i = 0; i<response.data.length; i++) {

            // Creating a div to hold the gif
            var categoryDiv = $("<div>");

            // give the div a class of gif
            categoryDiv.addClass("gif");

            // Storing the rating data
            var rating = response.data[i].rating;

            // Creating an elementto have the rating displayed
            var pOne = $("<p>").text("Rating: " + rating);
            
            // Displaying the rating
            categoryDiv.append(pOne);

            // Retrieving the url for the still gif
            var imgUrl = response.data[i].images.downsized_still.url;

            // Creating an element to hold the still
            var image = $("<img>").attr("src", imgUrl);

            // Appending the still
            categoryDiv.append(image);

            // Putting the entire categoryDiv above the previous
            $("#gifs-view").prepend(categoryDiv);

        }
    });
}


// Adding a click event listener to all elements with a class of "category-btn"
$(document).on("click", ".category-btn", displayGifs);


// Function for displaying category buttons
function renderButtons() {

    // Deleting the categories prior to adding new categories
    // This is necessary otherwise you will have repeat buttons
    $("#buttons-view").empty();

    // Looping through the array of categories
    for (var i = 0; i<categories.length; i++) {

        // Then generate buttons for each category in the array
        var btn = $("<button>");
        // Giving a class of category-btn
        btn.addClass("category-btn");
        // Adding a data-name attribute 
        btn.attr("data-name", categories[i]);
        // Providing the initail button text
        btn.text(categories[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(btn);

    }
}


// Calling the renderButtons function to display  the initial buttons
renderButtons();