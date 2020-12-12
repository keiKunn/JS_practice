'use strict';
let quizContents = [];
let correctCnt;

// quizクラス
class Quiz {
  constructor(title,explain,questionText,category,difficulty) {
    //初期状態
    this.title = title;           // 見出し
    this.explain = explain;       // 説明文
    this.questionText = questionText; // 問題文
    this.category = category;     // ジャンル
    this.difficulty = difficulty  // 難易度
  }
  // 初期表示
  displayInit() {
    correctCnt = 0;
    // 画面エリア生成
    const quizArea = document.createElement('div');
    quizArea.id = 'quiz-area';
    // 見出しセット
    const title = document.createElement('h1');
    title.innerText = this.getTitle;
    quizArea.appendChild(title);
    // カテゴリ・難易度見出しセット
    const title2 = document.createElement('h2');
    quizArea.appendChild(title2);
    // 説明文セット
    quizArea.appendChild(document.createElement('hr'));
    const explainParagraph = document.createElement('p');
    explainParagraph.id = 'explain-text';
    quizArea.appendChild(explainParagraph);
    const explainText = document.createTextNode(this.getExplain);
    explainParagraph.appendChild(explainText);
    quizArea.appendChild(document.createElement('hr'));
    // 開始ボタンセット
    const startBtn = document.createElement('button');
    startBtn.id = 'startBtn';
    startBtn.innerText = '開始';
    startBtn.addEventListener('click', () => {
      const quiz = new Quiz('処理中','少々お待ち下さい');
      pushStartBtn(quiz);
    });
    quizArea.appendChild(startBtn);
    document.getElementsByTagName('body')[0].appendChild(quizArea);
  }

  // 処理中表示
  displayLoad() {
    // 見出し
    const oldTitle = document.getElementById('quiz-area').getElementsByTagName('h1');
    oldTitle[0].innerText = this.getTitle;
    // 説明文
    const oldExplainText = document.getElementById('explain-text');
    oldExplainText.innerText = this.getExplain;
    // 開始ボタン非表示
    document.getElementById('startBtn').style.display = 'none';
  }

  /* 問題画面表示
  *  quizData クイズデータ
  *  quizNumber クイズ番号 
  */
  displayQuiz(quizData, quizNumber) {
    const quizArea = document.getElementById('quiz-area');
    // 見出し
    const oldTitle = document.getElementById('quiz-area').getElementsByTagName('h1');
    oldTitle[0].innerText = this.getTitle;
    // [ジャンル]・[難易度]
    const h2 = document.getElementsByTagName('h2')[0];
    let categoryArea;
    let difficultyArea;
    if (quizNumber === 1) {
      // 初回表示時 div生成
      categoryArea = document.createElement('div');
      categoryArea.id = 'category-area';
      difficultyArea = document.createElement('div');
      difficultyArea.id = 'difficulty-area'
    } else {
      categoryArea = document.getElementById('category-area');
      difficultyArea = document.getElementById('difficulty-area');
    }
    categoryArea.innerText = `[ジャンル] ${replaceJsonEscape(this.getCategory)}`;
    h2.append(categoryArea);
    difficultyArea.innerText = `[難易度] ${replaceJsonEscape(this.getDifficulty)}`;
    h2.append(difficultyArea);
    // 問題文
    const oldExplainText = document.getElementById('explain-text');
    oldExplainText.innerText = this.getQuestionText;
    // 選択肢
    let choices = quizData.incorrect_answers; //不正解選択肢をセット
    choices.push(quizData.correct_answer); //正解選択肢を追加
    // 選択肢データをシャッフル
    choices = shuffleChoices(choices);

    if (quizNumber > 1) {
      // 表示済みボタン削除
      const oldChoiceBtnArea = document.getElementById('choiceBtn-area');
      oldChoiceBtnArea.remove();
    }
    // 選択肢ボタンを設置・クリックイベントを登録
    const choiceBtnArea = document.createElement('div');
    choiceBtnArea.id = 'choiceBtn-area';
    choices.forEach((element) => {
      const choiceParagraph = document.createElement('p');
      const choiceBtn = document.createElement('button');
      choiceBtn.innerText = element;

      choiceBtn.addEventListener('click', event => {
        //正解判定
        const choicedAnswer = event.currentTarget.innerText;
        const correctAnswer = replaceJsonEscape(quizData.correct_answer);
        if (choicedAnswer === correctAnswer) {
          // 正解数をカウント
          correctCnt++;
        }

        if (quizContents.length !== quizNumber) {
          // 次の問題を表示
          const nextQuizNum = quizNumber + 1;
          const nextQuizIdx = nextQuizNum - 1;
          const questionText = replaceJsonEscape(quizContents[nextQuizIdx].question);
          const category = quizContents[nextQuizIdx].category;
          const difficulty = quizContents[nextQuizIdx].difficulty;
          const quizClass = new Quiz(`問題${nextQuizNum}`, '', questionText, category, difficulty);
          quizClass.displayQuiz(quizContents[nextQuizIdx], nextQuizNum);
        } else {
          // 結果を表示
          const quizClass = new Quiz(`あなたの正当数は${correctCnt}です！`, '再度チャレンジしたい場合は以下のボタンをクリックして下さい。');
          quizClass.displayResult();
        }
      });
      choiceParagraph.appendChild(choiceBtn);
      choiceBtnArea.appendChild(choiceParagraph);
    });
    quizArea.appendChild(choiceBtnArea);
  }

