# Modelagem de Dados - Hidden Bloom Platform

## 1. Diagrama Entidade-Relacionamento (MER)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         HIDDEN BLOOM - MER                             │
└─────────────────────────────────────────────────────────────────────────┘

                              ┌──────────────┐
                              │   USUARIO    │
                              ├──────────────┤
                              │ id (PK)      │◄──── 1:N ────┐
                              │ login        │              │
                              │ nome         │              │
                              │ perfil       │              │
                              │ senhaHash    │              │
                              │ primeiroAcesso
                              │ bloqueado    │              │
                              │ tentativasFalhas
                              │ dataCriacao  │              │
                              │ dataUltimAcesso
                              └──────────────┘              │
                                                             │
                              ┌──────────────────────────────┤
                              │ 1:N                          │
                              ▼                              │
                        ┌──────────────┐                    │
                        │  BIOMETRIA   │                    │
                        ├──────────────┤                    │
                        │ id (PK)      │                    │
                        │ usuarioId(FK)│◄───────────────────┘
                        │ vfc          │
                        │ bpm          │
                        │ eda          │
                        │ timestamp    │
                        └──────────────┘

                        ┌──────────────────┐
                        │ SESSAO_JWT       │
                        ├──────────────────┤
                        │ id (PK)          │
                        │ usuarioId (FK)   │◄─┐
                        │ token            │  │
                        │ expiresAt        │  │
                        │ revokedAt        │  │
                        │ criadoEm         │  │
                        └──────────────────┘  │
                            1:N               │
                             │                │
                             └─────────────────┘ USUARIO

                        ┌──────────────────┐
                        │ PERFUME          │
                        ├──────────────────┤
                        │ id (PK)          │
                        │ nome             │
                        │ origem           │
                        │ camadaNota       │
                        │ descricao        │
                        └──────────────────┘

       ┌─────────────────┬──────────────────┬──────────────────┐
       │ M:N             │ M:N              │ 1:1              │
       ▼                 ▼                  ▼
┌────────────────┐  ┌────────────────┐  ┌─────────────────┐
│ USUARIO_PERFIL │  │ ESTADO_EMOCION │  │ DISPOSITIVO      │
├────────────────┤  ├────────────────┤  ├─────────────────┤
│ usuarioId (FK) │  │ id (PK)        │  │ id (PK)         │
│ perfumeId (FK) │  │ estado         │  │ usuarioId(FK)   │
│ dataAdicao     │  │ descricao      │  │ model           │
│ notaPreferida  │  │ cor            │  │ os              │
└────────────────┘  │ dosagem        │  │ versionApp      │
                    └────────────────┘  │ ultimaLeitura   │
                                        └─────────────────┘
