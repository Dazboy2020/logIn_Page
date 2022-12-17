"use strict";

const account1 = {
	owner: "dd",
	pin: 4444,
	interestRate: 1.2,
	movements: [
		[1200, "2019-11-18T21:31:17.178Z"],
		[4515.23, "2019-12-23T07:42:02.383Z"],
		[-1006.5, "2020-01-28T09:15:04.904Z"],
		[200, "2020-04-01T10:17:24.185Z"],
		[-62.21, "2020-05-08T14:11:59.604Z"],
		[-133.9, "2020-05-27T17:01:17.194Z"],
		[791.97, "2020-07-11T23:36:17.929Z"],
		[130, "2020-07-12T10:51:36.790Z"],
	],
	movementsUSD: [
		[100, "2019-11-18T21:31:17.178Z"],
		[45.23, "2019-12-23T07:42:02.383Z"],
		[-250.5, "2020-01-28T09:15:04.904Z"],
		[2500, "2020-04-01T10:17:24.185Z"],
		[-242.21, "2020-05-08T14:11:59.604Z"],
		[-133.9, "2020-05-27T17:01:17.194Z"],
		[50.97, "2022-12-11T23:36:17.929Z"],
		[1500, "2022-12-16T10:51:36.790Z"],
	],
	locale: "en-GB",
};

const account2 = {
	owner: "jd",
	interestRate: 1.5,
	pin: 2222,
	movements: [
		[1200, "2019-11-18T21:31:17.178Z"],
		[1300, "2019-12-23T07:42:02.383Z"],
		[100, "2022-12-15T07:42:02.383Z"],
	],
	movementsUSD: [
		[100, "2019-11-18T21:31:17.178Z"],
		[45, "2019-12-23T07:42:02.383Z"],
		[-25, "2022-12-17T07:42:02.383Z"],
	],
	locale: "en-GB",
};

const account3 = {
	owner: "js",
	interestRate: 1.2, // %
	pin: 1111,
	movements: [
		[200, "2019-11-18T21:31:17.178Z"],
		[455.23, "2019-12-23T07:42:02.383Z"],
		[-306.5, "2020-01-28T09:15:04.904Z"],
		[2500, "2020-04-01T10:17:24.185Z"],
		[-642.21, "2020-05-08T14:11:59.604Z"],
		[-133.9, "2020-05-27T17:01:17.194Z"],
		[79.97, "2022-12-16T23:36:17.929Z"],
		[1300, "2022-12-17T10:51:36.790Z"],
	],
	movementsUSD: [
		[100, "2019-11-18T21:31:17.178Z"],
		[45.23, "2019-12-23T07:42:02.383Z"],
		[-250.5, "2020-01-28T09:15:04.904Z"],
		[2500, "2020-04-01T10:17:24.185Z"],
		[-242.21, "2020-05-08T14:11:59.604Z"],
		[-133.9, "2020-05-27T17:01:17.194Z"],
		[50.97, "2022-12-11T23:36:17.929Z"],
		[1500, "2022-12-12T10:51:36.790Z"],
	],
	currency: "EUR",
	locale: "pt-PT", // de-DE
};

let accounts = [account1, account2, account3];

//!  ##### ELEMENTS #####
const labelBalanceUSD = document.querySelector(".balance__value--USD");
const labelBalanceEUR = document.querySelector(".balance__value--EUR");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const containerMovements = document.querySelector(".movements");
const fxlabel = document.querySelector(".fx__label");

//! LOG-IN
const loginUsername = document.querySelector(".username__input");
const loginPin = document.querySelector(".password__input");

//!DISPLAY WINDOWS (SIGN_UP & CREATE ACCOUNT)
const displaySignUpWindow = document.querySelector(".container2");
const displayLogInWindow = document.querySelector(".container");

const mainApplication = document.querySelector(".MainApp");

//! SIGN-UP DETAILS
const enterUsername = document.querySelector(".username__signup__input");
const enterPassword = document.querySelector(".password__signup__input");
const confirmPassword = document.querySelector(".password__confirm__input");

//! ERROR MESSAGES
const login__details__incorrect = document.querySelector(".error__message");

const signUp__details__incorrect = document.querySelector(
	".error__message__signUp"
);

//! TRANSFER & EXCHANGE PANEL
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const fxTransferAmount = document.querySelector(".form__input--loan-amount");
// const closeAccount = document.querySelector(".form--close");
// const closeAccountPin = document.querySelector(".form__input--user");

