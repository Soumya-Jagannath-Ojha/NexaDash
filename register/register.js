const name = document.querySelector("#username")
const email = document.querySelector("#email")
const password = document.querySelector("#password")
const img_url = document.querySelector("#img")
const registerform = document.querySelector("#registerform");
const closebtn = document.querySelector(".closebtn");
// console.log(closebtn)


let userDetails = {
    username:"",
    email:"",
    password:"",
    imgurl:""
}

registerform.addEventListener("submit",(e)=>{
    e.preventDefault();

    let userDetails = {
        username:name.value,
        email:email.value,
        password:password.value,
        imgurl:img_url.value,
    }
    
    alert("Register Successfully!, Please Login!");
    localStorage.setItem("RegisterdData",JSON.stringify(userDetails));
    window.location.href = "../index.html";
});


closebtn.addEventListener("click",(e)=>{
    e.preventDefault();
    // console.log("Close btn clicked");
    window.location.href="../index.html";

})