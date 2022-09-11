describe('MainPage 접속', () => {
  it('visit Main Page', () => {
    cy.visit('/');
  });

  it('hihi찾기', () => {
    cy.contains('hihi');
  });
});
