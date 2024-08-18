// let cartItems=[];
let oneuser = JSON.parse(localStorage.getItem("one_user"));
let data = JSON.parse(localStorage.getItem("data"));
let details = oneuser.cartItems;
let displayItem = document.querySelector("#items");


details.map((e) => {
    displayItem.innerHTML += ` <div id="${e.productId}">
                 <img src="${e.productImageURLs[0]}" alt="">
                 <h3>${e.name}</h3>
                 <h2>Price:${e.price}</h2>
                 <h2>Rating:${e.rating}</h2>
                 <button>Remove From Cart</button>
                </div>`;
    // console.log(e[0])

})

let section = document.querySelector("section");
let allbtn = section.querySelectorAll("button");
console.log(allbtn);
//* performing action on each button

allbtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        console.log(btn.parentElement)

        //search for product with same id
        let product = data.filter((e) => {
            if (e.productId == btn.parentElement.id) {
                return e;
            }
        })
        //* removing that product from cart
        details.pop(product);
        displayItem.innerHTML = "";
        // details = details.length;
        localStorage.setItem("one_user", JSON.stringify(oneuser))

        //* removing  current user data details
        data = data.filter((e) => {
            if (e.phone != oneuser.phone) {
                return e;
            }
        })

        //*  adding current user updated details to data
        data.push(oneuser);
        // console.log(data);
        //* store updated data in local storage
        localStorage.setItem("data", JSON.stringify(data));


        details.map((e) => {
            displayItem.innerHTML += ` <div id="${e.productId}">
                         <img src="${e.productImageURLs[0]}" alt="">
                         <h3>${e.name}</h3>
                         <h2>Price:${e.price}</h2>
                         <h2>Rating:${e.rating}</h2>
                         <button>Remove From Cart</button>
                        </div>`;
        })
    })
})








