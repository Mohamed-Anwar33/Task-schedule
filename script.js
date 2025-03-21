// دالة تعديل النصوص
function editText(elementId) {
  const element = document.getElementById(elementId);
  const currentValue = element.innerHTML;
  element.innerHTML = `<input type="text" class="form-control form-control-sm" value="${currentValue}">`;
  const button = element.nextElementSibling;
  button.innerText = "حفظ";
  button.className = "btn btn-success btn-sm edit-btn";
  button.onclick = function () {
    saveText(elementId);
  };
}

// دالة حفظ النصوص
function saveText(elementId) {
  const element = document.getElementById(elementId);
  const input = element.getElementsByTagName("input")[0];
  element.innerHTML = input.value;
  const button = element.nextElementSibling;
  button.innerText = "تعديل";
  button.className = "btn btn-warning btn-sm edit-btn";
  button.onclick = function () {
    editText(elementId);
  };
  localStorage.setItem(elementId, input.value);
}

// تحميل النصوص المحفوظة
function loadText(elementId) {
  const savedValue = localStorage.getItem(elementId);
  if (savedValue) {
    document.getElementById(elementId).innerHTML = savedValue;
  }
}

// تعديل محتوى صف معين
function editRow(button) {
  const row = button.parentElement.parentElement;
  const cells = row.getElementsByTagName("td");

  for (let i = 0; i < cells.length - 1; i++) {
    const cell = cells[i];
    if (!cell.hasAttribute("rowspan")) {
      const currentValue = cell.innerHTML.replace(/<br>/g, "\n");
      cell.innerHTML = `<input type="text" class="form-control form-control-sm" value="${currentValue}">`;
    }
  }

  button.innerText = "حفظ";
  button.className = "btn btn-success btn-sm edit-btn";
  button.onclick = function () {
    saveRow(this);
  };
}

// حفظ بيانات الصف بعد التعديل
function saveRow(button) {
  const row = button.parentElement.parentElement;
  const cells = row.getElementsByTagName("td");

  for (let i = 0; i < cells.length - 1; i++) {
    const cell = cells[i];
    if (!cell.hasAttribute("rowspan")) {
      const input = cell.getElementsByTagName("input")[0];
      cell.innerHTML = input.value.replace(/\n/g, "<br>");
    }
  }

  button.innerText = "تعديل";
  button.className = "btn btn-warning btn-sm edit-btn";
  button.onclick = function () {
    editRow(this);
  };

  const tableId = row.closest("table").id;
  saveTableData(tableId);
}

// إكمال المهمة أو التراجع عنها
function completeTask(button) {
  const row = button.parentElement.parentElement;
  row.classList.toggle("completed-task");

  if (row.classList.contains("completed-task")) {
    button.innerHTML = "تراجع";
    button.classList.remove("btn-success");
    button.classList.add("btn-secondary");
  } else {
    button.innerHTML = "اكتمال";
    button.classList.remove("btn-secondary");
    button.classList.add("btn-success");
  }

  const tableId = row.closest("table").id;
  saveTableData(tableId);
}

// حفظ بيانات الجدول في LocalStorage
function saveTableData(tableId) {
  const table = document.getElementById(tableId);
  const tbody = table.getElementsByTagName("tbody")[0];
  const rows = tbody.getElementsByTagName("tr");
  const data = [];

  for (let row of rows) {
    const cells = row.getElementsByTagName("td");
    const rowData = [];
    for (let i = 0; i < cells.length - 1; i++) {
      rowData.push(cells[i].innerHTML);
    }
    rowData.push(
      row.classList.contains("completed-task") ? "completed" : "pending"
    );
    data.push(rowData);
  }

  localStorage.setItem(tableId, JSON.stringify(data));
}

// إضافة صف جديد إلى الجدول
function addNewRow(tableId) {
  const table = document.getElementById(tableId);
  const tbody = table.getElementsByTagName("tbody")[0];
  const newRow = tbody.insertRow();
  const cols = table.rows[0].cells.length;

  for (let i = 0; i < cols; i++) {
    const cell = newRow.insertCell();
    if (i === cols - 1) {
      cell.innerHTML = `
        <button class="btn btn-warning btn-sm edit-btn" onclick="editRow(this)">تعديل</button>
        <button class="btn btn-success btn-sm complete-btn" onclick="completeTask(this)">اكتمال</button>
      `;
    } else {
      cell.innerHTML = "-";
    }
  }
  saveTableData(tableId);
}

// طباعة الجدول
function printTable(tableId) {
  const table = document.getElementById(tableId);
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((btn) => (btn.style.display = "none"));
  window.print();
  buttons.forEach((btn) => (btn.style.display = "inline-block"));
}

// البحث في المهام
function searchTasks() {
  let fromDate = document.getElementById("fromDate").value;
  let toDate = document.getElementById("toDate").value;

  if (!fromDate || !toDate) {
    alert("يرجى إدخال تاريخ البداية والنهاية.");
    return;
  }

  let resultsTable = document.getElementById("resultsTable");
  resultsTable.innerHTML = "";

  const tables = ["mainTable1", "mainTable2", "pendingTable", "secondTable"];
  tables.forEach((tableId) => {
    const savedData = localStorage.getItem(tableId);
    if (savedData) {
      const data = JSON.parse(savedData);
      data.forEach((rowData) => {
        const date = rowData[0];
        if (date >= fromDate && date <= toDate) {
          const row = resultsTable.insertRow();
          row.innerHTML = `
            <td>${date}</td>
            <td>${rowData[2]}</td>
            <td>${rowData[3]}</td>
          `;
        }
      });
    }
  });
}

// تحميل البيانات عند فتح الصفحة
window.addEventListener("load", function () {
  const tables = ["mainTable1", "mainTable2", "pendingTable", "secondTable"];
  tables.forEach((tableId) => {
    const table = document.getElementById(tableId);
    if (table) {
      const savedData = localStorage.getItem(tableId);
      if (savedData) {
        const data = JSON.parse(savedData);
        const tbody = table.getElementsByTagName("tbody")[0];
        tbody.innerHTML = "";
        data.forEach((rowData) => {
          const row = tbody.insertRow();
          for (let i = 0; i < rowData.length - 1; i++) {
            const cell = row.insertCell();
            cell.innerHTML = rowData[i];
          }
          const cell = row.insertCell();
          cell.innerHTML = `
            <button class="btn btn-warning btn-sm edit-btn" onclick="editRow(this)">تعديل</button>
            <button class="btn btn-success btn-sm complete-btn" onclick="completeTask(this)">اكتمال</button>
          `;
          if (rowData[rowData.length - 1] === "completed") {
            row.classList.add("completed-task");
            cell.querySelector(".complete-btn").innerHTML = "تراجع";
            cell.querySelector(".complete-btn").classList.remove("btn-success");
            cell.querySelector(".complete-btn").classList.add("btn-secondary");
          }
        });
      }
    }
  });
});
