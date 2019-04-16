
  var config = {
    apiKey: "AIzaSyAsXBY4nCuJH3jwsvdJ2XdPvNYLFfethdM",
    authDomain: "traintime-3402e.firebaseapp.com",
    databaseURL: "https://traintime-3402e.firebaseio.com",
    projectId: "traintime-3402e",
    storageBucket: "traintime-3402e.appspot.com",
    messagingSenderId: "263910394437"
  };
  firebase.initializeApp(config);

  var dataRef = firebase.database();

var name = "";
var destination = "";
var firstTrain = "";
var frequency = "";

function empty(){
$("#formTrain").find("input").not("#submit").val("");
}


$("#submit").on("click", function(){
    event.preventDefault();
    name = $("#name").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#time").val();
    frequency = $("#frequency").val();

    console.log(name);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);


    dataRef.ref().push({
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    empty();

    

  });




    //on child_added
    dataRef.ref().on("child_added", function(snapshot){

      var nameDisplay = $("<td>");
      nameDisplay.text(snapshot.val().name);

      var destinationDisplay = $("<td>");
      destinationDisplay.text(snapshot.val().destination);

      var frequencyDisplay = $("<td>");
      frequencyDisplay.text(snapshot.val().frequency);

      var nextDisplay = $("<td>");
      nextDisplay.text("next");


      var minutesDisplay = $("<td>");
      minutesDisplay.text("minutesHere");

      var tRowData = $("<tr>");
      $("#tableTrain").append(tRowData);
      tRowData.append(nameDisplay);
      tRowData.append(destinationDisplay);
      tRowData.append(frequencyDisplay);
      tRowData.append(nextDisplay);
      tRowData.append(minutesDisplay);

      
    }, function(errorObject){
      console.log("Errors handled:" + errorObject.code);
      
    });

    



