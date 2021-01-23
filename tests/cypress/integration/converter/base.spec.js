/// <reference types="cypress" />

const downloadsFolder = "cypress/downloads";

context("Base", () => {
  it("should compress an image using default settings", () => {
    cy.visit("/");

    cy.get('input[type="file"]').attachFile(["bunny_original.jpg"]);

    cy.get(".files__wrapper").find("td").find("a").click();

    const filename = `${downloadsFolder}/bunny_original.jpg`;
    cy.readFile(filename, "base64", { timeout: 5000 }).should(
      (convertedFile) => {
        cy.fixture("bunny_compressed.jpg").then((targetFile) => {
          expect(convertedFile).to.equal(targetFile);
        });
      }
    );
  });

  it("should rotate an image according to the orientation flag", () => {
    cy.visit("/");

    cy.get('input[type="file"]').attachFile(["shitzu_rotated_original.jpg"]);

    cy.get(".files__wrapper").find("td").find("a").click();

    const filename = `${downloadsFolder}/shitzu_rotated_original.jpg`;
    cy.readFile(filename, "base64", { timeout: 5000 }).should(
      (convertedFile) => {
        cy.fixture("shitzu_rotated_compressed.jpg").then((targetFile) => {
          expect(convertedFile).to.equal(targetFile);
        });
      }
    );
  });
});
