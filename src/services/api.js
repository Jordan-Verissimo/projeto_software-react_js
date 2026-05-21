import { db } from './storage';
import bcryptjs from 'bcryptjs';

export const Perfil = { ADMIN: 'ADMIN', PROFESSOR: 'PROFESSOR', ALUNO: 'ALUNO' };

const MAX_LOGIN_ATTEMPTS = 3;
const BCRYPT_ROUNDS = 10;

function seed() {
  if (!db.get('usuarios')) {
    db.set('usuarios', [
      {
        id: '1',
        nome: 'Admin',
        login: 'admin',
        perfil: Perfil.ADMIN,
        primeiroAcesso: true,
        tentativasFalhas: 0,
        bloqueado: false,
        senhaHash: bcryptjs.hashSync('123456', BCRYPT_ROUNDS),
      },
      {
        id: '2',
        nome: 'Prof. Ana',
        login: 'ana',
        perfil: Perfil.PROFESSOR,
        primeiroAcesso: true,
        tentativasFalhas: 0,
        bloqueado: false,
        senhaHash: bcryptjs.hashSync('123456', BCRYPT_ROUNDS),
      },
      {
        id: '3',
        nome: 'Aluno João',
        login: 'joao',
        perfil: Perfil.ALUNO,
        primeiroAcesso: true,
        tentativasFalhas: 0,
        bloqueado: false,
        senhaHash: bcryptjs.hashSync('123456', BCRYPT_ROUNDS),
      },
    ]);
  }
}

seed();

export async function autenticar(login, senha) {
  if (!login || !senha) {
    throw new Error('Login e senha são obrigatórios');
  }

  const users = db.get('usuarios', []);
  const user = users.find((x) => x.login === login);

  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  if (user.bloqueado) {
    throw new Error('Usuário bloqueado por excesso de tentativas');
  }

  const senhaValida = bcryptjs.compareSync(senha, user.senhaHash);

  if (!senhaValida) {
    user.tentativasFalhas = (user.tentativasFalhas || 0) + 1;
    if (user.tentativasFalhas >= MAX_LOGIN_ATTEMPTS) {
      user.bloqueado = true;
    }
    db.set('usuarios', users);
    throw new Error('Senha inválida');
  }

  user.tentativasFalhas = 0;
  db.set('usuarios', users);

  const token = btoa(JSON.stringify({ id: user.id, login: user.login, perfil: user.perfil }));

  return {
    accessToken: token,
    user: {
      id: user.id,
      nome: user.nome,
      login: user.login,
      perfil: user.perfil,
      primeiroAcesso: user.primeiroAcesso,
    },
  };
}

export async function alterarSenha(userId, novaSenha) {
  if (!userId || !novaSenha) {
    throw new Error('ID do usuário e nova senha são obrigatórios');
  }

  if (novaSenha.length < 6) {
    throw new Error('Senha deve ter no mínimo 6 caracteres');
  }

  const users = db.get('usuarios', []);
  const user = users.find((x) => x.id === userId);

  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  user.senhaHash = bcryptjs.hashSync(novaSenha, BCRYPT_ROUNDS);
  user.primeiroAcesso = false;
  db.set('usuarios', users);

  return true;
}

export function verificarToken(token) {
  try {
    const decoded = JSON.parse(atob(token));
    return decoded;
  } catch (err) {
    throw new Error(`Token inválido: ${err.message}`);
  }
}

export function renovarToken(token) {
  try {
    const decoded = JSON.parse(atob(token));
    return btoa(JSON.stringify(decoded));
  } catch (err) {
    throw new Error(`Falha ao renovar token: ${err.message}`);
  }
}
