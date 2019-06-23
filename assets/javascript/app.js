// apikey qSpzO28dzsyYVDZ7HvaUiBbsgvCN1OJ5

// Initial array of gifs
var gifs = ["Halo", "Call of Duty", "Overwatch"];




// displayGifs function re-renders the HTML to display the appropriate content
function displayGifs() {

    // gif is assigned the value of the data-name attribute of the button clicked
    var category = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + category + "&api_key=qSpzO28dzsyYVDZ7HvaUiBbsgvCN1OJ5&limit=10";

    // Creating an AJAX call for the specific category button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        console.log(response);



    });


}