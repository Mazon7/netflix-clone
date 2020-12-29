let loginForm = document.getElementById("loginForm");
let apiUrl = "http://localhost:3000";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const existingEmail = urlParams.get('existingEmail');

if (existingEmail) {
    loginForm.email.value = existingEmail
}


loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let payload = {
    email: loginForm.email.value,
    password: loginForm.password.value
  }
  fetch(apiUrl + "/login", {
    method: "POST",
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(payload)
  } )
  .then((response)=>{
    if (response.ok) {
        return response.json();
    } else {
        throw new Error("something went wrong");
    }
  }) // returns a promise already
  .then((response) => {
    localStorage.setItem('token', response.token);
    location.href = "/";
  })
})