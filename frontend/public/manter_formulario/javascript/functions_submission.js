
function recoverInputsInformation() {
	//Recupera as informações dos campos(type,name,required...)
	let inputs = {select:[],checkbox:[],radio:[],text:[]};

	//Tag Input
	let inputElements = document.getElementsByTagName('input');
	//Alterar início do ctd 'i' dependendo da posição do campo de nome do questionário
	for(let i = 1;i < inputElements.length;i++){
		if(inputElements[i].type == 'checkbox'){	
			inputs.checkbox.push({name: inputElements[i].name,option: inputElements[i].value,
							required: (inputElements[i].className == 'required-input') ? true : false});
		}else if(inputElements[i].type == 'radio'){
			inputs.radio.push({name: inputElements[i].name,option: inputElements[i].value,
							required:(inputElements[i].className == 'required-input') ? true : false});
		}else if(inputElements[i].type == 'text'){
			inputs.text.push({name: inputElements[i].name,
							required: (inputElements[i].className == 'required-input') ? true : false});
		}
	}
	
	//Tag Select
	let selectElements = document.getElementsByTagName('select');
	for(let i = 0;i < selectElements.length;i++){
		for(let j = 0;j < selectElements[i].length;j++){
			inputs.select.push({name: selectElements[i].name,option: selectElements[i][j].label,
							required: (inputElements[i].className == 'required-input') ? true : false});
		}
	}

	return inputs;
}	

//Encaminha a requisição com os dados do form para o servidor
$("#form_registro").on("submit", function(event) {
	event.preventDefault();
	let typeInputs = recoverInputsInformation();

	let jsonData = {
		name_quest: document.getElementById('name_quest').value,
		copy_html: document.getElementById('copy_html').value,
		copy_markdown: document.getElementById('notes').value,
		type_inputs: typeInputs
	};

	$.post(this.action,jsonData,(resp) => {
		if(resp.status){
			alert(resp.validacao[0].msg);
			window.location.href = '/forms/';
		}
		else{
			//Visibilidade
			document.getElementById('div-erros').style.display = 'block';
			
			//Limpando conteúdo da ul de listagem de erros
			let node = document.getElementById('lista-erros');
			node.parentNode.removeChild(node);
			let listErr = document.createElement('ul');
			document.getElementById('div-lista-erros').appendChild(listErr);
			listErr.id = 'lista-erros';
			
			//Listagem dos erros
			resp.validacao.forEach((erro) => {
				let imsg = document.createElement('li');
				imsg.innerHTML = erro.msg;
				listErr.appendChild(imsg);
			});
		}
	});
});


/*
	$.ajax({
  		type: "POST",
		url: this.action,
  		data: jsonData,
  		success: (resp) => { console.log(resp);},
  		error: (err) => { console.log(err);},
  		dataType: 'json'
	});
*/