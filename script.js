const searchEngines = {
  google: (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`,
  bing: (q) => `https://www.bing.com/search?q=${encodeURIComponent(q)}`,
  duckduckgo: (q) => `https://duckduckgo.com/?q=${encodeURIComponent(q)}`,
  youtube: (q) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`
};

const quotes = [
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Small daily improvements are the key to staggering long-term results.", author: "James Clear" },
  { text: "Focus on being productive instead of busy.", author: "Tim Ferriss" },
  { text: "Discipline is choosing between what you want now and what you want most.", author: "Abraham Lincoln" },
  { text: "Well begun is half done.", author: "Aristotle" },
  { text: "Do the hard jobs first. The easy jobs will take care of themselves.", author: "Dale Carnegie" },
  { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
  { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
  { text: "A goal without a plan is just a wish.", author: "Antoine de Saint-Exupery" },
  { text: "Action is the foundational key to all success.", author: "Pablo Picasso" },
  { text: "What you do today can improve all your tomorrows.", author: "Ralph Marston" },
  { text: "Slow progress is still progress.", author: "Unknown" },
  { text: "Motivation gets you going, discipline keeps you growing.", author: "John C. Maxwell" },
  { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" }
];

const googleApps = [
  { name: "Gmail", url: "https://mail.google.com" },
  { name: "Drive", url: "https://drive.google.com" },
  { name: "Calendar", url: "https://calendar.google.com" },
  { name: "Docs", url: "https://docs.google.com" },
  { name: "Sheets", url: "https://sheets.google.com" },
  { name: "Photos", url: "https://photos.google.com" },
  { name: "Maps", url: "https://maps.google.com" },
  { name: "Translate", url: "https://translate.google.com" },
  { name: "Meet", url: "https://meet.google.com" },
  { name: "YouTube", url: "https://youtube.com" },
  { name: "News", url: "https://news.google.com" },
  { name: "Keep", url: "https://keep.google.com" }
];

const HABIT_DAYS = [
  { short: "Mon", full: "Monday" },
  { short: "Tue", full: "Tuesday" },
  { short: "Wed", full: "Wednesday" },
  { short: "Thu", full: "Thursday" },
  { short: "Fri", full: "Friday" },
  { short: "Sat", full: "Saturday" },
  { short: "Sun", full: "Sunday" }
];
const POMODORO_FOCUS_SECONDS = 25 * 60;
const POMODORO_BREAK_SECONDS = 5 * 60;
const POMODORO_MAX_SECONDS = 120 * 60;

const defaults = {
  links: [
    { name: "Gmail", url: "https://mail.google.com" },
    { name: "YouTube", url: "https://youtube.com" },
    { name: "GitHub", url: "https://github.com" },
    { name: "ChatGPT", url: "https://chatgpt.com" },
    { name: "Drive", url: "https://drive.google.com" },
    { name: "Calendar", url: "https://calendar.google.com" }
  ],
  tasks: [],
  notes: "",
  dateRange: { start: "", end: "" },
  theme: "dark",
  searchEngine: "google",
  pomodoro: { mode: "focus", remaining: POMODORO_FOCUS_SECONDS, running: false, updatedAt: 0 },
  focusTitle: "Focus",
  trackerTitle: "Time Tracker"
};

const store = {
  get(key) {
    const value = localStorage.getItem(`startpage:${key}`);
    return value ? JSON.parse(value) : defaults[key];
  },
  set(key, value) {
    localStorage.setItem(`startpage:${key}`, JSON.stringify(value));
  }
};

const elements = {
  clock: document.querySelector("#clock"),
  waqtDisplay: document.querySelector("#waqtDisplay"),
  dateText: document.querySelector("#dateText"),
  greeting: document.querySelector("#greeting"),
  quoteCard: document.querySelector("#quoteCard"),
  yearNumber: document.querySelector("#yearNumber"),
  yearProgressFill: document.querySelector("#yearProgressFill"),
  yearPercent: document.querySelector("#yearPercent"),
  yearDaysLeft: document.querySelector("#yearDaysLeft"),
  yearWeek: document.querySelector("#yearWeek"),
  yearMonth: document.querySelector("#yearMonth"),
  searchForm: document.querySelector("#searchForm"),
  searchInput: document.querySelector("#searchInput"),
  engineSwitch: document.querySelector("#engineSwitch"),
  links: document.querySelector("#links"),
  addLinkButton: document.querySelector("#addLinkButton"),
  appsToggle: document.querySelector("#appsToggle"),
  appsFlyout: document.querySelector("#appsFlyout"),
  appsGrid: document.querySelector("#appsGrid"),
  appsFlyoutAdd: document.querySelector("#appsFlyoutAdd"),
  linkDialog: document.querySelector("#linkDialog"),
  linkForm: document.querySelector("#linkForm"),
  linkName: document.querySelector("#linkName"),
  linkUrl: document.querySelector("#linkUrl"),
  cancelLinkButton: document.querySelector("#cancelLinkButton"),
  taskForm: document.querySelector("#taskForm"),
  taskInput: document.querySelector("#taskInput"),
  tasks: document.querySelector("#tasks"),
  clearDoneButton: document.querySelector("#clearDoneButton"),
  taskProgress: document.querySelector("#taskProgress"),
  taskProgressFill: document.querySelector("#taskProgressFill"),
  focusTitle: document.querySelector("#focusTitle"),
  notes: document.querySelector("#notes"),
  noteStatus: document.querySelector("#noteStatus"),
  startDate: document.querySelector("#startDate"),
  endDate: document.querySelector("#endDate"),
  rangeStatus: document.querySelector("#rangeStatus"),
  remainingTime: document.querySelector("#remainingTime"),
  trackerTitle: document.querySelector("#trackerTitle"),
  themeToggle: document.querySelector("#themeToggle"),
  themeIcon: document.querySelector("#themeIcon"),
  pomodoro: document.querySelector(".pomodoro"),
  pomodoroTime: document.querySelector("#pomodoroTime"),
  pomodoroMode: document.querySelector("#pomodoroMode"),
  pomodoroStatus: document.querySelector("#pomodoroStatus"),
  pomodoroStart: document.querySelector("#pomodoroStart"),
  pomodoroAddFive: document.querySelector("#pomodoroAddFive"),
  pomodoroReset: document.querySelector("#pomodoroReset"),
  habitTable: document.querySelector("#habitTable"),
  addHabitButton: document.querySelector("#addHabitButton"),
  habitDialog: document.querySelector("#habitDialog"),
  habitForm: document.querySelector("#habitForm"),
  habitName: document.querySelector("#habitName"),
  cancelHabitButton: document.querySelector("#cancelHabitButton")
};

let links = store.get("links");
let tasks = store.get("tasks");
let searchEngine = store.get("searchEngine");
let habitState = store.get("habits");
let focusTitle = store.get("focusTitle");
let trackerTitle = store.get("trackerTitle");

elements.focusTitle.textContent = focusTitle;
elements.trackerTitle.textContent = trackerTitle;

elements.focusTitle.addEventListener("blur", () => {
  const newTitle = elements.focusTitle.textContent.trim();
  if (!newTitle) {
    elements.focusTitle.textContent = "Focus";
    store.set("focusTitle", "Focus");
  } else {
    store.set("focusTitle", newTitle);
  }
});

elements.focusTitle.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    elements.focusTitle.blur();
  }
});

elements.trackerTitle.addEventListener("blur", () => {
  const newTitle = elements.trackerTitle.textContent.trim();
  if (!newTitle) {
    elements.trackerTitle.textContent = "Time Tracker";
    store.set("trackerTitle", "Time Tracker");
  } else {
    store.set("trackerTitle", newTitle);
  }
});

elements.trackerTitle.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    elements.trackerTitle.blur();
  }
});

function normalizeUrl(value) {
  const trimmed = value.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.includes(".") && !trimmed.includes(" ")) return `https://${trimmed}`;
  return searchEngines[searchEngine](trimmed);
}

function dayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  return Math.floor((date - start) / 86400000);
}

