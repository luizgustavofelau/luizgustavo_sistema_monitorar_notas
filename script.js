const form = document.getElementById('notaForm');
const tabela = document.querySelector('#tabelaNotas tbody');
const mediaFinal = document.getElementById('mediaFinal');
let dados = [];

function calcularMedia() {
  let somaNotas = 0;
  let somaPesos = 0;

  for (const item of dados) {
    somaNotas += item.nota * item.peso;
    somaPesos += item.peso;
  }

  const media = somaPesos ? (somaNotas / somaPesos).toFixed(2) : 0;
  mediaFinal.textContent = `Média Ponderada: ${media}`;
}

function atualizarTabela() {
  tabela.innerHTML = '';
  dados.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.disciplina}</td>
      <td>${item.nota}</td>
      <td>${item.peso}</td>
      <td><button onclick="remover(${index})">Remover</button></td>
    `;
    tabela.appendChild(row);
  });

  calcularMedia();
}

function remover(index) {
  dados.splice(index, 1);
  atualizarTabela();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const disciplina = document.getElementById('disciplina').value.trim();
  const nota = parseFloat(document.getElementById('nota').value);
  const peso = parseFloat(document.getElementById('peso').value);

  if (disciplina && !isNaN(nota) && !isNaN(peso)) {
    dados.push({ disciplina, nota, peso });
    form.reset();
    atualizarTabela();
  } else {
    alert('Preencha todos os campos corretamente.');
  }
});
