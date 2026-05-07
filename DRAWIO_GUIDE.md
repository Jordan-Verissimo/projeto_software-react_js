# 🎨 Guia Prático: Using draw.io with Hidden Bloom MER

## 📥 Como Importar o Diagrama MER

### Opção 1: Abrir Diretamente (Recomendado)

1. **Acesse draw.io:**
   - Online: https://www.drawio.com/ ou https://app.diagrams.net/
   - Desktop: Baixe em https://github.com/jgraph/drawio-desktop/releases

2. **Abra o arquivo:**
   ```
   File → Open → Selecione hidden-bloom-mer.drawio
   ```
   Ou faça **drag & drop** do arquivo na página

3. **Visualize o diagrama completo:**
   - MER com 6 entidades
   - Relacionamentos 1:N, 1:1, M:1
   - Legenda de cores por domínio

### Opção 2: Usar Online

```
1. Vá para: https://app.diagrams.net/
2. Clique em: File → Open
3. Selecione: hidden-bloom-mer.drawio
```

### Opção 3: Importar XML Direto

Se tiver problemas:
1. Copie o conteúdo de `hidden-bloom-mer.drawio`
2. Vá para draw.io
3. **File** → **Import from** → **Clipboard XML**
4. Cole o conteúdo

---

## 🖌️ Editar o Diagrama

### Modificar Entidade ou Atributo

```
1. Clique no elemento (ex: USUARIO)
2. Edite no painel à direita
3. Clikce em "Edit Data" para adicionar/remover campos
```

### Adicionar Nova Entidade

```
1. Clique em "Create" → "Database"
2. Arraste uma new entity box
3. Defina nome (ex: AUDITORIA)
4. Adicione atributos duplo-clicando
```

### Criar Novo Relacionamento

```
1. Selecione uma entity
2. Arraste o ponto de conexão para outra entity
3. Edite a relação (1:N, M:M, etc)
```

### Exemplo: Adicionar Tabela de Auditoria

```
Entidade: AUDITORIA
├─ id (INT) PK
├─ usuarioId (INT) FK
├─ acao (VARCHAR)
├─ tabela (VARCHAR)
├─ registroId (INT)
├─ descricao (TEXT)
└─ timestamp (TIMESTAMP)

Relacionamento: USUARIO 1:N AUDITORIA
```

---

## 🎨 Hierarquia de Cores

A cor de cada entidade representa seu domínio:

| Cor | Entidade | Domínio | Tipo de Dados |
|-----|----------|---------|---------------|
| 🟢 Verde | USUARIO | Autenticação | Credenciais + Perfil |
| 🔵 Azul | BIOMETRIA | Sensores | Dados fisiológicos |
| 🟡 Amarelo | SESSAO_JWT | Autenticação | Gerenciamento de tokens |
| 🟣 Roxo | PERFUME | Catálogo | Produtos L'Oréal |
| 🟢 Verde-Claro | ESTADO_EMOCIONAL | Análise | Estados + Recomendações |
| 🟠 Laranja | DISPOSITIVO | Hardware | Dados do dispositivo |

### Personalizar Cores

```
Método 1 (Fácil):
1. Clique na entidade
2. Clique em "Format" (lado direito)
3. Mude Fill Color

Método 2 (Código):
1. Clique na entidade
2. View → Edit Data
3. Edite o atributo "fillColor"
```

---

## 📏 Layout & Organização

### Layout Atual (Recomendado)

```
Linha 1 (Entrada): USUARIO → BIOMETRIA → SESSAO_JWT → PERFUME
                   ↓ 1:1
                DISPOSITIVO

Linha 2 (Saída): ESTADO_EMOCIONAL ← BIOMETRIA

Estrutura: Top-to-bottom com relacionamentos laterais centralizados
```

### Reorganizar Entidades

```
1. Selecione múltiplas entidades (Shift + Click)
2. Layout → Arrange → escolha uma opção
3. Opções: Vertical, Horizontal, Radial, etc
```

---

## 📋 Adicionar Notas/Comentários

```
1. Clique em "Insert" → "Text" ou "Comment"
2. Adicione anotações (ex: "Esta tabela será migrada para Redis")
3. Use diferentes cores para categorizar comentários
```

### Exemplo: Adicionar Nota de Performance

```
"Performance: Índice criado em (usuarioId, timestamp DESC)
para queries de histórico de biometria. Tempo esperado: < 100ms"
```

---

## 💾 Exportar Diagrama

### Exportar para Imagem (PNG/SVG)

```
1. File → Export
2. Escolha formato: PNG, SVG, PDF
3. Opções:
   - Background Color: White ✓
   - Border Width: 10px
   - Quality: 300 DPI (para impressão)
```

### Exportar para PowerPoint

```
1. File → Export
2. Selecione: PPT
3. Insira em sua apresentação acadêmica
```

### Exemplo: Gerar para README

```bash
# Exportar como SVG
File → Export → Format: SVG → Download

# Inserir no README.md
![MER Diagram](hidden-bloom-mer.svg)
```

---

