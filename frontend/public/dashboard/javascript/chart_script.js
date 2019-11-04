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