const groups = ["مجموعة 1", "مجموعة 2", "مجموعة 3"];
const days = [
  "الأحد",
  "الإثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
  "السبت",
];
const encryptionKey = "your-secure-key-123";

// تعريف المتغيرات في البداية
let tasks = [];
let managerSignature = "";
let deleteIndex = null;
let editIndex = null;

// تهيئة المتغيرات من Local Storage
(function initializeData() {
  const encryptedTasks = localStorage.getItem("tasks");
  const encryptedSignature = localStorage.getItem("managerSignature");

  // تهيئة المهام
  const decryptedTasks = decryptData(encryptedTasks);
  tasks = decryptedTasks || [
    {
      date: "2025-03-16",
      time: "09:00",
      type: "اجتماع يومي",
      location: "مكتب الإدارة",
      required: "حضور الجميع",
      fixed: true,
    },
    {
      date: "2025-03-16",
      time: "11:00",
      type: "تسليم تقرير",
      location: "المكتب الرئيسي",
      required: "إعداد التقرير",
      fixed: false,
    },
  ];

  // تهيئة التوقيع
  managerSignature = decryptData(encryptedSignature) || "___________________";
})();

function sanitizeInput(input) {
  const temp = document.createElement("div");
  temp.textContent = input;
  return temp.innerHTML;
}

function encryptData(data) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), encryptionKey).toString();
}

function decryptData(encryptedData) {
  try {
    if (!encryptedData) return null;
    const bytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted ? JSON.parse(decrypted) : null;
  } catch (e) {
    console.error("فشل فك التشفير:", e);
    return null;
  }
}

function updateGroup() {
  const taskDateInput = document.getElementById("taskDate");
  let selectedDate = taskDateInput
    ? taskDateInput.value
    : tasks.length > 0
    ? tasks[0].date
    : new Date().toISOString().split("T")[0];
  const date = new Date(selectedDate);
  const dayIndex = date.getDay();
  const formattedDate = date.toLocaleDateString("ar-EG");
  const groupIndex = dayIndex % groups.length;
  const groupTitle = document.getElementById("group-title");
  if (groupTitle) {
    groupTitle.textContent = `${groups[groupIndex]} - ${days[dayIndex]} ${formattedDate}`;
  }
}

function displayTasks() {
  const taskBody = document.getElementById("task-body");
  if (!taskBody) return;

  taskBody.innerHTML = "";
  const isVariablePage = window.location.pathname.includes("tasks.html");
  const filteredTasks = isVariablePage
    ? tasks.filter((task) => !task.fixed)
    : tasks;

  filteredTasks.forEach((task, index) => {
    const formattedDate = new Date(task.date).toLocaleDateString("ar-EG");
    const formattedTime = new Date(
      `1970-01-01T${task.time}`
    ).toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" });
    const row = `
      <tr>
        <td>${formattedDate}</td>
        <td>${formattedTime}</td>
        <td>${sanitizeInput(task.type)}</td>
        <td>${sanitizeInput(task.location)}</td>
        <td>${sanitizeInput(task.required)}</td>
        ${
          !isVariablePage
            ? `
          <td>
            <button class="btn btn-sm btn-outline-primary me-1" data-bs-toggle="modal" data-bs-target="#editTaskModal" onclick="setEditIndex(${index})">
              <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger" data-bs-toggle="modal" data-bs-target="#deleteConfirmModal" onclick="setDeleteIndex(${index})">
              <i class="fas fa-trash"></i>
            </button>
          </td>`
            : ""
        }
      </tr>`;
    taskBody.innerHTML += row;
  });

  updateGroup();
  updateSignatureDisplay();
}

function updateSignatureDisplay() {
  const signatureText = document.getElementById("signatureText");
  if (signatureText) {
    signatureText.textContent = managerSignature;
  }
}

function setDeleteIndex(index) {
  deleteIndex = index;
}

