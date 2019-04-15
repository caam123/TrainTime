
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
var fristTrain = "";
var frequency = "";



$("#submit").on("click", function(){
    event.preventDefault();
    name = $("#name").val().trim();
    destination = $("#destination").val().trim();
    fristTrain = $("#time").val();
    frequency = $("#frequency").val();

    console.log(name);
    console.log(destination);
    console.log(fristTrain);
    console.log(frequency);

    dataRef.ref().push({
        name: name,
        destination: destination,
        fristTrain: fristTrain,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

});
