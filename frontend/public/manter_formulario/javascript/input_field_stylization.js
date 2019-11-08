function apllyClass(arrayElements,classBootstrap){
	let visited_fields = Array();
	if(!arrayElements) return;
	arrayElements.forEach((element) => {
		if(visited_fields.indexOf(element.name) == -1){
			let divParent = document.getElementById(`${element.name}`);	
			divParent.className = 'field mx-sm-2';
			visited_fields.push(element.name);
		}
		let labelOption = document.getElementById(`lbl-${element.option}`);
		let divOption = document.getElementById(`div-${element.option}`);
		let inputOption = document.getElementById(`${element.option}`);
		divOption.className = classBootstrap;
		inputOption.className = 'custom-control-input';
		labelOption.className = 'custom-control-label labelOption';
	});
}

function stylizeFields(dataInputs){
	let classBootstrap;

	//Checkbox
	classBootstrap = 'custom-control custom-checkbox optionField';
	apllyClass(dataInputs.checkbox,classBootstrap);

	//Radio
	classBootstrap = 'custom-control custom-radio custom-control-inline optionField';
	apllyClass(dataInputs.radio,classBootstrap);

	//Text
	if(dataInputs.text){
		dataInputs.text.forEach((element) => {
			let domElement = document.getElementById(element.name);
			domElement.parentNode.className = 'form-inline mx-sm-2';
			domElement.className = 'form-control mx-sm-2';
		});
	}

	//Select
	if(dataInputs.select){
		dataInputs.select.forEach((element) => {
			//document.getElementById(element.name).className = 'form-control';
			let domElement = document.getElementById(element.name);
			domElement.parentNode.className = 'form-inline mx-sm-2';
			domElement.className = 'form-control mx-sm-2';			
		});
	}
}