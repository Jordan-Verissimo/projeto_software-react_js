# Guia de Testes - Projeto Hidden Bloom

## Estrutura de Testes

```
src/
├── services/
│   ├── api.js
│   └── __tests__/
│       └── api.test.js
├── pages/
│   ├── Login.jsx
│   └── __tests__/
│       └── Login.test.jsx
├── app/components/
│   ├── GoldButton.tsx
│   └── __tests__/
│       └── GoldButton.test.tsx
├── hooks/
│   ├── useCounter.js
│   └── __tests__/
│       └── useCounter.test.js
└── setupTests.js
```

## Ferramentas Utilizadas

- **Jest**: Framework de testes (padrão Create React App)
- **React Testing Library**: Utilitário para testes de componentes
- **Testing Library User Event**: Simulação de eventos do usuário

Todas as ferramentas já estão pré-instaladas via Create React App.

## Comandos de Teste

### Executar testes em watch mode
```bash
npm test
```

Atalhos disponíveis em watch mode:
- `a` - Executar todos os testes
- `p` - Filtrar por nome de arquivo
- `t` - Filtrar por nome de teste
- `q` - Sair
- `u` - Atualizar snapshots
- `Enter` - Reexecutar testes

### Executar testes uma única vez
```bash
npm test -- --watchAll=false
```

### Gerar relatório de cobertura
```bash
npm run test:coverage
```

Resultado: Abre relatório HTML em `coverage/lcov-report/index.html`

### Executar testes em CI/CD
```bash
npm run test:ci
```

Executa testes uma única vez com cobertura (sem watch mode).

### Executar testes específicos
```bash
npm test api.test.js
npm test -- --testNamePattern="autenticar"
```

## Cobertura Esperada

| Arquivo | Branches | Functions | Lines | Statements |
|---------|----------|-----------|-------|------------|
| Global | 50% | 50% | 50% | 50% |
| api.js | 80% | 80% | 80% | 80% |

Visualizar cobertura detalhada:
```bash
npm run test:coverage
# Abrir coverage/lcov-report/index.html no navegador
```

## Testes Implementados

### 1. src/services/__tests__/api.test.js (24 testes)

**Função autenticar():**
- Validação de credenciais válidas
- Validação de login não existente
- Validação de senha inválida
- Bloqueio após 3 tentativas
- Reset de tentativas após login bem-sucedido
- Validação de usuário bloqueado
- Múltiplos perfis (ADMIN, PROFESSOR, ALUNO)
- Não expõe senha no resultado
- Validação de parâmetros obrigatórios

**Função alterarSenha():**
- Validação de comprimento mínimo
- Sucesso na alteração
- Reset de primeiroAcesso
- Persistência de nova senha
- Login com nova senha
- Erro com senha antiga
- Validação de parâmetros obrigatórios

### 2. src/pages/__tests__/Login.test.jsx (11 testes)

- Renderização do formulário
- Campos de input (email/login e senha)
- Botão de envio
- Atualização de estado ao digitar
- Mensagens de erro em credenciais inválidas
- Resetamento de erros ao editar
- Styling correto (classes do projeto)

### 3. src/app/components/__tests__/GoldButton.test.tsx (13 testes)

- Renderização com texto correto
- Types de button (button, submit)
- Disparar onClick ao clicar
- Variants (primary, ghost, danger)
- Estado desabilitado
- Não dispara onClick quando desabilitado
- Classes customizadas
- Conteúdo React como children
- Acessibilidade (aria-label)
- Múltiplos cliques

### 4. src/hooks/__tests__/useCounter.test.js (9 testes)

- Inicialização com valor padrão
- Inicialização com valor customizado
- Incremento/decremento
- Reset para valor inicial
- Funções memoizadas
- Mudanças de prop

## Executar Testes Individuais

```bash
# Apenas testes de email
npm test api.test.js

# Apenas testes de Login
npm test Login.test.jsx

# Apenas testes de GoldButton
npm test GoldButton.test.tsx

# Apenas um teste específico
npm test -- --testNamePattern="autenticar"
```

## Fluxo Red-Green-Refactor

1. **RED**: Escrever teste que falha
   ```bash
   npm test Login.test.jsx
   # Teste falha ❌
   ```

2. **GREEN**: Implementar código mínimo para passar
   ```javascript
   // Implementar funcionalidade
   ```

3. **REFACTOR**: Melhorar implementação
   ```javascript
   // Refatorar código mantendo testes verdes
   ```

## Best Practices Aplicadas

- Testes no padrão AAA (Arrange, Act, Assert)
- Mock de localStorage entre testes
- Cleanup automático de estado
- User events (não disparos diretos)
- Queries acessíveis (getByRole, getByText)
- Testes de segurança (credenciais não expostas)
- Testes de comportamento (não implementação)

## Troubleshooting

### Teste falha com "Cannot find module"
```bash
# Atualizar dependências
npm install
# Reexecutar testes
npm test
```

### Snapshots desatualizados
```bash
# Em watch mode, pressionar "u"
# Ou executar
npm test -- -u
```

### Timeout em testes assíncronos
```javascript
// Aumentar timeout (padrão: 5000ms)
jest.setTimeout(10000);
test('teste assíncrono', async () => {
  // ...
});
```

### Erro de import no teste
Verificar:
- Caminho relativo correto
- Extensão de arquivo (.js, .jsx, .ts, .tsx)
- Função/componente é exportado corretamente

## Integração com CI/CD

Para usar em pipelines (GitHub Actions, GitLab CI, etc):

```bash
npm run test:ci
# Gera coverage automaticamente
```

## Próximos Passos

1. Adicionar testes para Dashboard.jsx
2. Implementar E2E com Cypress
3. Aumentar cobertura global para 80%
4. Adicionar testes de snapshot para componentes UI
5. Configurar GitHub Actions com CI/CD
