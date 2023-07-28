/// <reference types="Cypress" />
describe('Central de Atendimento ao cliente TAT', function () {
    beforeEach(function () {
        // visita a página que está na pasta src desse projeto
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function () {
        cy.title().should('be.equals', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function () {
        const longText = "Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, "
        cy.get('#firstName').type('Karem')
        cy.get('#lastName').type('Andrade')
        cy.get('#email').type('karem@teste.com.br')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('#firstName').type('Karem')
        cy.get('#lastName').type('Andrade')
        cy.get('#email').type('karem@teste,com')
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('verifica campo telefone vazio quando preenchido com valor não numérico', function () {
        cy.get('#phone')
            .type('texto')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('#firstName').type('Karem')
        cy.get('#lastName').type('Andrade')
        cy.get('#email').type('karem@teste.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName')
            .type('Karem')
            .should('have.value', 'Karem')
            .clear()
            .should('have.value', '')

        cy.get('#lastName')
            .type('Andrade')
            .should('have.value', 'Andrade')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .type('karem@teste.com')
            .should('have.value', 'karem@teste.com')
            .clear()
            .should('have.value', '')

        cy.get('#phone')
            .type('31999999999')
            .should('have.value', '31999999999')
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it.only('envia o formulário com sucesso usando um comando customizado', function () {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })
})