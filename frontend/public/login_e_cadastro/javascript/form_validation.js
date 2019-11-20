let checkUserEmail;
let checkUserPassword;
let checkUserCofirmPassword;

function nameValitation(name) {
	showIconValidation(name, 'iconName');
};

function emailValidation(email) {
	const url_req = '/users/validar_email';
	let json = { email };
	if (email !== '' && email.indexOf('@') !== -1) {
		$.post(url_req, json, (resp) => {
			showIconValidation(resp.checkEmail, 'iconEmail');
			if (resp.checkEmail) {
				showAlertText('', 'alertTextEmail');
			}
			else {
				showAlertText('Usuário já possui cadastro.', 'alertTextEmail');
			};
			checkUserEmail = resp.checkEmail;
		});
	}
	else {
		showIconValidation(false, 'iconEmail');
	};
};

function passwordValidation(password) {
	const url_req = '/users/validar_senha';
	let json = { senha: password };
	$.post(url_req, json, (resp) => {
		if (resp.checkPassword) {
			showAlertText('', 'alertTextPassword');
		}
		else {
			showAlertText('A senha deve conter letras e números com no mínimo 6 caracteres.', 'alertTextPassword');
		}
		showIconValidation(resp.checkPassword, 'iconPassword1');
		checkUserPassword = resp.checkPassword;
	});
};

function confirmPasswordValidation(password) {
	let fieldPassword = document.getElementById('fieldPassword').value;

	if (checkUserPassword) {
		checkUserCofirmPassword = (password === fieldPassword);
		showIconValidation((password === fieldPassword), 'iconPassword2');
	};
};

$("#formUser").on("submit", function (event) {
	event.preventDefault();
	let fields = document.getElementsByTagName('input');
	let json = { nome: fields[0].value, email: fields[1].value, senha: fields[2].value };
	if ((checkUserEmail) && (checkUserCofirmPassword)) {
		$.post(this.action, json, (resp) => {
			if (resp.check) {
				document.getElementById('modalLabel').innerHTML = 'Pronto!';
				document.getElementById('modalHeader').className = 'modal-header text-success';
				document.getElementById('btnClose').innerHTML = 'Fazer login';
				document.getElementById('btnClose').className = 'btn btn-success';
				document.getElementById('modalBody').innerHTML = resp.msg;
				document.getElementById('btnClose').onclick = () => { window.location.href = '/users/login' };
				document.getElementById('modalFeedback').onblur = () => { window.location.href = '/users/login' };
				$("#modalFeedback").modal('show');
			}
			else {
				document.getElementById('modalLabel').innerHTML = 'Erro!';
				document.getElementById('modalHeader').className = 'modal-header text-danger';
				document.getElementById('btnClose').innerHTML = 'Voltar';
				document.getElementById('btnClose').className = 'btn btn-danger';
				document.getElementById('modalBody').innerHTML = resp.msg;
				$("#modalFeedback").modal('show');
			}
		});
	}
	else {
		if (!checkUserEmail) {
			showIconValidation(false, 'iconEmail');
			showAlertText('Usuário já possui cadastro.', 'alertTextEmail');
		}
	};
});

function showIconValidation(check, iconId) {
	let icon = document.getElementById(iconId);
	if (check) {
		icon.src = '/login_e_cadastro/images/check.png';
	}
	else {
		icon.src = '/login_e_cadastro/images/error.png';
	}
	icon.style.visibility = 'visible';
};

function showAlertText(msg, elementId) {
	const element = document.getElementById(elementId);
	element.innerHTML = msg;
};