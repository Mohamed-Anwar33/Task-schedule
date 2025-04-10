let hijriYear = 1444;
let hijriMonth = 8;
let hijriDay = 5;
let weekDay = "السبت";

const hijriMonths = [
  "محرم",
  "صفر",
  "ربيع أول",
  "ربيع ثاني",
  "جمادى أول",
  "جمادى ثاني",
  "رجب",
  "شعبان",
  "رمضان",
  "شوال",
  "ذو القعدة",
  "ذو الحجة",
];
const weekDays = [
  "السبت",
  "الأحد",
  "الإثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
];
const importantColors = [
  "important-task-dark-red",
  "important-task-dark-purple",
  "important-task-dark-green",
  "important-task-dark-blue",
  "important-task-dark-brown",
  "important-task-deep-red",
  "important-task-deep-blue",
  "important-task-deep-green",
  "important-task-deep-orange",
  "important-task-deep-purple",
  "important-task-light-orange",
  "important-task-light-gray",
  "important-task-light-green",
];

function populateDateSelects() {
  const daySelects = document.querySelectorAll("select[name='hijri-day']");
  daySelects.forEach((select) => {
    select.innerHTML = Array.from({ length: 30 }, (_, i) => i + 1)
      .map(
        (day) =>
          `<option value="${day}" ${
            day === hijriDay ? "selected" : ""
          }>${day}</option>`
      )
      .join("");
  });
  const monthSelects = document.querySelectorAll("select[name='hijri-month']");
  monthSelects.forEach((select) => {
    select.innerHTML = hijriMonths
      .map(
        (m, i) =>
          `<option value="${i + 1}" ${
            i + 1 === hijriMonth ? "selected" : ""
          }>${m}</option>`
      )
      .join("");
  });
  const yearSelects = document.querySelectorAll("select[name='hijri-year']");
  yearSelects.forEach((select) => {
    select.innerHTML = Array.from({ length: 41 }, (_, i) => 1430 + i)
      .map(
        (year) =>
          `<option value="${year}" ${
            year === hijriYear ? "selected" : ""
          }>${year}</option>`
      )
      .join("");
  });
  const weekDaySelects = document.querySelectorAll("select[name='week-day']");
  weekDaySelects.forEach((select) => {
    select.innerHTML = weekDays
      .map(
        (day) =>
          `<option value="${day}" ${
            day === weekDay ? "selected" : ""
          }>${day}</option>`
      )
      .join("");
  });
  const headerDaySelect = document.getElementById("header-day");
  if (headerDaySelect)
    headerDaySelect.innerHTML = Array.from({ length: 30 }, (_, i) => i + 1)
      .map(
        (day) =>
          `<option value="${day}" ${
            day === hijriDay ? "selected" : ""
          }>${day}</option>`
      )
      .join("");
  const headerMonthSelect = document.getElementById("header-month");
  if (headerMonthSelect)
    headerMonthSelect.innerHTML = hijriMonths
      .map(
        (m, i) =>
          `<option value="${i + 1}" ${
            i + 1 === hijriMonth ? "selected" : ""
          }>${m}</option>`
      )
      .join("");
  const headerYearSelect = document.getElementById("header-year");
  if (headerYearSelect)
    headerYearSelect.innerHTML = Array.from({ length: 41 }, (_, i) => 1430 + i)
      .map(
        (year) =>
          `<option value="${year}" ${
            year === hijriYear ? "selected" : ""
          }>${year}</option>`
      )
      .join("");
  const headerWeekDaySelect = document.getElementById("header-weekday");
  if (headerWeekDaySelect)
    headerWeekDaySelect.innerHTML = weekDays
      .map(
        (day) =>
          `<option value="${day}" ${
            day === weekDay ? "selected" : ""
          }>${day}</option>`
      )
      .join("");
}

function updateHeaderDate() {
  const headerWeekday = document.getElementById("header-weekday");
  const headerDay = document.getElementById("header-day");
  const headerMonth = document.getElementById("header-month");
  const headerYear = document.getElementById("header-year");

  // تحقق إذا كنا في صفحة المهام المستقبلية
  const isFutureTasksPage = document.getElementById("futureTable") !== null;

  if (headerWeekday && headerDay && headerMonth && headerYear) {
    if (isFutureTasksPage) {
      // تاريخ خاص بصفحة المهام المستقبلية
      const futureWeekDay = headerWeekday.value;
      const futureHijriDay = parseInt(headerDay.value);
      const futureHijriMonth = parseInt(headerMonth.value);
      const futureHijriYear = parseInt(headerYear.value);

      // حفظ التاريخ في مفاتيح خاصة بصفحة المهام المستقبلية
      localStorage.setItem("futureWeekDay", futureWeekDay);
      localStorage.setItem("futureHijriDay", futureHijriDay);
      localStorage.setItem("futureHijriMonth", futureHijriMonth);
      localStorage.setItem("futureHijriYear", futureHijriYear);

      const selectedDate = `${futureWeekDay} ${futureHijriDay} ${
        hijriMonths[futureHijriMonth - 1]
      } ${futureHijriYear}`;
      const printDate = `اليوم: ${futureWeekDay} ${futureHijriDay} ${
        hijriMonths[futureHijriMonth - 1]
      }، ${futureHijriYear} هـ`;

      if (document.getElementById("selected-date"))
        document.getElementById("selected-date").innerText = selectedDate;
      if (document.getElementById("print-selected-date"))
        document.getElementById("print-selected-date").innerText = printDate;
      if (document.getElementById("second-selected-date"))
        document.getElementById("second-selected-date").innerText =
          selectedDate;
      if (document.getElementById("second-print-selected-date"))
        document.getElementById("second-print-selected-date").innerText =
          printDate;

      checkFutureTasks(); // هتشتغل بناءً على التاريخ العام لنقل المهام
      updateAllTables();
    } else {
      // تاريخ الصفحات التانية (العادي)
      weekDay = headerWeekday.value;
      hijriDay = parseInt(headerDay.value);
      hijriMonth = parseInt(headerMonth.value);
      hijriYear = parseInt(headerYear.value);

      localStorage.setItem("weekDay", weekDay);
      localStorage.setItem("hijriDay", hijriDay);
      localStorage.setItem("hijriMonth", hijriMonth);
      localStorage.setItem("hijriYear", hijriYear);

      const selectedDate = `${weekDay} ${hijriDay} ${
        hijriMonths[hijriMonth - 1]
      } ${hijriYear}`;
      const printDate = `اليوم: ${weekDay} ${hijriDay} ${
        hijriMonths[hijriMonth - 1]
      }، ${hijriYear} هـ`;

      if (document.getElementById("selected-date"))
        document.getElementById("selected-date").innerText = selectedDate;
      if (document.getElementById("print-selected-date"))
        document.getElementById("print-selected-date").innerText = printDate;
      if (document.getElementById("second-selected-date"))
        document.getElementById("second-selected-date").innerText =
          selectedDate;
      if (document.getElementById("second-print-selected-date"))
        document.getElementById("second-print-selected-date").innerText =
          printDate;

      checkFutureTasks();
      updateAllTables();

      if (document.getElementById("mainTable1")) saveTableData("mainTable1");
      if (document.getElementById("mainTable2")) saveTableData("mainTable2");

      updatePendingTasks();
    }
  } else {
    // لو الـ header مش موجود، نجيب التاريخ بناءً على الصفحة
    if (isFutureTasksPage) {
      const futureWeekDay = localStorage.getItem("futureWeekDay") || "السبت";
      const futureHijriDay =
        parseInt(localStorage.getItem("futureHijriDay")) || 5;
      const futureHijriMonth =
        parseInt(localStorage.getItem("futureHijriMonth")) || 8;
      const futureHijriYear =
        parseInt(localStorage.getItem("futureHijriYear")) || 1444;

      const selectedDate = `${futureWeekDay} ${futureHijriDay} ${
        hijriMonths[futureHijriMonth - 1]
      } ${futureHijriYear}`;
      const printDate = `اليوم: ${futureWeekDay} ${futureHijriDay} ${
        hijriMonths[futureHijriMonth - 1]
      }، ${futureHijriYear} هـ`;

      if (document.getElementById("selected-date"))
        document.getElementById("selected-date").innerText = selectedDate;
      if (document.getElementById("print-selected-date"))
        document.getElementById("print-selected-date").innerText = printDate;
      if (document.getElementById("second-selected-date"))
        document.getElementById("second-selected-date").innerText =
          selectedDate;
      if (document.getElementById("second-print-selected-date"))
        document.getElementById("second-print-selected-date").innerText =
          printDate;

      checkFutureTasks(); // هتشتغل بناءً على التاريخ العام
      updateAllTables();
    } else {
      weekDay = localStorage.getItem("weekDay") || "السبت";
      hijriDay = parseInt(localStorage.getItem("hijriDay")) || 5;
      hijriMonth = parseInt(localStorage.getItem("hijriMonth")) || 8;
      hijriYear = parseInt(localStorage.getItem("hijriYear")) || 1444;

      const selectedDate = `${weekDay} ${hijriDay} ${
        hijriMonths[hijriMonth - 1]
      } ${hijriYear}`;
      const printDate = `اليوم: ${weekDay} ${hijriDay} ${
        hijriMonths[hijriMonth - 1]
      }، ${hijriYear} هـ`;

      if (document.getElementById("selected-date"))
        document.getElementById("selected-date").innerText = selectedDate;
      if (document.getElementById("print-selected-date"))
        document.getElementById("print-selected-date").innerText = printDate;
      if (document.getElementById("second-selected-date"))
        document.getElementById("second-selected-date").innerText =
          selectedDate;
      if (document.getElementById("second-print-selected-date"))
        document.getElementById("second-print-selected-date").innerText =
          printDate;

      checkFutureTasks();
      updateAllTables();
      updatePendingTasks();
    }
  }
}

