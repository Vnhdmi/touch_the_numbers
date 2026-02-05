"use strict";

const timer = document.getElementById("timer");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");
const backBtn = document.getElementById("btn99");

let startTime; // Startボタンクリック時の時刻 [cite: 580]
let timeoutid; // ID [cite: 583]
let stopTime = 0; // Stopまでの経過時間 [cite: 586]
let counter = 0; // ターン数カウンター [cite: 591]

setButtonStateInitial(); // ボタンを"初期状態とする [cite: 588]

const squares = document.getElementsByClassName("square"); // class="square"を取得(しゅとく) [cite: 593]
const squaresArray = Array.from(squares); // Array に変換(へんかん) [cite: 595]

// squaresの要素 (ようそ) を取得(しゅとく) [cite: 598]
const a_1 = document.getElementById("a_1");
const a_2 = document.getElementById("a_2");
const a_3 = document.getElementById("a_3");
const a_4 = document.getElementById("a_4");
const b_1 = document.getElementById("b_1");
const b_2 = document.getElementById("b_2");
const b_3 = document.getElementById("b_3");
const b_4 = document.getElementById("b_4");
const c_1 = document.getElementById("c_1");
const c_2 = document.getElementById("c_2");
const c_3 = document.getElementById("c_3");
const c_4 = document.getElementById("c_4");
const d_1 = document.getElementById("d_1");
const d_2 = document.getElementById("d_2");
const d_3 = document.getElementById("d_3");
const d_4 = document.getElementById("d_4");

// メッセージ [cite: 631]
const msgtxt1 = '<p class="text animate_animated animate_rubberBand" >Push Start!!</p>';
const msgtxt2 = '<p class="text animate_bounce In">Hurry Up!!</p>';
const msgtxt3 = '<p class="text animate_animated animate_heartBeat" >Hurry Up!!!!!!!</p>';
const msgtxt4 = '<p class="text animate_animated animate_rollIn">Clear!!</p>';

// サウンド [cite: 640]
let gameSound = [
    "sound/start.mp3",
    "sound/stop.mp3",
    "sound/reset.mp3",
    "sound/ok.mp3",
    "sound/ng.mp3"
];

// ページ本体が読み込まれたタイミングで実行するコード [cite: 658]
window.addEventListener("DOMContentLoaded", function () {
    setMessage("start");
    let squaresBox = document.getElementById("squaresBox");
    squaresBox.classList.add("js-unclickable");
    squaresBox.style.backgroundColor = "grey";
    
    // Back button event listener
    backBtn.addEventListener("click", function() {
        history.back();
    });
    
    // Support Enter key for back button
    backBtn.addEventListener("keypress", function(e) {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            history.back();
        }
    });
}, false);

// squareをクリックしたときにイベント発火(はっか) [cite: 686]
// クリックしたsquareに、penguinsかbearを表示。画像を表示したsquareはクリックできないようにする、win or lose Judgementの呼び出し [cite: 686]
squaresArray.forEach(function (square) {
    square.addEventListener("click", () => {
        isSelect(square);
    });
    
    // Support keyboard navigation for accessibility
    square.setAttribute("tabindex", "0");
    square.addEventListener("keypress", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            isSelect(square);
        }
    });
});

function isSelect(selectSquare) {
    if (counter == 7) {
        setMessage("hurryup1"); // メッセージ [cite: 710]
    }
    if (counter == 12) {
        setMessage("hurryup2"); // メッセージ [cite: 716]
    }

    let w_id = selectSquare.getAttribute("id");
    let w_num = document.getElementById(w_id).innerHTML;

    if (w_num == counter + 1) {
        let music = new Audio(gameSound[3]);
        music.currentTime = 0;
        music.play(); //再生 [cite: 742]
        selectSquare.style.color = "grey";
        counter++; // ターン数カウンターを+1する [cite: 744]
    } else {
        let music = new Audio(gameSound[4]);
        music.currentTime = 0;
        music.play(); //再生 [cite: 751]
    }

    // ターン数=16になったらGameOver [cite: 756]
    if (counter === 16) {
        gameOver();
    }
}

// メッセージ切り替え (きりかえ) 関数 (かんすう) [cite: 769]
// 要素の中身を変える! JavaScriptでinnerHTMLの使い方【初心者向け】:https://techacademy.jp/magazine/15332 [cite: 779]
function setMessage(id) {
    switch (id) {
        case "start":
            document.getElementById("msgtext").innerHTML = msgtxt1;
            break;
        case "hurryup1":
            document.getElementById("msgtext").innerHTML = msgtxt2;
            break;
        case "hurryup2":
            document.getElementById("msgtext").innerHTML = msgtxt3;
            break;
        case "game_over":
            document.getElementById("msgtext").innerHTML = msgtxt4;
            break;
        default:
            document.getElementById("msgtext").innerHTML = msgtxt1;
    }
}

// ゲーム終了時の処理 [cite: 815]
// 実際に書いてみる! JavaScriptでforEachメソッドを使う方法 【初心者向け】: https://techacademy.jp/magazine/14635 [cite: 828]
// classListの使い方まとめ: https://qiita.com/tomokichi-ruby/items/2460c5902d19b81cace5 [cite: 828]
function gameOver() {
    setMessage("game_over"); // メッセージ [cite: 830]
    let squaresBox = document.getElementById("squaresBox");
    squaresBox.classList.add("js-unclickable");
    squaresBox.style.backgroundColor = "rgba(128, 128, 128, 0.5)";
    
    let music = new Audio(gameSound[1]);
    music.currentTime = 0;
    music.play(); //再生 [cite: 839]

    $(document).snowfall({
        flakeColor: "rgb(255,240,245)", // 雪の色 [cite: 855]
        maxSpeed: 3, // 最大速度(さいだいそくど) [cite: 856]
        minSpeed: 1, // 最小速度 (さいしょうそくど) [cite: 857]
        maxSize: 20, // 最大サイズ (さいだいサイズ) [cite: 858]
        minSize: 10, // 最小サイズ (さいしょう サイズ) [cite: 859]
        image: "img/star.png"
    });

    // タイマーを 停止中”状態とする [cite: 862]
    setButtonStateStopped();
    clearTimeout(timeoutid); //setTimeout()でセットしたタイマーを解除する際に使用 [cite: 864]
    stopTime = Date.now() - startTime;
}

