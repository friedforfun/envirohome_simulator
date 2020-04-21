export default {
    center: '#20DF38',
    right: '#67DF20',
    left: '#C7DF20',

    error: '#9900cc',

    efficiency_max: '#00FF00',
    efficiency_mid_high: '#84FF00', // 60 - 80
    efficiency_mid: 'FFFF00', // 40 - 60
    efficiency_mid_low: '#FFAE00', // 20 - 40
    efficiency_min: '#ff0000', // 0 -20
}

// https://stackoverflow.com/questions/21646738/convert-hex-to-rgba
// credit to Lobster Fighter & ratskin
export const hex2rgba = (hex, alpha = 1) => {
    const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
    return `rgba(${r},${g},${b},${alpha})`;
};