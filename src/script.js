// Scroll to the menu
function showMenu() {
    document.getElementById("menu").scrollIntoView({
        behavior: "smooth"
    });
}


// Filter food items
function filterFood(category, button) {

    // Remove active class from all buttons
    const buttons = document.querySelectorAll(".filter-btn");

    buttons.forEach(function(btn) {
        btn.classList.remove("active");
    });

    // Highlight the selected button
    button.classList.add("active");

    // Get all food cards
    const foods = document.querySelectorAll(".food-card");

    // Show/hide food cards
    foods.forEach(function(food) {

        if (category === "all") {
            food.style.display = "block";
        }
        else if (food.classList.contains(category)) {
            food.style.display = "block";
        }
        else {
            food.style.display = "none";
        }

    });
}


// Order button
function orderFood(foodName) {

    alert(
        "You selected " + foodName +
        ".\n\nThank you for choosing FoodieHub!"
    );

}