// クイズの問題と回答
const quizData = [
  {
      question: "日本の首都はどこですか？",
      options: ["大阪", "東京", "京都"],
      answer: 1,
      explanation: "日本の首都は東京です。1868年の明治維新で江戸から東京に改称され、首都となりました。現在は政治、経済、文化の中心地となっています。"
  },
  {
      question: "「赤毛のアン」の舞台となった島はどこですか？",
      options: ["プリンスエドワード島", "マンハッタン島", "種子島"],
      answer: 0,
      explanation: "「赤毛のアン」の舞台はカナダのプリンスエドワード島です。作者のモンゴメリが育った土地でもあり、美しい自然と風景が小説の背景として描かれています。"
  },
  {
      question: "次のうち、最も面積が大きい国はどれですか？",
      options: ["アメリカ", "中国", "ロシア"],
      answer: 2,
      explanation: "最も面積が大きい国はロシアで、約1,710万平方キロメートルです。2位はカナダ、3位はアメリカ、4位は中国となっています。"
  },
  {
      question: "人間の体で最も大きな臓器は何ですか？",
      options: ["心臓", "肺", "皮膚"],
      answer: 2,
      explanation: "人間の最大の臓器は皮膚です。成人の皮膚の面積は約1.5〜2平方メートルで、体重の約15％を占めています。防御、体温調節、感覚など多くの重要な機能を持っています。"
  },
  {
      question: "次のうち、惑星ではないのはどれですか？",
      options: ["火星", "冥王星", "土星"],
      answer: 1,
      explanation: "冥王星は2006年に国際天文学連合によって惑星から除外され、現在は「矮小惑星」として分類されています。火星と土星は太陽系の惑星です。"
  },
  {
      question: "「モナリザ」を描いた画家は誰ですか？",
      options: ["レオナルド・ダ・ヴィンチ", "ミケランジェロ", "ピカソ"],
      answer: 0,
      explanation: "「モナリザ」はレオナルド・ダ・ヴィンチによって16世紀初頭に描かれた肖像画です。現在はパリのルーブル美術館に展示されており、世界で最も有名な絵画の一つです。"
  },
  {
      question: "「ハリー・ポッター」シリーズの作者は誰ですか？",
      options: ["スティーブン・キング", "J.K.ローリング", "村上春樹"],
      answer: 1,
      explanation: "「ハリー・ポッター」シリーズの作者はイギリスの作家J.K.ローリングです。1997年に最初の本が出版され、世界中で5億部以上を売り上げた大ヒットシリーズとなりました。"
  },
  {
      question: "次のうち、最も新しいプログラミング言語はどれですか？",
      options: ["Python", "Go", "Java"],
      answer: 1,
      explanation: "Goは2009年にGoogleによって開発された比較的新しいプログラミング言語です。Pythonは1991年、Javaは1995年に登場しました。"
  },
  {
      question: "世界で最も人口が多い国はどこですか？",
      options: ["インド", "中国", "アメリカ"],
      answer: 0,
      explanation: "2023年に国連の推計によると、インドが中国を抜いて世界で最も人口が多い国になりました。インドの人口は約14.3億人で、中国は約14.2億人です。"
  },
  {
      question: "1ドルは約何円ですか？（2025年3月時点）",
      options: ["約100円", "約150円", "約200円"],
      answer: 1,
      explanation: "2025年3月時点で、1米ドルは約150円前後で取引されています。為替レートは経済状況や国際情勢によって変動します。"
  }
];

// 変数の初期化
let currentQuestion = 0;
let score = 0;
let selectedOption = null;
let quizCompleted = false;

// DOM要素の取得
const menuContainer = document.getElementById("menu-container");
const authorContainer = document.getElementById("author-container");
const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const questionNumberElement = document.getElementById("question-number");
const scoreElement = document.getElementById("score");
const finalScoreElement = document.getElementById("final-score");
const progressBar = document.getElementById("progress");

const modalOverlay = document.getElementById("modal-overlay");
const resultIcon = document.getElementById("result-icon");
const resultTitle = document.getElementById("result-title");
const explanationElement = document.getElementById("explanation");
const nextButton = document.getElementById("next-btn");

const playButton = document.getElementById("play-btn");
const authorButton = document.getElementById("author-btn");
const backToMenuButton = document.getElementById("back-to-menu-btn");
const quizToMenuButton = document.getElementById("quiz-to-menu-btn");
const restartButton = document.getElementById("restart-btn");
const menuButton = document.getElementById("menu-btn");

