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
        // Test through command that responses are being collected
        console.log("Res collect", req.body);

        var bestMatch = {
            name: "",
            photo: "",
            matchDiff: 1000
        };

        var newUserRes = req.body;
        // Convert each user's results into a simple array of numbers
        var newScore = newUserRes.score
        console.log("Res score collect", newScore );

        newUserRes.routeName = newUserRes.name.replace(/\s+/g, "").toLowerCase();
        var totalDifference = 0;

        // Loop through array
        for (var i = 0; i < friendsData.length; i++) {
            totalDifference = 0;

            // Grab newScore from user res and loop through existing scores
            for (var j = 0; j < friendsData[i].scores[j]; j++) {

                totalDifference += Math.abs(parseInt(newScore[j]) - parseInt(friendsData[i].scores[j]));

                if (totalDifference <= bestMatch.matchDiff) {
                    bestMatch.name = friendsData[i].name;
                    bestMatch.photo = friendsData[i].photo;
                    bestMatch.matchDiff = totalDifference;
                } else {
                    console.log("NO MATCH");
                }
            }
        }


        

        // compare the difference between current user's scores against those from other users,
        // question by question. Add up the differences to calculate the totalDifference

        friendsData.push(newUserRes);

        res.json(bestMatch);
    });
};