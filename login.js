const passwordElem = document.getElementById("selected-user-password");
const loginElem = document.querySelector(".login-btn");
const selectElem = document.getElementById("select");
// if (localStorage.getItem("MB_LOGGEDIN_USER_ACCOUNT_NUMBER") !== null) {
//   location.href = "transactions.html";
// }
let registeredUsers =
  JSON.parse(localStorage.getItem("MB_USER_ACCOUNTS")) || [];
registeredUsers.forEach((user) => {
  const optionElem = document.createElement("option");
  optionElem.value = user.accountNumber;
  optionElem.textContent = `${user.accountName}(${user.accountPin})`;
  passwordElem.textContent = `${user.accountPin}`;
  selectElem.append(optionElem);
});

// function for logging in
function login() {
  localStorage.setItem("MB_LOGGEDIN_USER_ACCOUNT_NUMBER", selectElem.value);

  //to check user object with the stored account number
  const accountUserDetails = registeredUsers.find(
    (user) =>
      user.accountNumber ===
      localStorage.getItem("MB_LOGGEDIN_USER_ACCOUNT_NUMBER")
  );
  console.log(accountUserDetails);
  if (accountUserDetails.accountPin !== passwordElem.value) {
    alert("incorrect pin");
    return;
  }

  if (!accountUserDetails) {
    alert("Account not found");
    return;
  }

  location.href = "transactions.html";
}

loginElem.addEventListener("click", login);
