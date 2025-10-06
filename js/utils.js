export function validarDescricao(texto) {
  return texto && texto.trim().length > 0;
}

export function criarElementoCliente(cliente, onRemove) {
  const item = document.createElement("li");
  item.textContent = cliente.descricao;

  const botao = document.createElement("button");
  botao.textContent = "X";
  botao.classList.add("estilo");
  botao.addEventListener("click", () => onRemove(cliente.id));

  item.appendChild(botao);
  return item;
}
