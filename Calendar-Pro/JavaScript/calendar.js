////////// date functions //////////

/* The time needed for a day to pass */
const oneDay = 1000*60*60*24;

/* Gets a date and returns the next day date */
const getNextDayDate = function(date){
    let nextDate = new Date();
    return nextDate = new Date(date.getTime()+oneDay);
}

/* Gets a date and returns the previous day date */
const getPrevDayDate = function(date){
    let prevDate = new Date();
    return prevDate = new Date(date.getTime()-oneDay);
}

/* Gets a date and returns the next amount-th day date */
const getNextDaysDate = function(date, amount){
    let i;
    let returnDate = getNextDayDate(date);;
    for(i=0; i=amount-1; i++){
        returnDate = getNextDayDate(returnDate);
    }
    return returnDate;
}

/* Gets a date and returns the previous amount-th day date */
const getPrevDaysDate = function(date, amount){
    let i;
    let returnDate = getPrevDayDate(date);;
    for(i=0; i=amount-1; i++){
        returnDate = getPrevDayDate(returnDate);
    }
    return returnDate;
}

////////// CSS functions //////////

/* Function to return a normal day */
function normalDay(dayNum){
    let day = document.createElement("li");
    day.innerHTML = dayNum;
    day.style.margin = "0px 3px 5px 3px";
    return day;
}

/* Function to return a today day */
function todayDay(dayNum){
    let day = document.createElement("li");
    day.innerHTML = dayNum;
    day.classList.add('active');
    day.style.margin = "0px 3px 5px 3px";
    return day;
}

////////// Helping Variables //////////
const dayNames = [
    0,  // Sunday
    1,  // Monday
    2,  // Tuesday
    3,  // Wednesday
    4,  // Thursday
    5,  // Friday
    6   // Saturday
];

const monthNames = [
    "January",      // 0
    "Febuary",      // 1
    "March",        // 2
    "April",        // 3
    "May",          // 4
    "June",         // 5
    "July",         // 6
    "August",       // 7
    "September",    // 8
    "October",      // 9
    "November",     // 10
    "December",     // 1
];

let todayDate = new Date();

const [todayMonth, today, todayYear] = [todayDate.getMonth(), todayDate.getDate(), todayDate.getFullYear()];

// This variable shows how big is the difference between the current month and the viewing month in the calendar
var monthDifference = 0;

////////// Main Functions //////////

/* Starts from a date as the first of the month and makes a Callendar for the given month */
let buildCalendar = function(startingDate){
    // make sundays the number 7
    let dayNum = startingDate.getDay();
    if(dayNum == 0){
        dayNum = 7;
    }

    // giving values to the Year and the Month labels
    document.getElementById("calendar-year").innerHTML=startingDate.getFullYear();
    document.getElementById("calendar-month").innerHTML=monthNames[startingDate.getMonth()];

    // days ul
    let calendarDays = document.getElementById("calendar-days");

    // A none day (-)
    let noneDay = document.createElement("li");
    noneDay.classList.add('noday');
    noneDay.innerHTML = "-";
    noneDay.style.margin = "0px 3px 5px 3px";

    // making the calendar
    let i = 1;
    let toEnd = false;
    let madeTodayDay = false;
    let firstTimeToEnd = true;
    while(true){
        let nextDate = getNextDayDate(startingDate);

        if(nextDate.getDate() == startingDate.getDate()){
            startingDate = nextDate;
            continue;
        }
        
        if(i < dayNum){
            calendarDays.append(noneDay.cloneNode(true));
            i++;
            continue;
        }

        if (toEnd == true){
            if(firstTimeToEnd && startingDate.getDay() == 1){
                break;
            }
            firstTimeToEnd = false;
            calendarDays.append(noneDay.cloneNode(true));
            if(startingDate.getDay() == 0){
                break;
            }
        }

        if(nextDate.getDate() != 1 && toEnd == false){
            if(startingDate.getDate() == today && toEnd == false && 
                    startingDate.getMonth() == todayMonth &&
                    startingDate.getFullYear() == todayYear){
                calendarDays.append(todayDay(startingDate.getDate()));
                madeTodayDay = true;
            }
            else{
                calendarDays.append(normalDay(startingDate.getDate()));
            }
        }
        else if(toEnd == false){
            calendarDays.append(normalDay(startingDate.getDate()));
            toEnd = true;
        }

        if(toEnd == true && nextDate.getDate() == 1 && madeTodayDay == false && 
                startingDate.getMonth() == todayMonth &&
                startingDate.getFullYear() == todayYear){
            calendarDays.removeChild(calendarDays.lastChild);
            calendarDays.append(todayDay(startingDate.getDate()));
        }

        startingDate = nextDate;
    }
}

/* Gives to the buildCalendar() the first day of the current month */
let makeTodayCalendar = function(){
    // the first month of this month
    let parseDate = new Date(todayYear, todayMonth, 1);
    // build the callendar based on this month
    buildCalendar(parseDate);
}

////////// Code to get the right Callendar //////////

makeTodayCalendar();

document.getElementById("prev-button").addEventListener("click", function() {
    monthDifference = monthDifference - 1;
    let calendarDays = document.getElementById("calendar-days");
    calendarDays.innerHTML = "";
    let parseDate = new Date(todayYear, todayMonth + monthDifference, 1);
    buildCalendar(parseDate);
});

document.getElementById("next-button").addEventListener("click", function() {
    monthDifference = monthDifference + 1;
    let calendarDays = document.getElementById("calendar-days");
    calendarDays.innerHTML = "";
    let parseDate = new Date(todayYear, todayMonth + monthDifference, 1);
    buildCalendar(parseDate);
});