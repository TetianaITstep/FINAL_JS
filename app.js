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
  }
  const today = new Date().getDate();
  if (i === today) {
    day.classList.add("highlight");
  } //вернутись до цього
}

generateDays();