## 🔗 Compartilhar Diagrama

### Obter Link Compartilhável

```
1. File → Share
2. Click "Create Link"
3. Copie a URL de compartilhamento
4. Envie para time para review
```

### Colaboração em Tempo Real

```
1. File → Share
2. Habilite "Edit"
3. Convide pessoas por email
4. Editem juntos sincronizado
```

---

## 🚀 Dicas Profissionais

### 1. Manter Organização Limpa

```
✅ Use mesmo espaçamento entre entidades
✅ Alinhe relacionamentos horizontalmente/verticalmente
✅ Use cores consistentes por domínio
❌ Evite linhas cruzando-se desnecessariamente
```

### 2. Documentar Cardinalidade

```
Para cada seta de relacionamento, adicione:
- "1:N" = Um para Muitos
- "M:1" = Muitos para Um
- "1:1" = Um para Um
- "M:N" = Muitos para Muitos (não usado em nosso modelo)
```

### 3. Usar Layers (Para Complexidade)

```
1. View → Layers
2. Organize por funcionalidade:
   - Layer 1: Autenticação (USUARIO, SESSAO_JWT)
   - Layer 2: Biometria (BIOMETRIA, ESTADO)
   - Layer 3: Produtos (PERFUME, DISPOSITIVO)
```

### 4. Validar Normalização

```
Verificar:
☑ Não há duplicação de dados
☑ Cada PK é único
☑ Todo FK aponta para PK válida
☑ Sem dependência transitória
```

---

## 🔧 Troubleshooting

### Problema: Arquivo não abre

**Solução:**
```
1. Verifique se é .drawio (não .xml)
2. Tente importar via clipboard
3. Use versão online: app.diagrams.net
4. Recrie manualmente (take 5 minutos)
```

### Problema: Linhas ficam desordenadas

**Solução:**
```
1. Selecione todas as entidades (Ctrl+A)
2. Layout → Arrange → Horizontal
3. Respaça manualmente
```

### Problema: Não consegue editar

**Solução:**
```
1. Clique em Edit Mode (topo)
2. Ou duplo-clique no elemento
3. Verifique se arquivo está em modo read-only
```

---

## 📚 Modelos de Referência

### Baixar Templates Prontos

```
draw.io → File → New
Pesquise por:
- "Database"
- "ER Diagram"
- "Data Model"
```

### Ferramentas Alternativas (Se Preferir)

| Ferramenta | URL | Formato |
|-----------|-----|---------|
| **draw.io** | https://www.drawio.com | .drawio (XML) |
| **dbdiagram.io** | https://dbdiagram.io | SQL-based |
| **lucidchart** | https://www.lucidchart.com | Proprietary |
| **miro** | https://miro.com/ | Whiteboard |
| **ERDPlus** | https://erdplus.com | SQL focused |

---

## ✅ Checklist para Apresentação

Antes de apresentar o MER:

- [ ] Todos os 6 campos de cada tabela visíveis
- [ ] Todas as relationships com cardinalidade clara
- [ ] Cores consistentes com domínio
- [ ] Sem cruzamentos desnecessários de linhas
- [ ] Legenda presente (PK, FK, 1:N, etc)
- [ ] Alinhado com requisitos L'Oréal (verificado)
- [ ] Exportado em alta resolução (300 DPI)
- [ ] Backup em múltiplos formatos (.drawio + .png + .pdf)

---

## 🎓 Exemplo: Apresentação Acadêmica

### Slide Estrutura (PowerPoint/Slides)

```
1. Título: "Modelagem de Dados - Hidden Bloom"

2. Problema:
   - Sistema precisa armazenar dados de 1.000+ usuários
   - 500.000+ leituras biométricas mensais
   - Necessário alinhamento L'Oréal

3. [Inserir Imagem do MER aqui]

4. Solução:
   - 6 entidades normalizadas
   - Índices de performance
   - Validações de domínio

5. Resultado:
   - 100% de conformidade com requisitos
   - Query response < 100ms
   - Escalabilidade até 10M+ registros
```

---

## 📞 Suporte & Recursos

| Dúvida | Resposta |
|--------|----------|
| Como criar novo projeto? | File → New → Database |
| Mudar tamanho de entidade? | Format → Size |
| Adicionar mais atributos? | Edit Data (duplo-clique) |
| Validar cardinalidade? | Verifique setas (1, N, M) |
| Exportar para PDF? | File → Export → PDF |

---

## 🔗 Links Rápidos

- **draw.io:** https://www.drawio.com/
- **Tutorial Oficial:** https://www.youtube.com/c/draw_io
- **Documentação:** https://desk.draw.io/
- **Repo GitHub:** https://github.com/jgraph/drawio

---

**Última atualização:** 09/04/2026  
**Versão:** 1.0.0  
**Status:** ✅ Pronto para Uso

**Próximas Etapas:**
1. Abra `hidden-bloom-mer.drawio` em draw.io
2. Exporte para PNG/PDF
3. Insira em apresentação acadêmica
4. Compartilhe com time L'Oréal para review