const closeAccountPin = document.querySelector(".form__input--pin");
const closeAccountUser = document.querySelector(".form__input--user");

//!BUTTONS
const btnLogin = document.querySelector(".submit__btn");
const btnCreate = document.querySelector(".create__btn");
const mainPageLink = document.querySelector(".MainPage__btn");
const signUp = document.querySelector(".signup__btn");
const btnlogOut = document.querySelector(".logOut__btn");
const btnLoan = document.querySelector(".form__btn--loan");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnSwitchCurrency = document.querySelector(".switch__btn");
const btnSort = document.querySelector(".btn--sort");
const btnClose = document.querySelector(".form__btn--close");

//! NAVBAR ELEMENTS
const labelWelcome = document.querySelector(".welcomeMessage");
const labelDate = document.querySelector(".date");

//!!  ########### FUNCTIONS #############

//! Hide logIn & Create User Windows
const successfulLogin = function () {
	displayLogInWindow.classList.add("hidden");
	displaySignUpWindow.classList.add("hidden");
	mainApplication.classList.remove("hidden");
};

const successfulLogOut = function () {
	displayLogInWindow.classList.remove("hidden");
	// displaySignUpWindow.classList.remove("hidden");
	mainApplication.classList.add("hidden");
};

//! DISPLAY TIME FUNCTION
const showTime = () => {
	const tick = setInterval(() => {
		const now = new Date();
		const options = {
			weekday: "long",
			day: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
		};
		const intl = new Intl.DateTimeFormat("en-GB", options).format(now);
		labelDate.textContent = intl;
	}, 0);
};

//! (acc) is shorthand for currentAccount

let currentAccount;
let eurAccount = true;
let sorted = false;

const updateUI = function (acc) {
	sorted = false;
	displayMovements(acc);
	calcDisplayBalance(acc);
	calcDisplaySummary(acc);
	fxlabel.textContent = "Sell € for $";
};

//! LOG_IN function
btnLogin.addEventListener("click", function (e) {
	e.preventDefault();

	currentAccount = accounts.find(
		(acc) => acc.owner === loginUsername.value.trim()
	);

	if (currentAccount?.pin === +loginPin.value) {
		successfulLogin();
		labelWelcome.textContent = `Welcome, ${currentAccount.owner.toUpperCase()}.`;
		updateUI(currentAccount);
		calcDisplayBalanceUSD(currentAccount);
		showTime();
		clearTransferInputs();
	} else {
		clearLoginInputs();
		displayIncorrectLoginError();
	}
});

//! LOG OUT function
btnlogOut.addEventListener("click", function (e) {
	e.preventDefault();
	mainApplication.classList.add("hidden");
	clearLoginInputs();
	clearSignUpInputs();
	displayLogInWindow.classList.remove("hidden");
});

//!Clear Login input fields function
const clearLoginInputs = function () {
	loginUsername.value = "";
	loginPin.value = "";
};

//!Clear Sign-Up fields function
const clearSignUpInputs = function () {
	enterUsername.value = "";
	enterPassword.value = "";
	confirmPassword.value = "";
};
//! Clear transfer inputs
const clearTransferInputs = function () {
	inputTransferTo.value = "";
	inputTransferAmount.value = "";
	fxTransferAmount.value = "";
	closeAccountUser.value = "";
	closeAccountPin.value = "";
};

//! Display incorrect error message
const displayIncorrectLoginError = function () {
	login__details__incorrect.classList.remove("hidden");
	setTimeout(() => {
		login__details__incorrect.classList.add("hidden");
	}, "3000");
};

const displayIncorrectSignUpError = function () {
	signUp__details__incorrect.classList.remove("hidden");
	setTimeout(() => {
		signUp__details__incorrect.classList.add("hidden");
	}, "3000");
};

//! Create Button Event Handler
btnCreate.addEventListener("click", function (e) {
	e.preventDefault();
	clearSignUpInputs();
	displayLogInWindow.classList.toggle("hidden");
	displaySignUpWindow.classList.toggle("hidden");
});

//! Main Page Link Button Event Handler
mainPageLink.addEventListener("click", function (e) {
	e.preventDefault();
	console.log("main");
	displayLogInWindow.classList.toggle("hidden");
	displaySignUpWindow.classList.toggle("hidden");
	clearSignUpInputs();
});

//! SIgn Up Button Event Handler
signUp.addEventListener("click", function (e) {
	e.preventDefault();

	if (enterPassword.value.length < 4) {
		displayIncorrectSignUpError();
	} else {
		createNewUser();
	}
});