```

---

## 2. Entidades e Atributos

### 2.1 USUARIO
| Atributo | Tipo | Restr. | Descrição |
|----------|------|--------|-----------|
| **id** | String(UUID) | PK | Identificador único |
| **login** | String(50) | UNIQUE, NOT NULL | E-mail ou login |
| **nome** | String(100) | NOT NULL | Nome completo |
| **senhaHash** | String(255) | NOT NULL | Hash bcrypt da senha |
| **perfil** | ENUM | NOT NULL | ADMIN, PROFESSOR, ALUNO |
| **primeiroAcesso** | Boolean | DEFAULT: true | Flag primeiro acesso |
| **bloqueado** | Boolean | DEFAULT: false | Bloqueado por tentativas |
| **tentativasFalhas** | Integer | DEFAULT: 0 | Contador de falhas |
| **dataCriacao** | DateTime | NOT NULL | Data de cadastro |
| **dataUltimoAcesso** | DateTime | NULL | Último login |

**Exemplo:**
```json
{
  "id": "1",
  "login": "admin@loreal.com",
  "nome": "Admin",
  "perfil": "ADMIN",
  "primeiroAcesso": true,
  "bloqueado": false,
  "tentativasFalhas": 0
}
```

---

### 2.2 BIOMETRIA
| Atributo | Tipo | Restr. | Descrição |
|----------|------|--------|-----------|
| **id** | String(UUID) | PK | Identificador único |
| **usuarioId** | String(UUID) | FK, NOT NULL | Referência usuário |
| **vfc** | Float | NOT NULL | Variabilidade Frequência Cardíaca (20-120) |
| **bpm** | Integer | NOT NULL | Batimentos Por Minuto (45-140) |
| **eda** | Float | NOT NULL | Atividade Elétrica Derme (0.05-0.4) |
| **estado** | String | NOT NULL | HIGH_STRESS, ALERT, BALANCED |
| **timestamp** | DateTime | NOT NULL | Data/hora leitura |

**Exemplo:**
```json
{
  "id": "bio-12345",
  "usuarioId": "1",
  "vfc": 58,
  "bpm": 74,
  "eda": 0.15,
  "estado": "BALANCED",
  "timestamp": "2026-04-09T15:30:00Z"
}
```

**Lógica de Estado:**
```
if (vfc < 45 OR eda > 0.28)       → HIGH_STRESS
if (bpm > 110 OR eda > 0.22)      → ALERT  
else                              → BALANCED
```

---

### 2.3 SESSAO_JWT
| Atributo | Tipo | Restr. | Descrição |
|----------|------|--------|-----------|
| **id** | String(UUID) | PK | ID da sessão |
| **usuarioId** | String(UUID) | FK, NOT NULL | Referência usuário |
| **token** | String(2048) | NOT NULL | JWT assinado |
| **expiresAt** | DateTime | NOT NULL | Expiração token |
| **revokedAt** | DateTime | NULL | NULL = ativo |
| **criadoEm** | DateTime | NOT NULL | Data criação |

---

### 2.4 PERFUME (Catálogo)
| Atributo | Tipo | Restr. | Descrição |
|----------|------|--------|-----------|
| **id** | String(UUID) | PK | ID perfume |
| **nome** | String(100) | UNIQUE, NOT NULL | Nome L'Oréal |
| **origem** | String(50) | NOT NULL | Linha/coleção |
| **camadaNota** | String | NOT NULL | TOP, MIDDLE, BASE |
| **descricao** | Text | NOT NULL | Descrição aromática |

**Exemplo:**
```json
{
  "id": "perf-001",
  "nome": "Equilibre Zen",
  "origem": "Colecao Matcha",
  "camadaNota": "MIDDLE",
  "descricao": "Amadeirado Terroso - Matcha & Sandalo"
}
```

---

### 2.5 ESTADO_EMOCIONAL
| Atributo | Tipo | Restr. | Descrição |
|----------|------|--------|-----------|
| **id** | String(UUID) | PK | ID estado |
| **estado** | String(50) | UNIQUE, NOT NULL | HIGH_STRESS, ALERT, BALANCED |
| **descricao** | String(255) | NOT NULL | Descrição estado |
| **cor** | String(7) | NOT NULL | Cor hex #RRGGBB |
| **dosagem** | Integer | DEFAULT: 70 | % de difusão |

---

### 2.6 DISPOSITIVO
| Atributo | Tipo | Restr. | Descrição |
|----------|------|--------|-----------|
| **id** | String(UUID) | PK | ID dispositivo |
| **usuarioId** | String(UUID) | FK, UNIQUE, NOT NULL | 1 dispositivo por usuário |
| **model** | String | NOT NULL | Espec. hardware |
| **os** | String(50) | NOT NULL | iOS, Android, Web |
| **versionApp** | String(10) | NOT NULL | Versão app |
| **ultimaLeitura** | DateTime | NULL | Última biometria |

---

## 3. Relacionamentos

### 3.1 USUARIO → BIOMETRIA (1:N)
- Um usuário gera múltiplas leituras biométricas
- **Cardinalidade:** 1 usuário : N biometrias
- **Integridade:** ON DELETE CASCADE (limpar biometrias)

### 3.2 USUARIO → SESSAO_JWT (1:N)
- Um usuário pode ter múltiplas sessões ativas
- **Cardinalidade:** 1 usuário : N sessões
- **Integridade:** ON DELETE CASCADE (revogar sessões)

### 3.3 USUARIO → DISPOSITIVO (1:1)
- Um usuário registra um único dispositivo
- **Cardinalidade:** 1 usuário : 1 dispositivo
- **Integridade:** ON DELETE CASCADE

### 3.4 USUARIO → PERFUME (M:N)
- Um usuário tem múltiplos perfumes favoritos
- **Cardinalidade:** N usuários : M perfumes
- **Tabela de junção:** USUARIO_PERFUM (usuarioId, perfumeId, dataAdicao)

---

## 4. Restrições e Validações

### Nível de Dados
```sql
-- Usuário
CHECK (perfil IN ('ADMIN', 'PROFESSOR', 'ALUNO'))
CHECK (LENGTH(login) >= 5)
UNIQUE (login)

