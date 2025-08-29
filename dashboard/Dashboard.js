const users = document.querySelector("#users");
const shopping = document.querySelector("#shopping");
const setting = document.querySelector("#setting");
const topbar = document.querySelector(".topbar");
const heading = document.querySelector(".heading");
const img = document.querySelector("#img");
const logout = document.querySelector("#logout");
const selected_category = document.querySelector("#category");
selected_category.style.display = "none";
const orders = document.querySelector("#orders");

let allusers = [];
let allproducts = [];
let activelink = null;
let cartitems = [];
let allorders = [];

//! Targetting all the p tags from aside
const alllinks = document.querySelectorAll(
  "#users,#products,#orders,#setting,#dashboard"
);
// console.log(alllinks);

const searchInput = document.querySelector("#search");
const cards_section = document.querySelector(".cards");
const AddToCart = document.querySelector("#AddToCart");
// console.log(AddToCart);
const carticon = document.querySelector("#cart");
// console.log(carticon)
carticon.style.display = "none";

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
function displayDashboard() {
  cards_section.replaceChildren();
  selected_category.style.display = "none";
  carticon.style.display = "none";

  const card = document.createElement("div");
  card.setAttribute("class", "card");
  card.innerHTML = `
        
    <div class="dashboard-container">
      <!-- Welcome Header -->
      <div class="welcome-header">
        <h1>Welcome back, ${currUser.username}! 👋</h1>
        <p>Here’s a quick overview of your account activity</p>
      </div>

      <!-- Stats Cards -->
      <div class="stats-cards">
        <div class="stats-card">
          <h2>150</h2>
          <p>Total Users</p>
        </div>
        <div class="stats-card">
          <h2>320</h2>
          <p>Projects Created</p>
        </div>
        <div class="stats-card">
          <h2>85%</h2>
          <p>Engagement Rate</p>
        </div>
        <div class="stats-card">
          <h2>12</h2>
          <p>New Notifications</p>
        </div>
      </div>
    </div>
        `;
  cards_section.appendChild(card);
}

displayDashboard();

function displayusers(allusers) {
  cards_section.replaceChildren();
  selected_category.style.display = "none";
  carticon.style.display = "none";

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
  selected_category.style.display = "block";
  carticon.style.display = "flex";

  if (allproducts.length === 0) {
    const card = document.createElement("div");
    card.setAttribute("class", "card");
    card.innerHTML = `<h3>No Data Found</h3>`;
    cards_section.appendChild(card);
  } else {
    allproducts.forEach((ele) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");
      card.innerHTML = `
                  <img src=${ele.image}>
                  <h3>${ele.title}</h3>
                  <div class="btn-group">
                      <button class="btn buy-btn">
                      ${allorders.some((item)=> item.id === ele.id) ? "Purchased" : "Buy"}
                      </button>
                      <button class="btn cart-btn" >
                      ${
                        cartitems.some((item) => item.id === ele.id)
                          ? "Remove from cart"
                          : "Add to cart"
                      }
                      </button>
                  </div>
                  
                  `;
      console.log(ele);
      cards_section.appendChild(card);
      const cartbtn = card.querySelector(".cart-btn");

      cartbtn.addEventListener("click", () => {
        if (cartitems.some((item) => item.id === ele.id)) {
          // remove if already in cart
          cartitems = cartitems.filter((item) => item.id !== ele.id);
          cartbtn.innerText = "Add to cart";
        } else {
          // add new item
          cartitems.push(ele);
          cartbtn.innerText = "Remove from cart";
        }
      });

      

    });
  }
}

function displaysetting() {
  cards_section.replaceChildren();
  selected_category.style.display = "none";
  carticon.style.display = "none";

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

function displayCartItems() {
  cards_section.replaceChildren();
  heading.innerText = `Cart Page`;
  if (cartitems.length === 0) {
    const card = document.createElement("div");
    card.setAttribute("class", "card");
    card.innerHTML = `
  <h3>No Data Found</h3>
  `;
    cards_section.appendChild(card);
  } else {
    cartitems.forEach((ele) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");
      card.innerHTML = `
                  <img src=${ele.image}>
                  <h3>${ele.title}</h3>
                  <div class="btn-group">
                      <button class="btn buy-btn">Buy</button>
                      <button class="btn remove-btn">Remove from cart</button>
                  </div>
                  `;
      cards_section.appendChild(card);
      const removebtn = card.querySelector(".remove-btn");

      removebtn.addEventListener("click", () => {
        // console.log("remove btn clicked");
        cartitems = cartitems.filter((item) => item.id !== ele.id);
        displayCartItems();
      });
    });
  }
}

function displayOrders() {
  cards_section.replaceChildren();
  heading.innerText = "Orders page";
  if (allorders.length === 0) {
    const card = document.createElement("div");
    card.setAttribute("class", "card");
    card.innerHTML = `
  <h3>No Data Found</h3>
  `;
    cards_section.appendChild(card);
  }
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

      displayDashboard();
    } else if (link.innerText == "Orders") {
      // alert("click wrong think");
      console.log("In Orders page");
      heading.innerText = "Order Page";
      cards_section.replaceChildren();
      displayOrders();
    } else {
      alert("You Clicked wrong link");
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

// cart Functionality
carticon.addEventListener("click", () => {
  // console.log("cart icon clicked");
  displayCartItems();
});
