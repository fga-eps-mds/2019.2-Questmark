let checkUserEmail;

function passwordValidation(email){

}

function emailValidation(email){
	let url_req = '/users/check_email';
	let json = {email};
	let icon = document.getElementById('iconEmail');
	if(email !== '' && email.indexOf('@') != -1){
		$.post(url_req,json,(resp) => {
			showIconValidation(resp.checkEmail,icon);
		});	
	}
	else{
		icon.style.visibility = 'hidden';
	}
}

$("#formUser").on("submit", function(event) {
	event.preventDefault();
	let fields = document.getElementsByTagName('input'); 
	let json = {nome: fields[0].value,email: fields[1].value,senha: fields[2].value};
	if(checkUserEmail){
		$.post(this.action,json,(resp) => {
			if(resp.check){
				checkUserEmail = false;
				document.getElementById('modalLabel').innerHTML = 'Pronto!';
				document.getElementById('modalHeader').className = 'modal-header text-success';
				document.getElementById('btnClose').innerHTML = 'Fazer login';
				document.getElementById('btnClose').className = 'btn btn-success';
				document.getElementById('modalBody').innerHTML = resp.msg;
				document.getElementById('btnClose').onclick = () => {window.location.href = '/users/login'}; 
				document.getElementById('modalFeedback').onblur = () => {window.location.href = '/users/login'};
				$("#modalFeedback").modal('show');
			}
			else{
				document.getElementById('modalLabel').innerHTML = 'Erro!';
				document.getElementById('modalHeader').className = 'modal-header text-danger';
				document.getElementById('btnClose').innerHTML = 'Voltar';
				document.getElementById('btnClose').className = 'btn btn-danger';
				document.getElementById('modalBody').innerHTML = resp.msg;
				$("#modalFeedback").modal('show');
			}
		});	
	}
	else{
		showIconValidation(false,document.getElementById('iconEmail'));
	}
});

function showIconValidation(check,icon){
	if(check){
		icon.src = '/login_e_cadastro/images/check.png';
		icon.style.visibility = 'visible';
		checkUserEmail = true;
	}
	else{
		icon.src = '/login_e_cadastro/images/error.png';
		icon.style.visibility = 'visible';
		console.log('Usuário já existe!');	
		checkUserEmail = false;
	}
}