-- Biometria
CHECK (vfc BETWEEN 20 AND 120)
CHECK (bpm BETWEEN 45 AND 140)
CHECK (eda BETWEEN 0.05 AND 0.4)

-- Sessão JWT
CHECK (expiresAt > criadoEm)

-- Estado Emocional
CHECK (dosagem BETWEEN 0 AND 100)
```

### Nível de Aplicação
- Senha mínimo 6 caracteres
- Login sem caracteres especiais
- VFC/BPM/EDA dentro de ranges fisiológicos
- Token JWT expira em 24h

---

## 5. Alinhamento com Requisitos do Negócio

| Requisito | Atendido | Como |
|-----------|----------|------|
| **Autenticação** | ✅ | USUARIO + SESSAO_JWT com JWT |
| **Biometria** | ✅ | BIOMETRIA com VFC, BPM, EDA |
| **Estados Emocionais** | ✅ | ESTADO_EMOCIONAL mapeado |
| **Recomendação Perfume** | ✅ | USUARIO_PERFUME (M:N) |
| **Histórico Leitura** | ✅ | BIOMETRIA.timestamp |
| **Multi-dispositivo** | ✅ | DISPOSITIVO (1:1 por usuário) |
| **Controle Acesso** | ✅ | USUARIO.perfil (ADMIN/PROF/ALUNO) |
| **Segurança Senha** | ✅ | senhaHash com bcrypt |

---

## 6. Escalabilidade Futura

**Melhorias recomendadas:**

1. **Adicionar Timestamps**
   ```
   - createdAt, updatedAt em todas tabelas
   - Soft delete com deletedAt
   ```

2. **Auditoria**
   ```
   - AUDIT_LOG(usuarioId, acao, tabela, timestamp)
   - Rastrear mudanças críticas
   ```

3. **Índices Performance**
   ```
   - CREATE INDEX idx_usuario_login ON USUARIO(login)
   - CREATE INDEX idx_biometria_usuario ON BIOMETRIA(usuarioId, timestamp DESC)
   - CREATE INDEX idx_biometria_estado ON BIOMETRIA(estado)
   ```

4. **Replicação/Backup**
   ```
   - Backup diário BIOMETRIA (dados críticos)
   - Replicação USUARIO para HA
   ```

---

## 7. Persistência Atual vs Ideal

### Atual (localStorage / JSON)
```javascript
// Simples, local-first
const usuarios = [
  { id: '1', login: 'admin', senhaHash: '...', ... }
]

// Problemas:
// - Sem ACID transactions
// - Scale limitada (~5MB)
// - Sem indexação
// - Sem backup automático
```

### Ideal (PostgreSQL)
```sql
CREATE TABLE usuario (
  id UUID PRIMARY KEY,
  login VARCHAR(50) UNIQUE NOT NULL,
  senhaHash VARCHAR(255) NOT NULL,
  perfil ENUM,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);

CREATE TABLE biometria (
  id UUID PRIMARY KEY,
  usuarioId UUID NOT NULL REFERENCES usuario(id),
  vfc FLOAT CHECK(vfc BETWEEN 20 AND 120),
  bpm INT CHECK(bpm BETWEEN 45 AND 140),
  eda FLOAT CHECK(eda BETWEEN 0.05 AND 0.4),
  timestamp TIMESTAMP DEFAULT NOW(),
  INDEX idx_usuario_dt (usuarioId, timestamp DESC)
);
```

---

## Conclusão

**Status:** ✅ Modelo alinhado com requisitos de negócio

**Próximos passos:**
1. Migrar de localStorage → PostgreSQL
2. Implementar auditoria
3. Adicionar rate limiting por usuário
4. Backup automático de biometrias

---

**Documentado em:** 9 de Abril de 2026  
**Por:** Sistema de Análise de Dados
