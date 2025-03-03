// クイズの問題と回答
const quizData = [
    {
        question: "船橋市はどの都道府県に属していますか？",
        options: ["東京都", "千葉県", "埼玉県"],
        answer: 1,
        explanation: "船橋市は千葉県に属しています。",
        imagePath: "./img/quiz/chizu.png"
    },
    {
        question: "船橋市にはいくつの路線が通っている？",
        options: ["５路線", "７路線", "９路線"],
        answer: 2,
        explanation: "総武線、武蔵野線、京葉線、京成本線、松戸線（新京成線）、東武アーバンパークライン、東西線、東葉高速線、北総線の９路線が通っています。",
        imagePath: "./img/quiz/senro.png"
    },
    {
        question: "船橋市の名産品として有名な野菜は？",
        options: ["じゃがいも", "こまつな", "だいこん"],
        answer: 1,
        explanation: "船橋市の名産品として小松菜が有名です。",
        imagePath: "./img/quiz/vegetable.png"
    },
    {
        question: "船橋市の漁港で水揚げされる特産品は？",
        options: ["ホッキ貝", "ホタテ貝", "ホンビノス貝"],
        answer: 2,
        explanation: "船橋市の特産品としてホンビノス貝が知られています。",
        imagePath: "./img/quiz/kai.png"
    },
    {
        question: "ふなっしーの性別は？",
        options: ["おとこ", "おんな", "両方"],
        answer: 2,
        explanation: "ふなっしーは果実なので、「両方」だそうです。",
        imagePath: "./img/quiz/nashi.png"
    },
    {
        question: "船橋市の人口は約何万人？",
        options: ["55万人", "65万人", "75万人"],
        answer: 1,
        explanation: "船橋市の人口は約65万人です。",
        imagePath: "./img/quiz/graph.png"
    },
    {
        question: "船橋市にあるBリーグバスケットボールチームは？",
        options: ["千葉ブレックス", "千葉ジェッツ", "千葉ロボッツ"],
        answer: 1,
        explanation: "千葉ジェッツの本拠地が船橋市にあります。",
        imagePath: "./img/quiz/basketball.png"
    },
    {
        question: "船橋市にある大きな公園の名前は？",
        options: ["ふなばしアンデルセン公園", "ふなばしアルゼンチン公園", "ふなばしアルメニアン公園"],
        answer: 0,
        explanation: "ふなばしアンデルセン公園が有名な公園の１つです。",
        imagePath: "./img/quiz/fuusya.png"
    },
    {
        question: "船橋市に最もゆかりのある作家は？",
        options: ["森鴎外", "芥川龍之介", "太宰治"],
        answer: 2,
        explanation: "太宰治が自身の回想記『十五年間』にて、「最も愛着が深かった」と語っています。",
        imagePath: "./img/quiz/writer.png"
    },
    {
        question: "船橋市の公式キャラクターは誰ですか？",
        options: ["チーバくん", "ふなっしー", "船えもん"],
        answer: 2,
        explanation: "船橋市の公式キャラクターといえば、もちろん「船えもん」ですね！",
        imagePath: "./img/quiz/hakama.png"
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
const quizImageElement = document.getElementById("quiz-image"); // 画像要素の取得

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
    
    // 画像の更新
    if (quizImageElement && currentQuizData.imagePath) {
        quizImageElement.src = currentQuizData.imagePath;
        quizImageElement.style.display = "block";
    } else if (quizImageElement) {
        quizImageElement.style.display = "none";
    }
    
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
    
    // スコアに応じたメッセージを表示
    resultMessageElement.textContent = getScoreMessage(score);
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
    let message;
    if (score === 100) {
        message = "完璧！あなたは本当のクイズマスターです！全問正解おめでとうございます！";
    } else if (score >= 70 && score <= 90) {
        message = "素晴らしい結果です！あと少しで満点でした。次回は完璧を目指しましょう！";
    } else if (score >= 40 && score <= 60) {
        message = "まずまずの結果です。もう少し頑張れば高得点も夢ではありません！";
    } else {
        message = "まだまだ伸びしろがあります！もう一度チャレンジして知識を増やしましょう！";
    }
    const suffix = "また、良ければ作者のプロフィールも見ていってください。";
    return message + suffix;
}

// イベントリスナーの設定
playButton.addEventListener("click", startQuiz);
// authorButton.addEventListener("click", showAuthorProfile);
backToMenuButton.addEventListener("click", goToMenu);
quizToMenuButton.addEventListener("click", quitQuiz);
nextButton.addEventListener("click", nextQuestion);
// restartButton.addEventListener("click", startQuiz);
menuButton.addEventListener("click", goToMenu);

// メインメニューを表示
goToMenu();
