module.exports = function arrayToCSV(objArray) { {
    let tagTotal = Object.keys(objArray.data_quest.type_inputs).length;
    const array = typeof objArray !== 'object' ? JSON.parse(objArray.respostas) : objArray.respostas;
    const totalKey = array.find(array => Object.keys(array).length > tagTotal);
    let str = `${Object.keys(totalKey).map(value => `"${value}"`).join(";")}` + '\r\n';
    return array.reduce((str, next) => {
        if(Object.keys(next).map(value => value).length < tagTotal){
            console.log();
            let index = Object.keys(totalKey).findIndex(index => index == Object.keys(next));
            console.log(index);
            console.log(next);
            if( index < 0){
                str += `${Object.values(totalKey).map(() => null).join(";")}` + '\r\n';
            }
            // else
            //     str += `${Object.values(next[index]).map(() => null).join(";")}` + '\r\n';
        }
        else
            str += `${Object.values(next).map(value => `"${value}"`).join(";")}` + '\r\n';
        return str;
    }, str);
} 

}