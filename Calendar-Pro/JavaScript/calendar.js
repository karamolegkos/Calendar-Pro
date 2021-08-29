/* Helping values */
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
    0,  // January
    1,  // Febuary
    2,  // March
    3,  // April
    4,  // May
    5,  // June
    6,  // July
    7,  // August
    8,  // September
    9,  // October
    10, // November
    11, // December
];

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

/* Today code */

let todayDate = new Date();

// console.log(todayDate);
// console.log(todayDate.toLocaleDateString());

const [todayMonth, today, todayYear] = [todayDate.getMonth(), todayDate.getDate(), todayDate.getFullYear()];

// console.log(today);
// console.log(todayMonth);
// console.log(todayYear);

/* Making the Calendar for today */

let parseDate = new Date(todayYear, todayMonth, 1);

let dayNum = parseDate.getDay();
if(dayNum == 0){
    dayNum = 7;
}

// days ul
let calendarDays = document.getElementById("calendar-days");

// none day
let noneDay = document.createElement("li");
noneDay.classList.add('noday');
noneDay.innerHTML = "-";
noneDay.style.margin = "0px 3px 5px 3px";

// making the calendar
let i = 1;
let toEnd = false;
while(true){
    let nextDate = new Date();
    nextDate = new Date(parseDate.getTime()+1000*60*60*24);
    
    if(i < dayNum){
        calendarDays.append(noneDay.cloneNode(true));
        i++;
        continue;
    }

    if (toEnd == true){
        calendarDays.append(noneDay.cloneNode(true));
        if(parseDate.getDay() == 0){
            break;
        }
    }

    if(parseDate.getDate() == today && toEnd == false){
        calendarDays.append(todayDay(parseDate.getDate()));
    }
    else if(nextDate.getDate() != 1 && toEnd == false){
        calendarDays.append(normalDay(parseDate.getDate()));
    }
    else if(toEnd == false){
        calendarDays.append(normalDay(parseDate.getDate()));
        toEnd = true;
    }

    parseDate = nextDate;
}