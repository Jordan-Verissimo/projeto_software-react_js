# Análise de Segurança - Autenticação Hidden Bloom

## 1. Implementação Atual

### Método: Autenticação Básica com localStorage

```
Cliente (React) ──login/senha──→ API (localStorage) ──validação──→ Browser
                                                         ↓
                                              userData em Context
```

**Fluxo Atual:**
1. Usuário insere login/senha no formulário (Login.jsx)
2. Credenciais enviadas para api.autenticar()
3. Validação contra dados em localStorage
4. Se OK: retorna `{ id, nome, login, perfil, primeiroAcesso }`
5. User state armazenado em React Context (memória)

---

## 2. Avaliação de Segurança

### ✅ Pontos Positivos

| Prática | Implementação |
|---------|---------------|
| **Rate Limiting** | MAX_LOGIN_ATTEMPTS = 3 |
| **Account Lockout** | Bloqueio automático após 3 falhas |
| **Password Length** | Mínimo 6 caracteres |
| **Clean Data Return** | Nunca expõe senha nas respostas |
| **Input Validation** | Verifica login && senha obrigatórios |

### ⚠️ Vulnerabilidades Críticas

| Risco | Severidade | Descrição |
|-------|-----------|-----------|
| **Plaintext Passwords** | 🔴 CRÍTICA | Senhas armazenadas sem hash em localStorage |
| **Sem Criptografia** | 🔴 CRÍTICA | Dados sensíveis em plaintext no browser |
| **localStorage Vulnerável** | 🔴 CRÍTICA | XSS pode acessar todos os dados |
| **Sem Token JWT** | 🟠 ALTA | Sem stateless authentication |
| **Sem HTTPS** | 🟠 ALTA | Em produção: dados trafegam em plaintext |
| **Sem Refresh Tokens** | 🟠 ALTA | Sessão indefinida |
| **Sem CSRF Protection** | 🟠 ALTA | Requisições cross-site vulneráveis |

---

## 3. Comparação: Autenticação Básica vs JWT vs OAuth 2.0

### Autenticação Básica (Atual)

```javascript
// api.js - Implementação
const user = users.find(x => x.login === login);
if (user.senha !== senha) throw new Error('Password wrong');
return { id, nome, login, perfil };
```

**Pros:**
- Simples de implementar
- Sem dependências externas
- Bom para prototipagem

**Contras:**
- Senhas em plaintext ❌
- Sem escalabilidade
- Sem refresh logic
- Tudo no client

---

### JWT (JSON Web Token) - Recomendado

```javascript
// Backend (Node.js/Express) - Melhor prática
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

app.post('/login', (req, res) => {
  const user = findUserByLogin(req.body.login);
  
  // Verificar password com hash
  if (!bcrypt.compareSync(req.body.senha, user.senhaHash)) {
    return res.status(401).json({ erro: 'Invalid' });
  }
  
  // Gerar JWT
  const token = jwt.sign(
    { id: user.id, perfil: user.perfil },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  
  res.json({ accessToken: token, refreshToken: ... });
});

// Frontend (React)
localStorage.setItem('accessToken', response.accessToken);

// Headers nas requisições
fetch('/api/dados', {
  headers: { 'Authorization': `Bearer ${token}` }
});
```

**Estrutura JWT:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJpZCI6IjEiLCJwZXJmaWwiOiJBRE1JTiIsImlhdCI6MTcxNDMwMDAwMH0.
signature...

Header: { alg: "HS256", typ: "JWT" }
Payload: { id: "1", perfil: "ADMIN", iat: 1714300000 }
```

**Pros:**
- ✅ Stateless (não precisa servidor guardar sessão)
- ✅ Escalável (funciona com múltiplos servidores)
- ✅ Seguro (assinatura + expiração)
- ✅ Tokens com validade

**Contras:**
- Token revogação complexa
- Requer backend para validação
- Maior complexidade

---

### OAuth 2.0 - Para Terceiros

```javascript
// Login com Google/GitHub
import { GoogleLogin } from '@react-oauth/google';

export function LoginOAuth() {
  const handleSuccess = (response) => {
    // response.credential = JWT do Google
    const payload = jwtDecode(response.credential);
    // { email, picture, sub (ID), ... }
    
    // Enviar para backend
    fetch('/api/login-oauth', {
      method: 'POST',
      body: JSON.stringify({ googleToken: response.credential })
    });
  };

  return <GoogleLogin onSuccess={handleSuccess} />;
}
```

**Comparação Segurança:**

| Aspecto | Básica | JWT | OAuth 2.0 |
|--------|--------|-----|----------|
| **Armazenamento** | localStorage | localStorage | OAuth provider |
| **Password Storage** | Plaintext | Hash + Salt | N/A (terceiro) |
| **Revogação** | Hard | Complexa | Fácil |
| **Escalabilidade** | Baixa | Alta | Alta |
| **Phishing Risk** | Alto | Médio | Baixo |
| **Complexidade** | Baixa | Média | Alta |

---

## 4. Recomendações Prioritárias

### 🔴 **P1 - Crítico** (Implementar Imediato)

```javascript
// 1. HASH de Senhas com bcryptjs
import bcrypt from 'bcryptjs';

