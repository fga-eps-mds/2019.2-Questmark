
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

	sendDataJson(inputs);
}	

function sendDataJson(typeInputs){
	//Envia os dados para o servidor
	let jsonData = {
		name_quest: document.getElementById('name_quest').value,
		copy_html: document.getElementById('copy_html').value,
		copy_markdown: document.getElementById('notes').value,
		type_inputs:typeInputs
	};

	let xhttp = new XMLHttpRequest();
	xhttp.open("POST",`${window.location.href}/salvar`,true);
	xhttp.setRequestHeader('Content-type','application/json; charset=utf-8');
	xhttp.send(JSON.stringify(jsonData));				
	alert('Questionário cadastrado!');
	window.location.href = '/forms/';
}