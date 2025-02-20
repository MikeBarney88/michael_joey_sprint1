/* 
Desc: Sprint 1
Members: Michael Barney, Joey Thomas
Date: Feb 17 - 
*/

window.addEventListener("DOMContentLoaded", function() {

    //Menu items as objects for easy referral through keys.
    const menyou = {
        crepe: ["8.00", "Breakfast Crêpe"],
        eoat: ["7.50", "Eggs on Avacado Toast"],
        smoothie: ["7.00", "Smoothie Bowl"],
        salad: ["5.00", "Garden Salad"],
        bagel: ["8.00", "Bagel Sandwich"],
        ramen: ["9.00", "Bowl of Ramen"],
        coffee: ["5.00", "Coffee"],
        mocha: ["6.00", "Café Mocha Latte"],
        herbal: ["4.50", "Herbal Tea"]
    };

    //Customer class:
    class Customer {
        constructor(n, p, a, c) {
            this.name = n;
            this.phone = p;
            this.address = a;
            this.creditcard = c;
        }
    }

    //Error handler:
    function oopsie(message, type) {
        let oError = document.querySelector("#oError");
        if (type === "g") {
            oError.style.backgroundColor = "lightgreen";
        } else {
            oError.style.backgroundColor = "red";
        }

        oError.innerHTML = message;

        document.querySelector("#oName").value = "";
        document.querySelector("#oPhone").value = "";
        document.querySelector("#oAddress").value = "";
        document.querySelector("#oCredit").value = "";

        setTimeout(() => {
            oError.innerHTML = "";
        } , 3000)
    }


    //Add to Order button:
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
        if (oName === "" || oPhone === "" || oAddress === "" || oCredit === "" || (document.querySelector("#oQuantity").hasAttribute("required") && document.querySelector("#oQuantity").value === "")) {
            oopsie("Please Fill All Fields.", "b");
        } else if (!/\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}/.test(oPhone)) {
            oopsie("Invalid Phone Number Format.", "b");
        } else if (!/\d{4}-\d{4}-\d{4}-\d{4}/.test(oCredit)) {
            oopsie("Invalid Credit Card Format.", "b");
        } else {
            oopsie("Thank You For Your Order!", "g");
            

            //Create customer object, add to localStorage:
            let oCust = new Customer(oName, oPhone, oAddress, oCredit);
            if (localStorage.getItem("oCust") === null) {
                localStorage.setItem("oCust", JSON.stringify(oCust));
            }
        }

        e.preventDefault();
    });

    //Update order and set up choose items field:
    let oItems = [];

    document.querySelector("#oItemPick").addEventListener("change", function(e) {
        document.querySelector("#oQuantity").setAttribute("required", true);

        oItems.push(document.querySelector("#oItemPick"));

        e.preventDefault();
    })



    //Create/Update localStorage array and display ordered items:
    let subtotal = 0;
    let ordList;
    if (localStorage.getItem("ordList") === null) {
        ordList = [];
        oItems.forEach((item) => {ordList.push(item)});
        localStorage.setItem("ordList", JSON.stringify(ordList));
    } else {
        ordList = JSON.parse(localStorage.getItem("ordList"));

        ordList.forEach((item) => {
            document.querySelector("#ordDsp").innerHTML += `<li>${menyou[item][1]}.......... $${menyou[item][0]}</li>`;

            subtotal += parseFloat(menyou[item][0]);
        });
    }

    //Order totals:
    let oCalc = document.querySelector("#oCalc");
    oCalc.addEventListener("click", function(e) {
        document.querySelector("#oSubtotal").innerText = `Subtotal: $${subtotal.toFixed(2)}`;
        document.querySelector("#oHST").innerText = `HST(15%): $${(subtotal * .15).toFixed(2)}`;
        document.querySelector("#oTotal").innerText = `Total: $${(subtotal * 1.15).toFixed(2)}`;

        e.preventDefault();
    });

});