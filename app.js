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
function getDaysNumber(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

let currentMonthIndex = new Date().getMonth();
let currentYear = new Date().getFullYear();
const monthName = document.getElementById("monthName");
// currentYear.classList.add("year_number_size");
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

function changemonthName() {
  const currentMonth = monthArrow[currentMonthIndex];
  monthName.textContent = `${currentMonth} ${currentYear}`;
  monthName.classList.add("white");
}

function generateDays() {
  calendar.innerHTML = "";
  const today = new Date();
  const daysNumber = getDaysNumber(currentYear, currentMonthIndex);

  for (let i = 1; i <= daysNumber; i++) {
    const day = createElement("div", { classes: ["day_area"] });
    day.textContent = i;
    calendar.appendChild(day);

    if (
      i === today.getDate() &&
      currentMonthIndex === today.getMonth() &&
      currentYear === today.getFullYear()
    ) {
      day.classList.add("highlight");
    }
    day.addEventListener("click", () => {
      createModal(day);
    });
  }
}

generateDays();

const prevMonthBtn = document.getElementById("prevMonth");
prevMonthBtn.addEventListener("click", () => {
  currentMonthIndex--;
  if (currentMonthIndex < 0) {
    currentMonthIndex = 11;
    currentYear--;
  }
  changemonthName();
  generateDays();
});

const nextMonthBtn = document.getElementById("nextMonth");
nextMonthBtn.addEventListener("click", () => {
  currentMonthIndex++;
  if (currentMonthIndex > 11) {
    currentMonthIndex = 0;
    currentYear++;
  }
  changemonthName();
  generateDays();
});

changemonthName();
const notesStorage = {};

function createModal(day) {
  const myNotesModal = document.getElementById("mynotes");

  myNotesModal.classList.remove("hidden");

  const notesTitle = myNotesModal.querySelector(".mynotes_title");
  const currentMonth = monthArrow[currentMonthIndex];

  notesTitle.textContent = `My Notes for ${currentMonth}  ${day.textContent}`;
  let planningDiv = myNotesModal.querySelector(".planningDiv");

  if (!planningDiv) {
    planningDiv = createElement("div", { classes: ["planningDiv"] });

    const notesInput = createElement("textarea", {
      attributes: { placeholder: "Write your notes here..." },
    });

    const timeInput = createElement("input", {
      attributes: { type: "time" },
      classes: ["time-input"],
    });

    const saveButton = createElement("button", { classes: ["save_button"] });
    saveButton.textContent = "Save";

    planningDiv.appendChild(notesInput);
    planningDiv.appendChild(timeInput);
    planningDiv.appendChild(saveButton);

    saveButton.addEventListener("click", () => {
      const noteText = notesInput.value;
      const noteTime = timeInput.value;
      notesStorage[day.textContent] = {
        text: noteText,
        time: noteTime,
      };
      const plansList = createElement("ul", { classes: ["plans-list"] });

      const plansListItem = createElement("li", {
        classes: ["plans-list-item"],
      });
      plansList.appendChild(plansListItem);
      planningDiv.appendChild(plansList);
      console.log(notesStorage);
      plansListItem.textContent = `Note: ${noteText}, Time: ${noteTime}`;
    });

    myNotesModal.appendChild(planningDiv);
  } else {
    planningDiv.querySelector("textarea").value = "";
    planningDiv.querySelector("input[type='time']").value = "";
  }
}

//на наст раз
// 1) додати подію на сейв кнопку, що події зберігались в об'єкт
// 2) знайти гарніший варіант тайм-інпуту
// 3) зробити так щоб плани відображались і зберігались у відповідних днях
// 4) підсвітити дні з планами
// 5) зробити так щоб плани не двигали контейнер
