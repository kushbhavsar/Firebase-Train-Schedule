


var config = {
    apiKey: "AIzaSyCEATxDkxS-W-nLb_lAAUCJRL8Qe6iU9Xw",
    authDomain: "kush-664c1.firebaseapp.com",
    databaseURL: "https://kush-664c1.firebaseio.com",
    projectId: "kush-664c1",
    storageBucket: "kush-664c1.appspot.com",
    messagingSenderId: "245800912858"
};
firebase.initializeApp(config);


var database = firebase.database();

$("#add-train-btn").on("click", function () {


    var trainName = $("#train-name-input").val().trim();
    var destination = $("#dest-input").val().trim();
    var firstTrain = $("#first-train-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    console.log(trainName);

    var newTrain = {
        name: trainName,
        dest: destination,
        firstTr: firstTrain,
        freque: frequency
    };

    database.ref().push(newTrain);

    $("#train-name-input").val("");
    $("#dest-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");

});

database.ref().on("child_added", function (childSnap) {
    console.log(childSnap.val());

    var trainName = childSnap.val().name;
    var destination = childSnap.val().dest;
    var firstTrain = childSnap.val().firstTr;
    var frequency = childSnap.val().freque;

    console.log(trainName);

    var timeFormat = moment(firstTrain, "HH:mm:ss").format();

        // format the time in am/pm manner
        var formattedTime = moment(firstTrain, "HH:mm:ss").format("hh:mm a");

        // find the difference in minutes between the current time and the time of the first train
        var difference = moment().diff(timeFormat, "minutes");

        // get the remainder of minutes left when the difference is divided by the frequency
        var remainder = difference % frequency;

        // add the remainder to the current time to get the time of the next train
        var nextArrival = moment().add(remainder, "minutes").format("hh:mm a");


         if (difference < 0) {
             nextArrival = formattedTime;
             remainder = moment(timeFormat).diff(moment(), "minutes");
         };

         var removeButton = "<button class='btn btn-default' id='remove'><span class='glyphicon glyphicon-remove'></span></button>"

          $(document).on("click", "#remove", function (){
    
        //     database.ref().remove();

          });

    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
        frequency + "</td><td>" + nextArrival + "</td><td>" + remainder + "</td><td>" + removeButton + "</td></tr>");

});
