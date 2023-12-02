function countVotes() {
  // Get the active sheet
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Risposte del modulo 1');
  
  // Define the column containing the votes and the discriminating column
  var votesColumn = [2,3]; // Assuming "Votes" is in the first column (A)
  var discriminatingColumn = 4; // Assuming "Candidate" is in the second column (B)
  
  // Get the data range
  var dataRange = sheet.getDataRange();
  var values = dataRange.getValues();
  
  // Create an object to store the counts
  var counts = {};
  
  // Loop through the rows and count the votes
  for (var i = 1; i < values.length; i++) {
    for (var j = 0; j < votesColumn.length; j++) {
          var vote = values[i][votesColumn[j]]; // Adjust for 0-based indexing
          var discriminatingValue = values[i][discriminatingColumn]; // Adjust for 0-based indexing
          // Check if the discriminating value is not empty
          if (discriminatingValue !== "") {
            // If the discriminating value is not in the counts object, initialize it
            if (!counts[discriminatingValue]) {
              counts[discriminatingValue] = 0;
            }
                        
            // Increment the count for the vote and discriminating value
            counts[discriminatingValue] += vote;
          }
    }
   
  }
  
  // Output the counts to a new sheet

  var outputSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Vote Counts');
  //var outputSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Vote Counts');
  var outputRange = outputSheet.getRange(1, 1);
  
  console.log(counts);

  // Loop through the counts object and output the results
  for (var discriminatingValue in counts) {
    var row = [discriminatingValue];
    
    console.log("In log " + discriminatingValue);

    row.push(counts[discriminatingValue]);
    
    outputRange.offset(0, 0, 1, row.length).setValues([row]);
    outputRange = outputRange.offset(1, 0);
  }
  return counts;
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
      .setTitle('List Values Page');
}
