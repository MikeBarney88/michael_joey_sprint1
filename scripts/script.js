/* 
Desc: Sprint 1
Members: Michael Barney, Joey Thomas
Date: Feb 17 - 
*/

window.addEventListener("DOMContentLoaded", function() {

    //Customer class:
    class Customer {
        constructor(n, p, a, c, o) {
            this.name = n;
            this.phone = p;
            this.address = a;
            this.creditcard = c;
            this.order = o;
        }
    }

    //Error handler:
    function oopsie(message, type) {
        let oError = document.querySelector("#oError");
        if (type === "g") {
            oError.style.backgroundColor = "green";
        } else {
            oError.style.backgroundColor = "red";
        }

        oError.innerHTML = message;

        setTimeout(() => {
            oError.innerHTML = "";
        } , 3000)
    }
        


    //Menu button:
    // let addtoOrdBtn = document.querySelector("#addtoOrdBtn");
    // addtoOrdBtn.addEventListener("click", function() {
    //     //On click, try to go back to the element with the name of the item and add it to ordList in localStorage.
    //     //let ordItem = addtoOrdBtn.previousSibling;
    // });


    //Ordering Page:
    let oForm = document.querySelector("#oForm");
    oForm.addEventListener("submit", function(e) {
        let oName = document.querySelector("#oName").value;
        let oPhone = document.querySelector("#oPhone").value;
        let oAddress = document.querySelector("#oAddress").value;
        let oCredit = document.querySelector("#oCredit").value;
        if (oName === "" || oPhone === "" || oAddress === "" || oCredit === "") {
            oopsie("Please Fill All Fields.", "b");
        }


        //Gather and total ordered items, push them to an array to add to the new Customer object below.
        let oItems = ["ramen", "crepe", "eats"];


        //Create customer object:
        let oCust = new Customer(oName, oPhone, oAddress, oCredit, oItems);
 
        //Create/Update localStorage array:
        let ordList;
        if (localStorage.getItem("ordList") === null) {
            ordList = [];
        }



        e.preventDefault();
    });



});