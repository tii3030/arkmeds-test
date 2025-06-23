describe('Página - Empresas', () => {
  beforeEach(() => {
    cy.fixture('mock-companies').then((mockCompanies) => {
      cy.intercept(
        'GET',
        'https://n8ndev.arkmeds.xyz/webhook/14686c31-d3ab-4356-9c90-9fbd2feff9f1/companies',
        {
          statusCode: 200,
          body: mockCompanies,
        }
      ).as('getCompanies');
    });

    cy.visit('http://localhost:3000/companies');
  });

  it('Exibe 12 cards (página inicial)', () => {
    // Verifica se existem exatamente 12 cards visíveis
    cy.get('[data-cy="company-card"]', { timeout: 15000 })
      .should('be.visible')
      .and('have.length', 12); // VERIFICAÇÃO FIXA PARA 12 CARDS
  });
});
 
describe('Página - Empresas (Filtros)', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/companies');
  });

  it('FILTRO - CNPJ', () => {
    cy.fixture('mock-companies').then((mockCompanies) => {
      // Pega o CNPJ do primeiro item (sem formatação)
      const cnpjToFilter = mockCompanies[0].cnpj.replace(/\D/g, '');

      cy.get('input[placeholder="CNPJ"]').type(cnpjToFilter);
      cy.get('[data-cy="company-card"]').should('have.length', 1);
      cy.contains(mockCompanies[0].nome_fantasia).should('be.visible');
    });
  });

  it('FILTRO - NOME FANTASIA', () => {
    cy.fixture('mock-companies').then((mockCompanies) => {
      const nameToFilter = mockCompanies[1].nome_fantasia;

      cy.get('input[placeholder="Nome"]').type(nameToFilter);
      cy.get('[data-cy="company-card"]').should('have.length', 1);
      cy.contains(mockCompanies[1].nome_fantasia).should('be.visible');
    });
  });

  it('FILTRO - Limpa e verificar se os dados originais são exibidos', () => {
    // Aplica e remove filtro
    cy.get('input[placeholder="CNPJ"]').type('1234').clear();
    
    // Verifica que pelo menos 2 empresas estão visíveis
    cy.get('[data-cy="company-card"]').should('have.length.gte', 2);
  });
});

describe('Página - Empresas (Cadastro)', () => {
  const mockCNPJData = {
    cnpj: "22168141000150",
    nomeFantasia: "ARKMEDS",
    razaoSocial: "ARKMEDS SOLUCOES TECNOLOGICAS LTDA",
    descricaoSituacaoCadastral: "ATIVA",
    logradouro: "PROFESSOR JOSE VIEIRA DE MENDONCA",
    numero: "45",
    bairro: "ENGENHO NOGUEIRA",
    complemento: "LOJA 1E3",
    municipio: "BELO HORIZONTE",
    uf: "MG",
    cep: "31310-260",
    codigoMunicipioIbge: 3106200
  };

  beforeEach(() => {
    cy.intercept('POST', 'https://api.arkmeds.com/cnpj', (req) => {
      req.reply({
        statusCode: 200,
        body: mockCNPJData
      });
    }).as('cnpjLookup');
    
    cy.visit('http://localhost:3000/companies');
  });
  
  it('MODAL - Autopreenchimento via CNPJ', () => {

    cy.contains('Cadastrar').click();
    cy.contains('Cadastro de Empresa').should('be.visible');

    cy.contains('label', 'CNPJ')
      .parent()
      .find('input')
      .type('22168141000150', { force: true });
    
    cy.wait('@cnpjLookup');

    cy.get('[data-cy="form-razao_social"]').find('input').should('have.value', mockCNPJData.razaoSocial);
    cy.get('[data-cy="form-nome_fantasia"]').find('input').should('have.value', mockCNPJData.nomeFantasia);
    cy.get('[data-cy="form-cep"]').find('input').should('have.value', mockCNPJData.cep);
    cy.get('[data-cy="form-estado"]').find('input').should('have.value', mockCNPJData.uf);
    cy.get('[data-cy="form-municipio"]').find('input').should('have.value', mockCNPJData.municipio);
    cy.get('[data-cy="form-logradouro"]').find('input').should('have.value', mockCNPJData.logradouro);
    cy.get('[data-cy="form-numero"]').find('input').should('have.value', mockCNPJData.numero);
    cy.get('[data-cy="form-complemento"]').find('textarea').should('have.value', mockCNPJData.complemento);

    cy.get('[data-cy="close-modal"]').click();
    cy.contains('Cadastro de Empresa').should('not.exist');
  });
});