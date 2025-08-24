//! setAttribute
// const h1 = document.createElement("h1")
// h1.innerText = "hello";
// h1.setAttribute("id","demo");
// h1.setAttribute("class","remo")
// h1.style.color = "purple"
// h1.style.backgroundColor = "yellow"
// console.log(h1)
// document.body.appendChild(h1)

const navlist = document.querySelector(".navlist");
// console.log(navlist);

const arr = ["Home", "Feature", "About", "Contact"];

arr.map((ele) => {
  const li = document.createElement("li");

  const a = document.createElement("a");
  a.innerText = ele;
  // a.id = ele.toLowerCase();
  a.href = `#${ele.toLowerCase()}`

  // li.innerText = ele;
  // li.id = ele.toLowerCase();
  li.appendChild(a);
  navlist.appendChild(li);
});

const loginbtn = document.querySelector("#loginbtn");
const loginform = document.querySelector(".loginform");
const closebtn = document.querySelector(".closebtn");
const bar = document.querySelector("#bar");
const nav = document.querySelector("nav")
const rightdiv = document.querySelector(".rightdiv");
const getstart = document.querySelector("#getstart");


loginbtn.addEventListener("click", () => {
  loginform.style.display = "block";
});
getstart.addEventListener("click",()=>{
  loginform.style.display = "block";
})

closebtn.addEventListener("click", () => {
  // console.log("close btn clicked");
  loginform.style.display = "none";
  // body.style.color = "red"
});

//! form handling logic

// const userDetails = {
//   username: "Sundari",
//   usermail: "sundari@gmail.com",
//   userpassword: "sundari143",
// };

userDetails = JSON.parse(localStorage.getItem("RegisterdData"));
// console.log(userDetails)

const form = document.querySelector("#form");
// console.log(form)

const email = document.querySelector("#email");
const password = document.querySelector("#password");
const otp = document.querySelector("#otp");
let otpvalue = null;

const otpbtn = document.querySelector("#otpbtn");

// console.log(email,password,otp)
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (
    email.value === userDetails.email &&
    password.value === userDetails.password
  ) {
    if (otp.value == otpvalue) {
      email.value = "";
      password.value = "";
      otp.value = "";
      console.log("Log In Successfully");
      loginform.style.display = "none"
      // window.location.href = "./dashboard.html"
      window.location.href = `./dashboard/Dashboard.html`
    } else {
      alert("Invalid OTP, Please Enter The Correct OTP")
      console.log("Invalid Otp");
    }
  } else {
    alert("Invalid Credential!")
    console.log("Invalid Credentail!");
  }
});

function generatetOtp() {
  otpvalue = Number(Math.round(Math.random() * 1000000));
  alert(`Your OTP is ${otpvalue}`);
}
otpbtn.addEventListener("click", generatetOtp);


// console.log("RegisterdData",localStorage.getItem))
// localStorage.getItem("RegisterdData")
// console.log(JSON.parse(localStorage.getItem("RegisterdData")))


//! For Media Query 
bar.addEventListener("click",(e)=>{
  // console.log("bar clicked")
  rightdiv.classList.toggle("bar_active");
  rightdiv.style.display = "block"
  // rightdiv.navlist.style.display = "block"
});