  // 結果画面表示
  displayResult() {
    const quizArea = document.getElementById('quiz-area');
    // ジャンル・難易度削除
    const h2 = document.getElementsByTagName('h2')[0];
    h2.remove();
    // 表示済みボタン削除
    const oldChoiceBtnArea = document.getElementById('choiceBtn-area');
    oldChoiceBtnArea.remove();
    // 見出し
    const oldTitle = document.getElementById('quiz-area').getElementsByTagName('h1');
    oldTitle[0].innerText = this.getTitle;
    // 説明文
    const oldExplainText = document.getElementById('explain-text');
    oldExplainText.innerText = this.getExplain;
    // 「ホームに戻る」ボタン表示
    const homeBtn = document.createElement('button');
    homeBtn.id = 'homeBtn';
    homeBtn.innerText = 'ホームに戻る';
    homeBtn.addEventListener('click', () => {
      // 画面表示をリセット
      quizArea.remove();
      // クイズインスタンスを初期化
      const quiz = new Quiz('ようこそ','以下のボタンをクリック');
      // 初期表示画面を呼び出す
      quiz.displayInit();
    });
    quizArea.append(homeBtn);
  }

  // ゲッター
  get getTitle() {
    return this.title;
  }
  get getExplain() {
    return this.explain;
  }
  get getQuestionText() {
    return this.questionText;
  }
  get getCategory() {
    return this.category;
  }
  get getDifficulty() {
    return this.difficulty;
  }
  // セッター
  set setTitle(title) {
    this.title = title;
  }
  set setExplain(explain) {
    this.explain = explain;
  }
  set setQuestionText(questionText) {
    this.questionText = questionText;
  }
  set setCategory(category) {
    this.category = category;
  }
  set setDifficulty(difficulty) {
    this.difficulty = difficulty;
  }
}


/**
* 開始ボタン押下
*  Trivia APIをfetchする
*  quizClass クイズクラス
*/
const pushStartBtn = (quizClass) => {
  // Trivia API
  const url = 'https://opentdb.com/api.php?amount=10&type=multiple';
  // fetch
  fetch(url)
    .then((response) => {
      // 「処理中」表示
      quizClass.displayLoad();
      if (response.ok) { // ステータスがokならば
        return response.json(); // レスポンスをJson変換
      } else {
        throw new Error();
      }
    })
    .then((result) => {
      // 返却されたJsonから、quizクラスの中身を作成
      // クイズデータをインスタンスにセット
      console.log(result);
      quizContents = result.results; // Jsonデータの結果配列を取得
      // 問題文・カテゴリ・難易度をセット
      const questionText = quizContents[0].question;
      const category = quizContents[0].category;
      const difficulty = quizContents[0].difficulty;
      const quizClass = new Quiz('問題1', '', questionText, category, difficulty);
      quizClass.displayQuiz(quizContents[0], 1);

    })
    .catch((error) => console.log(error));
}

/* 選択肢データをランダム生成
*   choices 選択肢配列
*/
 const shuffleChoices = (choices) => {
  for (let i = choices.length - 1; i > 0; i--) {
    const r = Math.floor(Math.random() * (i + 1));
    const tmp = choices[i];
    choices[i] = choices[r];
    choices[r] = replaceJsonEscape(tmp); 
  }
  return choices;
}

/* Jsonデータ内のエスケープ文字を変換
*   str json文字列
*/
const replaceJsonEscape = (str) => {
  return str.replace(/&quot;/g,'"').replace(/&#039;/g, '\'').replace(/&amp;/g, '&');
}

// 処理スタート
const quiz = new Quiz('ようこそ','以下のボタンをクリック');
quiz.displayInit();