function checkFutureTasks() {
  const futureTasks = JSON.parse(localStorage.getItem("future_tasks") || "[]");
  const mainTableTasks = JSON.parse(
    localStorage.getItem("mainTable1_tasks") || "[]"
  );
  let tasksMoved = false;

  const updatedFutureTasks = futureTasks.filter((task) => {
    if (!task || !task[0]) return true; // تجاهل المهام الفارغة
    const [taskWeekDay, taskDay, taskMonthName, taskYear] = task[0].split(" ");
    const taskDayNum = parseInt(taskDay);
    const taskMonthNum = hijriMonths.indexOf(taskMonthName) + 1;
    const taskYearNum = parseInt(taskYear);

    // التأكد إن التاريخ يتطابق بالظبط
    if (
      taskYearNum === hijriYear &&
      taskMonthNum === hijriMonth &&
      taskDayNum === hijriDay &&
      taskWeekDay === weekDay
    ) {
      // تحويل بيانات المهمة لتتوافق مع صيغة mainTable1
      const mainTableTask = [
        task[0], // التاريخ
        task[1], // وقت البداية
        task[2], // العنوان
        task[3], // المكان
        task[4], // التفاصيل
        false, // isCompleted
        false, // (غير مستخدم حاليًا)
        false, // isImportant
        "", // importantColor
      ];
      mainTableTasks.push(mainTableTask);
      tasksMoved = true;
      return false; // حذف المهمة من futureTasks
    }
    return true; // الاحتفاظ بالمهمة في futureTasks لو التاريخ مش متطابق
  });

  if (tasksMoved) {
    localStorage.setItem("mainTable1_tasks", JSON.stringify(mainTableTasks));
    localStorage.setItem("future_tasks", JSON.stringify(updatedFutureTasks));
    if (document.getElementById("mainTable1")) loadTableData("mainTable1");
    if (document.getElementById("futureTable")) loadFutureTasks();
  }
}

function sortTableByStartTime(tableId) {
  const tableElement = document.getElementById(tableId);
  if (!tableElement) return;
  const table = tableElement.getElementsByTagName("tbody")[0];
  const rows = Array.from(table.getElementsByTagName("tr"));
  rows.sort((a, b) => {
    const timeA = a.cells[tableId === "mainTable1" ? 2 : 1].innerText;
    const timeB = b.cells[tableId === "mainTable1" ? 2 : 1].innerText;
    return timeA.localeCompare(timeB);
  });
  table.innerHTML = "";
  rows.forEach((row, index) => {
    if (tableId === "mainTable1") row.cells[0].innerText = index + 1;
    table.appendChild(row);
  });
}

