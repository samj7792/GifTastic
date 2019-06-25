// apikey qSpzO28dzsyYVDZ7HvaUiBbsgvCN1OJ5

// Initial array of topics
var topics = ["Halo", "Overwatch", "Call of Duty", "Witcher", "Smash Bros", "Rocket League"];




// displayGifs function re-renders the HTML to display the appropriate content
function displayGifs() {

    // gif is assigned the value of the data-name attribute of the button (this) clicked
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
            categoryDiv.addClass("gif m-2");

            // Storing the rating data
            var rating = response.data[i].rating;

            // Creating an elementto have the rating displayed
            var pOne = $("<h6>").text("Rating: " + rating);
            
            // Displaying the rating
            categoryDiv.append(pOne);

            // Retrieving the url for the still gif
            // Use fixed height for nice rows
            var gifUrl = response.data[i].images.fixed_height_still.url;

            // Creating an element to hold the still gif
            var gif = $("<img>").attr("src", gifUrl);
            gif.addClass("gify");
            gif.attr("data-state", "still");
            gif.attr("data-still", response.data[i].images.fixed_height_still.url);
            gif.attr("data-animate", response.data[i].images.fixed_height.url);

            // Appending the still
            categoryDiv.append(gif);

            // Putting the entire categoryDiv above the previous
            $("#gifs-view").prepend(categoryDiv);

        }
    });
}


// Adding a click event listener to all elements with a class of "category-btn"
$(document).on("click", ".category-btn", displayGifs);


// Function for displaying category buttons
function renderButtons() {

    // Deleting the topics prior to adding new topics
    // This is necessary otherwise you will have repeat buttons
    $("#buttons-view").empty();

    // Looping through the array of topics
    for (var i = 0; i<topics.length; i++) {

        // Then generate buttons for each category in the array
        var btn = $("<button>");
        // Giving a class of category-btn
        btn.addClass("category-btn btn btn-primary m-1");
        // Adding a data-name attribute 
        btn.attr("data-name", topics[i]);
        // Providing the initail button text
        btn.text(topics[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(btn);

    }
}

// This function handles when the add-category btn is clicked
$("#add-category").on("click", function(event) {

    // Prevents the page from being reloaded on click
    event.preventDefault();

    // This line grabs the input from the textbox
    var category = $("#category-input").val();
    console.log(category);

    // Adding the category from the textbox to our topics array
    topics.push(category);

    // Calling the renderButtons function to show our newly added button
    renderButtons();
    console.log(topics);

    // Empty the text box
    $("#category-input").val("");

});


// Calling the renderButtons function to display  the initial buttons
renderButtons();



// This function handles when a gif is clicked it will toggle still or animated
$(document).on("click", ".gify", function() {

    // Set state to the gifs data-state attr value
    var state = $(this).attr("data-state");

    if ( state === "still" ) {

        // Set the src to the animated url
        $(this).attr("src", $(this).attr("data-animate"));

        // Set the data-state to animated
        $(this).attr("data-state", "animated");
    }

    else {

        // Set the src to the still url
        $(this).attr("src", $(this).attr("data-still"));

        // Set the data-state to still
        $(this).attr("data-state", "still");
    }
});