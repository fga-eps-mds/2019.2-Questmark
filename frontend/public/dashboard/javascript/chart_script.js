let typeCharts = Array();
let maxScale = Array();

function getAnsewrsEJS(answers) {
    return answers;
}

function getFieldMappingEJS(fieldMapping) {
    return fieldMapping;
}

function generateColors(size) {
    let backgroundColors = Array();
    let borderColors = Array();
    let R, G, B;
    for (let i = 0; i < size; i++) {
        R = Math.floor(Math.random() * 256);
        G = Math.floor(Math.random() * 256);
        B = Math.floor(Math.random() * 256);
        backgroundColors.push(`rgba(${R},${G},${B},${0.2})`);
        borderColors.push(`rgba(${R},${G},${B},${0.9})`);
    }
    return [backgroundColors, borderColors];
}

function initializeFieldHistogram(mapField, histogramFields) {
    if (!mapField) return;
    mapField.forEach((element) => {
        if (histogramFields[element.name] === undefined) {
            histogramFields[element.name] = Array();
        }
        maxScale[element.name] = 0;
        histogramFields[element.name][element.option] = 0;
    });
}

function generateHistogram(jsonAnswers, fieldMapping) {
    let histogramFields = Array();
    initializeFieldHistogram(fieldMapping.checkbox, histogramFields);
    initializeFieldHistogram(fieldMapping.radio, histogramFields);
    initializeFieldHistogram(fieldMapping.select, histogramFields);
    jsonAnswers.forEach((element) => {
        for (let field in histogramFields) {
            if (Array.isArray(element[field])) {
                element[field].forEach((answer) => {
                    if (answer) {
                        histogramFields[field][answer]++;
                        maxScale[field] = Math.max(maxScale[field], histogramFields[field][answer]);
                    }
                });
            }
            else {
                if (element[field]) {
                    histogramFields[field][element[field]]++;
                    maxScale[field] = Math.max(maxScale[field], histogramFields[field][element[field]]);
                }
            }
        }
    });

    return histogramFields;
}

function createConfigPieChart(field, backgroundColors, borderColors, data) {
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
            legend: {
                position: 'top',
            },
            title: {
                display: false,
            }
        }
    };

    return configPie;
}

function createConfigBarChart(field, backgroundColors, borderColors, data) {
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
            legend: false,
            title: {
                display: false,
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                    }
                }]
            }
        }
    };

    return configBar;
}

function makeContext(field) {
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

function changeChart(field) {
    let canvasPie = document.getElementById(`pie-canvas-${field}`);
    let canvasBar = document.getElementById(`bar-canvas-${field}`);
    if (typeCharts[field] === 'pie') {
        canvasPie.style.display = 'none';
        canvasBar.style.display = 'block';
        typeCharts[field] = 'bar';
        document.getElementById(`img-btn-${field}`).src = '/dashboard/images/chart-pie.png';
    }
    else if (typeCharts[field] === 'bar') {
        canvasBar.style.display = 'none';
        canvasPie.style.display = 'block';
        typeCharts[field] = 'pie';
        document.getElementById(`img-btn-${field}`).src = '/dashboard/images/chart-bar.png';
    }
}

function loadCharts(answers, fieldMapping) {
    let histogramFields = generateHistogram(answers, fieldMapping);

    for (let field in histogramFields) {
        makeContext(field);
        let chartDiv = document.getElementById(`chart-${field}`);
        let canvasPie = document.createElement('canvas');
        let canvasBar = document.createElement('canvas');
        canvasBar.id = `bar-canvas-${field}`;
        canvasPie.id = `pie-canvas-${field}`;
        chartDiv.appendChild(canvasPie);
        chartDiv.appendChild(canvasBar);
        canvasBar.style.display = 'none';
        let imgChange = document.getElementById(`img-btn-${field}`);
        imgChange.src = '/dashboard/images/chart-bar.png';
        const lengthField = Object.values(histogramFields[field]).length;
        const [backgroundColors, borderColors] = generateColors(lengthField);
        let ctxPie = canvasPie.getContext('2d');
        let ctxBar = canvasBar.getContext('2d');
        new Chart(ctxPie, createConfigPieChart(field, backgroundColors, borderColors, histogramFields[field]));
        new Chart(ctxBar, createConfigBarChart(field, backgroundColors, borderColors, histogramFields[field]));
        typeCharts[field] = 'pie';

    }
};
