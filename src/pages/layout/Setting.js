import InputBox from "../../components/InputBox";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Setting() {
  const [selectedTab, setSelectedTab] = useState("Category");
  const [categoryForm, setCategoryForm] = useState({
    id: "",
    categoryName: "",
    moneyType: "",
  });
  const [categoryList, setCategoryList] = useState([]);
  const [showHideCategoryForm, setShowHideCategoryForm] = useState(false);
  const [showHideCategoryList, setShowHideCategoryList] = useState(false);

  const [addWallet, setAddWallet] = useState({
    id: "",
    walletName: "",
    currency: "",
    openingBalance: "",
    incomeCategories: "",
    expenseCategories: "",
  });
  const [walletList, setWalletList] = useState([]);
  const [showHideWalletForm, setShowHideWalletForm] = useState(false);
  const [showHideWalletList, setShowHideWalletList] = useState(false);
  const [incomeCategoryList, setIncomeCategoryList] = useState([]);
  const [expenseCategoryList, setExpenseCategoryList] = useState([]);
  const [showHide, setShowHide] = useState(false);
  const [selectedTabModal, setSelectedTabModal] = useState("IncomeCategory");
  const [incomeExpenseCategory, setIncomeExpenseCategory] = useState({
    incomeCategoryNames: [],
    expenseCategoryNames: [],
  });

  useEffect(() => {
    getCategoryList();
    getWalletList();
    getIncomeData();
    getExpenseData();
  }, []);

  function tabName(tabName) {
    setSelectedTab(tabName);
  }

  /* =============================================================================================== */

  function getCategoryList() {
    let getUserDetails = JSON.parse(localStorage.getItem("userDetails"));
    let userDetails = { id: getUserDetails.id };

    fetch("http://localhost:3000/categories?userId=" + userDetails.id)
      .then((response) => response.json())
      .then((categoryList) => {
        setCategoryList(categoryList);
        setShowHideCategoryList(true);
        setShowHideCategoryForm(false);
      });
  }

  function onInputChange(event) {
    let targetName = event.target.name;
    let targetValue = event.target.value;
    setCategoryForm({ ...categoryForm, [targetName]: targetValue });
  }

  function saveCategory() {
    let getUserDetails = JSON.parse(localStorage.getItem("userDetails"));
    categoryForm.userId = getUserDetails.id;

    if (categoryForm.id == "") {
      fetch("http://localhost:3000/categories", {
        method: "POST",
        body: JSON.stringify(categoryForm),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then(() => {
          getCategoryList();
        });
    } else {
      fetch("http://localhost:3000/categories/" + categoryForm.id, {
        method: "PUT",
        body: JSON.stringify(categoryForm),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then(() => {
          getCategoryList();
        });
    }
    clearCategoryForm();
  }

  function editCategory(id) {
    fetch("http://localhost:3000/categories/" + id)
      .then((response) => response.json())
      .then((responseData) => {
        setCategoryForm(responseData);
        setShowHideCategoryList(false);
        setShowHideCategoryForm(true);
      });
  }

  function deleteCategory(id) {
    fetch("http://localhost:3000/categories/" + id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then(() => {
        getCategoryList();
      });
  }

  function clearCategoryForm() {
    setCategoryForm({
      id: "",
      categoryName: "",
      moneyType: "",
    });
  }

  function addCategory() {
    setShowHideCategoryList(false);
    setShowHideCategoryForm(true);
  }

  function backToCategoryList() {
    setShowHideCategoryList(true);
    setShowHideCategoryForm(false);
    clearCategoryForm();
  }

  /* =============================================================================================== */

  function onChangeWallet(event) {
    let targetName = event.target.name;
    let targetValue = event.target.value;
    setAddWallet({ ...addWallet, [targetName]: targetValue });
  }

  function saveWallet() {
    if (addWallet.walletName == "") {
      toast("wallet name is required");
      return;
    }

    if (addWallet.currency == "") {
      toast("currency is required");
      return;
    }

    if (addWallet.openingBalance == "") {
      toast("opening balance is required");
      return;
    }

    if (addWallet.incomeCategories == "") {
      toast("income category is required");
      return;
    }

    if (addWallet.expenseCategories == "") {
      toast("expense category is required");
      return;
    }

    let getUserDetails = JSON.parse(localStorage.getItem("userDetails"));
    addWallet.userId = getUserDetails.id;

    fetch("http://localhost:3000/wallet", {
      method: "POST",
      body: JSON.stringify(addWallet),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then(() => {
        getWalletList();
        clearWalletForm();
        toast("save successfully");
        setShowHideWalletForm(false);
        setShowHideWalletList(true);
      });
  }

  function incomeDropdownInputChange(selectedData) {
    let incomeCategoriesValue = selectedData.map((x, index) => {
      return x.value;
    });
    addWallet.incomeCategories = incomeCategoriesValue;
    setAddWallet(addWallet);
  }

  function expenseDropdownInputChange(selectedData) {
    let expenseCategoriesValue = selectedData.map((x, index) => {
      return x.value;
    });
    addWallet.expenseCategories = expenseCategoriesValue;
    setAddWallet(addWallet);
  }

  function getIncomeData() {
    let getUserDetails = JSON.parse(localStorage.getItem("userDetails"));
    let userDetails = { id: getUserDetails.id };

    fetch(
      "http://localhost:3000/categories?moneyType=Income" +
        "&userId=" +
        userDetails.id
    )
      .then((response) => response.json())
      .then((categoryList) => {
        let incomeList = categoryList.map((x, index) => {
          return { value: x.id, label: x.categoryName };
        });
        setIncomeCategoryList(incomeList);
      });
  }

  function getExpenseData() {
    let getUserDetails = JSON.parse(localStorage.getItem("userDetails"));
    let userDetails = { id: getUserDetails.id };

    fetch(
      "http://localhost:3000/categories?moneyType=Expense" +
        "&userId=" +
        userDetails.id
    )
      .then((response) => response.json())
      .then((categoryList) => {
        let expenseList = categoryList.map((x, index) => {
          return { value: x.id, label: x.categoryName };
        });
        setExpenseCategoryList(expenseList);
      });
  }

  function clearWalletForm() {
    setAddWallet({
      id: "",
      walletName: "",
      openingBalance: "",
      currency: "",
      incomeCategories: "",
      expenseCategories: "",
    });
  }

  function onShowHideWalletForm() {
    setShowHideWalletForm(true);
    setShowHideWalletList(false);
  }

  function backToWalletList() {
    setShowHideWalletForm(false);
    setShowHideWalletList(true);
    clearWalletForm();
  }

  function getWalletList() {
    let getUserDetails = JSON.parse(localStorage.getItem("userDetails"));
    let userDetails = { id: getUserDetails.id };

    fetch("http://localhost:3000/categories")
      .then((response) => response.json())
      .then((categoriesList) => {
        fetch("http://localhost:3000/wallet?userId=" + userDetails.id)
          .then((response) => response.json())
          .then((responseDataWalletList) => {
            let filterIncomes = categoriesList.filter(
              (x) => x.moneyType == "Income"
            );
            let filterExpense = categoriesList.filter(
              (x) => x.moneyType == "Expense"
            );

            responseDataWalletList.map((singleWallet, index) => {
              let incomeCategoryNames = [];
              let expenseCategoryNames = [];
              // ==========================IncomeCategory==========================
              singleWallet.incomeCategories.map((incomeCategoryId, index) => {
                let findName = filterIncomes.find(
                  (s) => s.id === incomeCategoryId
                );
                incomeCategoryNames.push(findName.categoryName);
              });
              // ==========================ExpenseCategory==========================
              singleWallet.expenseCategories.map((expenseCategoryId, index) => {
                let findName = filterExpense.find(
                  (s) => s.id === expenseCategoryId
                );
                expenseCategoryNames.push(findName.categoryName);
              });
              // ===================================================================
              singleWallet.incomeCategoryNames = incomeCategoryNames;
              singleWallet.expenseCategoryNames = expenseCategoryNames;
            });
            setWalletList(responseDataWalletList);
          });
        setShowHideWalletList(true);
        setShowHideWalletForm(false);
      });
  }

  function onClose() {
    setShowHide(false);
  }

  function onShow(walletId) {
    setShowHide(true);
    let selectedWallet = walletList.find((x) => x.id == walletId);
    let selectedWalletIncomeCategoryNames = selectedWallet.incomeCategoryNames;
    let selectedWalleteExpenseCategoryNames = selectedWallet.expenseCategoryNames;
    setIncomeExpenseCategory({
      incomeCategoryNames: selectedWalletIncomeCategoryNames,
      expenseCategoryNames: selectedWalleteExpenseCategoryNames,
    });
  }

  function collabTabName(tabName) {
    setSelectedTabModal(tabName);
  }

  function editWallet(id) {
    
    fetch("http://localhost:3000/wallet/" + id)
      .then((response) => response.json())
      .then((responseData) => {
        
        let selectedWallet = walletList.find((x) => x.id == id);
        let selectedWalletIncomeCategoryNames =
          selectedWallet.incomeCategoryNames;
        let selectedWalleteExpenseCategoryNames =
          selectedWallet.expenseCategoryNames;

        responseData.incomeCategories = selectedWalletIncomeCategoryNames;
        responseData.expenseCategories = selectedWalleteExpenseCategoryNames;
        setAddWallet(responseData);
        setShowHideWalletForm(true);
        setShowHideWalletList(false);
        console.log(responseData);
      });
  }

  function deleteWallet(id) {
    fetch("http://localhost:3000/wallet/" + id, {
      method: "DELETE",
      body: JSON.stringify(addWallet),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then(() => {
        getWalletList();
        toast("wallet deleted");
      });
  }

  return (
    <>
      <Modal show={showHide} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <b>All Categories</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div id="accordion">
            <div className="card">
              <button
                className="card-header"
                onClick={() => collabTabName("IncomeCategory")}
              >
                <div
                  className={
                    selectedTabModal == "IncomeCategory"
                      ? "btn btn-sm "
                      : "btn btn-sm collapsed"
                  }
                  data-toggle="collapse"
                  data-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  <h6>Income Categories</h6>
                </div>
              </button>

              <div
                id="collapseOne"
                className={
                  selectedTabModal == "IncomeCategory"
                    ? "collapse show"
                    : "collapse"
                }
                aria-labelledby="headingOne"
                data-parent="#accordion"
              >
                <div className="card-body btn btn-sm">
                  <ul>
                    {incomeExpenseCategory.incomeCategoryNames.map(
                      (z, index) => {
                        return <li>{z}</li>;
                      }
                    )}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="card">
              <button
                className="card-header"
                onClick={() => collabTabName("ExpenseCategory")}
              >
                <div
                  className={
                    selectedTabModal == "ExpenseCategory"
                      ? "btn btn-sm"
                      : "btn btn-sm collapsed"
                  }
                  data-toggle="collapse"
                  data-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  <h6>Expense Categories</h6>
                </div>
              </button>
              <div
                id="collapseTwo"
                className={
                  selectedTabModal == "ExpenseCategory"
                    ? "collapse show"
                    : "collapse"
                }
                aria-labelledby="headingTwo"
                data-parent="#accordion"
              >
                <div className="card-body btn btn-sm">
                  <ul>
                    {incomeExpenseCategory.expenseCategoryNames.map(
                      (z, index) => {
                        return <li>{z}</li>;
                      }
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-secondary btn-sm"
            onClick={() => onClose()}
            btnText="Close"
          />
          <Button className="btn btn-info btn-sm" btnText="Save Changes" />
        </Modal.Footer>
      </Modal>
      <br />
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <button
            className={
              selectedTab == "Category" ? "nav-link active" : "nav-link"
            }
            id="nav-home-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-home"
            type="button"
            role="tab"
            aria-controls="nav-home"
            aria-selected="true"
            onClick={() => tabName("Category")}
          >
            Add Categories
          </button>
          <button
            className={
              selectedTab == "Add Wallet" ? "nav-link active" : "nav-link"
            }
            id="nav-profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-profile"
            type="button"
            role="tab"
            aria-controls="nav-profile"
            aria-selected="false"
            onClick={() => tabName("Add Wallet")}
          >
            Add Wallet
          </button>
        </div>
      </nav>

      <div className="tab-content" id="nav-tabContent">
        <div
          className={
            selectedTab == "Category"
              ? "tab-pane fade show active"
              : "tab-pane fade"
          }
          id="nav-home"
          role="tabpanel"
          aria-labelledby="nav-home-tab"
        >
          <br />
          {showHideCategoryForm == true && (
            <div className="container">
              <div className="col-12">
                <Button
                  className="btn btn-info btn-sm"
                  onClick={() => backToCategoryList()}
                  btnText="Back"
                />
                <br />
                <br />
                <InputBox
                  type="text"
                  name="categoryName"
                  value={categoryForm.categoryName}
                  placeholder="Category Name"
                  onChange={(event) => onInputChange(event)}
                />
                <br />
                <input
                  type="radio"
                  name="moneyType"
                  value="Income"
                  checked={categoryForm.moneyType === "Income"}
                  onChange={(event) => onInputChange(event)}
                />
                Income
                <br />
                <input
                  type="radio"
                  name="moneyType"
                  value="Expense"
                  checked={categoryForm.moneyType === "Expense"}
                  onChange={(event) => onInputChange(event)}
                />
                Expense
                <br />
                <br />
                <Button
                  className="form-control btn btn-info btn-sm"
                  onClick={() => saveCategory()}
                  btnText="Save"
                />
              </div>
            </div>
          )}
          {showHideCategoryList == true && (
            <div className="container">
              <div className="col-12">
                <Button
                  className="btn btn-info btn-sm"
                  onClick={() => addCategory()}
                  btnText="Add Category"
                />
                <br />
                <br />
                <table className="table">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Category Name</th>
                      <th>Money Type</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryList.map((x, index) => {
                      return (
                        <tr key={index}>
                          <th>{x.id}</th>
                          <td>{x.categoryName}</td>
                          <td>{x.moneyType}</td>
                          <td>
                            <div className="btn-group">
                              <Button
                                className="btn btn-info btn-sm"
                                onClick={() => editCategory(x.id)}
                                btnText="Edit"
                              />
                              <Button
                                className="btn btn-danger btn-sm"
                                onClick={() => deleteCategory(x.id)}
                                btnText="Delete"
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
        {/* ===========================CategoryTab========================== */}

        <div
          className={
            selectedTab == "Add Wallet"
              ? "tab-pane fade show active"
              : "tab-pane fade"
          }
          id="nav-profile"
          role="tabpanel"
          aria-labelledby="nav-profile-tab"
        >
          <br />
          {showHideWalletForm == true && (
            <div className="container">
              <div className="col-12">
                <Button
                  btnText="Back"
                  className="btn btn-info btn-sm"
                  onClick={() => backToWalletList()}
                />
                <br />
                <br />
                <div className="row">
                  <div className="col">
                    <InputBox
                      type="text"
                      name="walletName"
                      value={addWallet.walletName}
                      placeholder="Wallet Name"
                      onChange={(event) => onChangeWallet(event)}
                    />
                  </div>
                  <div className="col">
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <select
                          name="currency"
                          className="form-control  input-group-text"
                          value={addWallet.currency}
                          onChange={(event) => onChangeWallet(event)}
                        >
                          <option value="">🪙</option>
                          <option value="INR">INR</option>
                          <option value="EURO">EURO</option>
                          <option value="USD">USD</option>
                        </select>
                      </div>
                      <InputBox
                        type="number"
                        name="openingBalance"
                        value={addWallet.openingBalance}
                        placeholder="Opening Balance"
                        onChange={(event) => onChangeWallet(event)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <CreatableSelect
                      isMulti
                      onChange={(selectedData) =>
                        incomeDropdownInputChange(selectedData)
                      }
                      options={incomeCategoryList}
                      name="incomeCategory"
                      placeholder="Income Category"
                    />
                  </div>
                  <div className="col">
                    <CreatableSelect
                      isMulti
                      onChange={(selectedData) =>
                        expenseDropdownInputChange(selectedData)
                      }
                      options={expenseCategoryList}
                      name="expenseCategory"
                      placeholder="Expense Category"
                    />
                  </div>
                </div>
                <br />
                <Button
                  className="form-control btn btn-info btn-sm"
                  onClick={() => saveWallet()}
                  btnText="Save"
                />
              </div>
            </div>
          )}
          {showHideWalletList == true && (
            <div className="container">
              <div className="col-12">
                <Button
                  btnText="Add Wallet"
                  className="btn btn-info btn-sm"
                  onClick={() => onShowHideWalletForm()}
                />
                <br />
                <br />
                <table className="table">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Wallet Name</th>
                      <th>Opening Balance</th>
                      <th>Currency</th>
                      <th>Categories</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {walletList.map((x, index) => {
                      return (
                        <tr key={index}>
                          <th>{x.id}</th>
                          <td>{x.walletName}</td>
                          <td>{x.openingBalance}</td>
                          <td>{x.currency}</td>
                          <td>
                            <Button
                              className="btn btn-info btn-sm"
                              onClick={() => onShow(x.id)}
                              btnText="Show Categories"
                            />
                          </td>
                          <td>
                            <div className="btn-group">
                              <Button
                                className="btn btn-info btn-sm"
                                onClick={() => editWallet(x.id)}
                                btnText="Edit"
                              />
                              <Button
                                className="btn btn-danger btn-sm"
                                onClick={() => deleteWallet(x.id)}
                                btnText="Delete"
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
        {/* ===========================WalletTab========================== */}
      </div>
      <ToastContainer />
    </>
  );
}

export default Setting;
