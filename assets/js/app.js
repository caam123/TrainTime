
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

    //Time calc 
    firstTrain = $("#time").val();
    var firstTrainConverted = moment(firstTrain,"HH:mm").subtract(1, "years");
    frequency = $("#frequency").val();
    var currentTime = moment();
    var gapTime = moment().diff(moment(firstTrainConverted),"minutes");
    console.log("difference in time:", +""+ gapTime);
    var timeRemainder = gapTime % frequency;
    console.log("% ", + timeRemainder);
    var minutesAway = frequency - timeRemainder;
    console.log("Minutes away", minutesAway);
    var nextArrival = moment().add(minutesAway,"minutes").format("hh:mm");
    console.log("next arrival ", nextArrival);



    dataRef.ref().push({
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        nextArrival: nextArrival,
        minutesAway: minutesAway
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
      frequencyDisplay.text(snapshot.val().frequency + " " + "min");

      var nextArrival = $("<td>");
      nextArrival.text(snapshot.val().nextArrival);

      var minutesAway= $("<td>");
      minutesAway.text(snapshot.val().minutesAway + " " + "min");

      var tRowData = $("<tr>");
      $("#tableTrain").append(tRowData);
      tRowData.append(nameDisplay);
      tRowData.append(destinationDisplay);
      tRowData.append(frequencyDisplay);
      tRowData.append(nextArrival);
      tRowData.append(minutesAway);

      
    }, function(errorObject){
      console.log("Errors handled:" + errorObject.code);
      
    });

    



