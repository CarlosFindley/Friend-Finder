// ==============================================================================
// Series of npm packages that we will use to give our server userful functionality
// ==============================================================================
var express = require("express");
var path = require("path");


// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================

// Tells node that we are creating an "express" server
var app = express();
// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "app/public")));


// ==============================================================================
// ROUTES
// The below points out server ot a series of "route" files
// There soutes give our server a "map" of how to respond when users visit or request data from various URLs.
// ==============================================================================

// require("./app/routing/apiRoutes")(app);
// require("./app/routing/htmlRoutes")(app);


// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});