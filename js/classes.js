export class Cliente {
    constructor(id, descricao) {
      this.id = id;
      this.descricao = descricao;
    }
  }
  
  export class ClienteService {
    constructor(apiUrl) {
      this.apiUrl = apiUrl;
    }
  
    async listar() {
      const resposta = await fetch(this.apiUrl);
      if (!resposta.ok) throw new Error("Erro ao listar clientes");
      const data = await resposta.json();
  
      const clientes = data.map(c => new Cliente(c._id, c.descricao));
      return clientes;
    }
  
    async adicionar(descricao) {
      const resposta = await fetch(this.apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ descricao })
      });
      if (!resposta.ok) throw new Error("Erro ao adicionar cliente");
      const novo = await resposta.json();
      return new Cliente(novo._id, novo.descricao);
    }
  
    async remover(id) {
      const resposta = await fetch(`${this.apiUrl}/${id}`, { method: "DELETE" });
      if (!resposta.ok) throw new Error("Erro ao remover cliente");
    }
  }
  