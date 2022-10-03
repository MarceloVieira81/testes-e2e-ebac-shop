/// <reference types="cypress" />

import EnderecoPage from '../support/page_objects/endereco.page'
const { faker } = require('@faker-js/faker');


context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('minha-conta')
    });

    it('testando faker', () => {
        let nomeFaker = faker.name.firstName()
        let sobrenomeFaker = faker.name.lastName()
        let emailFaker = faker.internet.email(nomeFaker)

        cy.get('#reg_email').type(emailFaker)
        cy.get('.register > :nth-child(2) > label').type('!teste@testes')
        cy.get(':nth-child(4) > .button').click()
        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
        cy.get('#account_first_name').type(nomeFaker)
        cy.get('#account_last_name').type(sobrenomeFaker)
        cy.get('.woocommerce-Button').click()      
    
        cy.get('.woocommerce-MyAccount-navigation-link--edit-address > a').click()
        cy.get(':nth-child(1) > .title > .edit').click()

        EnderecoPage.editarEnderecoFaturamento('Maria', 'Geralda', 'Canção Nova', 'Brasil', 'Central', '10', 'Belo Horizonte', 'Minas Gerais', '15778963', '1178549845', 'maria@cancao.com')
        cy.get('.woocommerce-message').should('contain', 'Endereço alterado com sucesso.')

        cy.get(':nth-child(2) > .title > .edit').click()

        EnderecoPage.editarEnderecoEntrega('Antonio', 'Gonzaga', 'Deposito central', 'Brasil', 'Quintiliano da Silva', '100', 'São Paulo', 'São Paulo', '04841120')
        cy.get('.woocommerce-message').should('contain', 'Endereço alterado com sucesso.')

        cy.get('#primary-menu > .menu-item-629 > a').click()

        cy.addProdutos('Arcadio Gym Short', 32, 'Blue', 2)
        cy.addProdutos('Argus All-Weather Tank', 'XL', 'Gray', 4)
        cy.addProdutos('Atlas Fitness Tank', 'XS', 'Blue', 1)
        cy.addProdutos('Ajax Full-Zip Sweatshirt', 'XL', 'Red', 1)

        cy.get('.dropdown-toggle > .text-skin').click()
        cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .checkout').click()
        cy.get('.woocommerce-billing-fields > h3').should('contain', 'Detalhes de faturamento')

        cy.get('#terms').click()
        cy.get('#place_order').click({ force: true })
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')


    });




})