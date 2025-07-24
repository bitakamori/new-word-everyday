# 🎮 New Word Everyday Game - Frontend

Frontend em Next.js para o jogo de palavras, conectado ao backend NestJS.

## ✨ Funcionalidades Implementadas

### 🔐 **Sistema de Autenticação**

- ✅ Tela de login
- ✅ Tela de cadastro
- ✅ Proteção de rotas
- ✅ Gerenciamento de estado global com Context API
- ✅ Persistência de sessão com cookies

### 📱 **Páginas Principais**

- ✅ **Dashboard** - Visão geral do usuário com estatísticas
- ✅ **Adicionar Palavra** - Interface para adicionar novas palavras
- ✅ **Ranking** - Lista de jogadores ordenada por pontuação
- ✅ **Login/Cadastro** - Formulários de autenticação

### 🎯 **Componentes Criados**

- `AuthForm` - Formulário reutilizável para login/cadastro
- `ProtectedRoute` - Componente para proteger rotas
- `Header` - Navegação principal
- Hooks personalizados para API

## 🚀 Como Usar

### 1. **Pré-requisitos**

- Backend rodando em `http://localhost:3000`
- Node.js instalado

### 2. **Instalação**

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
# O arquivo .env.local já está configurado
```

### 3. **Executar**

```bash
# Modo desenvolvimento
npm run dev

# Acessar em: http://localhost:3001
```

### 4. **Fluxo de Uso**

1. **Acesse** http://localhost:3001
2. **Cadastre-se** ou faça **login**
3. **Adicione palavras** em inglês
4. **Ganhe pontos** (1 ponto por letra)
5. **Veja seu ranking** entre os jogadores

## 🔧 Tecnologias Utilizadas

- **Next.js 15** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de dados
- **js-cookie** - Gerenciamento de cookies
- **Axios** - Requisições HTTP

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 13+)
│   ├── login/             # Página de login
│   ├── register/          # Página de cadastro
│   ├── dashboard/         # Dashboard principal
│   ├── add-word/          # Adicionar palavras
│   ├── ranking/           # Ranking de jogadores
│   └── layout.tsx         # Layout principal
├── components/            # Componentes reutilizáveis
│   ├── AuthForm.tsx       # Formulário de autenticação
│   ├── ProtectedRoute.tsx # Proteção de rotas
│   └── Header.tsx         # Cabeçalho/navegação
├── contexts/              # Context API
│   └── AuthContext.tsx    # Contexto de autenticação
├── hooks/                 # Hooks personalizados
│   ├── useWordCollection.ts
│   └── useRanking.ts
└── config/                # Configurações
    └── api.ts             # Configuração da API
```

## 🎨 Interface

### 🔑 **Tela de Login/Cadastro**

- Design responsivo e moderno
- Validação em tempo real
- Feedback de erros
- Redirecionamento automático

### 📊 **Dashboard**

- Estatísticas do usuário
- Últimas palavras adicionadas
- Ranking lateral (top 10)
- Ações rápidas

### ➕ **Adicionar Palavra**

- Campo de entrada com validação
- Feedback em tempo real
- Contagem de pontos
- Lista das palavras já adicionadas

### 🏆 **Ranking**

- Pódio dos 3 primeiros
- Lista completa ordenada
- Destaque da posição do usuário
- Atualização em tempo real

## 🔐 Sistema de Autenticação

### **Fluxo de Autenticação**

1. Usuário faz login/cadastro
2. Backend retorna JWT token
3. Token é armazenado em cookie seguro
4. Todas as requisições incluem o token
5. Rotas protegidas verificam autenticação

### **Proteção de Rotas**

- `/dashboard` - Requer autenticação
- `/add-word` - Requer autenticação
- `/ranking` - Público (mas melhor experiência logado)
- `/login`, `/register` - Redireciona se já autenticado

## 🎯 Funcionalidades Detalhadas

### **Gerenciamento de Estado**

- Context API para estado global da autenticação
- Persistência com cookies
- Hooks personalizados para lógica específica

### **Formulários**

- React Hook Form + Zod para validação
- Feedback visual de erros
- Estados de loading

### **Comunicação com API**

- Interceptação automática de tokens
- Tratamento de erros
- Loading states

### **Responsividade**

- Mobile-first design
- Grid layouts adaptativos
- Componentes responsivos

## 🔧 Configuração

### **Variáveis de Ambiente**

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### **Scripts Disponíveis**

```bash
npm run dev        # Desenvolvimento
npm run build      # Build de produção
npm run start      # Servidor de produção
npm run lint       # Linting
```

## 🚀 Deploy

### **Vercel (Recomendado)**

```bash
# Conectar com Vercel
vercel

# Configurar variável de ambiente:
# NEXT_PUBLIC_API_URL = URL_DO_SEU_BACKEND
```

### **Docker**

```bash
# Build da imagem
docker build -t word-game-frontend .

# Executar
docker run -p 3001:3000 word-game-frontend
```

## 🎮 Experiência do Usuário

### **Primeira Visita**

1. Usuário é redirecionado para `/login`
2. Pode escolher fazer login ou criar conta
3. Após autenticação, vai para dashboard

### **Usuário Logado**

1. Dashboard mostra estatísticas e ações rápidas
2. Pode adicionar palavras facilmente
3. Vê progresso no ranking em tempo real
4. Navegação fluida entre páginas

### **Feedback Visual**

- Loading states em todas as operações
- Mensagens de sucesso/erro
- Indicadores visuais de progresso
- Animações suaves

## 📱 Responsividade

- **Mobile**: Layout em coluna única, navegação otimizada
- **Tablet**: Layout híbrido, melhor uso do espaço
- **Desktop**: Layout completo com sidebars e grids

## 🎨 Design System

- **Cores**: Paleta baseada em Indigo/Blue
- **Tipografia**: Geist Sans (clean e moderna)
- **Componentes**: Reutilizáveis e consistentes
- **Estados**: Hover, focus, disabled bem definidos
