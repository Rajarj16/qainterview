import selectors from "../support/pages/selectors";
const {
  validEmail,
  validPassword,
  invalidEmail,
  invalidPassword,
} = require("../fixtures/login.json");
const config = Cypress.config();

const loginSelectors = new selectors();

Cypress.Commands.add("login", () => {
  loginSelectors.email().type(validEmail, { delay: 100 });
  loginSelectors.password().type(validPassword, { delay: 100 });
  loginSelectors.loginButton().click();
});

describe("Login Functionality", () => {
  beforeEach(() => {
    cy.visit(config.baseUrl);
  });

  it("should login successfully and redirect to home page", () => {
    cy.login();
    cy.url().should("include", "/");
  });

  it("should display an error message for incorrect credentials", () => {
    loginSelectors.email().type(invalidEmail, { delay: 100 });
    loginSelectors.password().type(invalidPassword, { delay: 100 });
    loginSelectors.loginButton().click();

    cy.url().should("include", "/login");

    cy.get("p")
      .should("be.visible")
      .and("contain", "Invalid email or password. Try again.");
  });
});

describe("Counter Application", () => {
  beforeEach(() => {
    cy.visit(config.baseUrl);
    cy.login();
    cy.url().should("include", "/");
  });

  it("should increment counter correctly", () => {
    cy.get("p").should("have.text", "0");

    loginSelectors.counterBtn(1).click();
    cy.wait(1000);
    cy.get("p").should("have.text", "1");

    loginSelectors.counterBtn(1).click();
    cy.wait(1000);
    cy.get("p").should("have.text", "2");
  });

  it("should decrement counter correctly", () => {
    cy.get("p").should("have.text", "0");

    loginSelectors.counterBtn(1).click();
    cy.wait(1000);
    loginSelectors.counterBtn(1).click();
    cy.wait(1000);
    cy.get("p").should("have.text", "2");

    loginSelectors.counterBtn(2).click();
    cy.wait(1000);
    cy.get("p").should("have.text", "1");

    loginSelectors.counterBtn(2).click();
    cy.wait(1000);
    cy.get("p").should("have.text", "0");
  });

  it("should reset counter correctly", () => {
    loginSelectors.counterBtn(1).click();
    cy.wait(1000);
    loginSelectors.counterBtn(1).click();
    cy.wait(1000);
    loginSelectors.counterBtn(1).click();
    cy.wait(1000);
    cy.get("p").should("have.text", "3");

    loginSelectors.counterBtn(3).click();
    cy.wait(1000);
    cy.get("p").should("have.text", "0");
  });
});

describe("Logout Functionality", () => {
  beforeEach(() => {
    cy.visit(config.baseUrl);
    cy.login();
    cy.url().should("not.include", "/login");
  });

  it("should logout successfully and redirect to login page", () => {
    loginSelectors.logoutButton().click();
    cy.url().should("include", "/login");
  });

  it("should not allow access to home page when not logged in", () => {
    loginSelectors.logoutButton().click();
    cy.visit(config.baseUrl);
    cy.url().should("include", "/login");
  });
});
