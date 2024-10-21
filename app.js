function createElement(tag, { classes, attributes }, ...children) {
  const element = document.createElement(tag);
  if (classes) element.classList.add(...classes);

  if (attributes) {
    for (let key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
  }

  element.append(...children);
  return element;
}

const calendar = document.querySelector(".calendar");

// function generateDaysFirstVersion() {
//   calendar.innerHTML = "";
//   for (let i = 1; i <= 31; i++) {
//     const day = createElement("div", {
//       classes: ["day_area"],
//     });
//     day.textContent = i;
//     calendar.appendChild(day);
//     const today = new Date().getDate();
// if (i === today) {
//   day.classList.add("highlight");
// }
//   }
// }

// generateDaysFirstVersion();

function generateDaysFor28() {
  calendar.innerHTML = "";
  for (let i = 1; i <= 28; i++) {
    const day = createElement("div", { classes: ["day_area"] });
    day.textContent = i;

    calendar.appendChild(day);
    const today = new Date().getDate();
    if (i === today) {
      day.classList.add("highlight");
    }
  }
}

function generateDaysFor29() {
  calendar.innerHTML = "";
  for (let i = 1; i <= 29; i++) {
    const day = createElement("div", { classes: ["day_area"] });
    day.textContent = i;
    calendar.appendChild(day);
  }
}

function generateDaysFor30() {
  calendar.innerHTML = "";
  for (let i = 1; i <= 30; i++) {
    const day = createElement("div", { classes: ["day_area"] });
    day.textContent = i;
    calendar.appendChild(day);
  }
}

function generateDaysFor31() {
  calendar.innerHTML = "";
  for (let i = 1; i <= 31; i++) {
    const day = createElement("div", { classes: ["day_area"] });
    day.textContent = i;
    calendar.appendChild(day);
  }
}

const monthName = document.getElementById("monthName");

const monthArrow = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let currentMonthIndex = new Date().getMonth();
let currentYear = new Date().getFullYear();
function changemonthName() {
  const currentMonth = monthArrow.find(
    (month, index) => index === currentMonthIndex
  );
  monthName.textContent = currentMonth;
  monthName.classList.add("white");
}
changemonthName();

//!задачі на наст раз:
//поєднати дні з місяцями, щоб змінювалось і то і то - переробити логіку
//прикрутити роки
//функція для відкриття вікна, при натисканні на день
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
function generateDays() {
  if (currentMonthIndex === 1) {
    if (isLeapYear(currentYear)) {
      generateDaysFor29();
    } else {
      generateDaysFor28();
    }
  } else if ([3, 5, 8, 10].includes(currentMonthIndex)) {
    generateDaysFor30();
  } else {
    generateDaysFor31();
  }
}

const prevMonthBtn = document.getElementById("prevMonth");
prevMonthBtn.addEventListener("click", () => {
  currentMonthIndex--;
  if (currentMonthIndex < 0) currentMonthIndex = 11;
  changemonthName();
  generateDays();
});
const nextMonthBtn = document.getElementById("nextMonth");
nextMonthBtn.addEventListener("click", () => {
  currentMonthIndex++;
  if (currentMonthIndex > 11) currentMonthIndex = 0;
  changemonthName();
  generateDays();
});
