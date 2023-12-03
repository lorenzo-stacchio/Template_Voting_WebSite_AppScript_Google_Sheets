function countVotes() {
  // Get the active sheet
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Risposte del modulo 1');

  // Define the column containing the votes and the discriminating column
  var votesColumnStandard = [2, 3, 5, 6, 7, 8]; // Assuming "Votes" is in the first column (A)
  var votesColumnSocial = [9];
  var votesColumnStartup = [10]; // Assuming "Votes" is in the first column (A)

  var allCriteria = votesColumnStandard.concat(votesColumnStartup).concat(votesColumnSocial);

  var discriminatingColumn = 4; // Assuming "Candidate" is in the second column (B)

  // Get the data range
  var dataRange = sheet.getDataRange();
  var values = dataRange.getValues();

  // Create an object to store the counts
  var counts = {};
  var titleTotalScore = "Totale";
  var titleTotalScoreStartup = "Totale Startup";
  var titleTotalScoreSocial = "Totale Social";
  var teamName = "Nome Team";
  var numberofVotes = "Votazioni ricevute";


  //pre-fill order for presentation in html
  var orderList = [teamName, numberofVotes];
  for (var j = 0; j < votesColumnStandard.length; j++) {
    orderList.push(values[0][votesColumnStandard[j]])
  }
  orderList.push(titleTotalScore);

  //pre-fill order for special rank

  var orderListStartup = [teamName, numberofVotes];
  for (var j = 0; j < votesColumnStartup.length; j++) {
    orderListStartup.push(values[0][votesColumnStartup[j]])
  }
  orderListStartup.push(titleTotalScoreStartup);


  //pre-fill order for special rank 2

  var orderListSocial = [teamName, numberofVotes];
    for (var j = 0; j < votesColumnSocial.length; j++) {
      orderListSocial.push(values[0][votesColumnSocial[j]])
    }
    orderListSocial.push(titleTotalScoreSocial);


  // Loop through the rows and count the votes
  for (var i = 1; i < values.length; i++) {
    var discriminatingValue = values[i][discriminatingColumn]; // Adjust for 0-based indexing
    // Check if the discriminating value is not empty
    if (discriminatingValue !== "") {
      // If the discriminating value is not in the counts object, initialize it
      if (!counts[discriminatingValue]) {
        counts[discriminatingValue] = {};
        counts[discriminatingValue][teamName] = discriminatingValue;
        counts[discriminatingValue][numberofVotes] = 1;
      }
      else {
        counts[discriminatingValue][numberofVotes] += 1;
      }

      for (var j = 0; j < votesColumnStandard.length; j++) {
        var vote = values[i][votesColumnStandard[j]]; // Adjust for 0-based indexing
        // Set Total value based on the type of column

        if (!counts[discriminatingValue][titleTotalScore]) {
          counts[discriminatingValue][titleTotalScore] = vote;
        } else {
          counts[discriminatingValue][titleTotalScore] += vote;
        }

        // Increment the count for the vote and discriminating value
        var colName = values[0][votesColumnStandard[j]]
        if (!counts[discriminatingValue][colName]) {
          counts[discriminatingValue][colName] = vote;
        }
        else {
          counts[discriminatingValue][colName] += vote;
        }

      }

      // Second cols
      for (var j = 0; j < votesColumnStartup.length; j++) {
        var vote = values[i][votesColumnStartup[j]]; // Adjust for 0-based indexing
        // Set Total value based on the type of column

        if (!counts[discriminatingValue][titleTotalScoreStartup]) {
          counts[discriminatingValue][titleTotalScoreStartup] = vote;
        } else {
          counts[discriminatingValue][titleTotalScoreStartup] += vote;
        }

        // Increment the count for the vote and discriminating value
        var colName = values[0][votesColumnStartup[j]]
        if (!counts[discriminatingValue][colName]) {
          counts[discriminatingValue][colName] = vote;
        }
        else {
          counts[discriminatingValue][colName] += vote;
        }

      }


      for (var j = 0; j < votesColumnSocial.length; j++) {
        var vote = values[i][votesColumnSocial[j]]; // Adjust for 0-based indexing
        // Set Total value based on the type of column

       if (!counts[discriminatingValue][titleTotalScoreSocial]) {
          counts[discriminatingValue][titleTotalScoreSocial] = vote;
        } else {
          counts[discriminatingValue][titleTotalScoreSocial] += vote;
        }

        // Increment the count for the vote and discriminating value
        var colName = values[0][votesColumnSocial[j]]
        if (!counts[discriminatingValue][colName]) {
          counts[discriminatingValue][colName] = vote;
        }
        else {
          counts[discriminatingValue][colName] += vote;
        }

      }
         
    }

  }
  console.log([counts, orderList, orderListStartup, orderListSocial]);
  return [counts, orderList, orderListStartup, orderListSocial];
}




function onEditTrigger(e) {
  doGet();
}


function iterateList() {
  var dict_votes = countVotes();
  console.log(dict_votes);
  return dict_votes;
}

function doGet() {
  return HtmlService.createHtmlOutputFromFile('Show')
    .setTitle('Hackathon Current Ranking');
}
