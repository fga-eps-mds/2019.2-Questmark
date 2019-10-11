	
function stylizeFields(){

	let iRadio = Array(),iCheckbox = Array();
	//Tag Input
	let inputElements = document.getElementsByTagName('input');
	for(let i = 0;i < inputElements.length;i++){
		if(inputElements[i].type == 'checkbox'){	
			makeInputContext(iCheckbox,inputElements[i]);
		}else if(inputElements[i].type == 'radio'){
			makeInputContext(iRadio,inputElements[i]);
		}else if(inputElements[i].type == 'text'){
			inputElements[i].className = 'form-control';
		}
	}

	//Tag Select
	let selectElements = document.getElementsByTagName('select');
	for(let i = 0;i < selectElements.length;i++){
		selectElements[i].className = 'form-control';
	}
					
	iRadio.forEach(function(cjtRadio){
		//console.log(cjtRadio.parentAll);
		//cjtRadio.parent.className = 'custom-control custom-radio';
		cjtRadio.parent.className = 'custom-control custom-radio custom-control-inline';
		cjtRadio.child_input.className = 'custom-control-input';
		cjtRadio.child_label.className = 'custom-control-label';
		cjtRadio.parent.appendChild(cjtRadio.child_input);
		cjtRadio.parent.appendChild(cjtRadio.child_label);
						
		//CSS
		cjtRadio.child_label.style.marginLeft = '5px';
		cjtRadio.parentAll.style.paddingLeft = '5px';
		cjtRadio.parentAll.style.paddingTop= '20px	';
		cjtRadio.parentAll.style.marginBottom= '10px';
		cjtRadio.parentAll.style.border = '1.5px solid rgba(35,152,214,0.8)';
		cjtRadio.parentAll.style.borderRadius = '10px';
	});

	iCheckbox.forEach(function(cjtCheckbox){
		//console.log(cjtCheckbox.parentAll);
		cjtCheckbox.parent.className = 'custom-control custom-checkbox';
		cjtCheckbox.child_input.className = 'custom-control-input';
		cjtCheckbox.child_label.className = 'custom-control-label';
		cjtCheckbox.parent.appendChild(cjtCheckbox.child_input);
		cjtCheckbox.parent.appendChild(cjtCheckbox.child_label);
						
		//CSS
		cjtCheckbox.parentAll.style.paddingLeft = '5px';
		cjtCheckbox.parentAll.style.paddingTop = '20px';
		cjtCheckbox.parent.style.display = 'inline';
		cjtCheckbox.child_label.style.marginLeft = '5px';
		cjtCheckbox.parent.style.display = 'inline';
		cjtCheckbox.parentAll.style.border = '1.5px solid rgba(35,152,214,0.8)';
		cjtCheckbox.parentAll.style.borderRadius = '10px';
		cjtCheckbox.parentAll.style.marginBottom= '10px';
	});

}

function makeInputContext(arrayIContext,element){
	let label,labels = element.parentNode.getElementsByTagName('label');
					
	let divParent = document.createElement('div');
	element.parentNode.appendChild(divParent);
						
	for(let j = 0;j < labels.length;j++){
		if(element.value == labels[j].htmlFor) {label = labels[j];break;}
	}

	arrayIContext.push({parent: divParent, child_input: element,child_label: label,
						parentAll: element.parentNode.parentNode});
}