const resultMessageElement = document.getElementById("result-message");

// クイズを開始する関数
function startQuiz() {
    currentQuestion = 0;
    score = 0;
    quizCompleted = false;
    
    menuContainer.style.display = "none";
    authorContainer.style.display = "none";
    quizContainer.style.display = "block";
    resultContainer.style.display = "none";
    
    loadQuestion();
    updateScore();
}

// 問題を読み込む関数
function loadQuestion() {
    selectedOption = null;
    
    // 進捗バーの更新
    progressBar.style.width = `${(currentQuestion) * 10}%`;
    
    // 問題番号の更新
    questionNumberElement.textContent = currentQuestion + 1;
    
    const currentQuizData = quizData[currentQuestion];
    questionElement.textContent = currentQuizData.question;
    
    optionsElement.innerHTML = "";
    
    currentQuizData.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option");
        button.addEventListener("click", () => selectOption(button, index));
        optionsElement.appendChild(button);
    });
}

// 選択肢を選ぶ関数
function selectOption(optionElement, index) {
    if (selectedOption !== null) return; // すでに回答済みの場合は何もしない
    
    selectedOption = index;
    const currentQuizData = quizData[currentQuestion];
    const isCorrect = index === currentQuizData.answer;
    
    // モーダルを表示
    showResultModal(isCorrect, currentQuizData.explanation);
    
    if (isCorrect) {
        // 正解の場合
        score += 10;
        updateScore();
    }
}

// 結果モーダルを表示する関数
function showResultModal(isCorrect, explanation) {
    if (isCorrect) {
        resultIcon.innerHTML = "🎉";
        resultIcon.className = "result-icon correct-icon";
        resultTitle.textContent = "正解!";
    } else {
        resultIcon.innerHTML = "❌";
        resultIcon.className = "result-icon incorrect-icon";
        resultTitle.textContent = "不正解...";
        
        // 正解を表示
        const correctAnswer = quizData[currentQuestion].options[quizData[currentQuestion].answer];
        explanation = `正解は「${correctAnswer}」です。\n\n${explanation}`;
    }
    
    explanationElement.textContent = explanation;
    modalOverlay.classList.add("active");
}

// モーダルを閉じる関数
function closeModal() {
    modalOverlay.classList.remove("active");
}

// スコアを更新する関数
function updateScore() {
    scoreElement.textContent = score;
    finalScoreElement.textContent = score;
}

// 次の問題に進む関数
function nextQuestion() {
    closeModal();
    currentQuestion++;
    
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
}

// クイズを終了する関数
function endQuiz() {
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";
    progressBar.style.width = "100%";
    quizCompleted = true;
}

// メニューに戻る関数
function goToMenu() {
    menuContainer.style.display = "block";
    authorContainer.style.display = "none";
    quizContainer.style.display = "none";
    resultContainer.style.display = "none";
}

// 作者プロフィールを表示する関数
function showAuthorProfile() {
    menuContainer.style.display = "none";
    authorContainer.style.display = "block";
}

// 確認なしにメニューに戻る（クイズ中断）
function quitQuiz() {
    goToMenu();
}

// スコアに応じたメッセージを返す関数
function getScoreMessage(score) {
    if (score === 100) {
        return "完璧！あなたは本当のクイズマスターです！全問正解おめでとうございます！";
    } else if (score >= 70 && score <= 90) {
        return "素晴らしい結果です！あと少しで満点でした。次回は完璧を目指しましょう！";
    } else if (score >= 40 && score <= 60) {
        return "まずまずの結果です。もう少し頑張れば高得点も夢ではありません！";
    } else {
        return "まだまだ伸びしろがあります！もう一度チャレンジして知識を増やしましょう！";
    }
}

// クイズを終了する関数を修正
function endQuiz() {
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";
    progressBar.style.width = "100%";
    quizCompleted = true;
    
    // スコアに応じたメッセージを表示
    resultMessageElement.textContent = getScoreMessage(score);
}

// イベントリスナーの設定
playButton.addEventListener("click", startQuiz);
authorButton.addEventListener("click", showAuthorProfile);
backToMenuButton.addEventListener("click", goToMenu);
quizToMenuButton.addEventListener("click", quitQuiz);
nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", startQuiz);
menuButton.addEventListener("click", goToMenu);

// メインメニューを表示
goToMenu();