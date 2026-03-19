# 🏺 Atelier Retail - Cadastro de Lojas e Produtos

Sistema premium de gestão patrimonial e inventário para redes de varejo, desenvolvido com foco em alta performance e design sofisticado.

## 🎨 Identidade Visual (Tema Atelier)
O projeto utiliza uma paleta de cores personalizada para transmitir exclusividade e organização:
* **Primária:** Marrom Café (#42362E) para ações principais e botões.
* **Secundária:** Creme Suave (#F9F7F5) para fundos e superfícies.
* **Destaque:** Off-white (#FFFFFF) e tons terrosos para tipografia.

## 🚀 Funcionalidades Principais
* **Gestão de Unidades:** Cadastro e listagem de lojas com endereçamento dinâmico.
* **Controle de Inventário:** Gerenciamento de produtos por unidade, com suporte a preços decimais.
* **Interface Responsiva:** Utilização de Gluestack UI para uma experiência fluida em mobile.
* **Persistência de Dados:** Estado centralizado para garantir integridade das informações entre telas.

## 🛠️ Stack Técnica
* **Framework:** React Native com Expo Router.
* **UI Kit:** Gluestack UI (v2).
* **Linguagem:** TypeScript (100% tipado, sem erros de atribuição).
* **Ícones:** Lucide-react-native.

## 🔧 Ajustes Técnicos Realizados
Durante o desenvolvimento, foram aplicadas correções críticas para garantir a estabilidade:
1.  **TypeScript Refactor:** Correção do erro `ts(2322)` ao converter propriedades de estilo numéricas para tokens de string do Gluestack.
2.  **JSX Integrity:** Resolução de erros de fechamento de tags em componentes complexos de Modal e VStack.
3.  **Data Formatting:** Implementação de tratamento para evitar valores `NaN` em campos de preço, utilizando formatação decimal rigorosa.

## 📦 Como rodar o projeto
1. Clone o repositório:
   ```bash
   git clone [https://github.com/pharchibald/CADASTRO-DE-LOJAS-E-PRODUTOS.git](https://github.com/pharchibald/CADASTRO-DE-LOJAS-E-PRODUTOS.git)