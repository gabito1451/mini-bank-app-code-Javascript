const passwordElem = document.getElementById("selected-user-password");
const loginElem = document.querySelector(".login-btn");
const selectElem = document.getElementById("select");

let registeredUsers = JSON.parse(localStorage.getItem("MB_USER_ACCOUNTS"));
for (let i = 0; i < registeredUsers.length; i++) {
  let optionElem = document.createElement("option");
  let text = document.createTextNode(registeredUsers[i].accountName);
  optionElem.appendChild(text);
  optionElem.setAttribute("value", registeredUsers[i].accountNumber);
  selectElem.insertBefore(optionElem, selectElem.lastChild);
}

// function for logging in
function login() {
  localStorage.setItem(
    "MB_LOGGEDIN_USER_ACCOUNT_NUMBER",
    JSON.stringify(selectElem.value)
  );
  if (localStorage.getItem("MB_LOGGEDIN_USER_ACCOUNT_NUMBER") !== null) {
    location.href = "transaction.html";
  }
  //to check user object with the stored account number
  let accountUserDetails = registeredUsers.find(
    (acctNo) =>
      acctNo.accountNumber ===
      JSON.parse(localStorage.getItem("MB_LOGGEDIN_USER_ACCOUNT_NUMBER"))
  );
  console.log(accountUserDetails);
}

loginElem.addEventListener("click", login);
