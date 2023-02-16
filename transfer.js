const transferForm = document.getElementById("transfer-form");
const selectBeneficiaryAccountNumberElem = document.getElementById(
  "beneficiary-account-number"
);
const transferAmountElem = document.getElementById("transfer-amount");
const accountPinElem = document.getElementById("account-pin");
const currentUser = getUserByAccountNumber(currentUserAccountNumber);
const allUsers = getAllUsers();
// populate users in our database into the select field and remove the current user account number
allUsers.forEach((user) => {
  for (let i = 0; i < selectBeneficiaryAccountNumberElem.length; i++) {
    if (
      selectBeneficiaryAccountNumberElem.options[i].value ==
      currentUserAccountNumber
    ) {
      selectBeneficiaryAccountNumberElem.remove(i);
    }
  }
  const optionElem = document.createElement("option");
  optionElem.value = user.accountNumber;
  optionElem.textContent = `${user.accountNumber}`;
  selectBeneficiaryAccountNumberElem.append(optionElem);
});

const transfer = () => {
  // get the previous transaction before this one
  const currentBalance = getUserCurrentBalance();

  if (accountPinElem.value !== currentUser.accountPin) {
    alert("Incorrect PIN.");
    return;
  }
  if (transferAmountElem.value > currentBalance) {
    alert("Insufficient Balance");
    return;
  }
  if (transferAmountElem.value < 0) {
    alert("Enter a valid amount");
    return;
  }

  const transactionDetails = {
    timestamp: new Date(),
    transactionReference: `TR${Date.now()}`,
    type: "Transfer",
    amount: parseInt(transferAmountElem.value),
    balanceBefore: currentBalance,
    balanceAfter: currentBalance - parseInt(transferAmountElem.value),
    beneficiaryAccountNumber: selectBeneficiaryAccountNumberElem.value,
  };

  // pushing the depositTransactionDetails in to the transaction array
  const currentUserIndex = getUserIndexByAccountNumber(
    currentUserAccountNumber
  );
  allUsers[currentUserIndex].transactions.push(transactionDetails);

  setLocalStorageArrData("MB_USER_ACCOUNTS", allUsers);

  // on transfer, move to transaction page
  location.href = "transactions.html";
};
transferForm.addEventListener("submit", () => transfer());
