const formt = document.querySelector("#tk");
const lista = document.querySelector("#lista");
const inputTask = document.querySelector("#task");
const busca = document.querySelector("#busca");
const vazia = document.querySelector("#vazia");
let filtros = "todas";
let idEditando = null;
let tarefas = [
  {
    numero: 1,
    tarefas: "trabalho na casa de bertranu",
    status: "andamento",
  },
  {
    numero: 2,
    tarefas: "treinar junto da bixamon 22/12",
    status: "andamento",
  },
  {
    numero: 3,
    tarefas: "encontro dia 30",
    status: "andamento",
  },
];

function criarTarefas(t) {
  const item = document.createElement("li");
  item.classList.add("t", "status-" + t.status);

  const titulo = document.createElement("h3");
  titulo.textContent = "Task-" + t.numero + " · " + t.tarefas;

  item.append(titulo);
///avançar/
  if (t.status !== "concluida") {
    const avancar = document.createElement("button");
    avancar.textContent = "concluido";

    avancar.addEventListener("click", () => {
      if (t.status === "andamento") {
        t.status = "concluida";
        desenhar();
      }
    });

    item.append(avancar);
  }
//cancelar//
  if (t.status === "andamento") {
    const cancelar = document.createElement("button");
    cancelar.textContent = "excluir";

    cancelar.addEventListener("click", () => {
      if (confirm("excluir a tarefa " + t.numero + "?")) {
        tarefas = tarefas.filter((o) => o !== t);
        desenhar();
      }
    });
    item.append(cancelar);
  }
  //editar//
  if (t.status !== "concluida"){
    const editar = document.createElement("button");
    editar.textContent = "editar";

    editar.addEventListener("click", () => {
      inputTask.value = t.tarefas;
      idEditando = t.numero;
      inputTask.focus();
    });
    item.append(editar);
  }

  return item;
}

formt.addEventListener("submit", (event) => {
  event.preventDefault();

  const texto = inputTask.value.trim();
  if (!texto) return;

  if (idEditando !== null) {
    const tarefaEncontrada = tarefas.find((t) => t.numero === idEditando);
    if (tarefaEncontrada) {
      tarefaEncontrada.tarefas = texto;
    }
    idEditando = null; 
  } else {
    const ultimoNumero = tarefas.length > 0 ? tarefas[tarefas.length - 1].numero : 0;
    const novaTarefa = {
      numero: ultimoNumero + 1,
      tarefas: texto,
      status: "andamento",
    };
    
    tarefas.push(novaTarefa);
  }

  desenhar();

  inputTask.value = "";
  inputTask.focus();
});

function desenhar() {
  lista.textContent = "";

  const textoBuscar = busca ? busca.value.trim().toLowerCase() : "";

  let visiveis = tarefas.filter((t) => {
    const combinaTexto = t.tarefas.toLowerCase().includes(textoBuscar);
    const combinaFiltro = filtros === "todas" ? true : t.status === filtros;
    return combinaTexto && combinaFiltro;
  });

  visiveis.forEach((t) => {
    lista.append(criarTarefas(t));
  });

  if (vazia) {
    vazia.hidden = visiveis.length > 0;
  }
}

if (busca) {
  busca.addEventListener("input", desenhar);
}

desenhar();