const profileForm = document.getElementById("profile-form");
const accountNameElem = document.getElementById("account-name");
const accountNumberElem = document.getElementById("account-number");
const changePinElem = document.getElementById("change-pin");
const currentPinElem = document.getElementById("current-pin");
const newPinElem = document.getElementById("new-pin");
const confirmNewPinElem = document.getElementById("confirm-new-pin");
const closeBtnElem = document.getElementById("close-btn");
const updateBtnElem = document.getElementById("update-btn");
const closeBtnConfirmationElem = document.getElementById(
  "confirm-close-btn-action"
);
const yesCloseBtn = document.getElementById("yes");
const dontCloseBtn = document.getElementById("no");

const pinUpdateSection = document.getElementById("pin-update-section");

const allUsers = getAllUsers();
const currentUserIndex = getUserIndexByAccountNumber(currentUserAccountNumber);
// display of aaccount number
accountNumberElem.value = currentUserAccountNumber;
accountNameElem.value = allUsers[currentUserIndex].accountName;

function togglePinChangeSectionDisplay() {
  if (changePinElem.checked == true) {
    pinUpdateSection.style.display = "block";
    currentPinElem.setAttribute("required", true);
    newPinElem.setAttribute("required", true);
    confirmNewPinElem.setAttribute("required", true);
  } else {
    pinUpdateSection.style.display = "none";
    currentPinElem.setAttribute("required", false);
    newPinElem.setAttribute("required", false);
    confirmNewPinElem.setAttribute("required", false);
  }
}

changePinElem.addEventListener("click", () => togglePinChangeSectionDisplay());

function updateForm() {
  allUsers[currentUserIndex].accountName = accountNameElem.value;

  // You need to check that user is updating PIN before you update it, otherwise, it will be updated to empty string
  if (
    changePinElem.checked == true &&
    currentPinElem.value !== allUsers[currentUserIndex].accountPin
  ) {
    alert("Pin Incorrect");
    return;
  }
  if (
    changePinElem.checked == true &&
    newPinElem.value !== confirmNewPinElem.value
  ) {
    alert("passwords do not match");
    return;
  }
  if (
    changePinElem.checked == true &&
    confirmNewPinElem.value == allUsers[currentUserIndex].accountPin
  ) {
    alert("use a different password for update");
  }
  if (changePinElem.checked == true && newPinElem.value == " ") {
    newPinElem.value = allUsers[currentUserIndex].accountPin;
  }
  if (
    changePinElem.checked == true &&
    newPinElem.value === confirmNewPinElem.value
  ) {
    allUsers[currentUserIndex].accountPin = newPinElem.value;
  }

  localStorage.setItem("MB_USER_ACCOUNTS", JSON.stringify(allUsers));
  // location.href = "transactions.html";
}
updateBtnElem.addEventListener("click", () => updateForm());

function closeUserAccount() {
  if ((closeBtnConfirmationElem.style.display = "none")) {
    closeBtnConfirmationElem.style.display = "block";
  }
  closeBtnElem.style.display = "none";
}
closeBtnElem.addEventListener("click", () => closeUserAccount());

function confirmCloseUserAccount() {
  const registeredUsers = localStorage.getItem("MB_USER_ACCOUNTS");
  const usersArray = JSON.parse(registeredUsers);
  const index = getUserIndexByAccountNumber(currentUserAccountNumber);
  usersArray.splice(index, 1);
  const remainingRegisteredUsers = JSON.stringify(usersArray);
  localStorage.setItem("MB_USER_ACCOUNTS", remainingRegisteredUsers);
  location.href = "/";
}
yesCloseBtn.addEventListener("click", () => confirmCloseUserAccount());

function doNotConfirmCloseUserAccount() {
  if ((closeBtnConfirmationElem.style.display = "block")) {
    closeBtnConfirmationElem.style.display = "none";
  }
  closeBtnElem.style.display = "block";
}
dontCloseBtn.addEventListener("click", () => doNotConfirmCloseUserAccount());
