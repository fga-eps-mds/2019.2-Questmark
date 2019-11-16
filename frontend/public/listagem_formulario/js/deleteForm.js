deleteForm = (formId, formName) => {
    document.getElementById("ModalInternoDelete").innerHTML = formName;
    document.getElementById("delete").href = '/forms/delete/'+formId;
    console.log('/forms/delete/'+formId);   
}
confirmDelete = () => {
    // console.log(document.getElementById("delete").href);
    window.location.href = document.getElementById("delete").href;
}