function renderQuote() {
  const quote = quotes[dayOfYear(new Date()) % quotes.length];
  elements.quoteCard.textContent = `"${quote.text}" — ${quote.author}`;
}

function updateYearProgress(now) {
  const year = now.getFullYear();
  const startOfYear = new Date(year, 0, 1);
  const startOfNextYear = new Date(year + 1, 0, 1);
  const percent = Math.round(((now - startOfYear) / (startOfNextYear - startOfYear)) * 100);
  const daysLeft = Math.max(0, Math.ceil((startOfNextYear - now) / 86400000));
  const week = Math.min(52, Math.ceil(dayOfYear(now) / 7));

  elements.yearNumber.textContent = year;
  elements.yearProgressFill.style.width = `${percent}%`;
  elements.yearPercent.textContent = `${percent}% done`;
  elements.yearDaysLeft.textContent = daysLeft;
  elements.yearWeek.textContent = `W${week}`;
  elements.yearMonth.textContent = now.toLocaleDateString([], { month: "short" });
}

function renderEngineSwitch() {
  elements.engineSwitch.querySelectorAll(".engine-chip").forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.engine === searchEngine);
  });
}

let waqtTimings = null;

async function fetchWaqtTimings() {
  try {
    const res = await fetch("https://api.aladhan.com/v1/timingsByCity?city=Dhaka&country=Bangladesh");
    const data = await res.json();
    if (data && data.data && data.data.timings) {
      waqtTimings = data.data.timings;
      updateWaqtDisplay();
    }
  } catch (err) {
    console.error("Failed to fetch waqt timings", err);
    if (elements.waqtDisplay) {
      elements.waqtDisplay.textContent = "ওয়াক্ত লোড করা যায়নি";
    }
  }
}

