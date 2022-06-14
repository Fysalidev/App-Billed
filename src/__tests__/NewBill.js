/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";
import { screen, fireEvent, getByTestId, waitFor } from "@testing-library/dom";
import mockStore from "../__mocks__/store.js";
import NewBill from "../containers/NewBill.js";
import { ROUTES, ROUTES_PATH } from "../constants/routes.js";
import { localStorageMock } from "../__mocks__/localStorage.js";
import router from "../app/Router.js";
import Bills from "../containers/Bills.js";

jest.mock("../app/Store", () => mockStore);

describe("When I am on NewBill Page", () => {
  beforeEach(() => {
    Object.defineProperty(window, "localStorage", { value: localStorageMock });
    window.localStorage.setItem(
      "user",
      JSON.stringify({
        type: "Employee",
      })
    );
    const root = document.createElement("div");
    root.setAttribute("id", "root");
    document.body.append(root);
    router();
  });

  test("Then mail icon on verticallayout should be highlighted", async () => {
    window.onNavigate(ROUTES_PATH.NewBill);
    await waitFor(() => screen.getByTestId("icon-mail"));
    const Icon = screen.getByTestId("icon-mail");
    expect(Icon).toHaveClass("active-icon");
  });

  describe ("When I am on NewBill form", () => {
    test("Then I add File", async () => {
      const dashboard = new NewBill({
        document,
        onNavigate,
        store: mockStore,
        localStorage: localStorageMock,
      });
  
      const handleChangeFile = jest.fn(dashboard.handleChangeFile);
      const inputFile = screen.getByTestId("file");
      inputFile.addEventListener("change", handleChangeFile);
      fireEvent.change(inputFile, {
        target: {
          files: [
            new File(["document.jpg"], "document.jpg", {
              type: "document/jpg",
            }),
          ],
        },
      });
  
      expect(handleChangeFile).toHaveBeenCalled();
      expect(handleChangeFile).toBeCalled();
      expect(screen.getByText("Envoyer une note de frais")).toBeTruthy();
    });
  })
});

/* Api */
describe("When I am on NewBill Page and submit the form", () => {
  beforeEach(() => {
    jest.spyOn(mockStore, "bills");
    Object.defineProperty(window, "localStorage", { value: localStorageMock });
    window.localStorage.setItem(
      "user",
      JSON.stringify({
        type: "Employee",
        email: "a@a",
      })
    );
    const root = document.createElement("div");
    root.setAttribute("id", "root");
    document.body.appendChild(root);
    router();
  });

  describe("user submit form valid", () => {
    test("call api update bills", async () => {
      const newBill = new NewBill({
        document,
        onNavigate,
        store: mockStore,
        localeStorage: localStorageMock,
      });
      const handleSubmit = jest.fn(newBill.handleSubmit);
      const form = screen.getByTestId("form-new-bill");
      form.addEventListener("submit", handleSubmit);
      fireEvent.submit(form);
      expect(mockStore.bills).toHaveBeenCalled();
    });
  });
});
