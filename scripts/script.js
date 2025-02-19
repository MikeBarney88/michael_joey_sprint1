/* 
Desc: Sprint 1
Members: Michael Barney, Joey Thomas
Date: Feb 17 - 
*/

window.addEventListener("DOMContentLoaded", function() {

    //Create/Update localStorage array:
    let ordList;
    if (localStorage.getItem("ordList") === null) {
        ordList = [];
    }
        


    //Menu button:
    let addtoOrdBtn = document.querySelector("#addtoOrdBtn");
    addtoOrdBtn.addEventListener("click", function() {
        //On click, try to go back to the element with the name of the item and add it to ordList in localStorage.
        //let ordItem = addtoOrdBtn.previousSibling;
    });


    //Ordering Page:
    let orderForm = document.querySelector("#orderForm");
    orderForm.addEventListener("submit", function() {
        
    });



});