function timeToMinutes(timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

function t12(time24) {
  const [h, m] = time24.split(':');
  const hInt = parseInt(h, 10);
  const ampm = hInt >= 12 ? 'PM' : 'AM';
  const h12 = hInt % 12 || 12;
  return `${h12}:${m} ${ampm}`;
}

function updateWaqtDisplay() {
  if (!waqtTimings || !elements.waqtDisplay) return;
  const now = new Date();
  const currentMins = now.getHours() * 60 + now.getMinutes();

  const timings = [
    { name: "Fajr", bn: "ফজর", mins: timeToMinutes(waqtTimings.Fajr) },
    { name: "Sunrise", bn: "সূর্যোদয়", mins: timeToMinutes(waqtTimings.Sunrise) },
    { name: "Dhuhr", bn: "যোহর", mins: timeToMinutes(waqtTimings.Dhuhr) },
    { name: "Asr", bn: "আসর", mins: timeToMinutes(waqtTimings.Asr) },
    { name: "Maghrib", bn: "মাগরিব", mins: timeToMinutes(waqtTimings.Maghrib) },
    { name: "Isha", bn: "এশা", mins: timeToMinutes(waqtTimings.Isha) },
  ];

  let currentWaqt = timings[5]; // default Isha
  let nextWaqt = timings[0];
  
  for (let i = 0; i < timings.length; i++) {
    if (i === timings.length - 1) {
       if (currentMins >= timings[i].mins) {
           currentWaqt = timings[i];
           nextWaqt = timings[0];
       }
    } else {
       if (currentMins >= timings[i].mins && currentMins < timings[i+1].mins) {
           currentWaqt = timings[i];
           nextWaqt = timings[i+1];
       }
    }
  }

  let startStr = t12(waqtTimings[currentWaqt.name]);
  let endStr = t12(waqtTimings[nextWaqt.name]);
  
  let remainingMins = nextWaqt.mins - currentMins;
  if (remainingMins < 0) {
      remainingMins += 24 * 60;
  }
  
  let remainingText = "";
  if (remainingMins >= 60) {
      const h = Math.floor(remainingMins / 60);
      const m = remainingMins % 60;
      remainingText = `${h} ঘণ্টা ${m > 0 ? m + " মিনিট" : ""}`;
  } else {
      remainingText = `${remainingMins} মিনিট`;
  }
  
  let text = `${currentWaqt.bn} ওয়াক্ত (${startStr} - ${endStr}) • শেষ হতে বাকি: ${remainingText}`;
  if (currentWaqt.name === 'Sunrise') {
      text = `সূর্যোদয় - নামাজ নিষেধ (${startStr} - ${endStr}) • ওয়াক্ত শুরু হতে বাকি: ${remainingText}`;
  }
  
  elements.waqtDisplay.textContent = text;
}

function updateTime() {
  const now = new Date();
  const hour = now.getHours();
  elements.clock.textContent = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
  elements.dateText.textContent = now.toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric"
  });
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  elements.greeting.textContent = `${greeting}, Mehedi Hasan Foysal`;
  updateRemainingTime(now);
  updateYearProgress(now);
  updateWaqtDisplay();
}

