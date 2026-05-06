# Hidden Bloom API Documentation

## 📋 Documentação OpenAPI/Swagger

Esta documentação descreve todos os endpoints da API Hidden Bloom, suportando Web (React 19) e Mobile (React Native).

### 🌐 Acessar Documentação Interativa

#### Opção 1: Editor Online do Swagger (Recomendado)
1. Abra: https://editor.swagger.io/
2. Selecione: **File** → **Import URL**
3. Cole a URL do seu servidor (quando em produção):
   ```
   https://api.hidden-bloom.com/v1/openapi.yaml
   ```
4. Ou use a versão local de desenvolvimento

#### Opção 2: Visualizar Arquivo Local
- Arquivo: `openapi.yaml` na raiz do projeto
- Abra em: https://editor.swagger.io

#### Opção 3: Integrar com Aplicação
```bash
# Instalar dependência Swagger UI
npm install swagger-ui-express

# Ou para React
npm install swagger-ui-react
```

---

## 🔐 Autenticação

Todos os endpoints (exceto `/auth/login`) requerem JWT Bearer Token.

### Fluxo de Autenticação:

```
1. POST /auth/login
   ├─ Entrada: { login, senha }
   └─ Saída: { accessToken, user }

2. Usar token em próximas requisições
   Header: Authorization: Bearer <accessToken>

3. Token expira em 24 horas
   └─ POST /auth/refresh-token para renovar
```

### Exemplo de Requisição Autenticada (cURL):

```bash
curl -X GET "https://api.hidden-bloom.com/v1/usuario/perfil" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## 📚 Principais Endpoints

### 🔐 Autenticação

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/auth/login` | Autenticar com login/senha |
| POST | `/auth/logout` | Sair e revogar token |
| POST | `/auth/refresh-token` | Renovar token expirado |
| POST | `/auth/change-password` | Alterar senha |

### 💓 Biometria (Neuro-Perfumery)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/biometria/leitura` | Registrar leitura (VFC/BPM/EDA) |
| GET | `/biometria/atual` | Última leitura do usuário |
| GET | `/biometria/historico` | Histórico de 24h (paginável) |
| GET | `/biometria/estado-emocional` | Análise de estado & recomendação |

### 👤 Usuário

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/usuario/perfil` | Obter dados do usuário |
| PUT | `/usuario/perfil` | Atualizar perfil |
| GET | `/usuario/favoritos` | Lista de perfumes favoritos |
| POST | `/usuario/favoritos` | Adicionar perfume favorito |
| DELETE | `/usuario/favoritos/{id}` | Remover perfume favorito |

### 🌸 Catálogo Perfumes

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/perfumes/catalogo` | Listar todos os perfumes |
| GET | `/perfumes/{id}` | Detalhes de um perfume |

### ⚙️ Admin

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/admin/usuarios` | Listar todos os usuários |
| POST | `/admin/usuarios/{id}/desbloquear` | Desbloquear usuário |

---

## 📊 Modelo de Dados

### Usuario
```json
{
  "id": "1",
  "login": "admin@loreal.com",
  "nome": "Administrator",
  "perfil": "ADMIN",
  "primeiroAcesso": false,
  "bloqueado": false,
  "dataCriacao": "2026-04-01T10:00:00Z",
  "dataUltimoAcesso": "2026-04-09T15:30:00Z"
}
```

### Biometria
```json
{
  "id": "bio-12345",
  "usuarioId": "1",
  "vfc": 58,          // Variabilidade Frequência Cardíaca (20-120)
  "bpm": 74,          // Batimentos Por Minuto (45-140)
  "eda": 0.15,        // Galvanic Skin Response (0.05-0.4)
  "estado": "BALANCED",
  "timestamp": "2026-04-09T15:30:00Z"
}
```

### Perfume
```json
{
  "id": "perf-001",
  "nome": "Equilibre Zen",
  "origem": "L'Oréal Luxe - Coleção Matcha",
  "camadaNota": "MIDDLE",
  "descricao": "Amadeirado Terroso com Matcha & Sandalo",
  "ingredientes": ["Matcha", "Sandalo", "Amadeira Suave"]
}
```

---

## 🧪 Exemplo de Fluxo Completo (Web/Mobile)

### 1️⃣ Login
```bash
curl -X POST "https://api.hidden-bloom.com/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "login": "aluno@hidden-bloom.com",
    "senha": "S3nh4Fort3!"
  }'

# Resposta:
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI...",
  "user": {
    "id": "5",
    "login": "aluno@hidden-bloom.com",
    "nome": "João das Flores",
    "perfil": "ALUNO"
  }
}
```

### 2️⃣ Registrar Leitura Biométrica
```bash
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI..."

curl -X POST "https://api.hidden-bloom.com/v1/biometria/leitura" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "vfc": 65,
    "bpm": 72,
    "eda": 0.18
  }'

# Resposta:
{
  "id": "bio-54321",
  "usuarioId": "5",
  "vfc": 65,
  "bpm": 72,
  "eda": 0.18,
  "estado": "BALANCED",
  "timestamp": "2026-04-09T15:30:00Z"
}
```

### 3️⃣ Obter Análise de Estado Emocional
```bash
curl -X GET "https://api.hidden-bloom.com/v1/biometria/estado-emocional" \
  -H "Authorization: Bearer $TOKEN"

