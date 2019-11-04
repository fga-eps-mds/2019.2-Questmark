//Retorna um array de cores aleatórias.
function generateColors(size) {
    let colors = Array();
    let R,G,B;
    const alphaChannel = 0.5;
    for(let i = 0;i < size;i++){
        R = Math.floor(Math.random() * 256);
        G = Math.floor(Math.random() * 256);
        B = Math.floor(Math.random() * 256);
        colors.push(`rgba(${R},${G},${B},${alphaChannel})`);
    }
    return colors;
}

//Inicializa o histograma com 0.
function initializeFieldHistogram(mapField,histogramFields) {
    if(!mapField) return;
    mapField.forEach((element) => {
        if(histogramFields[element.name] === undefined){
                histogramFields[element.name] = Array();
        }
        histogramFields[element.name][element.option] = 0;
    });
}

//Gera o histograma de respostas para cada campo.
function generateHistogram(jsonAnswers,fieldMapping) {
    //Criando o array de histograma
    let histogramFields = Array();
    //Checkbox
    initializeFieldHistogram(fieldMapping.checkbox,histogramFields);
    //Radio
    initializeFieldHistogram(fieldMapping.radio,histogramFields);
    //Select
    initializeFieldHistogram(fieldMapping.select,histogramFields);

    //Contabilizando respostas no array de histograma
    jsonAnswers.forEach((element) => {
        for(let field in histogramFields){
            if(Array.isArray(element[field])){
                element[field].forEach((answer) => {
                    histogramFields[field][answer]++;
                });
            }
            else{
                histogramFields[field][element[field]]++;
            }
        }
    });

    console.log(jsonAnswers);
    console.log(histogramFields);

    return histogramFields;
}