function buildAvatar(name, url) {
  const avatar = document.createElement("span");
  avatar.className = "link-avatar";
  avatar.textContent = (name.trim().charAt(0) || "?").toUpperCase();

  let hostname;
  try {
    hostname = new URL(url).hostname;
  } catch {
    return avatar;
  }

  const icon = document.createElement("img");
  icon.className = "link-favicon";
  icon.src = `https://www.google.com/s2/favicons?sz=64&domain=${encodeURIComponent(hostname)}`;
  icon.alt = "";
  icon.loading = "lazy";
  icon.addEventListener("error", () => icon.remove());
  avatar.append(icon);
  return avatar;
}

function renderLinks() {
  elements.links.innerHTML = "";
  links.forEach((link, index) => {
    const card = document.createElement("a");
    card.className = "link-card";
    card.href = link.url;
    card.append(buildAvatar(link.name, link.url));

    const info = document.createElement("div");
    info.innerHTML = `<strong>${link.name}</strong><br><span>${new URL(link.url).hostname}</span>`;
    card.append(info);

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-link";
    deleteButton.type = "button";
    deleteButton.textContent = "×";
    deleteButton.title = "Remove link";
    deleteButton.addEventListener("click", (event) => {
      event.preventDefault();
      links.splice(index, 1);
      store.set("links", links);
      renderLinks();
    });

    card.append(deleteButton);
    elements.links.append(card);
  });

  renderAppsFlyout();
}

function buildAppsSection(title, items, emptyText) {
  const wrapper = document.createElement("div");
  wrapper.className = "apps-section";

  const label = document.createElement("div");
  label.className = "apps-section-label";
  label.textContent = title;
  wrapper.append(label);

  if (items.length === 0) {
    const hint = document.createElement("p");
    hint.className = "empty-hint";
    hint.textContent = emptyText;
    wrapper.append(hint);
    return wrapper;
  }

  const grid = document.createElement("div");
  grid.className = "apps-grid-inner";
  items.forEach((item) => {
    const tile = document.createElement("a");
    tile.className = "apps-tile";
    tile.href = item.url;
    tile.append(buildAvatar(item.name, item.url));
    const label = document.createElement("span");
    label.className = "apps-tile-name";
    label.textContent = item.name;
    tile.append(label);
    grid.append(tile);
  });
  wrapper.append(grid);

  return wrapper;
}

function renderAppsFlyout() {
  elements.appsGrid.innerHTML = "";
  elements.appsGrid.append(buildAppsSection("Google Apps", googleApps));
  elements.appsGrid.append(buildAppsSection("Your Links", links, "No quick links yet."));
}

function closeAppsFlyout() {
  elements.appsFlyout.setAttribute("hidden", "");
  elements.appsToggle.setAttribute("aria-expanded", "false");
}

