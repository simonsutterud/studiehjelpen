const incomeInput = document.querySelector(".income");
const calcBtn = document.querySelector(".calculate");
const calcResult = document.querySelector(".calc-result");
const modal = document.querySelector(".modal");
const modalQ = document.querySelector(".fa-question-circle");
const modalX = document.querySelector(".close-modal");
const overlay = document.querySelector(".overlay");

const maxIncome = 195295;
const maxStipend = 49408;

const calc = function () {
  let withdrawAmt = (Number(incomeInput.value) - maxIncome) * 0.05 * 10.5;
  let totalStipend = maxStipend - withdrawAmt;
  let totalIncome = Number(incomeInput.value) + totalStipend;

  let withdrawAmtRound = Math.round(withdrawAmt);
  let totalStipendRound = Math.round(totalStipend);
  let totalIncomeRound = Math.round(totalIncome);

  console.log(withdrawAmtRound);
  console.log(totalStipend);
  console.log(totalIncome);
  console.log(incomeInput.value);
  if (withdrawAmt > 0 && withdrawAmt <= maxStipend) {
    calcResult.innerHTML = `Stipendet ditt vil bli redusert med <span>${withdrawAmtRound.toLocaleString()},-</span>.<br>Inntekten din vil være <span>${totalIncomeRound.toLocaleString()},-</span> totalt,<br>hvorav <span>${totalStipendRound.toLocaleString()},-</span> vil være stipend.`;
  } else if (withdrawAmt <= 0) {
    calcResult.innerHTML = `Stipendet ditt vil ikke bli redusert!`;
  } else if (withdrawAmt > maxStipend) {
    calcResult.innerHTML = `Du vil miste hele stipendet ditt (<span>${maxStipend.toLocaleString()},-</span>).`;
  }
  if (
    incomeInput.value === null ||
    incomeInput.value === "" ||
    incomeInput.value === undefined
  ) {
    calcResult.innerHTML = `Vennligst tast inn din inntekt.`;
  }
};

const colorize = function (e) {
  console.log(e);
  console.log(incomeInput.value);
  let iVal = parseInt(incomeInput.value);
  if (iVal <= maxIncome && iVal > 0) {
    incomeInput.classList.add("green");
    incomeInput.classList.remove("orange");
    incomeInput.classList.remove("red");
  } else if (iVal > maxIncome && iVal <= 289406) {
    incomeInput.classList.add("orange");
    incomeInput.classList.remove("green");
    incomeInput.classList.remove("red");
  } else if (iVal > 289406) {
    incomeInput.classList.remove("orange");
    incomeInput.classList.remove("green");
    incomeInput.classList.add("red");
  } else {
    incomeInput.classList.remove("orange");
    incomeInput.classList.remove("green");
    incomeInput.classList.remove("red");
  }
};

/*function numberWithSpaces() {
  let iVal = incomeInput.value;
  incomeInput.value = iVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}*/

const showModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

modalX.addEventListener("click", closeModal);

modalQ.addEventListener("click", showModal);

overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModal();
  }
});

calcBtn.addEventListener("click", calc);

incomeInput.addEventListener("keyup", colorize);

// incomeInput.addEventListener("keydown", numberWithSpaces);

incomeInput.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    calc();
  }
});

/*
(X – 177.257)*0,05*10,5 = Y  Hvor mye som blir trukket fra maksstipend

Maks stipend (45.044,8) – Y = Z  Hvor mye stipend du får ved å ha en inntekt over grensen

X + Z = Inntekt pluss begrenset stipend
*/
