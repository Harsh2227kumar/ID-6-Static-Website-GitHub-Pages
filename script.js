const monthYear = document.getElementById("monthYear");
const calendarDays = document.getElementById("calendarDays");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const toggleDark = document.getElementById("toggleDark");

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let events = {};
let holidays = {};

// Load holidays from holidays.json
fetch("holidays.json")
  .then(res => res.json())
  .then(data => {
    holidays = data;
    renderCalendar(currentMonth, currentYear);
  })
  .catch(err => {
    console.error("Holiday load failed:", err);
    renderCalendar(currentMonth, currentYear);
  });

function pad(n) {
  return n < 10 ? `0${n}` : n;
}

function renderCalendar(month, year) {
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  calendarDays.innerHTML = "";
  monthYear.textContent = `${new Intl.DateTimeFormat('en-IN', { month: 'long', year: 'numeric' }).format(new Date(year, month))}`;

  // Fill empty slots before the 1st
  for (let i = 0; i < firstDay; i++) {
    calendarDays.innerHTML += `<div></div>`;
  }

  for (let day = 1; day <= lastDate; day++) {
    const dateKey = `${year}-${pad(month + 1)}-${pad(day)}`;
    const isToday = dateKey === `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
    const isHoliday = holidays[dateKey];
    const hasEvent = events[dateKey];

    let baseClasses = `p-3 rounded-lg shadow transition cursor-pointer flex flex-col items-center justify-center space-y-1`;

    let dayClasses = `
      ${isToday ? 'bg-blue-500 text-white' : 'bg-white dark:bg-gray-800'}
      ${isHoliday ? 'border-red-500 border' : ''}
      ${hasEvent ? 'ring ring-blue-300' : ''}
      hover:bg-blue-100 dark:hover:bg-gray-700
    `;

    calendarDays.innerHTML += `
      <div class="${baseClasses} ${dayClasses}" data-date="${dateKey}" title="${isHoliday || hasEvent ? (isHoliday || '') + (hasEvent ? ' - ' + hasEvent : '') : ''}">
        <div class="font-bold">${day}</div>
        ${isHoliday ? `<div class="text-xs text-red-600 dark:text-red-300">${holidays[dateKey]}</div>` : ''}
        ${hasEvent ? `<div class="text-xs text-blue-500 italic truncate">${hasEvent}</div>`
