class selectors {
  email() {
    return cy.get("#email-input");
  }
  password() {
    return cy.get("#password-input");
  }
  loginButton() {
    return cy.get("button").contains("Login");
  }
  counterBtn(number) {
    return cy.get(
      `[style="width: 600px; padding: 20px; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px; text-align: center; background-color: white; border-radius: 8px;"] > div > :nth-child(${number})`
    );
  }
  logoutButton() {
    return cy.get(
      '[style="width: 600px; padding: 20px; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px; text-align: center; background-color: white; border-radius: 8px;"] > :nth-child(4)'
    );
  }
}
export default selectors;
