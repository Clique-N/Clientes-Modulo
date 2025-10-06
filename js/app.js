import { ClienteService } from "./classes.js";
import { validarDescricao, criarElementoCliente } from "./utils.js";

const clientesUL = document.getElementById("listaClientes");
const inputCliente = document.getElementById("cliente");
const botaoAdd = document.getElementById("add");

const service = new ClienteService("https://crudcrud.com/api/559217db6c304d46a2098c981c31b7de/clientes-y2k");

let listaClientes = [];

async function carregarClientes() {
  clientesUL.innerHTML = "";

  listaClientes = await service.listar();

  const total = listaClientes.reduce((acc) => acc + 1, 0);
  console.log(`Total de clientes: ${total}`);

  listaClientes.map(cliente => {
    const item = criarElementoCliente(cliente, removerCliente);
    clientesUL.appendChild(item);
  });
}

async function adicionarCliente() {
  const descricao = inputCliente.value.trim();

  if (!validarDescricao(descricao)) {
    alert("Digite um cliente válido!");
    return;
  }

  const duplicado = listaClientes.find(c => c.descricao.toLowerCase() === descricao.toLowerCase());
  if (duplicado) {
    alert("Cliente já existe!");
    return;
  }

  const novo = await service.adicionar(descricao);
  listaClientes.push(novo);

  const item = criarElementoCliente(novo, removerCliente);
  clientesUL.appendChild(item);

  inputCliente.value = "";
}

async function removerCliente(id) {
  await service.remover(id);

  listaClientes = listaClientes.filter(c => c.id !== id);

  await carregarClientes();
}

botaoAdd.addEventListener("click", adicionarCliente);
carregarClientes();
