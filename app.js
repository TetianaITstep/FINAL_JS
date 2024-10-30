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

function saveToLocalStorage() {
  localStorage.setItem("notesStorage", JSON.stringify(notesStorage));
}

function loadFromLocalStorage() {
  const storedNotes = localStorage.getItem("notesStorage");
  if (storedNotes) {
    Object.assign(notesStorage, JSON.parse(storedNotes));
  }
}

loadFromLocalStorage();

function createModal(day) {
  const myNotesModal = document.getElementById("mynotes");
  myNotesModal.classList.remove("hidden");

  const notesTitle = myNotesModal.querySelector(".mynotes_title");
  const currentMonth = monthArrow[currentMonthIndex];
  notesTitle.textContent = `My Notes for ${currentMonth} ${day.textContent}`;

  let planningDiv = myNotesModal.querySelector(".planningDiv");

  if (!planningDiv) {
    planningDiv = createElement("div", { classes: ["planningDiv"] });

    const notesInput = createElement("textarea", {
      attributes: { placeholder: "Write your notes here..." },
    });

    const timeInput = createElement("input", {
      attributes: { placeholder: "Choose time..." },
      classes: ["flatpickr-input"],
    });
    flatpickr(timeInput, {
      enableTime: true,
      noCalendar: true,
      dateFormat: "H:i",
      time_24hr: true,
    });

    const saveButton = createElement("button", { classes: ["save_button"] });
    saveButton.textContent = "Save";

    planningDiv.appendChild(notesInput);
    planningDiv.appendChild(timeInput);
    planningDiv.appendChild(saveButton);

    saveButton.addEventListener("click", () => {
      const noteText = notesInput.value;
      const noteTime = timeInput.value;
      if (noteText === "" || noteTime === "") {
        alert("Please fill in both fields.");
        return;
      }

      if (!notesStorage[day.textContent]) {
        notesStorage[day.textContent] = [];
      }
      if (notesStorage[day.textContent].length >= 7) {
        return;
      }

      notesStorage[day.textContent].push({
        text: noteText,
        time: noteTime,
      });

      saveToLocalStorage();

      updatePlansList(planningDiv, day.textContent);

      notesInput.value = "";
      timeInput.value = "";
    });

    myNotesModal.appendChild(planningDiv);
  }

  updatePlansList(planningDiv, day.textContent);
}

function updatePlansList(planningDiv, dayKey) {
  let plansList = planningDiv.querySelector(".plans-list");
  if (!plansList) {
    plansList = createElement("ul", { classes: ["plans-list"] });
    planningDiv.appendChild(plansList);
  } else {
    plansList.innerHTML = "";
  }

  const dayNotes = notesStorage[dayKey] || [];

  for (let i = 0; i < dayNotes.length; i++) {
    const note = dayNotes[i];
    const plansListItem = createElement("li", { classes: ["plans-list-item"] });
    plansListItem.textContent = `Note: ${note.text}, Time: ${note.time}`;

    const deleteButton = createElement("button", {
      classes: ["delete-button"],
    });
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      dayNotes.splice(i, 1);
      saveToLocalStorage();

      updatePlansList(planningDiv, dayKey);
    });

    plansListItem.appendChild(deleteButton);
    plansList.appendChild(plansListItem);
  }
}
