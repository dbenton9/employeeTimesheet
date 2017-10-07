var config = {
    apiKey: "AIzaSyAS5TpS0bFCXqZbB9SD4IOg1KiTnwIGtqg",
    authDomain: "timesheet-fc8b6.firebaseapp.com",
    databaseURL: "https://timesheet-fc8b6.firebaseio.com",
    projectId: "timesheet-fc8b6",
    storageBucket: "timesheet-fc8b6.appspot.com",
    messagingSenderId: "25191666620"
};

firebase.initializeApp(config);

    // Create a variable to reference the database.
    var database = firebase.database();

    // Initial Values
    var name = "";
    var role = "";
    var startDate = 0;
    var rate = "";


$("#submit").on('click', function(){
  event.preventDefault();
  
  name = $('#name-input').val().trim();
  role = $('#role-input').val().trim();
  startDate = $('#start-input').val().trim();
  rate = $('#rate-input').val().trim();

  console.log(name);
  console.log(role);
  console.log(startDate);
  console.log(rate);

  database.ref().push({
        name: name,
        role: role,
        startDate: startDate,
        rate: rate,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });

    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
      // storing the snapshot.val() in a variable for convenience
      var sv = snapshot.val();

      // Console.loging the last user's data
      console.log(sv.name);
      console.log(sv.role);
      console.log(sv.startDate);
      console.log(sv.rate);
      console.log(sv.dateAdded);

      //Append to div elements
      //Declare new table row
      var newTable = $("<tr>");
      //Declare new table data cells
      var newName = $("<td>"), newRole = $("<td>"), newStart = $("<td>"), 
        newMonths = $("<td>"), newRate = $("<td>"), newBilled = $("<td>");
      
      newName = newName.prepend(sv.name);
      newRole = newRole.prepend(sv.role);
      newStart = newStart.prepend(sv.start);
      newMonths = newMonths.prepend("NaN");
      newRate = newRate.prepend(sv.rate);
      newBilled = newBilled.prepend("NaN");

      newTable.append(newName, newRole, newStart, newMonths, newRate, newBilled);
      $("tbody").append(newTable);

      
    });



});