function toggleAppsFlyout() {
  const isHidden = elements.appsFlyout.hasAttribute("hidden");
  if (isHidden) {
    elements.appsFlyout.removeAttribute("hidden");
    elements.appsToggle.setAttribute("aria-expanded", "true");
  } else {
    closeAppsFlyout();
  }
}

elements.appsToggle.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleAppsFlyout();
});

elements.appsFlyoutAdd.addEventListener("click", () => {
  closeAppsFlyout();
  elements.addLinkButton.click();
});

document.addEventListener("click", (event) => {
  if (elements.appsFlyout.hasAttribute("hidden")) return;
  if (elements.appsFlyout.contains(event.target) || elements.appsToggle.contains(event.target)) return;
  closeAppsFlyout();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !elements.appsFlyout.hasAttribute("hidden")) {
    closeAppsFlyout();
  }
});

function updateTaskProgress() {
  const total = tasks.length;
  const done = tasks.filter((task) => task.done).length;
  const percent = total ? Math.round((done / total) * 100) : 0;
  elements.taskProgress.textContent = total ? `${percent}% done` : "No tasks yet";
  elements.taskProgressFill.style.width = `${percent}%`;
}

let draggedTaskIndex = null;

function renderTasks() {
  elements.tasks.innerHTML = "";
  tasks.forEach((task, index) => {
    const item = document.createElement("li");
    item.className = `task${task.done ? " done" : ""}`;
    item.draggable = true;

    item.addEventListener('dragstart', (e) => {
      draggedTaskIndex = index;
      e.dataTransfer.effectAllowed = "move";
      setTimeout(() => item.classList.add('dragging'), 0);
    });

    item.addEventListener('dragend', () => {
      item.classList.remove('dragging');
      draggedTaskIndex = null;
    });

    item.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      const draggingItem = elements.tasks.querySelector('.dragging');
      if (!draggingItem || draggingItem === item) return;
      
      const bounding = item.getBoundingClientRect();
      const offset = bounding.y + (bounding.height / 2);
      if (e.clientY - offset > 0) {
        item.style.borderBottom = "2px solid var(--accent)";
        item.style.borderTop = "";
      } else {
        item.style.borderTop = "2px solid var(--accent)";
        item.style.borderBottom = "";
      }
    });

    item.addEventListener('dragleave', () => {
      item.style.borderTop = "";
      item.style.borderBottom = "";
    });

    item.addEventListener('drop', (e) => {
      e.preventDefault();
      item.style.borderTop = "";
      item.style.borderBottom = "";
      
      if (draggedTaskIndex === null || draggedTaskIndex === index) return;

      const bounding = item.getBoundingClientRect();
      const offset = bounding.y + (bounding.height / 2);
      let targetIndex = index;
      if (e.clientY - offset > 0) {
        targetIndex = index + 1;
      }

      const draggedTask = tasks.splice(draggedTaskIndex, 1)[0];
      if (draggedTaskIndex < targetIndex) {
          targetIndex--;
      }
      tasks.splice(targetIndex, 0, draggedTask);
      
      store.set("tasks", tasks);
      renderTasks();
    });

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", () => {
      tasks[index].done = checkbox.checked;
      store.set("tasks", tasks);
      renderTasks();
    });

    const label = document.createElement("span");
    label.className = "task-label";
    label.textContent = task.text;

    const editButton = document.createElement("button");
    editButton.className = "edit-task";
    editButton.type = "button";
    editButton.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`;
    editButton.title = "Edit task";
    editButton.addEventListener("click", () => {
      const input = document.createElement("input");
      input.type = "text";
      input.value = task.text;
      input.className = "edit-task-input";
      
      item.replaceChild(input, label);
      input.focus();
      
      const saveEdit = () => {
        const newText = input.value.trim();
        if (newText) {
          tasks[index].text = newText;
          store.set("tasks", tasks);
        }
        renderTasks();
      };
      
      input.addEventListener("blur", saveEdit);
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") saveEdit();
        if (e.key === "Escape") renderTasks();
      });
    });

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-task";
    deleteButton.type = "button";
    deleteButton.textContent = "×";
    deleteButton.title = "Remove task";
    deleteButton.addEventListener("click", () => {
      tasks.splice(index, 1);
      store.set("tasks", tasks);
      renderTasks();
    });

    const actions = document.createElement("div");
    actions.className = "task-actions";
    actions.append(editButton, deleteButton);

    item.append(checkbox, label, actions);
    elements.tasks.append(item);
  });

  updateTaskProgress();
}

function applyTheme(theme) {
  document.body.classList.toggle("light", theme === "light");
  elements.themeIcon.textContent = theme === "light" ? "☀" : "☾";
  store.set("theme", theme);
}

function getDateRange() {
  return {
    start: elements.startDate.value,
    end: elements.endDate.value
  };
}

function saveDateRange() {
  store.set("dateRange", getDateRange());
  updateRemainingTime();
}

function dayStart(value) {
  return value ? new Date(`${value}T00:00:00`) : null;
}

function dayEnd(value) {
  return value ? new Date(`${value}T23:59:59`) : null;
}

function formatDuration(milliseconds) {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

function countdownGrid(duration) {
  const cells = [
    [duration.days, "Days"],
    [duration.hours, "Hours"],
    [duration.minutes, "Min"],
    [duration.seconds, "Sec"]
  ];
  return `<div class="countdown-grid">${cells
    .map(([value, label]) => `<div class="countdown-cell"><strong>${String(value).padStart(2, "0")}</strong><span>${label}</span></div>`)
    .join("")}</div>`;
}

function updateRemainingTime(now = new Date()) {
  const range = getDateRange();
  const start = dayStart(range.start);
  const end = dayEnd(range.end);

  if (!start || !end) {
    elements.rangeStatus.textContent = "Select dates";
    elements.remainingTime.innerHTML =
      "<strong>Pick a start and end date</strong><span>Your remaining time will show here.</span>";
    return;
  }

  if (end < start) {
    elements.rangeStatus.textContent = "Check dates";
    elements.remainingTime.innerHTML =
      "<strong>End date is before start date</strong><span>Please choose a valid date range.</span>";
    return;
  }

  const total = end - start;
  const elapsed = Math.min(Math.max(now - start, 0), total);
  const remaining = end - now;
  const progress = Math.round((elapsed / total) * 100);

  if (now < start) {
    const wait = formatDuration(start - now);
    elements.rangeStatus.textContent = "Not started";
    elements.remainingTime.innerHTML = `<strong>Starts in</strong>${countdownGrid(wait)}<span>Countdown to the start date.</span>`;
    return;
  }

  if (remaining <= 0) {
    elements.rangeStatus.textContent = "Finished";
    elements.remainingTime.innerHTML =
      '<strong>Time is complete</strong><div class="progress-bar"><div class="progress-fill" style="width: 100%"></div></div><span>This selected date range has ended.</span>';
    return;
  }

  const left = formatDuration(remaining);
  elements.rangeStatus.textContent = `${progress}% passed`;
  elements.remainingTime.innerHTML = `<strong>Time remaining</strong><div class="progress-bar"><div class="progress-fill" style="width: ${progress}%"></div></div>${countdownGrid(left)}`;
}

// --- Pomodoro focus timer ---
function loadPomodoroState() {
  const saved = store.get("pomodoro");
  let { mode, remaining, running, updatedAt } = saved;

  if (running) {
    let elapsed = Math.floor((Date.now() - updatedAt) / 1000);
    while (elapsed >= remaining) {
      elapsed -= remaining;
      mode = mode === "focus" ? "break" : "focus";
      remaining = mode === "focus" ? POMODORO_FOCUS_SECONDS : POMODORO_BREAK_SECONDS;
    }
    remaining -= elapsed;
  }

  return { mode, remaining, running, timer: null };
}

function savePomodoroState() {
  store.set("pomodoro", {
    mode: pomodoro.mode,
    remaining: pomodoro.remaining,
    running: pomodoro.running,
    updatedAt: Date.now()
  });
}

const pomodoro = loadPomodoroState();

function formatClock(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function renderPomodoro() {
  elements.pomodoroTime.textContent = formatClock(pomodoro.remaining);
  elements.pomodoroMode.textContent = pomodoro.mode === "focus" ? "Focus session" : "Short break";
  elements.pomodoroStatus.textContent = pomodoro.running ? "Running" : "Ready";
  elements.pomodoroStart.textContent = pomodoro.running ? "Pause" : "Start";
  elements.pomodoro.classList.toggle("running", pomodoro.running);
}

function notify(title, body) {
  if (!("Notification" in window) || Notification.permission !== "granted") return;
  new Notification(title, { body });
}

function pomodoroTick() {
  pomodoro.remaining -= 1;
  if (pomodoro.remaining <= 0) {
    const finishedMode = pomodoro.mode;
    pomodoro.mode = finishedMode === "focus" ? "break" : "focus";
    pomodoro.remaining = pomodoro.mode === "focus" ? POMODORO_FOCUS_SECONDS : POMODORO_BREAK_SECONDS;
    notify(
      finishedMode === "focus" ? "Focus session complete" : "Break complete",
      finishedMode === "focus" ? "Time for a short break." : "Back to focus."
    );
  }
  savePomodoroState();
  renderPomodoro();
}

function startPomodoro() {
  if ("Notification" in window && Notification.permission === "default") {
    Notification.requestPermission();
  }
  pomodoro.running = true;
  pomodoro.timer = window.setInterval(pomodoroTick, 1000);
  savePomodoroState();
  renderPomodoro();
}

function pausePomodoro() {
  pomodoro.running = false;
  window.clearInterval(pomodoro.timer);
  savePomodoroState();
  renderPomodoro();
}

function resetPomodoro() {
  pausePomodoro();
  pomodoro.mode = "focus";
  pomodoro.remaining = POMODORO_FOCUS_SECONDS;
  savePomodoroState();
  renderPomodoro();
}

elements.pomodoroStart.addEventListener("click", () => {
  if (pomodoro.running) {
    pausePomodoro();
  } else {
    startPomodoro();
  }
});

elements.pomodoroAddFive.addEventListener("click", () => {
  pomodoro.remaining = Math.min(pomodoro.remaining + 300, POMODORO_MAX_SECONDS);
  savePomodoroState();
  renderPomodoro();
});

elements.pomodoroReset.addEventListener("click", resetPomodoro);

// --- Weekly habit tracker ---
function getWeekStart(date) {
  const day = date.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const monday = new Date(date);
  monday.setDate(date.getDate() + diffToMonday);
  monday.setHours(0, 0, 0, 0);
  return monday.toISOString().slice(0, 10);
}

function ensureCurrentHabitWeek() {
  const currentWeekStart = getWeekStart(new Date());
  if (habitState.weekStart !== currentWeekStart) {
    habitState = {
      weekStart: currentWeekStart,
      habits: habitState.habits.map((habit) => ({ name: habit.name, days: Array(7).fill(false) }))
    };
    store.set("habits", habitState);
  }
}

function renderHabits() {
  elements.habitTable.innerHTML = "";

  if (habitState.habits.length === 0) {
    const hint = document.createElement("p");
    hint.className = "empty-hint";
    hint.textContent = "Add a habit to start tracking your week.";
    elements.habitTable.append(hint);
    return;
  }

  const header = document.createElement("div");
  header.className = "habit-header";
  header.innerHTML = `<span></span>${HABIT_DAYS.map((d) => `<span title="${d.full}">${d.short}</span>`).join("")}<span></span>`;
  elements.habitTable.append(header);

  habitState.habits.forEach((habit, habitIndex) => {
    const row = document.createElement("div");
    row.className = "habit-row";

    const name = document.createElement("span");
    name.className = "habit-name";
    name.textContent = habit.name;
    row.append(name);

    habit.days.forEach((checked, dayIndex) => {
      const dayCell = document.createElement("span");
      dayCell.className = "habit-day";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = checked;
      checkbox.addEventListener("change", () => {
        habitState.habits[habitIndex].days[dayIndex] = checkbox.checked;
        store.set("habits", habitState);
      });
      dayCell.append(checkbox);
      row.append(dayCell);
    });

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-habit";
    deleteButton.type = "button";
    deleteButton.textContent = "×";
    deleteButton.title = "Remove habit";
    deleteButton.addEventListener("click", () => {
      habitState.habits.splice(habitIndex, 1);
      store.set("habits", habitState);
      renderHabits();
    });
    row.append(deleteButton);

    elements.habitTable.append(row);
  });
}

elements.addHabitButton.addEventListener("click", () => {
  elements.habitForm.reset();
  elements.habitDialog.showModal();
  elements.habitName.focus();
});

elements.cancelHabitButton.addEventListener("click", () => {
  elements.habitDialog.close();
});

elements.habitForm.addEventListener("submit", (event) => {
  event.preventDefault();
  habitState.habits.push({ name: elements.habitName.value.trim(), days: Array(7).fill(false) });
  store.set("habits", habitState);
  renderHabits();
  elements.habitDialog.close();
});

elements.searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = elements.searchInput.value.trim();
  if (!query) return;
  location.href = normalizeUrl(query);
});

elements.engineSwitch.addEventListener("click", (event) => {
  const chip = event.target.closest(".engine-chip");
  if (!chip) return;
  searchEngine = chip.dataset.engine;
  store.set("searchEngine", searchEngine);
  renderEngineSwitch();
});

elements.addLinkButton.addEventListener("click", () => {
  elements.linkForm.reset();
  elements.linkDialog.showModal();
  elements.linkName.focus();
});

elements.cancelLinkButton.addEventListener("click", () => {
  elements.linkDialog.close();
});

elements.linkForm.addEventListener("submit", (event) => {
  event.preventDefault();
  links.push({
    name: elements.linkName.value.trim(),
    url: normalizeUrl(elements.linkUrl.value)
  });
  store.set("links", links);
  renderLinks();
  elements.linkDialog.close();
});

elements.taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = elements.taskInput.value.trim();
  if (!text) return;
  tasks.unshift({ text, done: false });
  elements.taskInput.value = "";
  store.set("tasks", tasks);
  renderTasks();
});

elements.clearDoneButton.addEventListener("click", () => {
  tasks = tasks.filter((task) => !task.done);
  store.set("tasks", tasks);
  renderTasks();
});

elements.notes.value = store.get("notes");
elements.notes.addEventListener("input", () => {
  elements.noteStatus.textContent = "Saving...";
  store.set("notes", elements.notes.value);
  window.setTimeout(() => {
    elements.noteStatus.textContent = "Saved";
  }, 250);
});

const savedRange = store.get("dateRange");
elements.startDate.value = savedRange.start || "";
elements.endDate.value = savedRange.end || "";
elements.startDate.addEventListener("change", saveDateRange);
elements.endDate.addEventListener("change", saveDateRange);

elements.themeToggle.addEventListener("click", () => {
  const nextTheme = document.body.classList.contains("light") ? "dark" : "light";
  applyTheme(nextTheme);
});

applyTheme(store.get("theme"));
renderQuote();
renderEngineSwitch();
fetchWaqtTimings();
updateTime();
renderLinks();
renderTasks();
renderPomodoro();
if (pomodoro.running) {
  pomodoro.timer = window.setInterval(pomodoroTick, 1000);
}
ensureCurrentHabitWeek();
renderHabits();
window.setInterval(updateTime, 1000);
