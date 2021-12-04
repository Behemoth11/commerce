describe("side bar should open and close", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  console.log(process.env.VERCEL_URL);

  it("side should toggle", () => {
    cy.viewport(500, 480);

    cy.get("#burger").click();
    cy.get("#side_nav").should("be.visible");

    cy.get("#close_side").click();
    cy.get("#side_nav").should("not.be.visible");
  });

  it("should close when click on overlay", () => {
    cy.viewport(500, 480);

    cy.get("#burger").click();
    cy.get("#overlay").click();

    cy.get("#side_nav").should("not.be.visible")
  });
});
