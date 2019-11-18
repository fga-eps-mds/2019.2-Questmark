module.exports = function arrayToCSV(objArray) { {
    let array = typeof objArray !== 'object' ? JSON.parse(objArray.respostas) : objArray.respostas;
    let titles = objArray.data_quest.type_inputs.fields;
    let str = `${Object.values(titles).map(value => `"${value}"`).join(";")}` + '\r\n';
    return array.reduce((str, next) => {  
        if(Object.keys(next).length != titles.length){
            if(Object.keys(next).length == 0)
                str += `${Object.values(next).map(() => "\t").join(";")}` + '\r\n';
            else {
                for (let i = 0, j = 0; i < titles.length; i++) {
                    if(titles[i] == Object.keys(next)[j]){
                        str += Object.values(next)[j] + ";";
                        j++;
                    }
                    else
                        str += "\t" + ";";
                }
                str += '\r\n';
            }
        }
        else
            str += `${Object.values(next).map(value => `"${value}"`).join(";")}` + '\r\n';
        return str;
    }, str);
} 
}