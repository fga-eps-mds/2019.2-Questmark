getInfo = (formId, formName) => {
    document.getElementById("ModalInterno").innerHTML = formName;
    document.getElementById("shareLink").value = 'http://localhost:3000/forms/postar/' + formId;
    document.getElementById("iFrame").value = '<iframe src=' +
        '"http://localhost:3000/forms/postar/' + formId + '"' +
        ' height="300px" width="60%"' + '></iframe>';

};
copyLink = () => {
    let copyText = document.getElementById("shareLink");
    copyText.select();
    document.execCommand("copy");
    alert("Link copiado com sucesso");
};
copyIframe = () => {
    let copyText = document.getElementById("iFrame");
    copyText.select();
    document.execCommand("copy");
    alert("iFrame copiado com sucesso");
};