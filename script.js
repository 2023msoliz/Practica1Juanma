// Array per a guardar els fitxers
const files = [];

// Declaració dels objectes
const dropArea = document.querySelector(".drop-area");
const dragDropText = dropArea.querySelector("h2");
const button = dropArea.querySelector("button");
const input = dropArea.querySelector("input");
const preview = document.querySelector("#preview");

// Prevenció de l'acció per defecte
["dragover", "dragleave", "drop"].forEach((evt) => {
  dropArea.addEventListener(evt, prevDefault);
});

function prevDefault(e) {
  e.preventDefault();
}

// Acció dragover
dropArea.addEventListener("dragover", () => {
  dropArea.classList.add("active");
  dragDropText.textContent = "Deixa anar els teus fitxers aquí";
});

// Acció dragleave
dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("active");
  dragDropText.textContent = "Drag & Drop files";
});

// Acció drop
dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  dropArea.classList.remove("active");
  dragDropText.textContent = "Drag & Drop files";

  // Recollida dels fitxers
  const newFiles = Array.from(e.dataTransfer.files);
  files = files.concat(newFiles);

  // Mostrar els fitxers
  showFiles();
});

// Funció per a mostrar els fitxers
function showFiles() {
  if (files.length === 0) {
    preview.innerHTML = "";
    return;
  }

  preview.innerHTML = "";
  files.forEach((file, index) => {
    processFile(file, index);
  });
}

// Funció per a processar cada fitxer
function processFile(file, index) {
  // Validació de l'extensió
  const validExtensions = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
  const docType = file.type;
  if (!validExtensions.includes(docType)) {
    console.error("El fitxer no té una extensió d'imatge vàlida");
    return;
  }

  // Lectura del fitxer
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = () => {
    const prev = `<div class="previewImage">
      <img src="${reader.result}" />
      <span>${file.name}</span>
      <span onclick="remove(${index})" class="material-symbols-outlined removeBtn">c</span>
    </div>`;
    preview.innerHTML += prev;
  };
}

// Funció per a eliminar un fitxer
function remove(index) {
  files.splice(index, 1);
  showFiles();
}

// Click al botó "Upload Files"
button.addEventListener("click", (e) => {
  e.preventDefault();
  input.click();
});

// Gestió dels arxius seleccionats
input.addEventListener("change", () => {
  const newFiles = Array.from(input.files);
  files = files.concat(newFiles);
  showFiles();
});

// Passar dades a PHP (opcional)
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const dataTransfer = new DataTransfer();
  files.forEach((file) => {
    dataTransfer.items.add(file);
  });
  input.files = dataTransfer.files;
  form.submit();
});
