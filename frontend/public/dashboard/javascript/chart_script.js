let typeCharts = Array();
let maxScale = Array();

function getAnsewrsEJS(answers) {
    return answers;
}
        
function getFieldMappingEJS(fieldMapping){
    return fieldMapping;
}

//Retorna um array de cores aleatórias.
function generateColors(size) {
    let backgroundColors = Array();
    let borderColors = Array();
    let R,G,B;
    for(let i = 0;i < size;i++){
        R = Math.floor(Math.random() * 256);
        G = Math.floor(Math.random() * 256);
        B = Math.floor(Math.random() * 256);
        backgroundColors.push(`rgba(${R},${G},${B},${0.2})`);
        borderColors.push(`rgba(${R},${G},${B},${0.9})`);
    }
    return [backgroundColors,borderColors];
}

//Inicializa o histograma com 0.
function initializeFieldHistogram(mapField,histogramFields) {
    if(!mapField) return;
    mapField.forEach((element) => {
        if(histogramFields[element.name] === undefined){
                histogramFields[element.name] = Array();
        }
        maxScale[element.name] = 0;
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
                    maxScale[field] = Math.max(maxScale[field],histogramFields[field][answer]);
                });
            }
            else{
                histogramFields[field][element[field]]++;
                maxScale[field] = Math.max(maxScale[field],histogramFields[field][element[field]]);
            }
        }
    });

    return histogramFields;
}

//Retorna as configurações do gráfico de pizza.
function createConfigPieChart(field,backgroundColors,borderColors,data) {
    const labelsField = Object.keys(data);
    const histogramField = Object.values(data);
    
    let configPie = {
        type: 'pie',
        data: {
            datasets: [{
                data: histogramField,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
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
                display: false,
            }
        }
    };

    return configPie;
}

//Retorna as configurações do gráfico de barras.
function createConfigBarChart(field,backgroundColors,borderColors,data){
    const labelsField = Object.keys(data);
    const histogramField = Object.values(data);

    let configBar = {
        type: 'bar',
        data: {
            datasets: [{
                data: histogramField,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 2,
                label: ''
            }],
            labels: labelsField
        },
        options: {
            responsive: true,
            legend:false,
            title:{
                display: false,
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        //Definição da escala
                        /*
                        min: 0,
                        max: maxScale[field] + 1,
                        stepSize: 1,
                        */
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
    <div class="col-lg-5 ctx-chart">
      <div class="row header-chart">
        <div class="col-md-11" style="text-align:center;margin: auto;">
            <span style="font-weight: bold;">${field[0].toUpperCase() + field.slice(1)}</span>
        </div>
        <div class="col-md-1">
            <button class="btn-change" onclick="changeChart('${field}')">
                <img id="img-btn-${field}"/>
            </button>
        </div>
      </div>
      <div class="row">
        <div class="col" id="chart-${field}">
        </div>
      </div>
    </div> `;            

   document.getElementById('charts-div').insertAdjacentHTML('beforeend', htmlContext);
}

//Troca o tipo de gráfico que está sendo exibido.
function changeChart(field){
    let canvasPie = document.getElementById(`pie-canvas-${field}`);
    let canvasBar = document.getElementById(`bar-canvas-${field}`);
    if(typeCharts[field] === 'pie'){
        //Display
        canvasPie.style.display = 'none'; 
        canvasBar.style.display = 'block'; 
        typeCharts[field] = 'bar';
        //Botão
        document.getElementById(`img-btn-${field}`).src = '/dashboard/images/chart-pie.png';
    }
    else if(typeCharts[field] === 'bar'){
        //Display
        canvasBar.style.display = 'none'; 
        canvasPie.style.display = 'block'; 
        typeCharts[field] = 'pie';
        //Botão
        document.getElementById(`img-btn-${field}`).src = '/dashboard/images/chart-bar.png';
    }
}

//Carrega os gráficos na página.
function loadCharts(answers,fieldMapping) {
    let histogramFields = generateHistogram(answers,fieldMapping);
  
    for(let field in histogramFields){  
        //Criando contexto dos gráficos
        makeContext(field);
        let chartDiv = document.getElementById(`chart-${field}`);
        let canvasPie = document.createElement('canvas');
        let canvasBar = document.createElement('canvas');
        canvasBar.id = `bar-canvas-${field}`;
        canvasPie.id = `pie-canvas-${field}`;
        chartDiv.appendChild(canvasPie);
        chartDiv.appendChild(canvasBar);
        canvasBar.style.display ='none';
        
        //Botão de troca de gráfico
        let imgChange = document.getElementById(`img-btn-${field}`);
        imgChange.src = '/dashboard/images/chart-bar.png';

        //Cores dos gráficos
        const lengthField = Object.values(histogramFields[field]).length;
        const [backgroundColors,borderColors] = generateColors(lengthField);

        //Criando os gráficos
        let ctxPie = canvasPie.getContext('2d');
        let ctxBar = canvasBar.getContext('2d');
        new Chart(ctxPie, createConfigPieChart(field,backgroundColors,borderColors,histogramFields[field]));
        new Chart(ctxBar, createConfigBarChart(field,backgroundColors,borderColors,histogramFields[field]));
        typeCharts[field] = 'pie';

    }
};
