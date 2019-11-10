
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
			//Configurando saída de sucesso
			document.getElementById('modalLabel').innerHTML = 'Pronto!';
			document.getElementById('modalHeader').className = 'modal-header text-success';
			document.getElementById('btnClose').innerHTML = 'Voltar ao menu';
			document.getElementById('btnClose').className = 'btn btn-success';
			document.getElementById('modalBody').innerHTML = 'Questionário salvo com sucesso.';
			document.getElementById('btnClose').onclick = function(){window.location.href = '/forms/'};
			$('#modal-form').modal('show');
		}
		else{
			//Configurando saída de erro
			let erros = '';
			resp.msg.forEach((msg) => {
				erros += `<br>*${msg.erro}`;
			});
			document.getElementById('modalLabel').innerHTML = 'Erro';
			document.getElementById('modalHeader').className = 'modal-header text-danger';
			document.getElementById('btnClose').innerHTML = 'Voltar';
			document.getElementById('btnClose').className = 'btn btn-danger';
			document.getElementById('modalBody').innerHTML = `Erro(s):${erros}`;
			$('#modal-form').modal('show');
		}
	});
});