// Ao cadastrar
const senhaHash = bcrypt.hashSync(senha, 10);

// Na seed
{
  id: '1',
  login: 'admin',
  senhaHash: bcrypt.hashSync('123456', 10), // ✓ Nunca plaintext
}

// Na autenticação
const validoSenha = bcrypt.compareSync(senha, user.senhaHash);
```

### 🟠 **P2 - Alto** (Próximas 2 Semanas)

```javascript
// 2. Implementar JWT Token
async function autenticar(login, senha) {
  // ... validações ...
  
  const token = jwt.sign(
    { id: user.id, perfil: user.perfil },
    process.env.REACT_APP_JWT_SECRET,
    { expiresIn: '24h' }
  );
  
  return {
    accessToken: token,
    refreshToken: gerarRefreshToken(),
    user: { id, nome, perfil }
  };
}
```

### 🟡 **P3 - Médio** (Implementar em Produção)

```javascript
// 3. Melhorar Rate Limiting
// Usar biblioteca: express-ratelimit ou similar

import rateLimit from 'express-rate-limit';

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // 5 tentativas
  message: 'Muitas tentativas de login, tente depois',
  standardHeaders: true,
  legacyHeaders: false,
});

app.post('/login', loginLimiter, async (req, res) => {
  // handler
});
```

---

## 5. Implementação Segura Mínima (Para Produção)

```javascript
// ✅ Backend com Segurança Básica
/* api.js refatorado */

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SENHA_MIN_LENGTH = 8; // Aumentado de 6
const MAX_LOGIN_ATTEMPTS = 5;
const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRY = '24h';

export async function autenticar(login, senha) {
  if (!login || !senha) throw new Error('Login e senha obrigatórios');
  
  const users = db.get('usuarios', []);
  const user = users.find(x => x.login === login);
  
  if (!user) throw new Error('Credenciais inválidas');
  if (user.bloqueado) throw new Error('Conta bloqueada temporariamente');
  
  // ✅ Comparar com hash, não plaintext
  const senhaValida = bcrypt.compareSync(senha, user.senhaHash);
  
  if (!senhaValida) {
    user.tentativasFalhas++;
    if (user.tentativasFalhas >= MAX_LOGIN_ATTEMPTS) {
      user.bloqueado = true;
      user.dataDesbloqueio = Date.now() + 30 * 60 * 1000; // 30 min
    }
    db.set('usuarios', users);
    throw new Error('Credenciais inválidas');
  }
  
  // ✅ Reset tentativas
  user.tentativasFalhas = 0;
  db.set('usuarios', users);
  
  // ✅ Gerar token JWT
  const token = jwt.sign(
    { id: user.id, perfil: user.perfil },
    JWT_SECRET,
    { expiresIn: TOKEN_EXPIRY }
  );
  
  return {
    accessToken: token,
    user: { id: user.id, nome: user.nome, perfil: user.perfil }
  };
}

export async function alterarSenha(userId, novaSenha) {
  if (novaSenha.length < SENHA_MIN_LENGTH) {
    throw new Error(`Senha mínimo ${SENHA_MIN_LENGTH} caracteres`);
  }
  
  const users = db.get('usuarios', []);
  const user = users.find(x => x.id === userId);
  
  if (!user) throw new Error('Usuário não encontrado');
  
  // ✅ HASH da nova senha
  user.senhaHash = bcrypt.hashSync(novaSenha, 10);
  user.primeiroAcesso = false;
  db.set('usuarios', users);
  
  return true;
}
```

---

## 6. Checklist de Segurança

- [ ] Enviar credenciais APENAS via HTTPS
- [ ] Senhas com hash bcrypt (salt: 10+)
- [ ] JWT com expiração (1-24h)
- [ ] Refresh tokens para renovação
- [ ] CORS configurado corretamente
- [ ] CSP (Content Security Policy) headers
- [ ] CSRF tokens em formulários
- [ ] Input sanitization (XSS prevention)
- [ ] SQL Injection prevention
- [ ] Rate limiting implementado
- [ ] Audit logs de tentativas falhas
- [ ] 2FA (Two-Factor Authentication) opcional
- [ ] Logout revoga sessão

---

## 7. Referências

**Arquivos Relacionados:**
- [src/services/api.js](src/services/api.js) - Lógica de autenticação
- [src/contexts/AuthContext.jsx](src/contexts/AuthContext.jsx) - Context de auth
- [src/pages/Login.jsx](src/pages/Login.jsx) - Formulário de login
- [src/services/storage.js](src/services/storage.js) - Armazenamento localStorage

**Links Úteis:**
- [JWT Best Practices](https://tools.ietf.org/html/rfc8949)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [OAuth 2.0 Flow](https://tools.ietf.org/html/rfc6749)

---

## Conclusão

**Status Atual:** ⚠️ **NÃO SEGURO PARA PRODUÇÃO**
- Prototipagem/Desenvolvimento: ✅ Aceitável
- Produção: ❌ Múltiplas vulnerabilidades críticas

**Ação Recomendada:** Implementar JWT + Hash de senhas antes de qualquer deployment público.

---

**Última Atualização:** 9 de Abril de 2026
**Status da Segurança:** Em Desenvolvimento
**Nível de Prioridade:** 🔴 CRÍTICO
