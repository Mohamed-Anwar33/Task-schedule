// ✅ دالة تعديل النصوص
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

// ✅ دالة حفظ النصوص
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

// ✅ تحميل النصوص المحفوظة عند تشغيل الصفحة
function loadText(elementId) {
  const savedValue = localStorage.getItem(elementId);
  if (savedValue) {
    document.getElementById(elementId).innerHTML = savedValue;
  }
}

// ✅ تعديل محتوى صف معين
function editRow(button) {
  const row = button.parentElement.parentElement;
  const cells = row.getElementsByTagName("td");

  for (let i = 0; i < cells.length - 1; i++) {
    const cell = cells[i];
    const currentValue = cell.innerHTML.replace(/<br>/g, "\n");
    if (!cell.hasAttribute("rowspan")) {
      cell.innerHTML = `<input type="text" class="form-control form-control-sm" value="${currentValue}">`;
    }
  }

  button.innerText = "حفظ";
  button.className = "btn btn-success btn-sm edit-btn";
  button.onclick = function () {
    saveRow(this);
  };
}

// ✅ حفظ بيانات الصف بعد التعديل
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

// ✅ إكمال المهمة أو التراجع عنها
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

// ✅ حفظ بيانات الجدول في LocalStorage
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
    data.push(rowData);
  }

  localStorage.setItem(tableId, JSON.stringify(data));
}

// ✅ إضافة صف جديد إلى الجدول
function addNewRow(tableId) {
  const table = document.getElementById(tableId);
  const tbody = table.getElementsByTagName("tbody")[0];
  const newRow = tbody.insertRow();

  const cols = table.rows[0].cells.length;

  for (let i = 0; i < cols; i++) {
    const cell = newRow.insertCell();
    if (i === cols - 1) {
      cell.innerHTML =
        '<button class="btn btn-warning btn-sm edit-btn" onclick="editRow(this)">تعديل</button>';
    } else {
      cell.innerHTML = "-";
    }
  }
}

// ✅ طباعة الجدول
function printTable(tableId) {
  const table = document.getElementById(tableId);
  const buttons = document.querySelectorAll(".btn");

  // إخفاء جميع الأزرار قبل الطباعة
  buttons.forEach((btn) => (btn.style.display = "none"));

  window.print();

  // إظهار الأزرار بعد الطباعة
  buttons.forEach((btn) => (btn.style.display = "inline-block"));
}

// ✅ نقل مهمة من جدول لآخر
function moveTask() {
  const sourceTableId = document.getElementById("sourceTable").value;
  const targetTableId = document.getElementById("targetTable").value;

  if (sourceTableId === targetTableId) {
    alert("الرجاء اختيار جدولين مختلفين");
    return;
  }

  const sourceTable = document.getElementById(sourceTableId);
  const targetTable = document.getElementById(targetTableId);

  if (!sourceTable || !targetTable) return;

  const sourceRows = sourceTable
    .getElementsByTagName("tbody")[0]
    .getElementsByTagName("tr");
  if (sourceRows.length === 0) {
    alert("لا توجد مهام للنقل");
    return;
  }

  const lastRow = sourceRows[sourceRows.length - 1];
  const targetTbody = targetTable.getElementsByTagName("tbody")[0];
  const newRow = targetTbody.insertRow();

  for (let i = 0; i < lastRow.cells.length - 1; i++) {
    const newCell = newRow.insertCell();
    newCell.innerHTML = lastRow.cells[i].innerHTML;
  }

  const buttonCell = newRow.insertCell();
  buttonCell.innerHTML = `<button class="btn btn-warning btn-sm edit-btn" onclick="editRow(this)">تعديل</button>
    <button class="btn btn-success btn-sm complete-btn" onclick="completeTask(this)">اكتمال</button>`;

  sourceTable.getElementsByTagName("tbody")[0].deleteRow(-1);
  saveTableData(sourceTableId);
  saveTableData(targetTableId);

  alert("تم نقل المهمة بنجاح");
}

// ✅ تحميل البيانات عند فتح الصفحة
window.addEventListener("load", function () {
  const tables = ["mainTable1", "secondTable"];
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
          rowData.forEach((cellData) => {
            const cell = row.insertCell();
            cell.innerHTML = cellData;
          });
          const cell = row.insertCell();
          cell.innerHTML =
            '<button class="btn btn-warning btn-sm edit-btn" onclick="editRow(this)">تعديل</button>';
        });
      }
    }
  });

  // تحميل النصوص المخزنة
  loadText("title1");
});
function searchTasks() {
  let fromDate = document.getElementById("fromDate").value;
  let toDate = document.getElementById("toDate").value;

  if (!fromDate || !toDate) {
    alert("يرجى إدخال تاريخ البداية والنهاية.");
    return;
  }

  // هنا يمكنك إضافة كود لجلب البيانات وعرضها في الجدول
  let resultsTable = document.getElementById("resultsTable");
  resultsTable.innerHTML = `
        <tr>
            <td>${fromDate}</td>
            <td>مثال: دورية</td>
            <td>المنطقة أ</td>
        </tr>
        <tr>
            <td>${toDate}</td>
            <td>مثال: نقطة تفتيش</td>
            <td>المنطقة ب</td>
        </tr>
    `;
}
