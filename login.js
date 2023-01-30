const passwordElem = document.getElementById("selected-user-password");
const loginElem = document.querySelector(".login-btn");
const selectElem = document.getElementById("select");

let registeredUsers = JSON.parse(localStorage.getItem("MB_USER_ACCOUNTS"));
for (let i = 0; i < registeredUsers.length; i++) {
  let optionElem = document.createElement("option");
  let text = document.createTextNode(registeredUsers[i].accountName);
  optionElem.appendChild(text);
  optionElem.setAttribute("value", registeredUsers[i].accountName);
  selectElem.insertBefore(optionElem, selectElem.lastChild);
}

// function for storing account number of the user in the local storage against key MB_LOGGEDIN_USER_ACCOUNTNUMBER
function storeAcctNo() {
  registeredUsers.forEach((user) => {
    if (
      selectElem.value === user.accountName &&
      passwordElem.value === user.accountPin
    ) {
      localStorage.setItem(
        "MB_LOGGEDIN_USER_ACCOUNTS",
        JSON.stringify(user.accountNumber)
      );
    }
    if (
      registeredUsers.includes(
        JSON.parse(localStorage.getItem("MB_LOGGEDIN_USER_ACCOUNTS"))
      )
    ) {
      alert("please register with a different account number");
    } else {
      prompt("go to the transaction page");
    }
  });
}

loginElem.addEventListener("click", storeAcctNo);
