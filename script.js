"use strict";

const account1 = {
	owner: "darren",
	pin: 1974,
};

const accounts = [account1];

//! ELEMENTS
const inputLoginUsername = document.querySelector(".username__input");
const inputLoginPin = document.querySelector(".password__input");

//!DISPLAY WINDOWS SIGN_UP & CREATE ACCOUNT
const displaySignUpWindow = document.querySelector(".container2");
const displayLogInWindow = document.querySelector(".container");

const mainApplication = document.querySelector(".MainApp");

//! ERROR MESSAGES
const login__details__incorrect = document.querySelector(".error__message");

//!BUTTONS
const btnLogin = document.querySelector(".submit__btn");
const btnCreate = document.querySelector(".create__btn");
const mainPageLink = document.querySelector(".MainPage__btn");
const signUp = document.querySelector(".signup__btn");

//!!  ########### FUNCTIONS #############

//! Hide logIn & Create User Windows
const successfulLogin = function () {
	displayLogInWindow.classList.add("hidden");
	displaySignUpWindow.classList.add("hidden");
	mainApplication.classList.remove("hidden");
};

//! LOG_IN function
btnLogin.addEventListener("click", function (e) {
	e.preventDefault();

	let currentAccount = accounts.find(
		(acc) => acc.owner === inputLoginUsername.value
	);

	if (currentAccount?.pin === +inputLoginPin.value) {
		successfulLogin();
	} else {
		clearLoginInputs();
		displayIncorrectLoginError();
	}
});

//!Clear Login input fields function
const clearLoginInputs = function () {
	inputLoginUsername.value = "";
	inputLoginPin.value = "";
};

//! Display incorrect error message
const displayIncorrectLoginError = function () {
	login__details__incorrect.classList.remove("hidden");
	setTimeout(() => {
		login__details__incorrect.classList.add("hidden");
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
	// displayLogInWindow.classList.toggle("hidden");
	// displaySignUpWindow.classList.toggle("hidden");
});
