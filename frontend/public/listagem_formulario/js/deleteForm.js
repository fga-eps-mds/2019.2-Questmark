deleteForm = (formId, formName) => {
    document.getElementById("ModalInternoDelete").innerHTML = formName;
    document.getElementById("delete").href = '/forms/delete/' + formId;
};
confirmDelete = () => {
    window.location.href = document.getElementById("delete").href;
};