const incomeInput = document.querySelector(".income");
const calcBtn = document.querySelector(".calculate");
const calcResult = document.querySelector(".calc-result");

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
    calcResult.innerHTML = `Stipendet ditt vil bli redusert med <span>${withdrawAmtRound.toLocaleString()},-</span>.<br>Inntekten din vil være <span>${totalIncomeRound.toLocaleString()},-</span> totalt, hvorav <span>${totalStipendRound.toLocaleString()},-</span> vil være stipend.`;
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
  let iVal = incomeInput.value;
  if (iVal <= maxIncome && iVal > 0) {
    incomeInput.classList.add("green");
    incomeInput.classList.remove("red");
  } else if (iVal > maxIncome) {
    incomeInput.classList.add("red");
    incomeInput.classList.remove("green");
  } else {
    incomeInput.classList.remove("red");
    incomeInput.classList.remove("green");
  }
};

calcBtn.addEventListener("click", calc);

incomeInput.addEventListener("keyup", colorize);

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
