// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on friends.js
// ===============================================================================

var friendsData = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function(req, res) {
        res.json(friendsData);
    });

    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // ---------------------------------------------------------------------------

    app.post("/api/friends", function(req, res) {
    // Get user input data
    var bestMatch = {
        name: "",
        photo: "",
        friendDiff: 1000 //track the difference between their answer
    };

    var userData = req.body;
    var newScores = userData.score;

    console.log("NEW FRIEND", userData);
    console.log("----------------------------------------------------------");
    console.log("\n newSCOREs is: ", newScores);

    userData.routeName = userData.name.replace(/\s+/g, "").toLowerCase();
    var totalDifference = 0;

    // Nested for loop
    //loop through the friends data array of objects to get each friends scores
    for (var i = 0; i < friendsData.length; i++) {
        // console.log("Friends[i]", friends[i]); 
        totalDifference = 0;

        //Grab newScores from user, loop through all the scores of each friend 
        for (var j = 0; j < friendsData[i].scores[j]; j++) {

            //Calculate the difference between the scores and sum them into the totalDifference 
            // Math.abs method: returns the absolute value of a number

            totalDifference += Math.abs(parseInt(newScores[j]) - parseInt(friendsData[i].scores[j]));
            // console.log("\n new score[j]:******" + newScores[j]);
            // console.log("\n Friend[i].scores[j]: ----------------------" + friends[i].scores[j]);
            // console.log("\n Total Difference: ===============" + totalDifference);

            // If the sum of differences is < the differences of the current bestMatch
            if (totalDifference <= bestMatch.friendDiff) {
                // console.log("\n BESTMATCH(friendDiff): " + bestMatch.friendDiff);

                // Reset the bestMatch to be the new Friend
                bestMatch.name = friendsData[i].name;
                bestMatch.photo = friendsData[i].photo;
                bestMatch.friendDiff = totalDifference;

            } else {
                console.log("NO MATCH");
            }

        }
    }
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // Then the server saves the data to the friendData array)
    friendsData.push(userData);
    // return a JSON with the user's bestMatch
    res.json(bestMatch);
    // console.log(bestMatch);
    });
};