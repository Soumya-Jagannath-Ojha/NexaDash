const users = document.querySelector("#users");
const shopping = document.querySelector("#shopping");
const setting = document.querySelector("#setting");
const topbar = document.querySelector(".topbar");
const heading = document.querySelector(".heading");
const img = document.querySelector("#img");
const logout = document.querySelector("#logout");
const selected_category = document.querySelector("#category");

// console.log(category.innerHTML.)

let allusers = [];
let allproducts = [];
let activelink = null;

//! Targetting all the p tags from aside
const alllinks = document.querySelectorAll(
  "#users,#products,#setting,#dashboard"
);
// console.log(alllinks);

const searchInput = document.querySelector("#search");
const cards_section = document.querySelector(".cards");
const AddToCart = document.querySelector("#AddToCart")
console.log(AddToCart)
const cartbtn = document.querySelector("#cartbtn");
console.log(cartbtn)

const currUser = JSON.parse(localStorage.getItem("RegisterdData"));

heading.innerText = `Welcome ${currUser.username}`;
img.src = currUser.imgurl;

//! Fetching data from server

const ftechusers = async () => {
  const response = await fetch("https://api.github.com/users");
  const result = await response.json();
  allusers = result;
  //   return result;
  displayusers(allusers);
};

const fetchShopping = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  const result = await response.json();
  // console.log(result);
  allproducts = result;
  // return result;
  displayshopping(allproducts);
};

//! Fetching data from server ends here

//! Display Functionality
function displayusers(allusers) {
  cards_section.replaceChildren();
  if (allusers.length === 0) {
    const card = document.createElement("div");
    card.setAttribute("class", "card");
    card.innerHTML = `<h3>No Data Found</h3>`;
    cards_section.appendChild(card);
  } else {
    allusers.map((ele) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");
      card.innerHTML = `
                        <img src=${ele.avatar_url} alt=${ele.login}>
                        <h3>${ele.login}</h3>  `;
      cards_section.appendChild(card);
    });
  }
}

function displayshopping(allproducts) {
  cards_section.replaceChildren();
  if (allproducts.length === 0) {
    const card = document.createElement("div");
    card.setAttribute("class", "card");
    card.innerHTML = `<h3>No Data Found</h3>`;
    cards_section.appendChild(card);
  } else {
    allproducts.map((ele) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");
      card.innerHTML = `
                  <img src=${ele.image}>
                  <h3>${ele.title}</h3>
                  <button>Buy</button>
                  <button id="cartbtn">Add to cart</button>
                  `;
      cards_section.appendChild(card);
    });
  }
}

function displaysetting() {
  cards_section.replaceChildren();
  const card = document.createElement("div");
  card.setAttribute("class", "card");
  card.innerHTML = `
                    <p>Update your profile</p>
                    <button>Update</update>
                    <button>dark mode</button>
                    <button>light mode</button>
                  `;
  // console.log(card)
  cards_section.appendChild(card);
}

// users.addEventListener("click", ftechusers);
// shopping.addEventListener("click",fetchShopping);
//! Display Functionality ends here

//! Search input box functionality
searchInput.addEventListener("input", () => {
  console.log("input is clicked!");
  const query = searchInput.value.toLowerCase();
  console.log(query);
  if (query.length === 0) {
    if (activelink === "Users") {
      displayusers(allusers);
    } else if (activelink === "Shopping") {
      displayshopping(allproducts);
    } else if (activelink === "Settings") {
      displaysetting();
    } else {
      alert("You clicked unknown thinks");
    }
    // displayusers(allusers);
  } else {
    if (activelink === "Users") {
      const filterusers = allusers.filter((user) =>
        user.login.toLowerCase().startsWith(query.toLowerCase())
      );
      // console.log(filterusers);
      displayusers(filterusers);
    } else if (activelink === "Shopping") {
      const filtershopping = allproducts.filter((product) =>
        product.title.toLowerCase().startsWith(query.toLowerCase())
      );
      displayshopping(filtershopping);
    } else if (activelink === "Settings") {
      displaysetting();
    } else {
      alert("click unknown thinks");
    }

    // const filterusers = allusers.filter((user) =>
    //   user.login.toLowerCase().startsWith(query.toLowerCase())
    // );
    // console.log(filterusers);
    // displayusers(filterusers);
  }
});

//! Search input functionality ends here

//! p tag addEventLister functionality is here
alllinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    alllinks.forEach((links) => {
      links.classList.remove("active");
    });
    e.currentTarget.classList.toggle("active");

    if (link.innerText === "Users") {
      ftechusers();
      activelink = "Users";
      heading.innerText = "Welcome to User Page";
      // console.log(heading.innerText)
    } else if (link.innerText === "Shopping") {
      fetchShopping();
      activelink = "Shopping";
      heading.innerText = "Welcome to Shopping Page";
    } else if (link.innerText === "Settings") {
      // alert("You clicked unknown option");
      console.log("setting clicked");
      displaysetting();
      heading.innerText = "Welcome to Setting Page";
    } else if (link.innerText === "Logout") {
      console.log("logout is clicked!");
      alert("Logout SuccessFully!");
      window.location.href = "../index.html";
    } else if (link.innerText === "Dashboard") {
      // console.log("Dashboard is clicked!");
      heading.innerText = "Welcome To Dashboard";
      cards_section.replaceChildren();
      const card = document.createElement("div");
      card.setAttribute("class", "card");
      card.innerHTML = `<h3>Welcome to Dashboard</h3>`;
      cards_section.appendChild(card);
    } else {
      alert("click wrong think");
    }
  });
});

logout.addEventListener("click", (e) => {
  console.log("logout is clicked!");
  alert("Logout SuccessFully!");
  localStorage.removeItem("RegisterdData");
  window.location.href = "../index.html";
});

//! p tag addEventLister functionality is ends here

// users.addEventListener("click", async () => {
//   const allusers = await ftechusers();
//   allusers.map((ele) => {
//     const card = document.createElement("div");
//     card.setAttribute("class", "card");
//     card.innerHTML = `
//                         <img src=${ele.avatar_url} alt=${ele.login}>
//                         <h3>${ele.login}</h3>  `;
//     console.log(card);
//     cards_section.appendChild(card);
//   });
// });

//! Activate which p tag is clicked
// const navItems = document.querySelectorAll(".sidebar nav p")

// navItems.forEach((item)=>{
//    console.log(item)

//   item.addEventListener("click", ()=>{
//     navItems.forEach((el)=>{
//       el.classList.remove("active")
//     })
//     item.classList.add("active");
//   })
// })
//! Activate which p tag is clicked is ends here

//! Filtering Shopping Items 
selected_category.addEventListener("change", () => {
  const select_value = selected_category.value;
  console.log(select_value);

  if (select_value === "All") {
    displayshopping(allproducts);
  } else {
    const filterCategory = allproducts.filter((product) =>
      product.category.toLowerCase().startsWith(select_value.toLowerCase())
    );
    console.log(filterCategory);
    displayshopping(filterCategory);
  }
});
