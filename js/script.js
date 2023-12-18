var form = document.getElementById("my-form");

async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("my-form-status");
  var data = new FormData(event.target);

  // Verificação de e-mail
  var email = data.get("email");
  if (!isValidEmail(email)) {
    status.innerHTML = "Por favor, insira um e-mail válido.";
    return;
  }

  // Verificação de mensagem com pelo menos 50 caracteres
  var mensagem = data.get("mensagem");
  if (mensagem.length < 50) {
    status.innerHTML = "A mensagem deve ter pelo menos 50 caracteres.";
    return;
  }

  // Verificação de nome com mais de 5 caracteres
  var nome = data.get("nome");
  if (nome.length <= 5) {
    status.innerHTML = "O nome deve ter mais de 5 caracteres.";
    return;
  }

  // Envio do formulário
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      status.innerHTML = "Obrigado por entrar em contato!";
      form.onreset();
    } else {
      response.json().then(data => {
        if (Object.hasOwnProperty(data, 'errors')) {
          status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
        } else {
          status.innerHTML = "Oops! Ocorreu um problema ao enviar sua mensagem!";
        }
      });
    }
  }).catch(error => {
    status.innerHTML = "Ops! Ocorreu um problema ao enviar sua mensagem";
  });
}

function isValidEmail(email) {
  // Expressão regular simples para validar e-mail
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

form.addEventListener("submit", handleSubmit);
    
 // Botão de Detalhes
function mostrarDetalhes() {
  var detalhes = document.getElementById("detalhes");
  if (detalhes.style.display === "none") {
    detalhes.style.display = "block";
  } else {
    detalhes.style.display = "none";
  }
}


// Função para alternar o modo escuro
function toggleDarkMode() {
  const body = document.body;
  const isDarkMode = body.classList.toggle('dark-mode');

  // Atualiza o ícone do botão
  updateButtonIcon(isDarkMode);

  // Salva o estado do modo escuro no armazenamento local
  localStorage.setItem('darkMode', isDarkMode.toString());
}

// Função para atualizar o ícone do botão com base no modo escuro
function updateButtonIcon(isDarkMode) {
  const floatingButton = document.querySelector('.floating-button');
  floatingButton.innerHTML = isDarkMode ? '☀️' : '🌙';
}

// Verifica o estado do modo escuro ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  const isDarkModeSaved = localStorage.getItem('darkMode') === 'true';
  const body = document.body;

  // Aplica o modo escuro se estiver salvo
  if (isDarkModeSaved) {
    body.classList.add('dark-mode');
  }

  // Atualiza o ícone do botão
  updateButtonIcon(isDarkModeSaved);
});
