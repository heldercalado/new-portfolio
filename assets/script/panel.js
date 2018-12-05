// Panel.js 
// this class controls the logic behind the split-flap like schedule Board 

// main function declare all the variables that need to have a global scope within the class
function controlPanel(argElement) {
    // define the initial amount of rows and collumns in the table
    this.panelRows = 1;
    this.panelColumns = 5;
    // set the id or class of the element where we will append to
    this.element = $(argElement);
    // initialize the array where the database information will reside
    this.arrData = [];
    // set the variable for the timer events 
    this.panelIntervalId;

    //set the variable for the counter that will change with each iteration of panelIntervalId
    this.panelLineCounter = 0;
    // calls the init() function to initialize the main table and attach all the html code into the div 
    // with id or class set at this.element = argElement; argument required to initialize this class
    this.init();



}
//function to start the other functions 
controlPanel.prototype.init = function () {
    //calls the function to get the initial table layout 
    this.basicLayoutBuilder();


}
// function to calculate the next time the train will arrive at the station
// takes two arguments argFirstDeparture ( the first time the train left the station )
// argFrequency (the time that takes the train to arrive at the station)
controlPanel.prototype.getNextArrivalTime = function (argFirstDeparture, argFrequency) {
    // sets a variable containing the current date 
    var currentTime = new Date();
    // converts the argFirstDeparture arguemnt into a date obj
    argFirstDeparture = new Date(argFirstDeparture);
    // loops while argFirstDeparture is less than the current time
    while (argFirstDeparture < currentTime) {
        // adds the argFrequency time to the argFirstDeparture
        argFirstDeparture = this.addMinutes(argFirstDeparture, argFrequency);
    }
    // finally when argFirstDeparture is greater than the current time
    // returns a date obj with the next time the train will arrive at the station
    return new Date(argFirstDeparture);


}
//function to add a amount of minutes into a date 
controlPanel.prototype.addMinutes = function (date, minutes) {

    return new Date(date.getTime() + minutes * 60000);
}
//function to get the diference between two hours  , if argB is not provided than 
// argB is set with a new Date() obj with the current time
controlPanel.prototype.getTimeDifference = function (argDateA, argDateB = new Date()) {

    var diffMs = (argDateB - argDateA);
    var diffDays = Math.floor(diffMs / 86400000); // days
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours  
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

    return diffMins + (diffHrs * 60) + (diffDays * 1440);





}


controlPanel.prototype.basicLayoutBuilder = function () {
    // sets a var targetContainer with the arg used to initialize the class (this.element);
    var targetContainer = $(this.element);
    // sets a var to contain the car class from bootstrap 
    var cardElement = $("<div class='card text-white bg-dark mb-3 text-center' id='card'></div>");
    // sets a var with the card-header
    var cardHeader = $("<div class='card-header'> <h2>Train Information</h2>");
    //sets a var fwith the card-body
    var cardBody = $("<div class='card-body bg-warning' id='cardbody'></div>");
    //sets a var with the card-footer
    var cardFooter = $("<div class='card-footer slide_text' id='cardfooter'></div>");
    // sets a var with the table element
    var table = $("<table class='table table-dark' id='table'></table>");
    //sets a var with  the card footer text area 
    var footerTextArea = $("<small class='text-white' ></small>")
    // append a div with a slide class into the footer text area where
    // the class news will use as target to display the top ten news from NY times
    footerTextArea.append("<div class='slide_text' id=''><h3 id='targettxt'></h3></div>");
    // initializes the row and cell variables to be used in the loop
    var row = $("<tr>");
    var cell = "";
    // load the table headers into a array 
    var headerCells = [$("<th class='text-center'  scope='col'>Train Name</th>"), $("<th class='text-center'  scope='col'>Destination</th>"), $("<th class='text-center'  scope='col'>Frequency (mins)</th>"), $("<th class='text-center'  scope='col'>Next Arrival</th>"), $("<th class='text-center'  scope='col'>Minutes Away</th>")];
    // initiallize the two vars that will contain the row class and the 
    // col class inside the td element
    var rowLayout = "";
    var columLayout = "";
    // loops through the header array and add all the header into the table
    for (var i = 0; i < headerCells.length; i++) {
        // append the current header array[i] into the row var
        row.append(headerCells[i]);

    }
//appen the row with all the headers into the table
    $(table).append(row);
//add the rows into the cells and gives a unique id to each cell 
// so later we can target those ids to add the contents from the database
    for (var i = 0; i < this.panelRows; i++) {
        row = $("<tr id='r0" + i + "'></tr>");


        for (var j = 0; j < this.panelColumns; j++) {
            rowLayout = $("<div class='row'></div>")
            cell = $("<td id='r" + i + "c" + j + "'></td>");
            columLayout = $("<div class='col- col-centered' id='row" + i + "col" + j + "'></div>");

            rowLayout.append(columLayout);
            cell.append(rowLayout)

            row.append(cell);
        }
        table.append(row);
    }
// appends all the content into their places
    cardBody.append(table);
    cardFooter.append(footerTextArea);
    cardElement.append(cardHeader);
    cardElement.append(cardBody);
    cardElement.append(cardFooter);
    targetContainer.append(cardElement);

}
// in this function we will empty the contents of the div with card-body class
// and rebuild the table inside to hold the updated 
// values from the database
controlPanel.prototype.updateTable = function () {



    var table = $("<table class='table table-dark' id='table'></table>");

    var row = $("<tr>");
    var cell = "";
    var headerCells = [$("<th class='text-center'  scope='col'>Train Name</th>"), $("<th class='text-center'  scope='col'>Destination</th>"), $("<th class='text-center'  scope='col'>Frequency  (mins)</th>"), $("<th class='text-center'  scope='col'>Next Arrival</th>"), $("<th class='text-center'  scope='col'>Minutes Away</th>")];
    var rowLayout = "";
    var columLayout = "";
    $("#cardbody").empty();
    for (var i = 0; i < headerCells.length; i++) {
        row.append(headerCells[i]);

    }
    $(table).append(row);

    for (var i = 0; i < this.panelRows; i++) {
        row = $("<tr id='r0" + i + "'></tr>");


        for (var j = 0; j < this.panelColumns; j++) {
            rowLayout = $("<div class='row'></div>")
            cell = $("<td id='r" + i + "c" + j + "'></td>");
            columLayout = $("<div class='col- col-centered' id='row" + i + "col" + j + "'></div>");

            rowLayout.append(columLayout);
            cell.append(rowLayout)

            row.append(cell);
        }
        table.append(row);
    }

    $("#cardbody").append(table);


}

