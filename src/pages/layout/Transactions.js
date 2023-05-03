import InputBox from "../../components/InputBox";
import Button from "../../components/Button";
import { useEffect, useState } from "react";

function Transactions() {
  const [addTransactionForm, setAddTransactionForm] = useState({
    id: "",
    currencyType: "",
    amount: "",
    walletName: "",
    incomeCategory: "",
    expenseCategory: "",
    date: "",
  });
  const [walletNameList, setWalletNameList] = useState([]);
  const [transactionList, setTransactionList] = useState([]);
  const [showHideTransactionForm, setShowHideTransactionForm] = useState(false);
  const [showHideTransactionList, setShowHideTransactionList] = useState(false);

  useEffect(() => {
    getWalletList();
    getIncomExpenseListOnWalletName();
    getTransactionList();
    setShowHideTransactionList(true);
    setShowHideTransactionForm(false);
  }, []);

  function getWalletList() {
    let getUserDetails = JSON.parse(localStorage.getItem("userDetails"));
    let userDetails = { id: getUserDetails.id };

    fetch("http://localhost:3000/wallet?userId=" + userDetails.id)
      .then((response) => response.json())
      .then((responseData) => {
        setWalletNameList(responseData);
      });
  }

  function getIncomExpenseListOnWalletName() {
    let getUserDetails = JSON.parse(localStorage.getItem("userDetails"));
    let userDetails = { id: getUserDetails.id };

    fetch("http://localhost:3000/wallet?userId=" + userDetails.id)
      .then((response) => response.json())
      .then((responseData) => {
        debugger;
      });
  }

  function onChangeTransaction(event) {
    let targetName = event.target.name;
    let targetValue = event.target.value;
    setAddTransactionForm({ ...addTransactionForm, [targetName]: targetValue });
  }

  function saveTransaction() {
    let getUserDetails = JSON.parse(localStorage.getItem("userDetails"));
    addTransactionForm.userId = getUserDetails.id;

    fetch("http://localhost:3000/transactions", {
      method: "POST",
      body: JSON.stringify(addTransactionForm),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((responseData) => {
        setShowHideTransactionForm(false);
        setShowHideTransactionList(true);
        clearTransactionForm();
        getTransactionList();
      });
  }

  function getTransactionList() {
    let getUserDetails = JSON.parse(localStorage.getItem("userDetails"));
    let userDetails = { id: getUserDetails.id };

    fetch("http://localhost:3000/transactions?userId=" + userDetails.id)
      .then((response) => response.json())
      .then((responseData) => {
        setTransactionList(responseData);
      });
  }

  function addTransaction() {
    setShowHideTransactionForm(true);
    setShowHideTransactionList(false);
  }

  function backToTransactionList() {
    setShowHideTransactionForm(false);
    setShowHideTransactionList(true);
    clearTransactionForm();
  }

  function clearTransactionForm() {
    setAddTransactionForm({
      id: "",
      currencyType: "",
      amount: "",
      walletName: "",
      incomeCategory: "",
      expenseCategory: "",
      date: "",
    });
  }

  return (
    <>
      {/* <div className={dropdownMenuShow ? "dropdown" : "dropdown show"}>
        <button
          className="btn btn-secondary btn-sm dropdown-toggle"
          type="button"
          id="dropdownMenu2"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          onClick={() => showDropdownMenu()}
        >
          Categories
        </button>
        <div
          className={dropdownMenuShow ? "dropdown-menu" : "dropdown-menu show"}
          aria-labelledby="dropdownMenu2"
        >
          <h6 className="dropdown-header">IncomeCategory</h6>
          <option className="dropdown-item">Salary</option>
          <option className="dropdown-item">Other Income</option>
          <option className="dropdown-item">Gift</option>
          <option className="dropdown-item">Rent</option>
          <div className="dropdown-divider"></div>
          <h6 className="dropdown-header">ExpenseCategory</h6>
          <option className="dropdown-item">Clothes</option>
          <option className="dropdown-item">Mobile</option>
          <option className="dropdown-item">ATM Withdraw</option>
          <option className="dropdown-item">Laptop</option>
        </div>
      </div> */}

      {showHideTransactionForm == true && (
        <div className="container">
          <div className="col-12">
            <br />
            <div class="row g-3">
              <div class="col">
                <Button
                  className="btn btn-info btn-sm"
                  onClick={() => backToTransactionList()}
                  btnText="Back"
                />
              </div>
              <div class="col">
                <h5 className="text-center">
                  <b>ADD TRANSACTION</b>
                </h5>
              </div>
              <div class="col"></div>
            </div>
            <br />
            <div className="row">
              <div className="row">
                <div className="col">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <select
                        name="currencyType"
                        className="form-control  input-group-text"
                        value={addTransactionForm.currencyType}
                        onChange={(event) => onChangeTransaction(event)}
                      >
                        <option value="">🪙</option>
                        <option value="INR">INR</option>
                        <option value="EURO">EURO</option>
                        <option value="USD">USD</option>
                      </select>
                    </div>
                    <InputBox
                      type="number"
                      name="amount"
                      value={addTransactionForm.amount}
                      placeholder="Amount"
                      onChange={(event) => onChangeTransaction(event)}
                    />
                  </div>
                </div>
                <div className="col">
                  <select
                    name="walletName"
                    className="form-control"
                    value={addTransactionForm.walletName}
                    onChange={(event) => onChangeTransaction(event)}
                  >
                    <option value="">Wallet Name</option>
                    {walletNameList.map((x, index) => {
                      return (
                        <>
                          <option key={index} value={x.id}>
                            {x.walletName}
                          </option>
                        </>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <select
                    name="incomeCategory"
                    className="form-control"
                    value={addTransactionForm.incomeCategory}
                    // onChange={(event) => onChangeTransaction(event)}
                  >
                    <option value="">Income Category</option>
                    <option value="INR">INR-₹</option>
                  </select>
                </div>

                <div className="col">
                  <select
                    name="expenseCategory"
                    className="form-control"
                    value={addTransactionForm.expenseCategory}
                    // onChange={(event) => onChangeTransaction(event)}
                  >
                    <option value="">Expense Category</option>
                    <option value="INR">INR-₹</option>
                  </select>
                </div>

                <div className="col">
                  <InputBox
                    type="date"
                    name="date"
                    value={addTransactionForm.date}
                    onChange={(event) => onChangeTransaction(event)}
                  />
                </div>
              </div>
            </div>
            <br />
            <Button
              className="form-control btn btn-info btn-sm"
              onClick={() => saveTransaction()}
              btnText="Save"
            />
          </div>
        </div>
      )}
      {/* ===========================TransactionForm========================== */}
      <br />
      {showHideTransactionList == true && (
        <div className="container">
          <div className="col-12">
            <div class="row g-3">
              <div class="col">
                <Button
                  className="btn btn-info btn-sm"
                  onClick={() => addTransaction()}
                  btnText="Add Transaction"
                />
              </div>
              <div class="col">
                <h5 className="text-center">
                  <select className="btn btn-sm btn-info">
                    <option value="">Select Wallet</option>
                    <option value="Siraj">Siraj</option>
                    <option value="MHR">MHR</option>
                    <option value="FAZ">FAZ</option>
                    <option value="SRJ">SRJ</option>
                  </select>
                </h5>
              </div>
              <div class="col"></div>
            </div>
            <br />
            {transactionList.map((x, index) => {
              return (
                <div className="card mb-3">
                  <div className="card-header">
                    <div class="row g-3">
                      <div class="col">
                        <h6 className="text-center">{x.date}</h6>
                      </div>
                      <div class="col"></div>
                      <div class="col"></div>
                      <div class="col"></div>
                      <div class="col"></div>
                      <div class="col"></div>
                      <div class="col"></div>
                      <div class="col"></div>

                      <div class="col">
                        <h6 className="text-center">₹{x.amount}</h6>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <blockquote className="blockquote mb-0">
                      {/* Category Name */}
                      <p className="text-success">{x.incomeCategory}</p>
                      <p className="text-danger">{x.expenseCategory}</p>
                      <footer className="blockquote-footer">{x.amount}</footer>
                    </blockquote>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* ===========================TransactionList========================== */}
    </>
  );
}

export default Transactions;
