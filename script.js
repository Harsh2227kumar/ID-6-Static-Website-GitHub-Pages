const monthYear = document.getElementById("monthYear");
const calendarDays = document.getElementById("calendarDays");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const toggleDark = document.getElementById("toggleDark");

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let events = {};

// ✅ Hardcoded Indian Holidays (2025)
let holidays = {
  "2025-01-26": "Republic Day",
  "2025-03-17": "Holi",
  "2025-04-10": "Ram Navami",
  "2025-05-01": "Labour Day",
  "2025-06-05": "Eid al-Adha",
  "2025-08-15": "Independence Day",
  "2025-10-02": "Gandhi Jayanti",
  "2025-10-20": "Dussehra",
  "2025-10-31": "Diwali",
  "2025-12-25": "Christmas"
};

function pad(n) {
  return n < 10 ? `0${n}` : n;
}

function renderCalendar(month, year) {
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  calendarDays.innerHTML = "";
  monthYear.textContent = `${new Intl.DateTimeFormat('en-IN', {
    month: 'long', year: 'numeric'
  }).format(new Date(year, month))}`;

  // Fill empty grid slots before the 1st day
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
      ${isToday ? 'bg-blue-500 text-white' : 'bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-100'}
      ${isHoliday ? 'border-red-500 border' : ''}
      ${hasEvent ? 'ring ring-blue-300' : ''}
      hover:bg-blue-100 dark:hover:bg-gray-700
    `;

    calendarDays.innerHTML += `
      <div class="${baseClasses} ${dayClasses}" data-date="${dateKey}" title="${isHoliday || hasEvent ? (isHoliday || '') + (hasEvent ? ' - ' + hasEvent : '') : ''}">
        <div class="font-bold">${day}</div>
        ${isHoliday ? `<div class="text-xs text-red-600 dark:text-red-300">${holidays[dateKey]}</div>` : ''}
        ${hasEvent ? `<div class="text-xs text-blue-500 italic truncate">${hasEvent}</div>` : ''}
      </div>
    `;
  }

  // Event adding/editing
  document.querySelectorAll("#calendarDays > div[data-date]").forEach((el) => {
    el.addEventListener("click", () => {
      const date = el.getAttribute("data-date");
      const current = events[date] || "";
      const note = prompt(`Add/Edit Event for ${date}:`, current);
      if (note !== null) {
        if (note.trim() === "") delete events[date];
        else events[date] = note;
        renderCalendar(currentMonth, currentYear);
      }
    });
  });
}

prevBtn.onclick = () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentMonth, currentYear);
};

nextBtn.onclick = () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentMonth, currentYear);
};

toggleDark.onclick = () => {
  document.body.classList.toggle("dark");
};

renderCalendar(currentMonth, currentYear);
