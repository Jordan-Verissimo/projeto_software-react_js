import { db } from './storage';
import bcryptjs from 'bcryptjs';

/**
 * Perfis de acesso do sistema:
 * - ADMIN: Acesso total ao sistema
 * - PROFESSOR: Acesso a funcionalidades de ensino
 * - ALUNO: Acesso a funcionalidades de aprendizado
 */
export const Perfil = {
  ADMIN: 'ADMIN',
  PROFESSOR: 'PROFESSOR',
  ALUNO: 'ALUNO',
};

const MAX_LOGIN_ATTEMPTS = 3;
const BCRYPT_ROUNDS = 10;

/**
 * Inicializa o banco de dados com usuários padrão para testes
 * @private
 */
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

/**
 * Autentica um usuário com login e senha
 * @param {string} login
 * @param {string} senha
 * @returns {Promise<Object>}
 */
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

  // Reset após login bem-sucedido
  user.tentativasFalhas = 0;

  db.set('usuarios', users);

  // Token simples compatível com frontend/browser
  const token = btoa(
    JSON.stringify({
      id: user.id,
      nome: user.nome,
      perfil: user.perfil,
      exp: Date.now() + 24 * 60 * 60 * 1000,
    })
  );

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

/**
 * Altera a senha do usuário
 * @param {string} userId
 * @param {string} novaSenha
 * @returns {Promise<boolean>}
 */
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

/**
 * Verifica se um token é válido
 * @param {string} token
 * @returns {Object}
 */
export function verificarToken(token) {
  try {
    if (!token) {
      throw new Error('Token ausente');
    }

    const decoded = JSON.parse(atob(token));

    if (decoded.exp < Date.now()) {
      throw new Error('Token expirado');
    }

    return decoded;
  } catch (err) {
    throw new Error(`Token inválido: ${err.message}`);
  }
}

/**
 * Renova token
 * @param {string} token
 * @returns {string}
 */
export function renovarToken(token) {
  try {
    const decoded = verificarToken(token);

    return btoa(
      JSON.stringify({
        ...decoded,
        exp: Date.now() + 24 * 60 * 60 * 1000,
      })
    );
  } catch (err) {
    throw new Error(`Falha ao renovar token: ${err.message}`);
  }
}