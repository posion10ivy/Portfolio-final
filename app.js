

// Sidebar toggle functionality
const toggleButton = document.getElementById('toggle-btn');
const sidebar = document.getElementById('sidebar');

function toggleSidebar() {
  sidebar.classList.toggle('close');  // Toggle 'close' class on the sidebar
  toggleButton.classList.toggle('rotate');  // Rotate the button

  closeAllSubMenus();  // Close all submenus when the sidebar is toggled
}

function toggleSubMenu(button) {
  if (!button.nextElementSibling.classList.contains('show')) {
    closeAllSubMenus();  // Close all submenus if the clicked submenu isn't shown
  }

  button.nextElementSibling.classList.toggle('show');  // Toggle the 'show' class for the submenu
  button.classList.toggle('rotate');  // Rotate the button to indicate open submenu

  // If the sidebar is closed, toggle it open when a submenu is clicked
  if (sidebar.classList.contains('close')) {
    sidebar.classList.toggle('close');
    toggleButton.classList.toggle('rotate');
  }
}

function closeAllSubMenus() {
  Array.from(sidebar.getElementsByClassName('show')).forEach(ul => {
    ul.classList.remove('show');
    ul.previousElementSibling.classList.remove('rotate');
  });
}

// Parallax effect for the images
const track = document.getElementById("image-track");

// Handle mouse down event
window.onmousedown = e => {
  track.dataset.mouseDownAt = e.clientX;  // Store the mouse starting position
};

// Handle mouse up event
window.onmouseup = () => {
  track.dataset.mouseDownAt = "0";  // Reset mouse starting position
  track.dataset.prevPercentage = track.dataset.percentage || "0";  // Save the last position
};

// Handle mouse move event
window.onmousemove = e => {
  // If the mouse is not pressed, exit
  if (track.dataset.mouseDownAt === "0") return;

  // Calculate mouse delta
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
  const maxDelta = window.innerWidth / 2;  // Limit delta based on half the viewport width

  // Calculate the next percentage based on the delta
  const nextPercentage = Math.min(Math.max(
    parseFloat(track.dataset.prevPercentage || 0) + (mouseDelta / maxDelta) * -100,
    -100
  ), 0);  // Clamp percentage to [-100, 0]

  // Update the track's dataset and transform
  track.dataset.percentage = nextPercentage;
  track.style.transform = `translate(${nextPercentage}%, -50%)`;

  // Update each image's object position to create the parallax effect
  for (const [index, image] of Array.from(track.getElementsByClassName("image")).entries()) {
    const parallaxOffset = nextPercentage * (index * 0.2);  // Each image moves at a different rate
    image.style.objectPosition = `${100 + parallaxOffset}% center`;
  }
};
