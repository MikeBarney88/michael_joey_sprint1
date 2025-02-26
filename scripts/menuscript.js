/* 
Desc: Sprint 1
Members: Michael Barney, Joey Thomas
Date: Feb 17 - 
*/

window.addEventListener("DOMContentLoaded", function() {

    //Error handler (Menu Page):
    document.querySelector("#mError").style.display = "none";
    function moopsie(message, type) {
        let mError = document.querySelector("#mError");
        mError.style.display = "initial";
        mError.style.position = "fixed";
        mError.style.textAlign = "center";
        
        if (type === "g") {
            mError.style.backgroundColor = "lightgreen";
        } else {
            mError.style.backgroundColor = "red";
        }
        mError.innerHTML += message + "<br>";
        

        setTimeout(() => {
            mError.style.backgroundColor = "";
            mError.innerHTML = "";
            document.querySelector("#mError").style.display = "none";
        } , 3000)
    }


    //Add to Order button (Menu Page):
    let addToOrdBtn = document.querySelectorAll(".addToOrdBtn");
    
    for (btn of addToOrdBtn) {
        btn.addEventListener("click", function(e) {
            //On click, add the value of the button clicked to ordList in localStorage.
            
            if (localStorage.getItem("ordList") === null) {
                let ordList = [];
                ordList.push(this.value);
                localStorage.setItem("ordList", JSON.stringify(ordList));
                
            } else {
                let ordList = JSON.parse(localStorage.getItem("ordList"));
                ordList.push(this.value);
                localStorage.setItem("ordList", JSON.stringify(ordList));
            }

            moopsie(`${this.parentElement.previousElementSibling.previousElementSibling.innerText} Successfully Added to Order.`, "g");

            e.preventDefault();
        });
    }
});