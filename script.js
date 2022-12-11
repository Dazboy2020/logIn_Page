"use strict";

const account1 = {
	owner: "daz",
	pin: 1974,
};

let accounts = [account1];

//!  ##### ELEMENTS #####

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

//!BUTTONS
const btnLogin = document.querySelector(".submit__btn");
const btnCreate = document.querySelector(".create__btn");
const mainPageLink = document.querySelector(".MainPage__btn");
const signUp = document.querySelector(".signup__btn");
const btnlogOut = document.querySelector(".logOut__btn");

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

//! DISPLAY TIME FUNCTION
const showTime = () => {
	setInterval(() => {
		const now = new Date();
		const options = {
			weekday: "long",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
		};
		const intl = new Intl.DateTimeFormat("en-US", options).format(now);
		labelDate.textContent = intl;
	}, 1000);
};

//! LOG_IN function
btnLogin.addEventListener("click", function (e) {
	e.preventDefault();

	let currentAccount = accounts.find(
		(acc) => acc.owner === loginUsername.value
	);

	if (currentAccount?.pin === +loginPin.value) {
		successfulLogin();
		labelWelcome.textContent = `Welcome, ${currentAccount.owner}.`;
		showTime();
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
	console.log("create");
	displayLogInWindow.classList.toggle("hidden");
	displaySignUpWindow.classList.toggle("hidden");
});

//! Main Page Link Button Event Handler
mainPageLink.addEventListener("click", function (e) {
	e.preventDefault();
	console.log("main");
	displayLogInWindow.classList.toggle("hidden");
	displaySignUpWindow.classList.toggle("hidden");
});

//! SIgn Up Button Event Handler
signUp.addEventListener("click", function (e) {
	e.preventDefault();
	console.log("sign");
	// displayIncorrectSignUpError();
	createNewUser();
});

const createNewUser = function () {
	const newUserUsername = enterUsername.value.trim();
	const newUserPassword = enterPassword.value.trim();
	const newUserConfirmPassword = confirmPassword.value.trim();

	if (
		!newUserUsername ||
		!newUserPassword ||
		!newUserConfirmPassword ||
		newUserPassword.length < 8 ||
		newUserPassword != newUserConfirmPassword
	) {
		clearSignUpInputs();
		displayIncorrectSignUpError();
	} else {
		accounts.push({
			owner: newUserUsername,
			pin: newUserPassword,
		});
		labelWelcome.textContent = `Welcome, ${newUserUsername}.`;

		successfulLogin();
		showTime();
	}
};
