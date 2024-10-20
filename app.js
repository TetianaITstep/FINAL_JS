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

function generateDays() {
  for (let i = 1; i <= 31; i++) {
    const day = createElement("div", {
      classes: ["day_area"],
    });
    day.textContent = i;
    calendar.appendChild(day);
    const today = new Date().getDate();
    if (i === today) {
      day.classList.add("highlight");
    }
  }
}

generateDays();

const monthName = document.getElementById("monthName");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");
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
function changemonthName() {
  const currentMonth = monthArrow.find(
    (month, index) => index === currentMonthIndex
  );
  monthName.textContent = currentMonth;
  monthName.classList.add("white");
}
changemonthName();

//!задачі на наст раз:
//додати події на кнопки для місяців
//поєднати дні з місяцями, щоб змінювалось і то і то
//прикрутити роки
//функція для відкриття вікна, при натисканні на день
