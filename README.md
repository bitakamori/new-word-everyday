# Uma palavra todo dia
Bem-vindo ao projeto Uma Palavra Todo Dia! Este é um projeto em desenvolvimento que permite aos usuários adicionar palavras em português, verificando sua existência através da API Dicionário Aberto e armazenando-as localmente. O objetivo é criar uma plataforma colaborativa para explorar e compartilhar palavras em português. 

# Ideia do projeto
O projeto visa criar um site interativo onde usuários podem:
- Adicionar palavras em português que ainda não estão na lista do projeto.
- Verificar se a palavra existe utilizando a API Dicionário Aberto.
- Visualizar a lista de palavras adicionadas.

# Tecnologias Utilizadas
- Frontend: React com Next.js e TypeScript
- Armazenamento: Local Storage (atualmente)
- API: Dicionário Aberto para validação de palavras


# Progresso Atual
- Tela de Adição de Palavras: Interface implementada onde o usuário pode inserir palavras, com a lista de palavras exibida abaixo do campo de entrada.
- Validação de Palavras: Integração com a API Dicionário Aberto para verificar a existência das palavras inseridas.
= Armazenamento Local: As palavras adicionadas são salvas no Local Storage do navegador.

# Limitações:
- A API utilizada é baseada no português de Portugal, o que pode excluir palavras específicas do português brasileiro.
- O armazenamento é temporário (Local Storage), o que será substituído por um backend no futuro.

# Planos para o Futuro
- Backend: Implementar um servidor backend para armazenar as palavras adicionadas de forma persistente.
- Melhoria na Validação: Explorar APIs ou bancos de dados adicionais para suportar palavras do português brasileiro e gírias regionais.


# Funcionalidades Adicionais:
- Sistema de autenticação para usuários.
- Categorização de palavras (ex.: gírias, regionalismos, neologismos).
- Interface para votação ou comentários sobre palavras adicionadas.
- Melhorias na UI/UX: Aprimorar o design e a usabilidade da interface para uma experiência mais fluida.

  
# Limitações Conhecidas
- A API Dicionário Aberto não cobre todo o vocabulário do português brasileiro, o que pode limitar a validação de palavras.
- O uso do Local Storage é temporário e não permite persistência entre dispositivos ou sincronização.
