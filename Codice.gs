function countVotes() {
  // Get the active sheet
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Risposte del modulo 1');
  
  // Define the column containing the votes and the discriminating column
  var votesColumn = [2,3,5,6,7,8,9,10]; // Assuming "Votes" is in the first column (A)
  var discriminatingColumn = 4; // Assuming "Candidate" is in the second column (B)
  
  // Get the data range
  var dataRange = sheet.getDataRange();
  var values = dataRange.getValues();
  
  // Create an object to store the counts
  var counts = {};
  var titleTotalScore = "Totale";
  var teamName = "Nome Team";
  //pre-fill order for presentation in html
  var orderList = [teamName];
  for (var j = 0; j < votesColumn.length; j++) {
      orderList.push(values[0][votesColumn[j]])
  }
  orderList.push(titleTotalScore);

  // Loop through the rows and count the votes
  for (var i = 1; i < values.length; i++) {
    for (var j = 0; j < votesColumn.length; j++) {
          var vote = values[i][votesColumn[j]]; // Adjust for 0-based indexing
          var discriminatingValue = values[i][discriminatingColumn]; // Adjust for 0-based indexing
          // Check if the discriminating value is not empty
          if (discriminatingValue !== "") {
            // If the discriminating value is not in the counts object, initialize it
            if (!counts[discriminatingValue]) {
              counts[discriminatingValue] = {};
              counts[discriminatingValue][teamName] = discriminatingValue;
            }

            // If the total value is not in the counts object, initialize it
            if (!counts[discriminatingValue][titleTotalScore]){
              counts[discriminatingValue][titleTotalScore] = vote;
            } else{
              counts[discriminatingValue][titleTotalScore] += vote;
            } 
                 
            // Increment the count for the vote and discriminating value
            var colName = values[0][votesColumn[j]]
            if (!counts[discriminatingValue][colName]){
              counts[discriminatingValue][colName] = vote;
            } 
            else{
                counts[discriminatingValue][colName] += vote;
            }
            
          }
    }
   
  }
  console.log([counts, orderList]);
  return [counts, orderList];
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
