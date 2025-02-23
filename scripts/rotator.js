/* 
Desc: Sprint 1
Members: Michael Barney, Joey Thomas
Date: Feb 17 - 
*/

window.addEventListener("DOMContentLoaded", function() {
    //Assign different reviews in an array.
    let reviews = [{
        name: "Guy Uno",
        rating: " &starf;&starf;&starf;&starf;&starf;<br><br>",
        text: `"Finding this cafe has been the single best thing 
        <br>to ever happen to me. Cannot recommend enough."`
    }, {
        name: "Guy Dos",
        rating: " &starf;&starf;&starf;&starf;&star;<br><br>",
        text: `"Not too shabby, not too shabby at all."`
    }, {
        name: "Guy Tres",
        rating: " &starf;&starf;&starf;&starf;&star;<br><br>",
        text: `"Bodacious eats, fam."`
    }, {
        name: "Guy Fieri",
        rating: " &starf;&starf;&starf;&starf;&star;<br><br>",
        text: `"WOW."`
    }, {
        name: "Guy Cinco",
        rating: " &starf;&starf;&starf;&starf;&starf;<br><br>",
        text: `"It's alright."`
    }];

    //Make a function that transitions between the objects.
    let counter = 1;
    function switchem() {
        document.querySelector(".grid-reviewtxt").innerHTML = `<p>${reviews[counter].name}${reviews[counter].rating}${reviews[counter].text}</p>`;
    
        if (counter < reviews.length - 1) {
            counter++;
        } else {
            counter = 0;
        }
    }

    setInterval(switchem, 5000);
});