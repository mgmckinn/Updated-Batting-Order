/** @format */

document.addEventListener("DOMContentLoaded", () => {
  const playerNameInput = document.getElementById("playerNameInput");
  const addPlayerButton = document.getElementById("addPlayerButton");
  const battingOrderList = document.getElementById("battingOrderList");
  const logoUpload = document.getElementById("logoUpload");
  const uploadLogoButton = document.getElementById("uploadLogoButton");
  const logoPreviewContainer = document.getElementById("logoPreviewContainer");
  const logoPreview = document.getElementById("logoPreview");
  // New color pickers
  const primaryColorPicker = document.getElementById("primaryColorPicker");
  const textColorPicker = document.getElementById("textColorPicker");
  const rootStyles = document.documentElement.style; // Get the root element's style object for CSS variables

  // Initialize Sortable.js for drag-and-drop
  new Sortable(battingOrderList, {
    animation: 150,
    ghostClass: "sortable-ghost", // Class name for the drop placeholder
    handle: ".drag-handle", // Specify a handle for dragging
  });

  // Function to create a new player list item
  const createPlayerListItem = (playerName) => {
    const listItem = document.createElement("li");
    listItem.classList.add(
      "list-group-item",
      "d-flex",
      "align-items-center",
      "justify-content-between"
    );
    listItem.innerHTML = `
            <span class="player-name flex-grow-1" contenteditable="false">${playerName}</span>
            <div class="player-actions d-flex align-items-center">
                <i class="fas fa-grip-vertical me-3 drag-handle" style="cursor: grab;"></i>
                <button class="btn btn-warning btn-sm me-2 edit-btn" title="Edit Player">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger btn-sm delete-btn" title="Remove Player">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;

    // Add event listeners for edit and delete buttons
    listItem.querySelector(".edit-btn").addEventListener("click", (e) => {
      const playerNameSpan = listItem.querySelector(".player-name");
      if (playerNameSpan.contentEditable === "true") {
        playerNameSpan.contentEditable = "false";
        playerNameSpan.classList.remove("editing");
        e.currentTarget.innerHTML = '<i class="fas fa-edit"></i>'; // Change icon back to edit
        e.currentTarget.title = "Edit Player";
      } else {
        playerNameSpan.contentEditable = "true";
        playerNameSpan.classList.add("editing");
        playerNameSpan.focus();
        // Select all text when editing
        const range = document.createRange();
        range.selectNodeContents(playerNameSpan);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        e.currentTarget.innerHTML = '<i class="fas fa-check"></i>'; // Change icon to check
        e.currentTarget.title = "Save Changes";
      }
    });

    listItem.querySelector(".delete-btn").addEventListener("click", () => {
      listItem.remove();
    });

    // Prevent new lines in contenteditable
    listItem.querySelector(".player-name").addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault(); // Prevent new line
        const playerNameSpan = listItem.querySelector(".player-name");
        if (playerNameSpan.contentEditable === "true") {
          playerNameSpan.contentEditable = "false";
          playerNameSpan.classList.remove("editing");
          listItem.querySelector(".edit-btn").innerHTML =
            '<i class="fas fa-edit"></i>';
          listItem.querySelector(".edit-btn").title = "Edit Player";
        }
      }
    });

    // Save on blur
    listItem.querySelector(".player-name").addEventListener("blur", (e) => {
      const playerNameSpan = listItem.querySelector(".player-name");
      if (playerNameSpan.contentEditable === "true") {
        playerNameSpan.contentEditable = "false";
        playerNameSpan.classList.remove("editing");
        listItem.querySelector(".edit-btn").innerHTML =
          '<i class="fas fa-edit"></i>';
        listItem.querySelector(".edit-btn").title = "Edit Player";
      }
    });

    return listItem;
  };

  // Add player when button is clicked or Enter is pressed
  addPlayerButton.addEventListener("click", () => {
    const playerName = playerNameInput.value.trim();
    if (playerName) {
      battingOrderList.appendChild(createPlayerListItem(playerName));
      playerNameInput.value = ""; // Clear input
    } else {
      playerNameInput.classList.add("is-invalid");
      setTimeout(() => playerNameInput.classList.remove("is-invalid"), 1000);
    }
  });

  playerNameInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addPlayerButton.click();
    }
  });

  // Logo Upload functionality
  uploadLogoButton.addEventListener("click", () => {
    logoUpload.click(); // Trigger the hidden file input
  });

  logoUpload.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        logoPreview.src = e.target.result;
        logoPreviewContainer.style.display = "block";
      };
      reader.readAsDataURL(file);
    } else {
      logoPreviewContainer.style.display = "none";
      logoPreview.src = "#";
    }
  });

  // Color Picker Functionality
  primaryColorPicker.addEventListener("input", (event) => {
    rootStyles.setProperty("--primary-color", event.target.value);
  });

  textColorPicker.addEventListener("input", (event) => {
    rootStyles.setProperty("--text-color", event.target.value);
  });

  // Initial player examples
  const initialPlayers = [
    "Player 1",
    "Player 2",
    "Player 3",
    "Player 4",
    "Player 5",
    "Player 6",
    "Player 7",
    "Player 8",
    "Player 9",
  ];
  initialPlayers.forEach((player) => {
    battingOrderList.appendChild(createPlayerListItem(player));
  });
});