function setEditIndex(index) {
  editIndex = index;
  document.getElementById("editTaskDate").value = tasks[index].date;
  document.getElementById("editTaskTime").value = tasks[index].time;
  document.getElementById("editTaskType").value = sanitizeInput(
    tasks[index].type
  );
  document.getElementById("editTaskLocation").value = sanitizeInput(
    tasks[index].location
  );
  document.getElementById("editTaskRequired").value = sanitizeInput(
    tasks[index].required
  );
  document.getElementById("editTaskFixed").value = tasks[index].fixed
    ? "true"
    : "false";
}

function saveTask() {
  const date = document.getElementById("taskDate").value;
  const time = document.getElementById("taskTime").value;
  const type = sanitizeInput(document.getElementById("taskType").value);
  const location = sanitizeInput(document.getElementById("taskLocation").value);
  const required = sanitizeInput(document.getElementById("taskRequired").value);
  const fixed = document.getElementById("taskFixed").value === "true";

  if (date && time && type && location && required) {
    tasks.push({ date, time, type, location, required, fixed });
    localStorage.setItem("tasks", encryptData(tasks));
    displayTasks();
    bootstrap.Modal.getInstance(document.getElementById("addTaskModal")).hide();
    document.getElementById("addTaskForm").reset();
  }
}

function confirmEdit() {
  if (editIndex !== null) {
    const date = document.getElementById("editTaskDate").value;
    const time = document.getElementById("editTaskTime").value;
    const type = sanitizeInput(document.getElementById("editTaskType").value);
    const location = sanitizeInput(
      document.getElementById("editTaskLocation").value
    );
    const required = sanitizeInput(
      document.getElementById("editTaskRequired").value
    );
    const fixed = document.getElementById("editTaskFixed").value === "true";

    if (date && time && type && location && required) {
      tasks[editIndex] = { date, time, type, location, required, fixed };
      localStorage.setItem("tasks", encryptData(tasks));
      displayTasks();
      bootstrap.Modal.getInstance(
        document.getElementById("editTaskModal")
      ).hide();
      editIndex = null;
    }
  }
}

function confirmDelete() {
  if (deleteIndex !== null) {
    tasks.splice(deleteIndex, 1);
    localStorage.setItem("tasks", encryptData(tasks));
    displayTasks();
    bootstrap.Modal.getInstance(
      document.getElementById("deleteConfirmModal")
    ).hide();
    deleteIndex = null;
  }
}

function saveSignature() {
  const signature =
    document.getElementById("signatureInput").value || "___________________";
  managerSignature = signature;
  localStorage.setItem("managerSignature", encryptData(managerSignature));
  updateSignatureDisplay();
  bootstrap.Modal.getInstance(document.getElementById("signatureModal")).hide();
}

function exportToPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text(document.getElementById("group-title").textContent, 10, 10);
  doc.autoTable({ html: ".table" });
  doc.save("tasks.pdf");
}

function sendToWhatsApp() {
  let message = `📋 جدول المهام (${
    document.getElementById("group-title").textContent
  }):\n`;
  const filteredTasks = window.location.pathname.includes("tasks.html")
    ? tasks.filter((task) => !task.fixed)
    : tasks;
  filteredTasks.forEach((task) => {
    const formattedTime = new Date(
      `1970-01-01T${task.time}`
    ).toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" });
    message += `🕒 ${formattedTime} - ${sanitizeInput(
      task.type
    )} (${sanitizeInput(task.location)}): ${sanitizeInput(task.required)}\n`;
  });
  message += `\nتوقيع المدير: ${managerSignature}`;
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/?text=${encodedMessage}`, "_blank");
}

function printTable() {
  window.print();
}

document.addEventListener("DOMContentLoaded", () => {
  displayTasks();
});

document
  .getElementById("confirmDeleteBtn")
  .addEventListener("click", confirmDelete);
document
  .getElementById("confirmEditBtn")
  .addEventListener("click", confirmEdit);
