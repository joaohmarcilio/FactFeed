
function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav")
  if (!toggle || !nav) return;

  toggle.addEventListener("click", function () {
    nav.classList.toggle("open");
  });
}

const quizQuestions = [
  {
    question: "Você vê uma notícia chocante numa rede social, sem indicar de qual site ela veio. O que é mais sensato fazer primeiro?",
    options: [
      "Compartilhar logo, antes que outras pessoas percam a novidade",
      "Procurar a fonte original da notícia antes de acreditar nela",
      "Confiar porque várias pessoas já comentaram",
      "Ignorar completamente e nunca mais pensar nisso"
    ],
    correct: 1,
    feedbackOk: "Isso mesmo! Sem uma fonte identificável, não há como confirmar se a informação é real.",
    feedbackBad: "Sem saber de onde a notícia veio, não dá para confirmar se ela é verdadeira. O ideal é buscar a fonte original."
  },
  {
    question: "Um título diz: \"Cientistas descobrem que tomate CURA qualquer doença em 24 horas!\". Esse tipo de título é um exemplo de:",
    options: [
      "Jornalismo investigativo",
      "Título sensacionalista (clickbait)",
      "Conteúdo verificado por especialistas",
      "Notícia comum de saúde"
    ],
    correct: 1,
    feedbackOk: "Exato! Promessas exageradas e urgência artificial são marcas registradas do clickbait.",
    feedbackBad: "Promessas absolutas (\"cura qualquer doença\") e prazos chamativos (\"em 24 horas\") são típicos de clickbait, feito para gerar cliques, não para informar."
  },
  {
    question: "Qual destas é uma boa prática ao avaliar uma foto chocante que está circulando online?",
    options: [
      "Acreditar, porque fotos nunca mentem",
      "Verificar se a imagem já apareceu em outro contexto ou data, usando uma busca reversa",
      "Compartilhar para alertar todo mundo rapidamente",
      "Aumentar o brilho da imagem para ver melhor"
    ],
    correct: 1,
    feedbackOk: "Perfeito! A busca reversa de imagens ajuda a descobrir se uma foto é antiga, foi tirada de outro lugar ou editada.",
    feedbackBad: "Imagens podem ser antigas, tiradas de outro contexto ou até editadas. Uma busca reversa de imagem ajuda a checar a origem real."
  },
  {
    question: "Uma notícia verdadeira de 2019 está sendo compartilhada como se fosse algo que aconteceu hoje. Esse é um exemplo de:",
    options: [
      "Notícia completamente falsa",
      "Imagem manipulada",
      "Desinformação fora de contexto",
      "Notícia atualizada"
    ],
    correct: 2,
    feedbackOk: "Isso mesmo! O fato em si é real, mas usá-lo fora do tempo ou lugar certo induz as pessoas ao erro.",
    feedbackBad: "Quando um fato real é apresentado com data ou contexto errado, isso é desinformação fora de contexto — o conteúdo é verdadeiro, mas usado de forma enganosa."
  },
  {
    question: "Antes de compartilhar uma notícia importante, qual atitude reduz o risco de espalhar Fake News?",
    options: [
      "Compartilhar primeiro e checar depois, se der tempo",
      "Comparar a informação em pelo menos mais um site confiável",
      "Confiar porque o texto parece bem escrito",
      "Confiar porque tem muitos emojis e exclamações"
    ],
    correct: 1,
    feedbackOk: "Muito bem! Comparar a mesma informação em outras fontes confiáveis é uma das formas mais eficazes de checar antes de compartilhar.",
    feedbackBad: "Um texto bem escrito ou chamativo não é garantia de que é verdade. Comparar com outras fontes confiáveis é o caminho mais seguro."
  }
];

let currentQuestionIndex = 0;
let score = 0;
let answered = false;

function initQuiz() {
  const quizContainer = document.querySelector("#quiz-app");
  if (!quizContainer) return; // só executa na página do quiz

  renderQuestion();

  const nextBtn = document.querySelector("#quiz-next-btn");
  if (nextBtn) {
    nextBtn.addEventListener("click", goToNextQuestion);
  }

  const restartBtn = document.querySelector("#quiz-restart-btn");
  if (restartBtn) {
    restartBtn.addEventListener("click", restartQuiz);
  }
}

function renderQuestion() {
  const total = quizQuestions.length;
  const current = quizQuestions[currentQuestionIndex];
  answered = false;

  // Atualiza barra de progresso
  const progressLabel = document.querySelector("#quiz-progress-label");
  const progressFill = document.querySelector("#quiz-progress-fill");
  if (progressLabel) {
    progressLabel.textContent = "Pergunta " + (currentQuestionIndex + 1) + " de " + total;
  }
  if (progressFill) {
    progressFill.style.width = ((currentQuestionIndex) / total) * 100 + "%";
  }

  // Pergunta
  const questionEl = document.querySelector("#quiz-question-text");
  if (questionEl) {
    questionEl.textContent = current.question;
  }

  // Opções
  const optionsWrap = document.querySelector("#quiz-options");
  optionsWrap.innerHTML = "";
  current.options.forEach(function (optionText, index) {
    const btn = document.createElement("button");
    btn.classList.add("quiz-option");
    btn.type = "button";
    btn.textContent = optionText;
    btn.addEventListener("click", function () {
      handleAnswer(index, btn);
    });
    optionsWrap.appendChild(btn);
  });

  // Esconde feedback e botão de avançar
  const feedback = document.querySelector("#quiz-feedback");
  feedback.classList.remove("show", "ok", "bad");
  feedback.textContent = "";

  const nextBtnWrap = document.querySelector("#quiz-next-wrap");
  nextBtnWrap.style.display = "none";
}

