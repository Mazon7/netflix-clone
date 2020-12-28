let registerForm = document.getElementById("registerForm");
let apiUrl = "http://localhost:3000";



registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(loginForm);
  let payload = {
    name: registerForm.name.value,
    email: registerForm.email.value,
    password: registerForm.password.value
  }
  console.log(payload);
  fetch(apiUrl + "/register", {
    method: "POST",
    headers: {
      'Content-Type':'application/json'
    }
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
  location.href = "/login.html?";

  })
  .catch((error) =>{
    location.href = `/login.html?existingEmail=${payload.email}`;
  })
})