
const handleAgendar = async () => {
    if (!date || !time) {
      alert("Por favor, selecione uma data e horário.");
      return;
    }
  
    console.log("Tentando agendar com:", { date, time });
  
    try {
      const response = await axios.post("/api/agendar", { date, time });
      console.log("Resposta da API:", response);
      alert("Consulta agendada com sucesso!");
    } catch (error) {
      console.error("Erro ao agendar consulta:", error);
      alert("Erro ao agendar. Tente novamente.");
    }
  };

 /* JavaScript para abrir e fechar o modal */
 document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("modal-agendamento");
  const btnAbrir = document.querySelector(".btn-agendar");
  const btnFechar = document.getElementById("btn-fechar");
  const calendarioContainer = document.getElementById("calendario-container");

  // Simulação de dias disponíveis (poderia vir da API no futuro)
  const diasDisponiveis = ["2025-02-15", "2025-02-17", "2025-02-20", "2025-02-25"];

  btnAbrir.addEventListener("click", function () {
      modal.style.display = "flex";
      renderizarCalendario();
      console.log("Botão clicado");
  });

  btnFechar.addEventListener("click", function () {
      modal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
      if (event.target === modal) {
          modal.style.display = "none";
      }
  });

  function renderizarCalendario() {
      calendarioContainer.innerHTML = "";
      const dataAtual = new Date();
      const mes = dataAtual.getMonth();
      const ano = dataAtual.getFullYear();
      
      for (let dia = 1; dia <= 31; dia++) {
          const dataStr = `${ano}-${(mes + 1).toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
          const btnDia = document.createElement("button");
          btnDia.textContent = dia;
          btnDia.classList.add("dia-calendario");
          
          if (diasDisponiveis.includes(dataStr)) {
              btnDia.classList.add("disponivel");
              btnDia.addEventListener("click", () => selecionarData(dataStr));
          } else {
              btnDia.classList.add("indisponivel");
              btnDia.disabled = true;
          }
          calendarioContainer.appendChild(btnDia);
      }
  }

  function selecionarData(data) {
      document.getElementById("data-consulta").value = data;
      alert("Data selecionada: " + data);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const chatbotBoneco = document.getElementById("chatbot-boneco");
  const chatbox = document.getElementById("chatbox-container");
  const inputField = document.getElementById("chatbox-input");

  if (chatbotBoneco && chatbox) {
      chatbotBoneco.addEventListener("click", function () {
          // Alterna a visibilidade do balão de conversa
          chatbox.style.display = chatbox.style.display === "block" ? "none" : "block";
      });
  } else {
      console.error("Elementos do chatbot não encontrados!");
  }

  // Captura a entrada do usuário no chat ao pressionar "Enter"
  if (inputField) {
      inputField.addEventListener("keypress", function (event) {
          if (event.key === "Enter") {
              let userInput = inputField.value.trim();
              if (userInput !== "") {
                  let chatMessages = document.getElementById("chatbox-messages");

                  // Adiciona mensagem do usuário
                  let userMessage = document.createElement("p");
                  userMessage.className = "user-message";
                  userMessage.textContent = userInput;
                  chatMessages.appendChild(userMessage);

                  // Resposta automática do bot
                  setTimeout(() => {
                      let botResponse = document.createElement("p");
                      botResponse.className = "bot-message";
                      botResponse.textContent = "Estou pensando...";
                      chatMessages.appendChild(botResponse);
                  }, 500);

                  inputField.value = ""; // Limpa o campo de entrada
              }
          }
      });
  }
});
