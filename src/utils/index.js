export const urlApi = 'https://kitsu.io/api/edge';

export function addAccents(str) {
    const A = 'AÀÁÂÃÄÅaàáâãäå';
    const E = 'EÈÉÊËeèéêë';
    const I = 'IÌÍÎÏiìíîï';
    const O = 'OÒÓÔÕÕÖØoòóôõöø';
    const U = 'UÙÚÛÜùúûüu';
    const C = 'CÇcç';
    const N = 'NÑnñ';
    const S = 'SŠsš';
    const Y = 'YŸÿýy';
    const Z = 'ŽZžz';
    const D = 'DÐ';
    if (str !== '') {
        if (A.includes(str)) {
            return `[${A}]`;
        }
        if (E.includes(str)) {
            return `[${E}]`;
        }
        if (I.includes(str)) {
            return `[${I}]`;
        }
        if (O.includes(str)) {
            return `[${O}]`;
        }
        if (U.includes(str)) {
            return `[${U}]`;
        }
        if (C.includes(str)) {
            return `[${C}]`;
        }
        if (N.includes(str)) {
            return `[${N}]`;
        }
        if (S.includes(str)) {
            return `[${S}]`;
        }
        if (Y.includes(str)) {
            return `[${Y}]`;
        }
        if (Z.includes(str)) {
            return `[${Z}]`;
        }
        if (D.includes(str)) {
            return `[${D}]`;
        }
        return str;
    } else {
        return str;
    }
}

export function loopTextFormat(txt) {
    const strLen = txt.length;
    let i;
    const finalString = [];
    for (i = 0; i < strLen; i++) {
        finalString.push(addAccents(txt[i]));
    }
    return finalString.join('');
}