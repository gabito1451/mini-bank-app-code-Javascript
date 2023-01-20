function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}
// storing values
let user = document.getElementById("user");
let psw = document.getElementById("pin");
let pswRepeat = document.getElementById("pin-repeat");
let button = document.querySelector(".registerbtn");
let pin = document.getElementById("getAccountNumber");

// function for generating password
function genPassword() {
  var digits = "1234567890123457890";
  var pinlength = 10;
  var password = " ";
  for (var i = 0; i < pinlength; i++) {
    var randomPassword = Math.floor(Math.random() * digits.length);
    password += digits.substring(randomPassword, randomPassword + 1);
  }
  pin.value = password;
}

function pinFunc() {
  let currElem = pin;
  currElem.onclick = genPassword();
  pin.removeEventListener("click", pinFunc);
}

pin.addEventListener("click", pinFunc);

function store() {
  const loginObj = {
    user: user.value,
    pin: pin.value,
    psw: psw.value,
    pswRepeat: pswRepeat.value,
  };
  if (localStorage.getItem("logins") == null) {
    localStorage.setItem("logins", [120]);
  }
  let olduserlogin = JSON.parse(localStorage.getItem("logins"));
  olduserlogin.push(loginObj);
  localStorage.setItem("logins", JSON.stringify(olduserlogin));
}

button.addEventListener("click", function (e) {
  if (psw.value !== pswRepeat.value) {
    alert("password do not match");
    return;
  }
  store();
});
