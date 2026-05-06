/**
 * Objeto de armazenamento de dados no navegador (localStorage)
 * 
 * Este módulo fornece uma interface simples para salvar e recuperar dados
 * do armazenamento local do navegador de forma segura.
 * 
 * @typedef {Object} db
 * 
 * @property {Function} get - Recupera um valor armazenado
 * @param {string} key - A chave do dado a ser recuperado
 * @param {*} [fallback] - Valor padrão caso a chave não exista ou ocorra erro
 * @returns {*} O valor armazenado (convertido de JSON) ou o fallback
 * 
 * @description
 * O método `get` tenta buscar um valor do localStorage usando uma chave.
 * Se o valor não existir, retorna o fallback (ou null se não fornecido).
 * Se um erro ocorrer durante a conversão JSON, ele é capturado e registrado
 * no console para facilitar a depuração.
 * 
 * @property {Function} set - Armazena um valor no navegador
 * @param {string} key - A chave para identificar o dado
 * @param {*} value - O valor a ser armazenado (será convertido para JSON)
 * 
 * @description
 * O método `set` salva um valor no localStorage convertendo-o para JSON.
 * Se um erro ocorrer durante o processo (ex: quota de armazenamento excedida),
 * ele é capturado e registrado no console sem interromper a execução.
 * 
 * @example
 * // Salvando dados
 * db.set('usuario', { nome: 'João', idade: 20 });
 * 
 * // Recuperando dados
 * const usuario = db.get('usuario', { nome: 'Anônimo' });
 * console.log(usuario); // { nome: 'João', idade: 20 }
 */
export const db = {
  get(key, fallback){
    try{
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : (fallback ?? null);
    }catch(err){
      console.error('db.get error', err); return fallback ?? null;
    }
  },
  set(key, value){
    try{
      // localStorage só aceita strings, então convertemos o valor para JSON antes de salvar
      // Se o valor for uma função, undefined ou um símbolo, JSON.stringify irá retornar undefined, o que não é permitido no localStorage. Para evitar isso, podemos verificar o tipo do valor antes de tentar armazená-lo.
      if (typeof value === 'function' || typeof value === 'undefined' || typeof value === 'symbol') {
        console.warn(`Erro - db.set warning: Attempting to store a non-serializable value for key "${key}". This value will not be stored.`);
        return;
      }
      // stringify - Se o valor for um objeto circular ou contiver propriedades que não podem ser convertidas para JSON, isso pode lançar um erro, que é capturado e registrado.  
      localStorage.setItem(key, JSON.stringify(value));
    }catch(err){ console.error('db.set error', err); }
  },
};