# Resposta:
{
  "estado": "BALANCED",
  "descricao": "Equilibrado para uso ideal",
  "cor": "#2d6a4f",
  "recomendacaoPerfume": "Jasmin d'Eveil",
  "dosagem": 70
}
```

### 4️⃣ Listar Perfumes Disponíveis
```bash
curl -X GET "https://api.hidden-bloom.com/v1/perfumes/catalogo" \
  -H "Authorization: Bearer $TOKEN"

# Resposta: array de perfumes
```

### 5️⃣ Adicionar Perfume aos Favoritos
```bash
curl -X POST "https://api.hidden-bloom.com/v1/usuario/favoritos" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"perfumeId": "perf-001"}'
```

### 6️⃣ Logout
```bash
curl -X POST "https://api.hidden-bloom.com/v1/auth/logout" \
  -H "Authorization: Bearer $TOKEN"

# Resposta: 204 No Content
```

---

## 🛡️ Segurança & Limitações

### Taxa Limite (Rate Limiting)
- Login: Max 3 tentativas falhadas → bloqueio 30 minutos
- Requisições geral: 100 por minuto por IP

### Validação de Dados
| Campo | Restrição |
|-------|-----------|
| VFC | 20 - 120 |
| BPM | 45 - 140 |
| EDA | 0.05 - 0.4 |
| Senha | Mín. 6 caracteres, hashed com bcryptjs |
| Token JWT | Validade 24h, pode ser renovado |

### Headers de Segurança
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
Access-Control-Allow-Origin: *
```

---

## 📱 Integração Mobile (React Native)

### Exemplo com Fetch API
```javascript
// Login
const response = await fetch('https://api.hidden-bloom.com/v1/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    login: 'usuario@loreal.com',
    senha: 'S3nh@'
  })
});

const { accessToken } = await response.json();
// Armazenar em AsyncStorage
await AsyncStorage.setItem('accessToken', accessToken);

// Usar em requisições subsequentes
const biometria = await fetch('https://api.hidden-bloom.com/v1/biometria/leitura', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ vfc: 65, bpm: 72, eda: 0.18 })
});
```

### Exemplo com Axios + React Native
```javascript
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'https://api.hidden-bloom.com/v1'
});

// Interceptor para adicionar token
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Usar
const { data } = await api.post('/auth/login', {
  login: 'usuario@loreal.com',
  senha: 'S3nh@'
});
```

---

## 💻 Integração Web (React 19)

### Exemplo com Context API + Fetch
```javascript
// AuthContext.jsx
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    // Recuperar token salvo
    const token = localStorage.getItem('accessToken');
    if (token) setAccessToken(token);
  }, []);

  const login = async (login, senha) => {
    const res = await fetch('https://api.hidden-bloom.com/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login, senha })
    });
    const { accessToken, user } = await res.json();
    localStorage.setItem('accessToken', accessToken);
    setAccessToken(accessToken);
    setUser(user);
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, login }}>
      {children}
    </AuthContext.Provider>
  );
}
```

---

## 🚀 Deploy & Ambiente

### Variáveis de Ambiente
```env
# .env.development
REACT_APP_API_URL=http://localhost:3000/api

# .env.production
REACT_APP_API_URL=https://api.hidden-bloom.com/v1
```

### Endpoints por Ambiente
| Ambiente | URL |
|----------|-----|
| Desenvolvimento | `http://localhost:3000/api` |
| Staging | `https://staging-api.hidden-bloom.com/v1` |
| Produção | `https://api.hidden-bloom.com/v1` |

---

## 📖 Recursos Adicionais

- **Swagger Editor**: https://editor.swagger.io/
- **OpenAPI Spec**: https://spec.openapis.org/
- **JWT.io**: https://jwt.io/ (debug tokens)
- **L'Oréal Luxe Docs**: [referencia interna]

---

## ❓ FAQ

**P: Como obtém token JWT?**
R: Faça login em `/auth/login` com credenciais válidas. O token é retornado na resposta e válido por 24h.

**P: Token expirou. O que fazer?**
R: Use `/auth/refresh-token` para gerar novo token mantendo a sessão ativa.

**P: Qual é o estado emocional baseado em quê?**
R: Cálculo automático a partir de VFC, BPM e EDA, com recomendação de perfume correspondente.

**P: Posso acessar dados de outro usuário?**
R: Não. Cada endpoint retorna apenas dados do usuário autenticado (exceto ADMIN).

**P: Integração no Swagger UI local?**
R: Ver seção "Acessar Documentação Interativa".

---

## 🎯 Próximas Etapas

- [ ] Implementar rate limiting completo
- [ ] Adicionar suporte a OAuth 2.0
- [ ] PostgreSQL migration scripts
- [ ] GitHub Actions CI/CD para testes de API
- [ ] E2E testing com Postman/Insomnia
- [ ] Documentação de erros detalhada (HTTP status codes)

---

**Última atualização:** 09/04/2026  
**Versão API:** 1.0.0  
**Status:** ✅ Produção  
