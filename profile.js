const profileForm = document.getElementById("profile-form");
const accountNameElem = document.getElementById("account-name");
const accountNumberElem = document.getElementById("account-number");
const changePinElem = document.getElementById("change-pin");
const currentPinElem = document.getElementById("current-pin");
const newPinElem = document.getElementById("new-pin");
const confirmNewPinElem = document.getElementById("confirm-new-pin");
const closeBtnElem = document.getElementById("close-btn");
const updateBtnElem = document.getElementById("update-btn");
// display of aaccount number
accountNumberElem.value = currentUserAccountNumber;

const allUsers = JSON.parse(localStorage.getItem("MB_USER_ACCOUNTS"));

function displayFormToUpdate() {
  const pinUpdateSection = document.getElementById("pin-update-section");

  if ((pinUpdateSection.style.display = "none")) {
    pinUpdateSection.style.display = "block";
  } else {
    pinUpdateSection.style.display = "none";
  }
}
function updateForm() {
  if (
    currentPinElem.value !==
    getUserByAccountNumber(currentUserAccountNumber).accountPin
  ) {
    alert("Incorrect Pin");
    return;
  }
  if (newPinElem.value !== confirmNewPinElem.value) {
    alert("Pins do not match, try again");
    return;
  }

  // finding the current user to update profile

  let userToBeUpdated = allUsers.find(
    (user) => user.accountNumber == accountNumberElem.value
  );
  userToBeUpdated.accountName = accountNameElem.value;
  userToBeUpdated.accountPin = newPinElem.value;
  // changing the updated properties to a string
  const updatedObject = JSON.stringify(allUsers);
  //  storing it back in local storage
  localStorage.setItem("MB_USER_ACCOUNTS", updatedObject);
  location.href = "transactions.html";
}
updateBtnElem.addEventListener("click", () => updateForm());

function deleteUserAccount() {
  const registeredUsers = localStorage.getItem("MB_USER_ACCOUNTS");
  console.log(registeredUsers);
  let usersArray = JSON.parse(registeredUsers);
  const index = getUserIndexByAccountNumber(currentUserAccountNumber);
  usersArray.splice(index, 1);
  const newArrayOfUsers = JSON.stringify(usersArray);
  localStorage.setItem("MB_USER_ACCOUNTS", newArrayOfUsers);
  // location.href = "/";
}
closeBtnElem.addEventListener("click", () => deleteUserAccount());
