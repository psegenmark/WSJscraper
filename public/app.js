// Grab the articles as a json
$(document).on("click", "#scraper", function(){

  $.ajax({
    method: "GET",
    url: "/scrape/"
  })
    // With that done, add the note information to the page
    .done(function(data) {
    
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>" + "<button data-id='" + data[i]._id + "'class=saveButton type=button>Save Article</button>");
  }
});
});
alert("You have scraped WSJ!");
});


// save button
$(document).on("click", ".saveButton", function(){
  var idSave = $(this).attr("data-id");
  console.log(idSave);
  
  $.ajax({
    method: "POST",
    url: "/articles/" + idSave,
    dataType: "json",
    data: {
      $set: {
      issaved: true
    }
    },
    // On successful call
    success: function(data) {
      console.log(data.note);
  }
  });
  });

// Delete Article
$(document).on("click", ".deleteButton", function() {
  var idDelete = $(this).attr("data-id");
  console.log(idDelete);
  
  $.ajax({
    method: "GET",
    url: "/delete/" + idDelete,
    dataType: "json",
    success: function (data) {
    console.log(data.note)
}
});
});

// Delete Note
$(document).on("click", "#deletenote", function() {
  var idDelete = $(this).attr("data-id");
  console.log(idDelete);
  
  $.ajax({
    method: "GET",
    url: "/delete/" + idDelete,
    dataType: "json",
    success: function (data) {
    console.log(data)
}
});
});

  // when an article is saved, it adds the note ID to the article. So if we find by noteID we should find all saved!


$(document).on("click", "#savedArticles", function(){
  // window.location.href="/savedArticles.html"

  $.ajax({
    method: "GET",
    url: "/articles/"
  })
    // With that done, add the note information to the page
    .done(function(data) {
      console.log(data);
    
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    if(data[i].note) {
    $("#articlesSaved").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>" +  "<button data-id='" + data[i]._id + "'class=deleteButton type=button>Delete Article</button>");
  }
};
});
});
});


$(document).on("click", "#homeButton", function(){
  window.location.href="/index.html"
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");
  console.log(thisId);

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .done(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
  });

  // Whenever someone clicks a p tag
$(document).on("click", "p", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");
  
  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .done(function(data) {
      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
      // A button to delete a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='deletenote'>Delete Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
  });