function handleAnswer(selectedIndex, selectedBtn) {
  if (answered) return; // impede clicar em mais de uma opção
  answered = true;

  const current = quizQuestions[currentQuestionIndex];
  const allOptionBtns = document.querySelectorAll(".quiz-option");
  const isCorrect = selectedIndex === current.correct;

  if (isCorrect) {
    score++;
  }

  // Desabilita todos os botões e marca visualmente certo/errado
  allOptionBtns.forEach(function (btn, index) {
    btn.disabled = true;
    if (index === current.correct) {
      btn.classList.add("correct");
    } else if (index === selectedIndex) {
      btn.classList.add("wrong");
    }
  });

  // Exibe feedback educativo
  const feedback = document.querySelector("#quiz-feedback");
  feedback.classList.add("show");
  if (isCorrect) {
    feedback.classList.add("ok");
    feedback.textContent = "✓ Você acertou! " + current.feedbackOk;
  } else {
    feedback.classList.add("bad");
    feedback.textContent = "✗ Não foi essa. " + current.feedbackBad;
  }

  // Mostra botão de avançar (ou finalizar, se for a última pergunta)
  const nextBtnWrap = document.querySelector("#quiz-next-wrap");
  const nextBtn = document.querySelector("#quiz-next-btn");
  nextBtnWrap.style.display = "flex";
  nextBtn.textContent = (currentQuestionIndex === quizQuestions.length - 1)
    ? "Ver resultado"
    : "Próxima pergunta";
}

function goToNextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  const questionScreen = document.querySelector("#quiz-question-screen");
  const resultScreen = document.querySelector("#quiz-result-screen");
  questionScreen.classList.remove("active");
  resultScreen.classList.add("active");

  const progressFill = document.querySelector("#quiz-progress-fill");
  if (progressFill) progressFill.style.width = "100%";

  const total = quizQuestions.length;
  const scoreEl = document.querySelector("#quiz-score-number");
  const messageEl = document.querySelector("#quiz-score-message");

  scoreEl.textContent = score + " / " + total;

  let message;
  if (score === total) {
    message = "Excelente! Você reconhece muito bem os sinais de uma Fake News.";
  } else if (score >= total / 2) {
    message = "Bom resultado! Vale revisar o guia de identificação para fechar os pontos que faltam.";
  } else {
    message = "Esse é só o começo. Releia o guia \"Como Identificar Fake News\" e tente o quiz outra vez.";
  }
  messageEl.textContent = message;
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  answered = false;

  const questionScreen = document.querySelector("#quiz-question-screen");
  const resultScreen = document.querySelector("#quiz-result-screen");
  resultScreen.classList.remove("active");
  questionScreen.classList.add("active");

  renderQuestion();
}

/* verificar noticia */
function initVerifyTool() {
  const form = document.querySelector("#verify-form");
  if (!form) return;

  const input = document.querySelector("#verify-input");
  const resultBox = document.querySelector("#verify-result");
  const redFlagWords = [
    "urgente", "chocante", "ninguém te contou", "mídia esconde",
    "compartilhe antes que apaguem", "100%", "cura milagrosa",
    "não vão te mostrar", "exclusivo", "bomba"
  ];

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const text = input.value.trim();
    if (text === "") return;

    const lowerText = text.toLowerCase();
    const foundFlags = redFlagWords.filter(function (word) {
      return lowerText.includes(word);
    });

    resultBox.classList.add("show", "caution");

    if (foundFlags.length > 0) {
      resultBox.innerHTML =
        "<strong>Atenção: linguagem suspeita encontrada.</strong><br>" +
        "Esse título usa termos comuns em conteúdo sensacionalista (como \"" +
        foundFlags[0] +
        "\"). Isso não confirma que é falso, mas é um sinal para checar a fonte antes de confiar ou compartilhar.";
    } else {
      resultBox.innerHTML =
        "<strong>Nenhum termo sensacionalista comum foi encontrado.</strong><br>" +
        "Isso não significa que a notícia é verdadeira — esta ferramenta é só uma simulação educativa. " +
        "Sempre confira a fonte, a data e compare com outros sites antes de confiar.";
    }
  });
}

/* filtro de exemplos por tipo de fake news */
function initExampleFilter() {
  const chips = document.querySelectorAll(".filter-chip");
  const exampleBlocks = document.querySelectorAll(".example-block");
  if (chips.length === 0 || exampleBlocks.length === 0) return;

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      chips.forEach(function (c) { c.classList.remove("active"); });
      chip.classList.add("active");

      const selectedType = chip.dataset.type;

      exampleBlocks.forEach(function (block) {
        if (selectedType === "todos" || block.dataset.type === selectedType) {
          block.style.display = "";
        } else {
          block.style.display = "none";
        }
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initMobileNav();
  initQuiz();
  initVerifyTool();
  initExampleFilter();
});