"use strict";

const account1 = {
	owner: "darren",
	pin: 1974,
};

const accounts = [account1];

//! Elements
const inputLoginUsername = document.querySelector(".username__input");
const inputLoginPin = document.querySelector(".password__input");
const displaySignUpWindow = document.querySelector(".container2");
const displayLogInWindow = document.querySelector(".container");

//? Buttons
const btnLogin = document.querySelector(".submit__btn");
const btnSign = document.querySelector(".sign__btn");

//! LOG_IN function
btnLogin.addEventListener("click", function (e) {
	e.preventDefault();

	let currentAccount = accounts.find(
		(acc) => acc.owner === inputLoginUsername.value
	);

	if (currentAccount?.pin === +inputLoginPin.value) {
		console.log("success");
	} else {
		console.log("fail");
	}
});

//! SIGN_UP Button Event Handler
btnSign.addEventListener("click", function (e) {
	e.preventDefault();
	displayLogInWindow.classList.toggle("hidden");
	displaySignUpWindow.classList.toggle("hidden");
});
