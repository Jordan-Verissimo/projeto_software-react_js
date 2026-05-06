import { db } from './storage';
// perfil de acesso dos usuários, onde ADMIN tem acesso total, PROFESSOR tem acesso a funcionalidades relacionadas ao ensino, e ALUNO tem acesso a funcionalidades relacionadas ao aprendizado. Esses perfis podem ser usados para controlar o acesso a diferentes partes do sistema com base nas permissões associadas a cada perfil.
// perfil é do tipo dicionário, onde cada chave representa um perfil de acesso e o valor é uma string que representa o nome do perfil. Esses perfis podem ser usados para controlar o acesso a diferentes partes do sistema com base nas permissões associadas a cada perfil. Por exemplo, um usuário com o perfil ADMIN pode ter acesso a todas as funcionalidades do sistema, enquanto um usuário com o perfil PROFESSOR pode ter acesso apenas a funcionalidades relacionadas ao ensino, e um usuário com o perfil ALUNO pode ter acesso apenas a funcionalidades relacionadas ao aprendizado.
export const Perfil = { ADMIN: 'ADMIN', PROFESSOR: 'PROFESSOR', ALUNO: 'ALUNO' };

// funcao seed é responsável por inicializar o banco de dados com um conjunto de usuários predefinidos, caso o banco de dados ainda não contenha uma coleção de usuários. Ela verifica se a coleção de usuários existe usando db.get('usuarios'), e se não existir, ela cria a coleção e adiciona três usuários: um administrador, um professor e um aluno, cada um com suas respectivas informações, como id, nome, login, perfil, status de primeiro acesso, número de tentativas de falha, status de bloqueio e senha. Essa função é útil para garantir que haja dados iniciais no banco de dados para testes ou para facilitar o desenvolvimento da aplicação.
function seed(){
  // A função verifica se a coleção de usuários existe usando db.get('usuarios'). Se a coleção não existir, ela cria a coleção e adiciona três usuários predefinidos: um administrador, um professor e um aluno. Cada usuário tem suas respectivas informações, como id, nome, login, perfil, status de primeiro acesso, número de tentativas de falha, status de bloqueio e senha. Essa função é útil para garantir que haja dados iniciais no banco de dados para testes ou para facilitar o desenvolvimento da aplicação.
  if(!db.get('usuarios')){
    // db.set('usuarios', [...]) é usado para criar a coleção de usuários no banco de dados e adicionar os usuários predefinidos. Cada usuário é representado como um objeto com suas respectivas informações, como id, nome, login, perfil, status de primeiro acesso, número de tentativas de falha, status de bloqueio e senha. Essa função é útil para garantir que haja dados iniciais no banco de dados para testes ou para facilitar o desenvolvimento da aplicação.
    db.set('usuarios', [
      { id:'1', nome:'Admin', login:'admin', perfil:Perfil.ADMIN, primeiroAcesso:true, tentativasFalhas:0, bloqueado:false, senha:'123456' },
      { id:'2', nome:'Prof. Ana', login:'ana', perfil:Perfil.PROFESSOR, primeiroAcesso:true, tentativasFalhas:0, bloqueado:false, senha:'123456' },
      { id:'3', nome:'Aluno João', login:'joao', perfil:Perfil.ALUNO, primeiroAcesso:true, tentativasFalhas:0, bloqueado:false, senha:'123456' },
    ]);
  }
}
// A função seed é chamada para garantir que o banco de dados seja inicializado com os usuários predefinidos, caso a coleção de usuários ainda não exista. Isso é importante para garantir que haja dados iniciais no banco de dados para testes ou para facilitar o desenvolvimento da aplicação.
seed();

export async function autenticar(login, senha){
  // A função autenticar é responsável por autenticar um usuário com base nas credenciais fornecidas (login e senha). Ela verifica se o usuário existe, se a senha está correta, e se o usuário está bloqueado devido a tentativas de login falhas. Se a autenticação for bem-sucedida, ela retorna as informações do usuário autenticado.
  // db.get('usuarios', []) é usado para obter a lista de usuários armazenados no banco de dados. A função find é usada para procurar um usuário com o login correspondente. Se o usuário não for encontrado, uma exceção é lançada. Se o usuário estiver bloqueado, outra exceção é lançada. Se a senha estiver incorreta, o número de tentativas de falha é incrementado e, se atingir 3 ou mais, o usuário é bloqueado. Se a autenticação for bem-sucedida, as tentativas de falha são resetadas e as informações do usuário autenticado são retornadas.
  const users = db.get('usuarios', []);
  // users.find(x => x.login === login) é usado para encontrar o usuário com o login correspondente. Se o usuário não for encontrado, uma exceção é lançada com a mensagem 'Usuário não encontrado'. Se o usuário estiver bloqueado, outra exceção é lançada com a mensagem 'Usuário bloqueado'. Se a senha estiver incorreta, o número de tentativas de falha é incrementado e, se atingir 3 ou mais, o usuário é bloqueado. Se a autenticação for bem-sucedida, as tentativas de falha são resetadas e as informações do usuário autenticado são retornadas.
  const u = users.find(x => x.login === login);
  if(!u) 
    throw new Error('Usuário não encontrado');
  if(u.bloqueado) 
    throw new Error('Usuário bloqueado');
  if(u.senha !== senha){
    // Se a senha estiver incorreta, o número de tentativas de falha é incrementado e, se atingir 3 ou mais, o usuário é bloqueado. Isso é feito para proteger a conta do usuário contra tentativas de login não autorizadas. Se um usuário tentar fazer login com uma senha incorreta várias vezes, ele será bloqueado para evitar que alguém tente adivinhar a senha por meio de tentativas repetidas.
    // u.tentativasFalhas || 0 significa que, se u.tentativasFalhas for undefined ou falsy, ele será tratado como 0. Isso é útil para garantir que o número de tentativas de falha seja corretamente incrementado mesmo que a propriedade tentativasFalhas não tenha sido definida anteriormente para o usuário.
    u.tentativasFalhas = (u.tentativasFalhas || 0) + 1;
    if(u.tentativasFalhas >= 3) 
        u.bloqueado = true;
    // db.set('usuarios', users) é usado para atualizar a lista de usuários no banco de dados após modificar as informações do usuário, como o número de tentativas de falha ou o status de bloqueio.
    db.set('usuarios', users);
    throw new Error('Senha inválida');
  }
  u.tentativasFalhas = 0;
  db.set('usuarios', users);
  // A função retorna um objeto contendo as informações do usuário autenticado, como id, nome, login, perfil e se é o primeiro acesso. Essas informações podem ser usadas posteriormente para gerenciar o estado de autenticação e fornecer acesso a recursos específicos com base no perfil do usuário.
  return { id:u.id, nome:u.nome, login:u.login, perfil:u.perfil, primeiroAcesso:u.primeiroAcesso };
}

// Aula 04 – falaremos em seguida
export async function alterarSenha(userId, novaSenha){
  const users = db.get('usuarios', []);
  const u = users.find(x => x.id === userId);
  if(!u) throw new Error('Usuário não encontrado');
  u.senha = novaSenha; u.primeiroAcesso = false;
  db.set('usuarios', users);
  return true;
}