// 数字をランダムに配置 [cite: 871]
let arrNum; 
let arrId = ["a_1", "a_2", "a_3", "a_4", "b_1", "b_2", "b_3", "b_4", "c_1", "c_2", "c_3", "c_4", "d_1", "d_2", "d_3", "d_4"];

function randominzing() {
    arrNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    let numArr = [];
    let arrLen = arrNum.length;

    for (let i = 0; i < 16; i++, arrLen--) {
        let rndNum = Math.floor(Math.random() * arrLen);
        numArr.push(arrNum[rndNum]);
        arrNum[rndNum] = arrNum[arrLen - 1];
    }

    for (let i = 0; i < 16; i++) {
        document.getElementById(arrId[i]).innerHTML = numArr[i];
    }
}

// Startボタンクリック [cite: 929]
start.addEventListener("click", function () {
    setMessage("hurryup1"); // メッセージ [cite: 937]
    let squaresBox = document.getElementById("squaresBox");
    squaresBox.classList.remove("js-unclickable");
    squaresBox.style.backgroundColor = "";
    
    let music = new Audio(gameSound[0]);
    music.currentTime = 0;
    music.play(); //再生 [cite: 952]
    
    randominzing(); // 数字シャッフル [cite: 954]
    setButtonStateRunning(); // ボタンをタイマー 動作中”状態とする [cite: 958]
    startTime = Date.now();
    countUp();
}, false);

// Support keyboard for Start button
start.addEventListener("keypress", function (e) {
    if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        start.click();
    }
}, false);

// Stopボタンクリック [cite: 973]
stop.addEventListener("click", function () {
    let squaresBox = document.getElementById("squaresBox");
    squaresBox.classList.add("js-unclickable");
    setButtonStateStopped(); // タイマーを 停止中“状態とする [cite: 991]
    clearTimeout(timeoutid);
    stopTime = Date.now() - startTime;
    
    let music = new Audio(gameSound[1]);
    music.currentTime = 0;
    music.play(); //再生 [cite: 1000]
}, false);

// Support keyboard for Stop button
stop.addEventListener("keypress", function (e) {
    if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        stop.click();
    }
}, false);

// Resetボタンクリック [cite: 1025]
reset.addEventListener("click", function () {
    setMessage("start");
    let squaresBox = document.getElementById("squaresBox");
    squaresBox.classList.add("js-unclickable");
    squaresBox.style.backgroundColor = "grey";
    $(document).snowfall("clear"); // stop snowfall [cite: 1032]
    counter = 0; // カウンター [cite: 1033]
    
    let music = new Audio(gameSound[2]);
    music.currentTime = 0;
    music.play(); // 再生 [cite: 1039]
    
    setButtonStateInitial(); // ボタンを“初期状態とする [cite: 1041]
    timer.textContent = "00:00.000";
    stopTime = 0;
    
    squaresArray.forEach(function (square) {
        square.style.color = "#4a488e";
        let w_id = square.getAttribute("id");
        document.getElementById(w_id).innerHTML = "";
    });
});

// Support keyboard for Reset button
reset.addEventListener("keypress", function (e) {
    if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        reset.click();
    }
}, false);

// タイマー 
function countUp() {
    const d = new Date(Date.now() - startTime + stopTime);
    
    /* padStart()で2桁固定表示とする */ 
    const m = String(d.getMinutes()).padStart(2, "0");
    const s = String(d.getSeconds()).padStart(2, "0");
    const ms = String(d.getMilliseconds()).padStart(3, "0");
    
    /* 描画*/ 
    timer.textContent = `${m}:${s}.${ms}`;
    
    timeoutid = setTimeout(() => {
        countUp(); //再帰呼び出し [cite: 1096]
    }, 10);
}

// ボタン 表示制御 [cite: 1105]
// 初期 または・Reset後 [cite: 1115]
function setButtonStateInitial() {
    start.classList.remove("js-inactive");
    reset.classList.add("js-inactive");
    stop.classList.add("js-inactive");
    start.classList.remove("js-unclickable");
    stop.classList.add("js-unclickable");
    reset.classList.add("js-unclickable");
}

// 状態:タイマー動作中 [cite: 1128]
function setButtonStateRunning() {
    start.classList.add("js-inactive"); // 非活性 [cite: 1132]
    stop.classList.remove("js-inactive"); // 活性 [cite: 1134]
    reset.classList.add("js-inactive"); //非活性 [cite: 1136]
    start.classList.add("js-unclickable");
    stop.classList.remove("js-unclickable");
    reset.classList.add("js-unclickable");
}

// 状態:タイマー停止中 [cite: 1147]
function setButtonStateStopped() {
    start.classList.add("js-inactive"); 
    stop.classList.add("js-inactive");
    reset.classList.remove("js-inactive"); // 活性 [cite: 1158]
    start.classList.add("js-unclickable");
    stop.classList.add("js-unclickable");
    reset.classList.remove("js-unclickable");
}