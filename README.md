# Sistema de Gerenciamento de Tarefas em TypeScript

## Descrição

Este projeto implementa um sistema robusto de gerenciamento de tarefas utilizando TypeScript. O sistema permite criar, listar, atualizar e excluir tarefas, além de oferecer funcionalidades avançadas como categorização, filtragem por status e prioridade, e geração de estatísticas.

O projeto foi desenvolvido com foco na aplicação de conceitos avançados de TypeScript, como tipagem estática, interfaces, enums, tipos genéricos e classes.

## Funcionalidades

- ✅ Criação, leitura, atualização e exclusão de tarefas (CRUD)
- 📊 Categorização de tarefas (Trabalho, Pessoal, Estudo, etc.)
- 🔍 Filtragem de tarefas por status, categoria e prioridade
- 📅 Gerenciamento de datas de vencimento e identificação de tarefas atrasadas
- 📈 Geração de estatísticas sobre tarefas
- 🧩 Sistema de logging para monitoramento de operações

## Tecnologias Utilizadas

- TypeScript 5.8.3
- TSX para execução direta de arquivos TypeScript
- Node.js

## Conceitos de TypeScript Demonstrados

- **Interfaces e Types**: Definição de contratos claros para objetos
- **Enums**: Valores constantes nomeados para categorias e status
- **Generics**: Tipos genéricos como `Result<T>` e `FilterFunction<T>`
- **Union Types**: Como o tipo de prioridade `1 | 2 | 3`
- **Utility Types**: Uso de `Partial<T>` e `Omit<T, K>`
- **Classes**: Implementação de serviços e utilitários
- **Access Modifiers**: Propriedades e métodos privados
- **Type Guards**: Verificações de tipo em tempo de execução
- **Padrão Singleton**: Implementado na classe Logger

## Como Executar

1. Clone o repositório

2. Instale as dependências:
npm install

3. Execute o projeto:
npm run dev


## Próximos Passos

- [ ] Adicionar persistência de dados (banco de dados ou armazenamento local)
- [ ] Implementar interface de usuário (UI)
- [ ] Adicionar autenticação e autorização
- [ ] Desenvolver funcionalidade de lembretes e notificações
- [ ] Implementar testes automatizados
