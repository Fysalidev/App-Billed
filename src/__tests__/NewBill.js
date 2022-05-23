/**
 * @jest-environment jsdom
 */

import { screen } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"


describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("Then it should render a NewBill Page", () => {
      const html = NewBillUI()
      document.body.innerHTML = html
      //to-do write assertion
      const newBillForm = screen.getByTestId('form-new-bill')
      expect(newBillForm).toBeTruthy()
    })
  })

  test("Then it should render 8 entries", () => {
    const html = NewBillUI();
    document.body.innerHTML = html;

    const expenseTypeInput = screen.getByTestId("expense-type");
    expect(expenseTypeInput).toBeTruthy();

    const expenseNameInput = screen.getByTestId("expense-name");
    expect(expenseNameInput).toBeTruthy();

    const datePicker = screen.getByTestId("datepicker");
    expect(datePicker).toBeTruthy();

    const amountInput = screen.getByTestId("amount");
    expect(amountInput).toBeTruthy();

    const vatInput = screen.getByTestId("vat");
    expect(vatInput).toBeTruthy();

    const pctInput = screen.getByTestId("pct");
    expect(pctInput).toBeTruthy();

    const commentary = screen.getByTestId("commentary");
    expect(commentary).toBeTruthy();

    const fileInput = screen.getByTestId("file");
    expect(fileInput).toBeTruthy();
  });

})
