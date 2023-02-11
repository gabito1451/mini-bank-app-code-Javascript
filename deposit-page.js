const depositAmountElem = document.getElementById("deposit-amount");
const accountPinElem = document.getElementById("account-pin");
const depositForm = document.getElementById("deposit-form");
const depositBtnElem = document.getElementById("submit-btn");
const userAccountPin = getUserByAccountNumber(accountNumber).accountPin;
const userTransactionArr = getUserByAccountNumber(accountNumber).transactions;

const transactionDetails =
  JSON.parse(localStorage.getItem("userTransactionArr")) || [];

transactionDetails.forEach((depositTransaction) => {
  accountBalance += depositTransaction.amount;
});

const deposit = () => {
  if (accountPinElem.value !== userAccountPin) {
    alert("Incorrect PIN.");
    return;
  }
  const depositTransactionDetails = {
    timestamp: new Date(),
    transactionReference: `TR${Date.now()}`,
    type: "Deposit",
    amount: parseInt(depositAmountElem.value),
    balanceAfter: (accountBalance += parseInt(depositAmountElem.value)),
    balanceBefor: (accountBalance -= parseInt(depositAmountElem.value)),
    beneficiaryAccountNumber: "",
  };

  // pushing the depositTransactionDetails in to the transaction array
  transactionDetails.push(depositTransactionDetails);

  localStorage.setItem(
    "userTransactionArr",
    JSON.stringify(transactionDetails)
  );

  // on deposit, move to transaction page
  location.href = "transactions.html";
};
depositForm.addEventListener("submit", () => deposit());