function addNewRow(tableId) {
  const tableElement = document.getElementById(tableId);
  if (!tableElement) return;
  const table = tableElement.getElementsByTagName("tbody")[0];
  const newRow = table.insertRow();
  const rowIndex = table.rows.length;
  const dateText = `${weekDay} ${hijriDay} ${
    hijriMonths[hijriMonth - 1]
  }، ${hijriYear} هـ`;
  if (tableId === "mainTable1") {
    newRow.setAttribute("draggable", "true");
    newRow.classList.add("draggable");
    newRow.innerHTML = `
      <td>${rowIndex}</td>
      <td class="date-cell">
        <select class="hijri-select" name="week-day">${weekDays
          .map(
            (day) =>
              `<option value="${day}" ${
                day === weekDay ? "selected" : ""
              }>${day}</option>`
          )
          .join("")}</select>
        <select class="hijri-select" name="hijri-day">${Array.from(
          { length: 30 },
          (_, i) => i + 1
        )
          .map(
            (day) =>
              `<option value="${day}" ${
                day === hijriDay ? "selected" : ""
              }>${day}</option>`
          )
          .join("")}</select>
        <select class="hijri-select" name="hijri-month">${hijriMonths
          .map(
            (m, i) =>
              `<option value="${i + 1}" ${
                i + 1 === hijriMonth ? "selected" : ""
              }>${m}</option>`
          )
          .join("")}</select>
        <select class="hijri-select" name="hijri-year">${Array.from(
          { length: 41 },
          (_, i) => 1430 + i
        )
          .map(
            (year) =>
              `<option value="${year}" ${
                year === hijriYear ? "selected" : ""
              }>${year}</option>`
          )
          .join("")}</select>
        <span class="print-date">${dateText}</span>
      </td>
      <td contenteditable="true">06:00</td>
      <td contenteditable="true"></td>
      <td contenteditable="true"></td>
      <td contenteditable="true"></td>
      <td class="edit-column">
        <div class="action-buttons">
          <button class="btn btn-warning btn-sm edit-btn" onclick="editTable('${tableId}', this)">تعديل</button>
          <button class="btn btn-success btn-sm complete-btn" onclick="toggleComplete(this, '${tableId}')">اكتمال</button>
          <button class="btn btn-danger btn-sm delete-btn" onclick="deleteTask(this, '${tableId}')">حذف</button>
          <button class="btn btn-danger btn-sm important-btn" onclick="showColorPicker(this, '${tableId}')">تحديد اللون</button>
          <button class="btn btn-secondary btn-sm remove-color-btn" onclick="removeColor(this, '${tableId}')">إزالة اللون</button>
          <button class="btn btn-primary btn-sm move-btn" onclick="moveRowUp(this, '${tableId}')">↑</button>
          <button class="btn btn-primary btn-sm move-btn" onclick="moveRowDown(this, '${tableId}')">↓</button>
        </div>
      </td>
    `;
  } else {
    newRow.innerHTML = `
      <td class="date-cell">
        <select class="hijri-select" name="week-day">${weekDays
          .map(
            (day) =>
              `<option value="${day}" ${
                day === weekDay ? "selected" : ""
              }>${day}</option>`
          )
          .join("")}</select>
        <select class="hijri-select" name="hijri-day">${Array.from(
          { length: 30 },
          (_, i) => i + 1
        )
          .map(
            (day) =>
              `<option value="${day}" ${
                day === hijriDay ? "selected" : ""
              }>${day}</option>`
          )
          .join("")}</select>
        <select class="hijri-select" name="hijri-month">${hijriMonths
          .map(
            (m, i) =>
              `<option value="${i + 1}" ${
                i + 1 === hijriMonth ? "selected" : ""
              }>${m}</option>`
          )
          .join("")}</select>
        <select class="hijri-select" name="hijri-year">${Array.from(
          { length: 41 },
          (_, i) => 1430 + i
        )
          .map(
            (year) =>
              `<option value="${year}" ${
                year === hijriYear ? "selected" : ""
              }>${year}</option>`
          )
          .join("")}</select>
        <span class="print-date">${dateText}</span>
      </td>
      <td contenteditable="true">06:00</td>
      <td contenteditable="true"></td>
      <td contenteditable="true"></td>
      <td contenteditable="true"></td>
      <td class="edit-column">
        <div class="action-buttons">
          <button class="btn btn-warning btn-sm edit-btn" onclick="editTable('${tableId}', this)">تعديل</button>
          <button class="btn btn-success btn-sm complete-btn" onclick="toggleComplete(this, '${tableId}')">اكتمال</button>
          <button class="btn btn-danger btn-sm delete-btn" onclick="deleteTask(this, '${tableId}')">حذف</button>
          <button class="btn btn-danger btn-sm important-btn" onclick="showColorPicker(this, '${tableId}')">تحديد اللون</button>
          <button class="btn btn-secondary btn-sm remove-color-btn" onclick="removeColor(this, '${tableId}')">إزالة اللون</button>
        </div>
      </td>
    `;
  }
  saveTableData(tableId);
  sortTableByStartTime(tableId);
  updatePendingTasks();
  if (tableId === "mainTable1") {
    localStorage.setItem(
      "completedTable_tasks",
      localStorage.getItem("mainTable1_tasks")
    );
    setupDragAndDrop(tableId);
    updateCompletedTable();
  }
}

function toggleComplete(button, tableId) {
  const row = button.closest("tr");
  const completeBtn = row.querySelector(".complete-btn");
  const isCompleted = completeBtn.innerText === "إلغاء الاكتمال";
  completeBtn.innerText = isCompleted ? "اكتمال" : "إلغاء الاكتمال";
  completeBtn.classList.toggle("btn-success", !isCompleted);
  completeBtn.classList.toggle("btn-warning", isCompleted);
  saveTableData(tableId);
  updatePendingTasks();
  if (tableId === "mainTable1") {
    localStorage.setItem(
      "completedTable_tasks",
      localStorage.getItem("mainTable1_tasks")
    );
    updateCompletedTable();
  }
}

function showColorPicker(button, tableId) {
  const row = button.closest("tr");
  const actionButtons = row.querySelector(".action-buttons");
  const existingPicker = row.querySelector(".color-picker");
  if (existingPicker) {
    existingPicker.remove();
    return;
  }
  const colorNames = [
    "أحمر داكن",
    "أرجواني فاتح",
    "أخضر داكن",
    "أزرق داكن",
    "بني فاتح",
    "أحمر غامق",
    "أزرق غامق",
    "أخضر غامق",
    "برتقالي غامق",
    "بنفسجي غامق",
    "برتقالي فاتح",
    "رمادي فاتح",
    "أخضر فاتح",
  ];
  const colorPicker = document.createElement("div");
  colorPicker.className = "color-picker";
  colorPicker.innerHTML = `<select class="color-select" onchange="applyColor(this, '${tableId}')"><option value="" disabled selected>اختر لونًا</option>${importantColors
    .map(
      (color, index) => `<option value="${color}">${colorNames[index]}</option>`
    )
    .join("")}</select>`;
  actionButtons.appendChild(colorPicker);
}

function applyColor(select, tableId) {
  const row = select.closest("tr");
  const color = select.value;
  const button = row.querySelector(".important-btn");
  const startIndex = tableId === "mainTable1" ? 1 : 0;
  const dataCells = Array.from(row.querySelectorAll("td")).slice(
    startIndex,
    -1
  );
  if (color) {
    dataCells.forEach((cell) => {
      importantColors.forEach((c) => cell.classList.remove(c));
      cell.classList.add(color);
    });
    button.innerText = "إلغاء الأهمية";
  }
  select.parentElement.remove();
  saveTableData(tableId);
  updatePendingTasks();
  if (tableId === "mainTable1") {
    localStorage.setItem(
      "completedTable_tasks",
      localStorage.getItem("mainTable1_tasks")
    );
    updateCompletedTable();
  }
}