// this function will set the arrData array with the arg object
// and start the initial timer to load the information in the table
// then after that will set a 60 seconds timer with a call out to the function fillValues()
// that will update the values inside the table
controlPanel.prototype.getDataArray = function (arg) {

    this.arrData = arg;
    if (this.arrData.length > 10){
        this.panelColumns = this.arrData.length;
    }
    this.panelIntervalId = setInterval (() =>{
        
        this.fillValues();
    } , 3000)
    setInterval(() => {

        this.updateTable();
        this.panelIntervalId = setInterval (() =>{
            //console.log("function Started");
            this.fillValues();
        } , 2500)
        
    }, 60000);
}
// this function will get the values from the date base ,
// read each word letter by letter , 
// and call out a new instance of the class myFlip with their respective element to be appended to and
// the letter to be animated
controlPanel.prototype.fillValues = function () {


    var row = "";
    var col = "";

    
        row = this.panelLineCounter;
        //console.log(row);
        for (var j = 0; j < this.panelColumns; j++) {
            // set the colum number
            col = j;

            if (col === 0) {
                var word = this.arrData[row].train_name;
                for (k = 0; k < word.length; k++) {
                    $("#row" + row + "col" + col).append("<span class='one' id='s" + k + "r" + row + "c" + col + "'>");
                    var myTarget = "#" + "s" + k + "r" + row + "c" + col;

                    new myFlip(myTarget, word.charAt(k));

                }
            }else if (col === 1) {
                var word = this.arrData[row].train_destination;
                for (k = 0; k < word.length; k++) {
                    $("#row" + row + "col" + col).append("<span class='one' id='s" + k + "r" + row + "c" + col + "'>");
                    var myTarget = "#" + "s" + k + "r" + row + "c" + col;

                    new myFlip(myTarget, word.charAt(k));

                }
            }else if (col === 2) {
                var word = this.arrData[row].train_frequency;
                for (k = 0; k < word.length; k++) {
                    $("#row" + row + "col" + col).append("<span class='one' id='s" + k + "r" + row + "c" + col + "'>");
                    var myTarget = "#" + "s" + k + "r" + row + "c" + col;

                    new myFlip(myTarget, word.charAt(k));

                }
            }else if (col === 3) {
                var nextArrival = this.getNextArrivalTime(this.arrData[row].train_first_departure, this.arrData[row].train_frequency)

                var word = nextArrival.toLocaleTimeString()
                for (k = 0; k < word.length; k++) {
                    $("#row" + row + "col" + col).append("<span class='one' id='s" + k + "r" + row + "c" + col + "'>");
                    var myTarget = "#" + "s" + k + "r" + row + "c" + col;
                    
                    new myFlip(myTarget, word.charAt(k));

                }
            }else if (col === 4) {
                var myTimeNow = new Date();
                var myhour = this.getNextArrivalTime(this.arrData[row].train_first_departure, this.arrData[row].train_frequency);

                var word = this.getTimeDifference(myTimeNow, myhour);
                // converts the word to srttring as it gets back as date obj from the function;
                word = word.toString();
               
                for (k = 0; k < word.length; k++) {
                    $("#row" + row + "col" + col).append("<span class='one' id='s" + k + "r" + row + "c" + col + "'>");
                    var myTarget = "#" + "s" + k + "r" + row + "c" + col;
                   
                    new myFlip(myTarget, word.charAt(k));

                }
            }


        }
        this.panelLineCounter++;
        // if the counter is greater than the quantity of items inside the array reset 
        // it to 0 and cancel the timer
if (this.panelLineCounter >this.arrData.length -1){
    
            //console.log ("counter: "+this.panelLineCounter )
            clearInterval(this.panelIntervalId);
              this.panelLineCounter = 0;
              // console.log("Counter Stopped");   
                
} 
   
}