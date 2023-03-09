const localhost = "http://localhost:8081";

describe("Navigation Bar", () => {
  it("Go to Home page", () => {
    cy.visit(localhost);
    cy.viewport(1280, 720);
    cy.get("#home").click();
  }),
    it("Go to Contact page", () => {
      cy.visit(localhost);
      cy.viewport(1280, 720);
      cy.get("#contact").click();
      cy.url().should("include", "/contact");
    }),
    it("Click on nuxi logo and back to Home page", () => {
      cy.visit(localhost);
      cy.viewport(1280, 720);
      cy.get("#logo").click();
    });
});