const createNewUser = function () {
	const newUserUsername = enterUsername.value.trim();
	const newUserPassword = Number(enterPassword.value.trim());
	const newUserConfirmPassword = Number(confirmPassword.value.trim());
	console.log(newUserPassword.length);
	if (
		!newUserUsername ||
		!newUserPassword ||
		!newUserConfirmPassword ||
		newUserPassword != newUserConfirmPassword
	) {
		clearSignUpInputs();
		displayIncorrectSignUpError();
	} else {
		accounts.push({
			owner: newUserUsername,
			pin: newUserPassword,
			movements: [],
			movementsUSD: [],
			interestRate: 1.2,
		});

		currentAccount = accounts[accounts.length - 1];

		labelWelcome.textContent = `Welcome, ${currentAccount.owner}.`;
		successfulLogin();
		updateUI__USD(currentAccount);
		updateUI(currentAccount);
		clearTransferInputs();
		showTime();
	}
};

//! ### DATE  Function#####

const formatMovementDate = function (date, locale) {
	const calcDaysPassed = (date1, date2) =>
		Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

	const daysPassed = calcDaysPassed(new Date(), date);

	if (daysPassed === 0) return "Today";
	if (daysPassed === 1) return "Yesterday";
	if (daysPassed <= 7) return `${daysPassed} days ago`;

	return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
	return new Intl.NumberFormat(locale, {
		style: "currency",
		currency: currency,
	}).format(value);
};

const now = new Date();
const day = `${now.getDate()}`.padStart(2, "0");
const month = `${now.getMonth() + 1}`.padStart(2, 0);
const year = now.getFullYear();

//! ########### EUR ACCOUNT ##########

const displayMovements = function (acc, sort = false) {
	containerMovements.innerHTML = "";
	let movements = acc.movements;
	const moves = sort
		? movements.slice().sort((a, b) => a[0] - b[0])
		: movements;
	moves.forEach(function (mov, i) {
		const type = mov[0] > 0 ? "deposit" : "withdrawal";

		let date = new Date(`${mov[1]}`);
		const displayDate = formatMovementDate(date, acc.locale);

		const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
			i + 1
		} ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${mov[0].toFixed(2)}€</div>
      </div>
    `;
		containerMovements.insertAdjacentHTML("afterbegin", html);
	});
};

const calcDisplayBalance = function (acc) {
	// acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
	acc.balance = acc.movements.reduce((acc, mov) => acc + mov[0], 0);
	labelBalanceEUR.textContent = `${acc.balance.toFixed(2)} €`;
};

const calcDisplaySummary = function (acc) {
	const incomes = acc.movements
		.filter((mov) => mov[0] > 0)
		.reduce((acc, mov) => acc + mov[0], 0);
	labelSumIn.textContent = `${incomes.toFixed(2)}€`;

	const interest = acc.movements
		.filter((mov) => mov[0] > 0)
		.map((deposit) => (deposit[0] * acc.interestRate) / 100)
		.filter((int, i, arr) => {
			return int >= 1;
		})
		.reduce((acc, int) => acc + int, 0);
	labelSumInterest.textContent = `${interest.toFixed(2)}€`;

	const out = acc.movements
		.filter((mov) => mov[0] < 0)
		.reduce((acc, mov) => acc + mov[0], 0);
	labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;
};

//!  ##### #######OPERATION PANELS ##### ##########

btnTransfer.addEventListener("click", function (e) {
	e.preventDefault();
	const amount = Number(inputTransferAmount.value);
	const receiverAcc = accounts.find(
		(acc) => acc.owner === inputTransferTo.value
	);

	if (
		amount > 0 &&
		receiverAcc &&
		currentAccount.balance >= amount &&
		receiverAcc?.owner !== currentAccount.owner &&
		eurAccount
	) {
		currentAccount.movements.push([-amount, new Date().toISOString()]);
		receiverAcc.movements.push([amount, new Date().toISOString()]);
		updateUI(currentAccount);
		clearTransferInputs();
	} else {
		if (
			amount > 0 &&
			receiverAcc &&
			currentAccount.balance >= amount &&
			receiverAcc?.owner !== currentAccount.owner &&
			!eurAccount
		) {
			currentAccount.movementsUSD.push([-amount, new Date().toISOString()]);
			receiverAcc.movementsUSD.push([amount, new Date().toISOString()]);
			updateUI__USD(currentAccount);
			clearTransferInputs();
		}
	}
});

//! #### FX TRANSFER ####
btnLoan.addEventListener("click", function (e) {
	e.preventDefault();
	const amount = Number(fxTransferAmount.value);
	currentAccount.balanceEUR = currentAccount.movements.reduce(
		(acc, mov) => acc + mov[0],
		0
	);

	currentAccount.balanceUSD = currentAccount.movementsUSD.reduce(
		(acc, mov) => acc + mov[0],
		0
	);

	if (amount > 0 && amount < currentAccount.balanceEUR && eurAccount) {
		const eurToUsd = amount * 1.06;
		currentAccount.movements.push([-amount, new Date().toISOString()]);
		currentAccount.movementsUSD.push([eurToUsd, new Date().toISOString()]);
		updateUI__USD(currentAccount);
		updateUI(currentAccount);
		clearTransferInputs();
	} else {
		if (amount > 0 && amount < currentAccount.balanceUSD && !eurAccount) {
			const usdToEur = amount * 0.94;
			currentAccount.movementsUSD.push([-amount, new Date().toISOString()]);
			currentAccount.movements.push([usdToEur, new Date().toISOString()]);
			updateUI(currentAccount);
			updateUI__USD(currentAccount);
			clearTransferInputs();
		}
	}
});

//?### SORT ####
btnSort.addEventListener("click", function (e, acc) {
	e.preventDefault();

	if (eurAccount) {
		displayMovements(currentAccount, !sorted);
	} else {
		displayMovementsUSD(currentAccount, !sorted);
	}

	sorted = !sorted;
});

//! ################# USD ACCOUNT ############
btnSwitchCurrency.addEventListener("click", function (e) {
	e.preventDefault();

	if (eurAccount) {
		updateUI__USD(currentAccount);
	} else {
		console.log(eurAccount);
		updateUI(currentAccount);
	}
	clearTransferInputs();
	eurAccount = !eurAccount;

	eurAccount
		? (fxlabel.textContent = "Sell € for $")
		: (fxlabel.textContent = "Sell $ for €");
});

const displayMovementsUSD = function (acc, sort = false) {
	containerMovements.innerHTML = "";
	let movements = acc.movementsUSD;
	const moves = sort
		? movements.slice().sort((a, b) => a[0] - b[0])
		: movements;
	moves.forEach(function (mov, i) {
		const type = mov[0] > 0 ? "deposit" : "withdrawal";

		let date = new Date(`${mov[1]}`);
		const displayDate = formatMovementDate(date, acc.locale);

		const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
			i + 1
		} ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${mov[0].toFixed(2)}$</div>
      </div>
    `;
		containerMovements.insertAdjacentHTML("afterbegin", html);
	});
};