function removeColor(button, tableId) {
  const row = button.closest("tr");
  const startIndex = tableId === "mainTable1" ? 1 : 0;
  const dataCells = Array.from(row.querySelectorAll("td")).slice(
    startIndex,
    -1
  );
  const importantButton = row.querySelector(".important-btn");
  dataCells.forEach((cell) =>
    importantColors.forEach((c) => cell.classList.remove(c))
  );
  importantButton.innerText = "تحديد اللون";
  saveTableData(tableId);
  updatePendingTasks();
  if (tableId === "mainTable1") {
    localStorage.setItem(
      "completedTable_tasks",
      localStorage.getItem("mainTable1_tasks")
    );
    updateCompletedTable();
  }
}

function editTable(tableId, button) {
  const row = button.closest("tr");
  const cells = row.getElementsByTagName("td");
  const offset = tableId === "mainTable1" ? 1 : 0;
  const isEditing = cells[1 + offset].contentEditable === "true";
  if (isEditing) {
    cells[1 + offset].contentEditable = "false";
    cells[2 + offset].contentEditable = "false";
    cells[3 + offset].contentEditable = "false";
    cells[4 + offset].contentEditable = "false";
    button.innerText = "تعديل";
    button.className = "btn btn-warning btn-sm edit-btn";
    saveTableData(tableId);
    sortTableByStartTime(tableId);
    updatePendingTasks();
    if (tableId === "mainTable1") {
      localStorage.setItem(
        "completedTable_tasks",
        localStorage.getItem("mainTable1_tasks")
      );
      updateCompletedTable();
    }
  } else {
    cells[1 + offset].contentEditable = "true";
    cells[2 + offset].contentEditable = "true";
    cells[3 + offset].contentEditable = "true";
    cells[4 + offset].contentEditable = "true";
    button.innerText = "حفظ";
    button.className = "btn btn-success btn-sm edit-btn";
  }
}

function deleteTask(button, tableId) {
  const row = button.closest("tr");
  row.remove();
  saveTableData(tableId);
  sortTableByStartTime(tableId);
  updatePendingTasks();
  if (tableId === "mainTable1") {
    localStorage.setItem(
      "completedTable_tasks",
      localStorage.getItem("mainTable1_tasks")
    );
    updateRowNumbers(tableId);
    updateCompletedTable();
  }
}

function saveTableData(tableId) {
  const tableElement = document.getElementById(tableId);
  if (!tableElement) return;
  const table = tableElement.getElementsByTagName("tbody")[0];
  const rows = table.getElementsByTagName("tr");
  const data = [];
  for (let row of rows) {
    const cells = row.getElementsByTagName("td");
    const offset = tableId === "mainTable1" ? 1 : 0;
    const weekDay = cells[0 + offset].querySelector(
      "select[name='week-day']"
    ).value;
    const day = cells[0 + offset].querySelector(
      "select[name='hijri-day']"
    ).value;
    const month = cells[0 + offset].querySelector(
      "select[name='hijri-month']"
    ).value;
    const year = cells[0 + offset].querySelector(
      "select[name='hijri-year']"
    ).value;
    const isCompleted = row.querySelector(".complete-btn")
      ? row.querySelector(".complete-btn").innerText === "إلغاء الاكتمال"
      : false;
    const isImportant = importantColors.some((color) =>
      cells[1 + offset].classList.contains(color)
    );
    const importantColor =
      importantColors.find((color) =>
        cells[1 + offset].classList.contains(color)
      ) || "";
    const dateText = `${weekDay} ${day} ${hijriMonths[month - 1]}، ${year} هـ`;
    cells[0 + offset].querySelector(".print-date").innerText = dateText;
    const taskData = [
      `${weekDay} ${day} ${hijriMonths[month - 1]} ${year}`,
      cells[1 + offset].innerText.trim(),
      cells[2 + offset].innerText.trim(),
      cells[3 + offset].innerText.trim(),
      cells[4 + offset].innerText.trim(),
      isCompleted,
      false,
      isImportant,
      importantColor,
    ];
    data.push(taskData);
  }
  localStorage.setItem(tableId + "_tasks", JSON.stringify(data));
}

