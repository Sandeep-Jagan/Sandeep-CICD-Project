// Scroll to the menu
function showMenu() {
    document.getElementById("menu").scrollIntoView({
        behavior: "smooth"
    });
}


// Filter food items
function filterFood(category) {

    const foods = document.querySelectorAll(".food-card");

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