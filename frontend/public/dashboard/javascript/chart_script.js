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

//Retorna as configurações do gráfico de pizza.
function createConfigPieChart(field,chartColors,data) {
    const labelsField = Object.keys(data);
    const histogramField = Object.values(data);
    
    let configPie = {
        type: 'pie',
        data: {
            datasets: [{
                data: histogramField,
                backgroundColor: chartColors,
                label: ''
            }],
            labels: labelsField
        },
        options: {
            responsive: true,
            legend:{
                position:'top',
            },
            title:{
                display: true,
                text: field
            }
        }
    };

    return configPie;
}

//Retorna as configurações do gráfico de barras.
function createConfigBarChart(field,chartColors,data){
    const labelsField = Object.keys(data);
    const histogramField = Object.values(data);

    let configBar = {
        type: 'bar',
        data: {
            datasets: [{
                data: histogramField,
                backgroundColor: chartColors,
                label: ''
            }],
            labels: labelsField
        },
        options: {
            responsive: true,
            legend:false,
            title:{
                display: true,
                text: field
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    };    
    
    return configBar;
}

//Cria o contexto em que cada gráfico que será inserido.
function makeContext(field){
    let htmlContext = `        
    <div class="container ctx-chart">
      <div class="row header-chart">
        <div class="col" id="type-${field}">
          Tipo do campo: 
        </div>
        <div class="col">
          <button class="btn-chart" onclick="changeChart('${field}')">Trocar</button>
        </div>
      </div>
      <div class="row">
        <div class="col" id="chart-${field}">
        </div>
      </div>
    </div> `;            

   document.getElementById('charts-div').insertAdjacentHTML('beforeend', htmlContext);
}
