function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

const accountNameElem = document.getElementById("account-name");
const accountNumberElem = document.getElementById("account-number");
const pinElem = document.getElementById("pin");
const pinRepeatElem = document.getElementById("pin-repeat");
const registerButton = document.querySelector(".registerbtn");

accountNumberElem.addEventListener("click", generateAccountNumber);

function generateAccountNumber() {
  const acctNum = Math.random().toString().slice(2, 12);
  accountNumberElem.value = acctNum;
}

function saveUserInfoInLocalStorage() {
  const currentUsersArr = JSON.parse(localStorage.getItem("MB_USER_ACCOUNTS")) || [];
  const userObject = {
    accountName: accountNameElem.value,
    accountNumber: accountNumberElem.value,
    accountPin: pinElem.value,
    transactions: []
  };

  // TODO: check that a user with this account number does not already exist
  const existingUser = currentUsersArr.find(user => user.accountNumber === accountNumberElem.value)
  console.log('existingUser', existingUser);
  console.log('currentUsersArr', currentUsersArr);

  if (existingUser) {
    return;
  }
  currentUsersArr.push(userObject);
  localStorage.setItem("MB_USER_ACCOUNTS", JSON.stringify(currentUsersArr));
}

registerButton.addEventListener("click", function (e) {
  if (pinElem.value !== pinRepeatElem.value) {
    alert("PINs do not match");
    return;
  }
  saveUserInfoInLocalStorage();
});
