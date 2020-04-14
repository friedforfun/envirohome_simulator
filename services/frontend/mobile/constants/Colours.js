export default {
    center: '#20DF38',
    right: '#67DF20',
    left: '#C7DF20',

    efficiency_max: '#00d2ff',
    efficiency_mid: '#fdff00',
    efficiency_min: '#ff0000',
}

// https://stackoverflow.com/questions/21646738/convert-hex-to-rgba
// credit to Lobster Fighter & ratskin
export const hex2rgba = (hex, alpha = 1) => {
    const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
    return `rgba(${r},${g},${b},${alpha})`;
};