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
    // Grab user's score to compare against friendsArray
        var newUserScore = req.body.scores;
        var scoresArray = [];
        var bestMatch = 0;

    
        // Loop through friendsArray
        for (var i = 0; i < friendsData.length; i++) {
            var scoreDiff = 0;
            for (var j = 0; j < newUserScore.length; j++) {
                scoreDiff += (Math.abs(parseInt(friendsData[i].scores[j]) - parseInt(newFriendScores[j])))
            };

            // Push results into scoresArray
            scoresArray.push(scoresDiff);
        };
 

        // Find best match
        for (var i = 0; i < scoresArray.length; i++) {
            if(scoresArray[i] <= scoresArray[bestMatch]) {
                bestMatch = i;
            }
        };

        // Retreive bestMatch data
        var bFF = friendList[bestMatch];
        res.json(bFF);

    friendsData.push(req.body);
    res.json(true);
    });
};