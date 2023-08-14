document.addEventListener("click", function(event) {
    const dropdowns = document.querySelectorAll(".dropdown");
    dropdowns.forEach(function(dropdown) {
        if (!dropdown.contains(event.target)) {
            const dropdownContent = dropdown.querySelector(".dropdown-content");
            dropdownContent.style.display = "none";
        }
    });
});