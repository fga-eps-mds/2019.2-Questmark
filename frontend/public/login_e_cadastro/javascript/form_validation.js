let checkUserEmail;

function passwordValidation(email){

}

function emailValidation(email){
	let url_req = '/users/check_email';
	let json = {email};
	let icon = document.getElementById('iconEmail');
	if(email !== '' && email.indexOf('@') != -1){
		$.post(url_req,json,(resp) => {
			if(resp.checkEmail){
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
			alert(resp.msg);
			window.location.href = '/users/login';
			console.log(resp);
		});	
	}
});