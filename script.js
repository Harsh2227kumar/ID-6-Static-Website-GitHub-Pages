const monthYear = document.getElementById("monthYear");
const calendarDays = document.getElementById("calendarDays");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const toggleDark = document.getElementById("toggleDark");

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let events = {}; // key: YYYY-MM-DD, value: string

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Simulated holiday API
const holidays = {
  "2025-06-20": "World Refugee Day",
  "2025-07-04": "Independence Day",
  "2025-12-25": "Christmas"
};

function pad(n) {
  return n < 10 ? `0${n}` : n;
}

function renderCalendar(month, year) {
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  calendarDays.innerHTML = "";
  monthYear.textContent = `${monthNames[month]} ${year}`;

  for (let i = 0; i < firstDay; i++) {
    calendarDays.innerHTML += `<div></div>`;
  }

  for (let day = 1; day <= lastDate; day++) {
    const dateKey = `${year}-${pad(month + 1)}-${pad(day)}`;
    const isToday =
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear();

    const hasEvent = events[dateKey];
    const isHoliday = holidays[dateKey];

    let classes = "rounded-lg p-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-700";

    if (isToday) classes += " bg-blue-500 text-white";
    if (isHoliday) classes += " bg-red-100 text-red-800 font-semibold";
    if (hasEvent) classes += " border border-blue-500";

    calendarDays.innerHTML += `
      <div 
        class="${classes}" 
        data-date="${dateKey}" 
        title="${isHoliday ? holidays[dateKey] : ''}${hasEvent ? ' - Event: ' + hasEvent : ''}">
        <div class="font-bold">${day}</div>
        ${hasEvent ? `<div class="
