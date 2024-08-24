let cartItems = [];
let data = JSON.parse(localStorage.getItem("data"));
let oneuser = JSON.parse(localStorage.getItem("one_user"));
// console.log(data,oneuser)
let count = document.querySelector("#count");
if(oneuser){
    if(oneuser.cartItems){
        count.innerHTML = oneuser.cartItems.length;
        cartItems=oneuser.cartItems; //* the items left in local stoarge before refreshing will be assigned again
    }
}

//& login logout
function loginLogout() {
    let login = document.querySelector("#right")
    //* one_user data from local storage
    let oneUserData = JSON.parse(localStorage.getItem("one_user"));
    // console.log(oneUserData)

    //* user information
    if (oneUserData) {
        //* providing info inside right division
        login.innerHTML = `<span>${oneUserData.first}</span> <a href="./main.html"><button id="logout">Logout</button></a>`

        //* accessing logout button
        let logout = document.querySelector("#logout")
        //* logout
        logout.addEventListener("click", () => {
            localStorage.removeItem("one_user");
            // window.open('./main.html')
        })
    }

}
loginLogout();

//&fetching data from server

async function allProductsData() {
    let dataFromServer = await window.fetch("https://www.shoppersstack.com/shopping/products/alpha")
    // console.log(dataFromServer)

    //* dataObject in json format
    let convertedData = await dataFromServer.json();

    //* only data property
    let allData = convertedData.data;
    console.log(allData)


    //&filtered data for men
    let menData = allData.filter((e) => {
        if (e.category == "men") {
            return e;
        }

    })
    console.log(menData);

    //&filtered data for women
    let womenData = allData.filter((e) => {
        if (e.category == "women") {
            return e;
        }
    })
    console.log(womenData);

    //&filtered data for kids
    let kidsData = allData.filter((e) => {
        if (e.category == "kids") {
            return e;
        }
    })
    console.log(kidsData);

    //&filtered data for electronic
    let elecData = allData.filter((e) => {
        if (e.category == "electronics") {
            return e;
        }
    })
    console.log(elecData)

    let MaleOutput = document.querySelector("#maleCont");
    //*male data output
    menData.map((e) => {
        MaleOutput.innerHTML += ` <div id="${e.productId}">
                <img src="${e.productImageURLs[0]}" alt="">
                <h3>${e.name}</h3>
                <h2>Price:${e.price}</h2>
                <h2>Rating:${e.rating}</h2>
                <button>Add To Cart</button>
            </div>`;
    })

    //* female data output
    let FemaleOutput = document.querySelector("#femaleCont");
    womenData.map((e) => {
        FemaleOutput.innerHTML += ` <div id="${e.productId}">
                <img src="${e.productImageURLs[0]}" alt="">
                <h3>${e.name}</h3>
                <h2>Price:${e.price}</h2>
                <h2>Rating:${e.rating}</h2>
                <button>Add To Cart</button>
            </div>`;
    })

    //* kids data output
    let KidOutput = document.querySelector("#kidCont");
    kidsData.map((e) => {
        KidOutput.innerHTML += ` <div id="${e.productId}">
        <img src="${e.productImageURLs[0]}" alt="">
        <h3>${e.name}</h3>
        <h2>Price:${e.price}</h2>
        <h2>Rating:${e.rating}</h2>
        <button>Add To Cart</button>
    </div>`;
    })

    //* electronic data output
    let electronicOutput = document.querySelector("#electronicCont");
    elecData.map((e) => {
        electronicOutput.innerHTML += ` <div id="${e.productId}">
        <img src="${e.productImageURLs[0]}" alt="">
        <h3>${e.name}</h3>
        <h2>Price:${e.price}</h2>
        <h2>Rating:${e.rating}</h2>
        <button>Add To Cart</button>
    </div>`;
    })

    //& search results

    let input = document.querySelector("input"); //* to get value
    let searchBtn = document.querySelector("#searchBtn");//* when to display
    let searchResult = document.querySelector("#searchResult"); //* where to display

    searchBtn.addEventListener("click", () => {
        searchResult.innerHTML = "";
        allData.map((e) => {
            if (e.name.toLowerCase().includes(input.value.trim().toLowerCase())) {
                searchResult.innerHTML += ` <div id="${e.productId}">
             <img src="${e.productImageURLs[0]}" alt="">
             <h3>${e.name}</h3>
             <h2>Price:${e.price}</h2>
             <h2>Rating:${e.rating}</h2>
             <button>Add To Cart</button>
            </div>`;
            }
        })
    })

    //& accessing all add to cart buttons
    let main = document.querySelector("main");
    let allBtn = main.querySelectorAll("button");
    console.log(allBtn);
    //* iterating all btn
    allBtn.forEach((btn)=>{
        //* adding event listener to each button
        btn.addEventListener("click",()=>{
            // console.log(btn.parentElement);

            if(oneuser){

                 //* to remove duplicates
            cartItems = cartItems.filter((e)=>{
                if(e.productId!=btn.parentElement.id){
                    return e;
                }
            });

            //* to find clicked product
            let product = allData.find((e)=>{
                if(e.productId==btn.parentElement.id){
                    return e;
                }
            })
            // console.log(product);
            //*clicked product added to cart
            cartItems.push(product)
            oneuser.cartItems = cartItems;
            console.log(oneuser);

        //& storing data in one local storage
            localStorage.setItem("one_user",JSON.stringify(oneuser))

            //* removing  current user data details
            data = data.filter((e)=>{
                if(e.phone!=oneuser.phone){
                    return e;
                }
            })

            //*  adding current user updated details to data
            data.push(oneuser);
            // console.log(data);
            //* store updated data in local storage
            localStorage.setItem("data",JSON.stringify(data));
            count.innerHTML = oneuser.cartItems.length;

            //&remove from cart

            } else{
                alert("login first");
                window.location.href = "./login.html";
            }

        })
    })

}
allProductsData();

/*
let cartIcon = document.querySelector(".fa-cart-shopping");

cartIcon.addEventListener((e)=>{
    window.location.href = "./cart.html"
})
    */