const calcDisplayBalanceUSD = function (acc) {
	acc.balance = acc.movementsUSD.reduce((acc, mov) => acc + mov[0], 0);
	labelBalanceUSD.textContent = `${acc.balance.toFixed(2)} $`;
};

const calcDisplaySummaryUSD = function (acc) {
	const incomes = acc.movementsUSD
		.filter((mov) => mov[0] > 0)
		.reduce((acc, mov) => acc + mov[0], 0);
	labelSumIn.textContent = `${incomes.toFixed(2)}$`;

	const out = acc.movementsUSD
		.filter((mov) => mov[0] < 0)
		.reduce((acc, mov) => acc + mov[0], 0);
	labelSumOut.textContent = `${Math.abs(out).toFixed(2)}$`;

	const interest = acc.movementsUSD
		.filter((mov) => mov[0] > 0)
		.map((deposit) => (deposit[0] * acc.interestRate) / 100)
		.filter((int, i, arr) => {
			return int >= 1;
		})
		.reduce((acc, int) => acc + int, 0);
	labelSumInterest.textContent = `${interest.toFixed(2)}$`;
};

const updateUI__USD = function (acc) {
	sorted = false;
	displayMovementsUSD(acc);
	calcDisplayBalanceUSD(acc);
	calcDisplaySummaryUSD(acc);
	fxlabel.textContent = "Sell $ for €";
};

btnClose.addEventListener("click", function (e) {
	e.preventDefault();
	console.log("click");

	if (
		closeAccountUser.value === currentAccount.owner &&
		+closeAccountPin.value === currentAccount.pin
	) {
		const index = accounts.findIndex(
			(acc) => acc.owner === currentAccount.owner
		);
		accounts.splice(index, 1);
		successfulLogOut();
	}
	clearTransferInputs();
});
