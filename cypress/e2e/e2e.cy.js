/// <reference types="cypress" />
import perfil from '../fixtures/perfil.json';
import EnderecoPage from '../support/page_objects/endereco.page'


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



    it.only('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {

        cy.get('#username').type(perfil[1].usuario)
        cy.get('#password').type(perfil[1].senha)
        cy.get('.woocommerce-form > .button').click()
        cy.get('.page-title').should('contain', 'Minha conta')

        cy.get('.woocommerce-MyAccount-navigation-link--edit-address > a').click()
        cy.get(':nth-child(1) > .title > .edit').click()

        EnderecoPage.editarEnderecoFaturamento('Maria', 'Geralda', 'Canção Nova', 'Brasil', 'Central', '10', 'Belo Horizonte', 'Minas Gerais', '15778963', '1178549845', 'maria@cancao.com')
        cy.get('.woocommerce-message').should('contain', 'Endereço alterado com sucesso.')

        cy.get(':nth-child(2) > .title > .edit').click()

        EnderecoPage.editarEnderecoEntrega('Maria', 'Geralda', 'Canção Nova', 'Brasil', 'Central', '10', 'Belo Horizonte', 'Minas Gerais', '15778963')
        cy.get('.woocommerce-message').should('contain', 'Endereço alterado com sucesso.')

        cy.get('#primary-menu > .menu-item-629 > a').click()

        cy.addProdutos('Arcadio Gym Short', 32, 'Blue', 2)
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.addProdutos('Argus All-Weather Tank', 'XL', 'Gray', 4)
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.addProdutos('Atlas Fitness Tank', 'XS', 'Blue', 1)
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.addProdutos('Ajax Full-Zip Sweatshirt', 'XL', 'Red', 1)

        cy.get('.dropdown-toggle > .text-skin').click()
        cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .checkout').click()
        cy.get('.woocommerce-billing-fields > h3').should('contain', 'Detalhes de faturamento')
        
        cy.get('#terms').click()
        cy.get('#place_order').click({force: true})
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')


    });

    


})