function loadTableData(tableId) {
  const tableElement = document.getElementById(tableId);
  if (!tableElement) return;
  const table = tableElement.getElementsByTagName("tbody")[0];
  const savedData = JSON.parse(
    localStorage.getItem(tableId + "_tasks") || "[]"
  );
  console.log(`البيانات المسترجعة لـ ${tableId}:`, savedData);
  table.innerHTML = "";
  savedData.forEach((rowData, index) => {
    const [weekDay, day, monthName, year] = rowData[0].split(" ");
    const month = hijriMonths.indexOf(monthName) + 1;
    const isCompleted = rowData[5];
    const isImportant = rowData[7] || false;
    const importantColor = rowData[8] || "";
    const dateText = `${weekDay} ${day} ${hijriMonths[month - 1]}، ${year} هـ`;
    const row = table.insertRow();
    if (tableId === "mainTable1") {
      row.setAttribute("draggable", "true");
      row.classList.add("draggable");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td class="date-cell">
          <select class="hijri-select" name="week-day">${weekDays
            .map(
              (d) =>
                `<option value="${d}" ${
                  d === weekDay ? "selected" : ""
                }>${d}</option>`
            )
            .join("")}</select>
          <select class="hijri-select" name="hijri-day">${Array.from(
            { length: 30 },
            (_, i) => i + 1
          )
            .map(
              (d) =>
                `<option value="${d}" ${
                  d === parseInt(day) ? "selected" : ""
                }>${d}</option>`
            )
            .join("")}</select>
          <select class="hijri-select" name="hijri-month">${hijriMonths
            .map(
              (m, i) =>
                `<option value="${i + 1}" ${
                  i + 1 === parseInt(month) ? "selected" : ""
                }>${m}</option>`
            )
            .join("")}</select>
          <select class="hijri-select" name="hijri-year">${Array.from(
            { length: 41 },
            (_, i) => 1430 + i
          )
            .map(
              (y) =>
                `<option value="${y}" ${
                  y === parseInt(year) ? "selected" : ""
                }>${y}</option>`
            )
            .join("")}</select>
          <span class="print-date">${dateText}</span>
        </td>
        <td contenteditable="false">${rowData[1]}</td>
        <td contenteditable="false">${rowData[2]}</td>
        <td contenteditable="false">${rowData[3]}</td>
        <td contenteditable="false">${rowData[4]}</td>
        <td class="edit-column">
          <div class="action-buttons">
            <button class="btn btn-warning btn-sm edit-btn" onclick="editTable('${tableId}', this)">تعديل</button>
            <button class="btn ${
              isCompleted ? "btn-warning" : "btn-success"
            } btn-sm complete-btn" onclick="toggleComplete(this, '${tableId}')">${
        isCompleted ? "إلغاء الاكتمال" : "اكتمال"
      }</button>
            <button class="btn btn-danger btn-sm delete-btn" onclick="deleteTask(this, '${tableId}')">حذف</button>
            <button class="btn btn-danger btn-sm important-btn" onclick="showColorPicker(this, '${tableId}')">${
        isImportant ? "إلغاء الأهمية" : "تحديد اللون"
      }</button>
            <button class="btn btn-secondary btn-sm remove-color-btn" onclick="removeColor(this, '${tableId}')">إزالة اللون</button>
            <button class="btn btn-primary btn-sm move-btn" onclick="moveRowUp(this, '${tableId}')">↑</button>
            <button class="btn btn-primary btn-sm move-btn" onclick="moveRowDown(this, '${tableId}')">↓</button>
          </div>
        </td>
      `;
    } else if (tableId === "mainTable2") {
      row.innerHTML = `
        <td class="date-cell">
          <select class="hijri-select" name="week-day">${weekDays
            .map(
              (d) =>
                `<option value="${d}" ${
                  d === weekDay ? "selected" : ""
                }>${d}</option>`
            )
            .join("")}</select>
          <select class="hijri-select" name="hijri-day">${Array.from(
            { length: 30 },
            (_, i) => i + 1
          )
            .map(
              (d) =>
                `<option value="${d}" ${
                  d === parseInt(day) ? "selected" : ""
                }>${d}</option>`
            )
            .join("")}</select>
          <select class="hijri-select" name="hijri-month">${hijriMonths
            .map(
              (m, i) =>
                `<option value="${i + 1}" ${
                  i + 1 === parseInt(month) ? "selected" : ""
                }>${m}</option>`
            )
            .join("")}</select>
          <select class="hijri-select" name="hijri-year">${Array.from(
            { length: 41 },
            (_, i) => 1430 + i
          )
            .map(
              (y) =>
                `<option value="${y}" ${
                  y === parseInt(year) ? "selected" : ""
                }>${y}</option>`
            )
            .join("")}</select>
          <span class="print-date">${dateText}</span>
        </td>
        <td contenteditable="false">${rowData[1]}</td>
        <td contenteditable="false">${rowData[2]}</td>
        <td contenteditable="false">${rowData[3]}</td>
        <td contenteditable="false">${rowData[4]}</td>
        <td class="edit-column">
          <div class="action-buttons">
            <button class="btn btn-warning btn-sm edit-btn" onclick="editTable('${tableId}', this)">تعديل</button>
            <button class="btn ${
              isCompleted ? "btn-warning" : "btn-success"
            } btn-sm complete-btn" onclick="toggleComplete(this, '${tableId}')">${
        isCompleted ? "إلغاء الاكتمال" : "اكتمال"
      }</button>
            <button class="btn btn-danger btn-sm delete-btn" onclick="deleteTask(this, '${tableId}')">حذف</button>
            <button class="btn btn-danger btn-sm important-btn" onclick="showColorPicker(this, '${tableId}')">${
        isImportant ? "إلغاء الأهمية" : "تحديد اللون"
      }</button>
            <button class="btn btn-secondary btn-sm remove-color-btn" onclick="removeColor(this, '${tableId}')">إزالة اللون</button>
          </div>
        </td>
      `;
    } else if (tableId === "completedTable") {
      row.innerHTML = `
        <td>${index + 1}</td>
        <td class="date-cell">
          <select class="hijri-select" name="week-day">${weekDays
            .map(
              (d) =>
                `<option value="${d}" ${
                  d === weekDay ? "selected" : ""
                }>${d}</option>`
            )
            .join("")}</select>
          <select class="hijri-select" name="hijri-day">${Array.from(
            { length: 30 },
            (_, i) => i + 1
          )
            .map(
              (d) =>
                `<option value="${d}" ${
                  d === parseInt(day) ? "selected" : ""
                }>${d}</option>`
            )
            .join("")}</select>
          <select class="hijri-select" name="hijri-month">${hijriMonths
            .map(
              (m, i) =>
                `<option value="${i + 1}" ${
                  i + 1 === parseInt(month) ? "selected" : ""
                }>${m}</option>`
            )
            .join("")}</select>
          <select class="hijri-select" name="hijri-year">${Array.from(
            { length: 41 },
            (_, i) => 1430 + i
          )
            .map(
              (y) =>
                `<option value="${y}" ${
                  y === parseInt(year) ? "selected" : ""
                }>${y}</option>`
            )
            .join("")}</select>
          <span class="print-date">${dateText}</span>
        </td>
        <td contenteditable="false">${rowData[1]}</td>
        <td contenteditable="false">${rowData[2]}</td>
        <td contenteditable="false">${rowData[3]}</td>
        <td contenteditable="false">${rowData[4]}</td>
        <td class="edit-column">${isCompleted ? "مكتمل" : "غير مكتمل"}</td>
      `;
    }
    const startIndex = tableId === "mainTable1" ? 1 : 0;
    const dataCells = Array.from(row.querySelectorAll("td")).slice(
      startIndex,
      -1
    );
    if (isImportant && importantColor)
      dataCells.forEach((cell) => cell.classList.add(importantColor));
  });
  sortTableByStartTime(tableId);
  if (tableId === "mainTable1") {
    setupDragAndDrop(tableId);
    updateCompletedTable();
  }
}

function updateCompletedTable() {
  const thirdTable = document.querySelector("#completedTable tbody");
  const firstTable = document.querySelector("#mainTable1 tbody");
  if (thirdTable && firstTable) {
    thirdTable.innerHTML = firstTable.innerHTML;
    const rows = thirdTable.getElementsByTagName("tr");
    Array.from(rows).forEach((row, index) => {
      row.cells[0].innerText = index + 1;
      const editColumn = row.cells[row.cells.length - 1];
      const isCompleted =
        editColumn.querySelector(".complete-btn")?.innerText ===
        "إلغاء الاكتمال";
      editColumn.innerHTML = isCompleted ? "مكتمل" : "غير مكتمل";
    });
  }
}

function updateRowNumbers(tableId) {
  if (tableId !== "mainTable1") return;
  const tableElement = document.getElementById(tableId);
  if (!tableElement) return;
  const table = tableElement.getElementsByTagName("tbody")[0];
  const rows = table.getElementsByTagName("tr");
  Array.from(rows).forEach((row, index) => {
    row.cells[0].innerText = index + 1;
  });
  updateCompletedTable();
}

function moveRowUp(button, tableId) {
  if (tableId !== "mainTable1") return;
  const row = button.closest("tr");
  const tbody = row.parentElement;
  const previousRow = row.previousElementSibling;
  if (previousRow) {
    tbody.insertBefore(row, previousRow);
    updateRowNumbers(tableId);
    saveTableData(tableId);
    updateCompletedTable();
  }
}

function moveRowDown(button, tableId) {
  if (tableId !== "mainTable1") return;
  const row = button.closest("tr");
  const tbody = row.parentElement;
  const nextRow = row.nextElementSibling;
  if (nextRow) {
    tbody.insertBefore(nextRow, row);
    updateRowNumbers(tableId);
    saveTableData(tableId);
    updateCompletedTable();
  }
}

function setupDragAndDrop(tableId) {
  if (tableId !== "mainTable1") return;
  const tableElement = document.getElementById(tableId);
  if (!tableElement) return;
  const table = tableElement.getElementsByTagName("tbody")[0];
  const rows = table.getElementsByTagName("tr");

  Array.from(rows).forEach((row) => {
    row.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", row.rowIndex);
      row.classList.add("drag-over");
    });
    row.addEventListener("dragend", () => row.classList.remove("drag-over"));
    row.addEventListener("dragover", (e) => e.preventDefault());
    row.addEventListener("drop", (e) => {
      e.preventDefault();
      const draggedIndex = parseInt(e.dataTransfer.getData("text/plain"));
      const targetRow = e.target.closest("tr");
      if (targetRow && draggedIndex !== targetRow.rowIndex) {
        const draggedRow = rows[draggedIndex];
        if (draggedIndex < targetRow.rowIndex) {
          targetRow.parentNode.insertBefore(draggedRow, targetRow.nextSibling);
        } else {
          targetRow.parentNode.insertBefore(draggedRow, targetRow);
        }
        updateRowNumbers(tableId);
        saveTableData(tableId);
        updateCompletedTable();
      }
    });
  });
}

function updateAllTables() {
  ["mainTable1", "mainTable2", "completedTable"].forEach((tableId) => {
    const tableElement = document.getElementById(tableId);
    if (!tableElement) return;
    const table = tableElement.getElementsByTagName("tbody")[0];
    if (table) {
      const rows = table.getElementsByTagName("tr");
      for (let row of rows) {
        const offset = tableId === "mainTable1" ? 1 : 0;
        const dateCell = row.cells[0 + offset];
        const dateText = `${weekDay} ${hijriDay} ${
          hijriMonths[hijriMonth - 1]
        }، ${hijriYear} هـ`;
        dateCell.innerHTML = `
          <select class="hijri-select" name="week-day">${weekDays
            .map(
              (day) =>
                `<option value="${day}" ${
                  day === weekDay ? "selected" : ""
                }>${day}</option>`
            )
            .join("")}</select>
          <select class="hijri-select" name="hijri-day">${Array.from(
            { length: 30 },
            (_, i) => i + 1
          )
            .map(
              (day) =>
                `<option value="${day}" ${
                  day === hijriDay ? "selected" : ""
                }>${day}</option>`
            )
            .join("")}</select>
          <select class="hijri-select" name="hijri-month">${hijriMonths
            .map(
              (m, i) =>
                `<option value="${i + 1}" ${
                  i + 1 === hijriMonth ? "selected" : ""
                }>${m}</option>`
            )
            .join("")}</select>
          <select class="hijri-select" name="hijri-year">${Array.from(
            { length: 41 },
            (_, i) => 1430 + i
          )
            .map(
              (year) =>
                `<option value="${year}" ${
                  year === hijriYear ? "selected" : ""
                }>${year}</option>`
            )
            .join("")}</select>
          <span class="print-date">${dateText}</span>
        `;
      }
    }
  });
}

function updatePendingTasks() {
  const pendingTasks = [];
  ["mainTable1", "mainTable2"].forEach((tableId) => {
    const tableData = JSON.parse(
      localStorage.getItem(tableId + "_tasks") || "[]"
    );
    tableData.forEach((task) => {
      if (!task[5]) pendingTasks.push(task);
    });
  });
  localStorage.setItem("pending_tasks", JSON.stringify(pendingTasks));
}

function printTable(tableId) {
  const thirdTable = document.querySelector("#completedTable tbody");
  if (thirdTable && tableId === "mainTable1") {
    thirdTable.innerHTML =
      document.querySelector("#mainTable1 tbody")?.innerHTML || "";
    const rows = thirdTable.getElementsByTagName("tr");
    Array.from(rows).forEach((row, index) => {
      row.cells[0].innerText = index + 1;
      const editColumn = row.cells[row.cells.length - 1];
      const isCompleted =
        editColumn.querySelector(".complete-btn")?.innerText ===
        "إلغاء الاكتمال";
      editColumn.innerHTML = isCompleted ? "مكتمل" : "غير مكتمل";
    });
  }
  window.print();
}

function editText(elementId) {
  const element = document.getElementById(elementId);
  const currentValue = element.innerHTML;
  element.innerHTML = `<input type="text" class="form-control form-control-sm" value="${currentValue}">`;
  const button = element.nextElementSibling;
  button.innerText = "حفظ";
  button.className = "btn btn-success btn-sm edit-btn";
  button.onclick = () => saveText(elementId);
}

function saveText(elementId) {
  const element = document.getElementById(elementId);
  const input = element.getElementsByTagName("input")[0];
  element.innerHTML = input.value;
  const button = element.nextElementSibling;
  button.innerText = "تعديل";
  button.className = "btn btn-warning btn-sm edit-btn";
  button.onclick = () => editText(elementId);
  localStorage.setItem(elementId, input.value);
}

function loadEditableText() {
  [
    "title1",
    "title2",
    "title3",
    "title4",
    "notesTitle",
    "signatureName",
  ].forEach((id) => {
    const savedText = localStorage.getItem(id);
    const element = document.getElementById(id);
    if (savedText && element) {
      // نتأكد إن العنصر موجود
      element.innerHTML = savedText;
    }
  });
}

function addNewFutureRow() {
  const tableElement = document.getElementById("futureTable");
  if (!tableElement) return;
  const table = tableElement.getElementsByTagName("tbody")[0];
  const rowIndex = table.rows.length + 1;
  const dateText = `${weekDay} ${hijriDay} ${
    hijriMonths[hijriMonth - 1]
  }، ${hijriYear} هـ`;
  const newRow = table.insertRow();
  newRow.innerHTML = `
    <td>${rowIndex}</td>
    <td class="date-cell">
      <select class="hijri-select" name="week-day">${weekDays
        .map(
          (day) =>
            `<option value="${day}" ${
              day === weekDay ? "selected" : ""
            }>${day}</option>`
        )
        .join("")}</select>
      <select class="hijri-select" name="hijri-day">${Array.from(
        { length: 30 },
        (_, i) => i + 1
      )
        .map(
          (day) =>
            `<option value="${day}" ${
              day === hijriDay ? "selected" : ""
            }>${day}</option>`
        )
        .join("")}</select>
      <select class="hijri-select" name="hijri-month">${hijriMonths
        .map(
          (m, i) =>
            `<option value="${i + 1}" ${
              i + 1 === hijriMonth ? "selected" : ""
            }>${m}</option>`
        )
        .join("")}</select>
      <select class="hijri-select" name="hijri-year">${Array.from(
        { length: 41 },
        (_, i) => 1430 + i
      )
        .map(
          (year) =>
            `<option value="${year}" ${
              year === hijriYear ? "selected" : ""
            }>${year}</option>`
        )
        .join("")}</select>
      <span class="print-date">${dateText}</span>
    </td>
    <td contenteditable="true">06:00</td>
    <td contenteditable="true"></td>
    <td contenteditable="true"></td>
    <td contenteditable="true"></td>
    <td>
      <div class="action-buttons">
        <button class="btn btn-warning btn-sm edit-btn" onclick="editTable('futureTable', this)">تعديل</button>
        <button class="btn btn-danger btn-sm delete-btn" onclick="deleteTask(this, 'futureTable')">حذف</button>
      </div>
    </td>
  `;
  saveFutureTasks();
}

function saveFutureTasks() {
  const tableElement = document.getElementById("futureTable");
  if (!tableElement) return;
  const table = tableElement.getElementsByTagName("tbody")[0];
  const rows = table.getElementsByTagName("tr");
  const data = [];
  for (let row of rows) {
    const cells = row.getElementsByTagName("td");
    const weekDay = cells[1].querySelector("select[name='week-day']").value;
    const day = cells[1].querySelector("select[name='hijri-day']").value;
    const month = cells[1].querySelector("select[name='hijri-month']").value;
    const year = cells[1].querySelector("select[name='hijri-year']").value;
    const dateText = `${weekDay} ${day} ${hijriMonths[month - 1]}، ${year} هـ`;
    cells[1].querySelector(".print-date").innerText = dateText;
    const taskData = [
      dateText,
      cells[2].innerText.trim(),
      cells[3].innerText.trim(),
      cells[4].innerText.trim(),
      cells[5].innerText.trim(),
    ];
    data.push(taskData);
  }
  localStorage.setItem("future_tasks", JSON.stringify(data));
}

function loadFutureTasks() {
  const tableElement = document.getElementById("futureTable");
  if (!tableElement) return;
  const table = tableElement.getElementsByTagName("tbody")[0];
  const savedData = JSON.parse(localStorage.getItem("future_tasks") || "[]");
  console.log("البيانات المسترجعة لـ futureTable:", savedData);
  table.innerHTML = "";
  savedData.forEach((rowData, index) => {
    const [weekDay, day, monthName, year] = rowData[0].split(" ");
    const month = hijriMonths.indexOf(monthName) + 1;
    const dateText = `${weekDay} ${day} ${hijriMonths[month - 1]}، ${year} هـ`;
    const row = table.insertRow();
    row.innerHTML = `
      <td>${index + 1}</td>
      <td class="date-cell">
        <select class="hijri-select" name="week-day">${weekDays
          .map(
            (d) =>
              `<option value="${d}" ${
                d === weekDay ? "selected" : ""
              }>${d}</option>`
          )
          .join("")}</select>
        <select class="hijri-select" name="hijri-day">${Array.from(
          { length: 30 },
          (_, i) => i + 1
        )
          .map(
            (d) =>
              `<option value="${d}" ${
                d === parseInt(day) ? "selected" : ""
              }>${d}</option>`
          )
          .join("")}</select>
        <select class="hijri-select" name="hijri-month">${hijriMonths
          .map(
            (m, i) =>
              `<option value="${i + 1}" ${
                i + 1 === month ? "selected" : ""
              }>${m}</option>`
          )
          .join("")}</select>
        <select class="hijri-select" name="hijri-year">${Array.from(
          { length: 41 },
          (_, i) => 1430 + i
        )
          .map(
            (y) =>
              `<option value="${y}" ${
                y === parseInt(year) ? "selected" : ""
              }>${y}</option>`
          )
          .join("")}</select>
        <span class="print-date">${dateText}</span>
      </td>
      <td contenteditable="false">${rowData[1]}</td>
      <td contenteditable="false">${rowData[2]}</td>
      <td contenteditable="false">${rowData[3]}</td>
      <td contenteditable="false">${rowData[4]}</td>
      <td>
        <div class="action-buttons">
          <button class="btn btn-warning btn-sm edit-btn" onclick="editTable('futureTable', this)">تعديل</button>
          <button class="btn btn-danger btn-sm delete-btn" onclick="deleteTask(this, 'futureTable')">حذف</button>
        </div>
      </td>
    `;
  });
}

function addNewPendingTask() {
  const tableElement = document.getElementById("pendingTable");
  if (!tableElement) return;
  const table = tableElement.getElementsByTagName("tbody")[0];
  const rowIndex = table.rows.length + 1;
  const dateText = `${weekDay} ${hijriDay} ${
    hijriMonths[hijriMonth - 1]
  }، ${hijriYear} هـ`;
  const newRow = table.insertRow();
  newRow.innerHTML = `
    <td>${rowIndex}</td>
    <td class="date-cell">
      <select class="hijri-select" name="week-day">${weekDays
        .map(
          (day) =>
            `<option value="${day}" ${
              day === weekDay ? "selected" : ""
            }>${day}</option>`
        )
        .join("")}</select>
      <select class="hijri-select" name="hijri-day">${Array.from(
        { length: 30 },
        (_, i) => i + 1
      )
        .map(
          (day) =>
            `<option value="${day}" ${
              day === hijriDay ? "selected" : ""
            }>${day}</option>`
        )
        .join("")}</select>
      <select class="hijri-select" name="hijri-month">${hijriMonths
        .map(
          (m, i) =>
            `<option value="${i + 1}" ${
              i + 1 === hijriMonth ? "selected" : ""
            }>${m}</option>`
        )
        .join("")}</select>
      <select class="hijri-select" name="hijri-year">${Array.from(
        { length: 41 },
        (_, i) => 1430 + i
      )
        .map(
          (year) =>
            `<option value="${year}" ${
              year === hijriYear ? "selected" : ""
            }>${year}</option>`
        )
        .join("")}</select>
      <span class="print-date">${dateText}</span>
    </td>
    <td contenteditable="true">06:00</td>
    <td contenteditable="true"></td>
    <td contenteditable="true"></td>
    <td contenteditable="true"></td>
    <td>
      <div class="action-buttons">
        <button class="btn btn-warning btn-sm edit-btn" onclick="editTable('pendingTable', this)">تعديل</button>
        <button class="btn btn-danger btn-sm delete-btn" onclick="deleteTask(this, 'pendingTable')">حذف</button>
      </div>
    </td>
  `;
  savePendingTasks();
}

function savePendingTasks() {
  const tableElement = document.getElementById("pendingTable");
  if (!tableElement) return;
  const table = tableElement.getElementsByTagName("tbody")[0];
  const rows = table.getElementsByTagName("tr");
  const data = [];
  for (let row of rows) {
    const cells = row.getElementsByTagName("td");
    const weekDay = cells[1].querySelector("select[name='week-day']").value;
    const day = cells[1].querySelector("select[name='hijri-day']").value;
    const month = cells[1].querySelector("select[name='hijri-month']").value;
    const year = cells[1].querySelector("select[name='hijri-year']").value;
    const dateText = `${weekDay} ${day} ${hijriMonths[month - 1]}، ${year} هـ`;
    cells[1].querySelector(".print-date").innerText = dateText;
    const taskData = [
      dateText,
      cells[2].innerText.trim(),
      cells[3].innerText.trim(),
      cells[4].innerText.trim(),
      cells[5].innerText.trim(),
    ];
    data.push(taskData);
  }
  localStorage.setItem("pending_tasks", JSON.stringify(data));
}

function loadPendingTasks() {
  const tableElement = document.getElementById("pendingTable");
  if (!tableElement) return;
  const table = tableElement.getElementsByTagName("tbody")[0];
  const savedData = JSON.parse(localStorage.getItem("pending_tasks") || "[]");
  console.log("البيانات المسترجعة لـ pendingTable:", savedData);
  table.innerHTML = "";
  savedData.forEach((rowData, index) => {
    const [weekDay, day, monthName, year] = rowData[0].split(" ");
    const month = hijriMonths.indexOf(monthName) + 1;
    const dateText = `${weekDay} ${day} ${hijriMonths[month - 1]}، ${year} هـ`;
    const row = table.insertRow();
    row.innerHTML = `
      <td>${index + 1}</td>
      <td class="date-cell">
        <select class="hijri-select" name="week-day">${weekDays
          .map(
            (d) =>
              `<option value="${d}" ${
                d === weekDay ? "selected" : ""
              }>${d}</option>`
          )
          .join("")}</select>
        <select class="hijri-select" name="hijri-day">${Array.from(
          { length: 30 },
          (_, i) => i + 1
        )
          .map(
            (d) =>
              `<option value="${d}" ${
                d === parseInt(day) ? "selected" : ""
              }>${d}</option>`
          )
          .join("")}</select>
        <select class="hijri-select" name="hijri-month">${hijriMonths
          .map(
            (m, i) =>
              `<option value="${i + 1}" ${
                i + 1 === month ? "selected" : ""
              }>${m}</option>`
          )
          .join("")}</select>
        <select class="hijri-select" name="hijri-year">${Array.from(
          { length: 41 },
          (_, i) => 1430 + i
        )
          .map(
            (y) =>
              `<option value="${y}" ${
                y === parseInt(year) ? "selected" : ""
              }>${y}</option>`
          )
          .join("")}</select>
        <span class="print-date">${dateText}</span>
      </td>
      <td contenteditable="false">${rowData[1]}</td>
      <td contenteditable="false">${rowData[2]}</td>
      <td contenteditable="false">${rowData[3]}</td>
      <td contenteditable="false">${rowData[4]}</td>
      <td>
        <div class="action-buttons">
          <button class="btn btn-warning btn-sm edit-btn" onclick="editTable('pendingTable', this)">تعديل</button>
          <button class="btn btn-danger btn-sm delete-btn" onclick="deleteTask(this, 'pendingTable')">حذف</button>
        </div>
      </td>
    `;
  });
}

function searchTasks() {
  const fromDate = document
    .getElementById("fromDate")
    .value.split("/")
    .map(Number);
  const toDate = document.getElementById("toDate").value.split("/").map(Number);
  const resultsTable = document.getElementById("resultsTable");
  if (!resultsTable) return;
  resultsTable.innerHTML = "";

  const allTasks = [];
  [
    "mainTable1_tasks",
    "mainTable2_tasks",
    "future_tasks",
    "pending_tasks",
  ].forEach((key) => {
    const tasks = JSON.parse(localStorage.getItem(key) || "[]");
    allTasks.push(...tasks);
  });

  allTasks.forEach((task) => {
    const [weekDay, day, monthName, year] = task[0].split(" ");
    const taskYear = parseInt(year);
    const taskMonth = hijriMonths.indexOf(monthName) + 1;
    const taskDay = parseInt(day);

    const fromYear = fromDate[0];
    const fromMonth = fromDate[1];
    const fromDay = fromDate[2];
    const toYear = toDate[0];
    const toMonth = toDate[1];
    const toDay = toDate[2];

    const taskDate = taskYear * 10000 + taskMonth * 100 + taskDay;
    const fromDateNum = fromYear * 10000 + fromMonth * 100 + fromDay;
    const toDateNum = toYear * 10000 + toMonth * 100 + toDay;

    if (taskDate >= fromDateNum && taskDate <= toDateNum) {
      const row = resultsTable.insertRow();
      row.innerHTML = `
        <td>${task[0]}</td>
        <td>${task[2]}</td>
        <td>${task[3]}</td>
      `;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const isFutureTasksPage = document.getElementById("futureTable") !== null;

  if (isFutureTasksPage) {
    // تاريخ صفحة المهام المستقبلية
    const futureWeekDay = localStorage.getItem("futureWeekDay") || "السبت";
    const futureHijriDay =
      parseInt(localStorage.getItem("futureHijriDay")) || 5;
    const futureHijriMonth =
      parseInt(localStorage.getItem("futureHijriMonth")) || 8;
    const futureHijriYear =
      parseInt(localStorage.getItem("futureHijriYear")) || 1444;

    console.log(
      "التاريخ المسترجع للمهام المستقبلية:",
      futureWeekDay,
      futureHijriDay,
      futureHijriMonth,
      futureHijriYear
    );

    // تحديث الـ select elements بناءً على تاريخ المهام المستقبلية
    populateDateSelectsWithFutureDate(
      futureWeekDay,
      futureHijriDay,
      futureHijriMonth,
      futureHijriYear
    );

    try {
      loadEditableText();
    } catch (e) {
      console.log("خطأ في تحميل النصوص القابلة للتعديل:", e);
    }

    if (document.getElementById("futureTable")) loadFutureTasks();

    updateHeaderDate();
    checkFutureTasks();
  } else {
    // تاريخ الصفحات التانية
    weekDay = localStorage.getItem("weekDay") || "السبت";
    hijriDay = parseInt(localStorage.getItem("hijriDay")) || 5;
    hijriMonth = parseInt(localStorage.getItem("hijriMonth")) || 8;
    hijriYear = parseInt(localStorage.getItem("hijriYear")) || 1444;

    console.log("التاريخ المسترجع:", weekDay, hijriDay, hijriMonth, hijriYear);

    populateDateSelects();

    try {
      loadEditableText();
    } catch (e) {
      console.log("خطأ في تحميل النصوص القابلة للتعديل:", e);
    }

    if (document.getElementById("mainTable1")) loadTableData("mainTable1");
    if (document.getElementById("mainTable2")) loadTableData("mainTable2");
    if (document.getElementById("completedTable"))
      loadTableData("completedTable");
    if (document.getElementById("pendingTable")) loadPendingTasks();

    updateHeaderDate();
    checkFutureTasks();
  }
});
