getInfo = (formId, formName) => {
    var link = window.location.href;
    document.getElementById("ModalInterno").innerHTML = formName;
    document.getElementById("shareLink").value = link+'/postar/' + formId;
    document.getElementById("iFrame").value = '<iframe src=' + link +
                                              '/postar/' + formId + '"' +
                                              ' height="300px" width="60%"' + '></iframe>';
    
}
copyLink = () => {
    var copyText = document.getElementById("shareLink");
    copyText.select();
    document.execCommand("copy");
    alert("Link copiado com sucesso");
}
copyIframe = () => {
    var copyText = document.getElementById("iFrame");
    copyText.select();
    document.execCommand("copy");
    alert("iFrame copiado com sucesso");
}