let sensorPresenca = false;
let sensorMagnetico = true;
let pesoPontos = {
  FL: 200,
  FR: 200,
  RL: 200,
  RR: 200
};
let operadorLiberou = false;
const LIMITE_DIFERENCA = 50;

function verificarEquilibrio() {
  const pesos = Object.values(pesoPontos);
  const max = Math.max(...pesos);
  const min = Math.min(...pesos);
  return max - min <= LIMITE_DIFERENCA;
}

function atualizarStatus() {
  const equilibrado = verificarEquilibrio();

  document.getElementById("peso").innerHTML = equilibrado
    ? '✅ Peso equilibrado'
    : '❌ Peso desequilibrado!';

  document.getElementById("presenca").innerText = !sensorPresenca
    ? '✅ Sem pessoas abaixo'
    : '❌ Pessoa abaixo!';

  

  document.getElementById("pesoFL").innerText = pesoPontos.FL + " kg";
  document.getElementById("pesoFR").innerText = pesoPontos.FR + " kg";
  document.getElementById("pesoRL").innerText = pesoPontos.RL + " kg";
  document.getElementById("pesoRR").innerText = pesoPontos.RR + " kg";

  // Mostrar botão de liberação apenas se tudo estiver ok
  if (equilibrado && sensorMagnetico && !sensorPresenca) {
    document.getElementById("liberarOperador").style.display = "inline-block";
  } else {
    document.getElementById("liberarOperador").style.display = "none";
    operadorLiberou = false;
  }

  // Botão de simulação desabilitado por segurança
  document.getElementById("liberarSimulacao").style.display = "none";
}

function acionarElevador() {
  atualizarStatus();
  const alerta = document.getElementById("alerta");
  const equilibrado = verificarEquilibrio();

  if (!sensorMagnetico || sensorPresenca || !equilibrado) {
    alerta.innerText = "⚠️ Algum sensor impediu a elevação!";
    operadorLiberou = false;
    return;
  }

  if (!operadorLiberou) {
    alerta.innerText = "⚠️ Aguardando liberação manual do operador.";
    return;
  }

  // Revalidação final antes da elevação
  if (equilibrado && sensorMagnetico && !sensorPresenca) {
    alerta.innerText = "✅ Elevador acionado com sucesso!";
  } else {
    alerta.innerText = "⚠️ Condição alterada após liberação. Operação cancelada.";
    operadorLiberou = false;
  }
}

function liberarElevador() {
  operadorLiberou = true;
  document.getElementById("alerta").innerText = "🔓 Liberação feita pelo operador.";
  atualizarStatus();
}

function liberarSimulacao() {
  // Desabilitado por segurança
  operadorLiberou = false;
  document.getElementById("alerta").innerText = "⛔ Liberação por simulação desativada.";
  atualizarStatus();
}

function simularFalha() {
  pesoPontos = {
    FL: Math.floor(Math.random() * 100) + 150,
    FR: Math.floor(Math.random() * 100) + 150,
    RL: Math.floor(Math.random() * 100) + 150,
    RR: Math.floor(Math.random() * 100) + 150
  };

  sensorPresenca = Math.random() < 0.5;
  sensorMagnetico = Math.random() < 0.5;

  operadorLiberou = false;

  document.getElementById("alerta").innerText = "⚠️ Simulação de falha ativada!";
  atualizarStatus();
}

// Inicial
atualizarStatus();