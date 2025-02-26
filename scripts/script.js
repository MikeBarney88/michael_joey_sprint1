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
    function oopsie(message, type, tb = "") {
        let oError = document.querySelector("#oError");
        if (type === "g") {
            oError.style.backgroundColor = "lightgreen";
        } else {
            oError.style.backgroundColor = "red";
        }

        oError.innerHTML = message;

        if (tb === "top") {
            document.querySelector("#oName").value = "";
            document.querySelector("#oPhone").value = "";
            document.querySelector("#oAddress").value = "";
            document.querySelector("#oCredit").value = "";
        } else if (tb === "bot") {
            document.querySelector("#oItemPick").value = "defaultPick";
            document.querySelector("#oQuantity").value = "";
            if (document.querySelector("#oQuantity").hasAttribute("required")) {
                document.querySelector("#oQuantity").removeAttribute("required");
            }
        } else {
            document.querySelector("#oName").value = "";
            document.querySelector("#oPhone").value = "";
            document.querySelector("#oAddress").value = "";
            document.querySelector("#oCredit").value = "";

            document.querySelector("#oItemPick").value = "defaultPick";
            document.querySelector("#oQuantity").value = "";
            if (document.querySelector("#oQuantity").hasAttribute("required")) {
                document.querySelector("#oQuantity").removeAttribute("required");
            }
        }

        setTimeout(() => {
            oError.style.backgroundColor = "";
            oError.innerHTML = "&nbsp;";
        } , 3000)
    }


    //Ordering Page:
    let oForm = document.querySelector("#oForm");
    oForm.addEventListener("submit", function(e) {
        let oName = document.querySelector("#oName").value;
        let oPhone = document.querySelector("#oPhone").value;
        let oAddress = document.querySelector("#oAddress").value;
        let oCredit = document.querySelector("#oCredit").value;
        if (oName === "" || oPhone === "" || oAddress === "" || oCredit === "" || (document.querySelector("#oQuantity").hasAttribute("required") === true && document.querySelector("#oQuantity").value === "")) {
            oopsie("Please Fill All Fields.", "b");
        } else if (!/\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}/.test(oPhone)) {
            oopsie("Invalid Phone Number Format.", "b", "top");
        } else if (!/\d{4}-\d{4}-\d{4}-\d{4}/.test(oCredit)) {
            oopsie("Invalid Credit Card Format.", "b", "top");
        } else if (localStorage.getItem("ordList") === null) {
            oopsie("Cannot Submit an Empty Order.", "b", "bot");
        } else {
            oopsie("Thank You For Your Order!", "g");
            

            //Create customer object, add to localStorage:
            let oCust = new Customer(oName, oPhone, oAddress, oCredit);
            if (localStorage.getItem("oCust") === null) {
                localStorage.setItem("oCust", JSON.stringify(oCust));
            }
        }

        localStorage.removeItem("ordList");

        document.querySelector("#oSubtotal").innerText = "";
        document.querySelector("#oHST").innerText = "";
        document.querySelector("#oTotal").innerText = "";

        document.querySelector("#ordDsp").innerHTML = "";

        e.preventDefault();
    });


    //Update order and set up choose items field:

    document.querySelector("#oItemPick").addEventListener("change", function(e) {
        document.querySelector("#oQuantity").setAttribute("required", true);    

        e.preventDefault();
    })


    document.querySelector("#oFormATO").addEventListener("click", oAdder);
    
    function oAdder(e) {
        if ((document.querySelector("#oItemPick").value != "defaultPick" && document.querySelector("#oQuantity").value === "") || (document.querySelector("#oItemPick").value === "defaultPick" && document.querySelector("#oQuantity").value === "")) {
            oopsie("Please Choose a Menu Item and Quantity.", "b", "bot");
        } else {
            
            let oItems = [];
            for (let i = 1; i <= document.querySelector("#oQuantity").value; i++) {
                oItems.push(document.querySelector("#oItemPick").value);
            }


            if (localStorage.getItem("ordList") === null) {
                let ordList = [];
                oItems.forEach((item) => {ordList.push(item)});
                localStorage.setItem("ordList", JSON.stringify(ordList));
                document.querySelector("#oItemPick").value = "defaultPick";
                document.querySelector("#oQuantity").setAttribute("required", false); 
                document.querySelector("#oQuantity").value = "";
                
                oopsie("Item Added to Order.", "g", "bot");
            } else {
                let ordList = JSON.parse(localStorage.getItem("ordList"));
                oItems.forEach((item) => {ordList.push(item)});
                localStorage.setItem("ordList", JSON.stringify(ordList));
                document.querySelector("#oItemPick").value = "defaultPick";
                document.querySelector("#oQuantity").setAttribute("required", false); 
                document.querySelector("#oQuantity").value = "";
                
                oopsie("Item Added to Order.", "g", "bot");
            }
        }

        e.preventDefault();
    }

    //Display ordered items and tally subtotal:
    let subtotal = 0;
    let printCount = 0;

    setInterval(function() {
        if (localStorage.getItem("ordList") != null) {
            let ordListDsp = JSON.parse(localStorage.getItem("ordList"));

            ordListDsp.forEach((item) => {
                if (ordListDsp[printCount] === item) {
                    document.querySelector("#ordDsp").innerHTML += `<li>${menyou[item][1]}.......... $${menyou[item][0]}</li>`;

                    subtotal += parseFloat(menyou[item][0]);
                    printCount++;
                }
            });
        }
    }, 500);


    //Order totals/calculations:
    let oCalc = document.querySelector("#oCalc");
    oCalc.addEventListener("click", function(e) {
        if (subtotal * 1.15 !== 0) {
            document.querySelector("#oSubtotal").innerText = `Subtotal: $${subtotal.toFixed(2)}`;
            document.querySelector("#oHST").innerText = `HST(15%): $${(subtotal * .15).toFixed(2)}`;
            document.querySelector("#oTotal").innerText = `Total: $${(subtotal * 1.15).toFixed(2)}`;
        } else {
            oopsie("Cannot Calculate Total With Empty Order.", "b");
        }

        e.preventDefault();
    });


    //Reset order option:
    document.querySelector("#oForm").addEventListener("reset", function(e) {
        document.querySelector("#oName").value = "";
        document.querySelector("#oPhone").value = "";
        document.querySelector("#oAddress").value = "";
        document.querySelector("#oCredit").value = "";

        document.querySelector("#oItemPick").value = "defaultPick";
        document.querySelector("#oQuantity").value = "";
        document.querySelector("#oQuantity").removeAttribute("required");

        localStorage.clear();
        document.querySelector("#ordDsp").innerHTML = "";

        document.querySelector("#oSubtotal").innerText = "";
        document.querySelector("#oHST").innerText = "";
        document.querySelector("#oTotal").innerText = "";
        subtotal = 0;

        oopsie("Order and Form Cleared.", "g");
        e.preventDefault();
    });

});