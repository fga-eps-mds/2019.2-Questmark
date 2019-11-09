module.exports = function arrayToCSV(objArray) { {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = `${Object.keys(array[0]).map(value => `"${value}"`).join(";")}` + '\r\n';
    return array.reduce((str, next) => {
        str += `${Object.values(next).map(value => `"${value}"`).join(";")}` + '\r\n';
        return str;
    }, str);
} function arrayToCSV(objArray) {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = `${Object.keys(array[0]).map(value => `"${value}"`).join(";")}` + '\r\n';
    return array.reduce((str, next) => {
        str += `${Object.values(next).map(value => `"${value}"`).join(";")}` + '\r\n';
        return str;
    }, str);
}

}