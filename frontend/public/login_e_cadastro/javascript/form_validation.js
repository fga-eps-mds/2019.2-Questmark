function passwordValidation(email){

}

function emailValidation(email){
	let url_req = '/users/check_email';
	let json = {email};
	if(email !== ''){
		$.post(url_req,json,(resp) => {
			if(resp.check){
				//OK
				console.log('Ok!');
			}
			else{
				//Email já utilizado
				console.log('Usuário já existe!');	
			}
		});	
	}
}
