function passwordValidation(email){

}

function emailValidation(email){
	let url_req = '/users/check_email';
	let json = {email};
	let icon = document.getElementById('iconEmail');
	if(email !== '' && email.indexOf('@') != -1){
		$.post(url_req,json,(resp) => {
			if(resp.check){
				//OK
				icon.src = '/login_e_cadastro/images/check.png';
				icon.style.visibility = 'visible';
				console.log('Ok!');
			}
			else{
				//Email já utilizado
				icon.src = '/login_e_cadastro/images/error.png';
				icon.style.visibility = 'visible';
				console.log('Usuário já existe!');	
			}
		});	
	}
	else{
		icon.style.visibility = 'hidden';
	}
}
