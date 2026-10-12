
const categoryButtons = document.querySelectorAll(".categories button");
const foodCards = document.querySelectorAll(".food-card");

// Filter food items and highlight active category
function filterFood(category) {

    // Update the active button
    categoryButtons.forEach(function(button) {
        button.classList.remove("active");

        if (
            button.getAttribute("onclick").includes(
                "'" + category + "'"
            )
        ) {
            button.classList.add("active");
        }
    });

    // Display matching food cards
    foodCards.forEach(function(food) {

        if (
            category === "all" ||
            food.classList.contains(category)
        ) {
            food.style.display = "";
        } else {
            food.style.display = "none";
        }

    });
}

// Scroll to the menu
function showMenu() {
    document.getElementById("menu").scrollIntoView({
        behavior: "smooth"
    });
}

// Order button
function orderFood(foodName) {
    alert(
        "You selected " + foodName +
        ".\n\nThank you for choosing FoodieHub!"
    );
}

// Set All as the default active category
filterFood("all");