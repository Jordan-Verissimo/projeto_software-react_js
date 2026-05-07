import { db } from './storage';
import { jwtDecode } from 'jwt-decode';
import bcryptjs from 'bcryptjs';

/**
 * Perfis de acesso do sistema:
 * - ADMIN: Acesso total ao sistema
 * - PROFESSOR: Acesso a funcionalidades de ensino
 * - ALUNO: Acesso a funcionalidades de aprendizado
 */
export const Perfil = { ADMIN: 'ADMIN', PROFESSOR: 'PROFESSOR', ALUNO: 'ALUNO' };

const MAX_LOGIN_ATTEMPTS = 3;
const JWT_SECRET = 'hidden-bloom-jwt-secret-key-2026'; // Em produção: usar env var
const TOKEN_EXPIRY = '24h';
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
        senhaHash: bcryptjs.hashSync('123456', BCRYPT_ROUNDS), // Hash seguro
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
 * Autentica um usuário com login e senha, retorna JWT token
 * @param {string} login - Login do usuário
 * @param {string} senha - Senha do usuário
 * @returns {Promise<Object>} { accessToken, user }
 * @throws {Error} Se login inválido, senha errada ou usuário bloqueado
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

  // Verificar senha com hash (seguro)
  const senhaValida = bcryptjs.compareSync(senha, user.senhaHash);

  if (!senhaValida) {
    user.tentativasFalhas = (user.tentativasFalhas || 0) + 1;

    if (user.tentativasFalhas >= MAX_LOGIN_ATTEMPTS) {
      user.bloqueado = true;
    }

    db.set('usuarios', users);
    throw new Error('Senha inválida');
  }

  // Reset tentativas após login bem-sucedido
  user.tentativasFalhas = 0;
  db.set('usuarios', users);

  // Gerar JWT token
  const token = jwt.sign(
    {
      id: user.id,
      login: user.login,
      perfil: user.perfil,
      nome: user.nome,
    },
    JWT_SECRET,
    { expiresIn: TOKEN_EXPIRY }
  );

  // Retorna token + dados públicos do usuário
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
 * Altera a senha do usuário com hash seguro
 * @param {string} userId - ID do usuário
 * @param {string} novaSenha - Nova senha
 * @returns {Promise<boolean>} True se sucesso
 * @throws {Error} Se usuário não encontrado ou senha inválida
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

  // Hash seguro da nova senha com bcrypt
  user.senhaHash = bcryptjs.hashSync(novaSenha, BCRYPT_ROUNDS);
  user.primeiroAcesso = false;
  db.set('usuarios', users);

  return true;
}

/**
 * Verifica se um token JWT é válido
 * @param {string} token - Token JWT
 * @returns {Object} Dados do token se válido
 * @throws {Error} Se token inválido ou expirado
 */
export function verificarToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (err) {
    throw new Error(`Token inválido: ${err.message}`);
  }
}

/**
 * Renova um token JWT (cria novo com mesmos dados)
 * @param {string} token - Token JWT antigo
 * @returns {string} Novo token JWT
 * @throws {Error} Se token inválido
 */
export function renovarToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Cria novo token com os mesmos dados
    const novoToken = jwt.sign(
      {
        id: decoded.id,
        login: decoded.login,
        perfil: decoded.perfil,
        nome: decoded.nome,
      },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRY }
    );

    return novoToken;
  } catch (err) {
    throw new Error(`Falha ao renovar token: ${err.message}`);
  }
}
