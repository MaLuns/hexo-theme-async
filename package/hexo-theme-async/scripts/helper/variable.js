
const isPlainObject = (obj) => {
    return Object.prototype.toString.call(obj) === '[object Object]';
};

const toI18n = (obj, i18n) => {
    let isArr = Array.isArray(obj);
    if (isArr || (isPlainObject(obj) && obj.toString === Object.prototype.toString)) {

        let target = isArr ? [] : {};
        for (let key in obj) {
            if (isArr) {
                if (Array.isArray(key) && isPlainObject(key)) {
                    target.push(toI18n(key, i18n))
                } else {
                    target.push(i18n.__(key))
                }
            } else {
                if (Array.isArray(obj[key]) && isPlainObject(obj[key])) {
                    target[key] = toI18n(obj[key], i18n);
                } else {
                    target[key] = i18n.__(obj[key]);
                }
            }
        }
        return target;
    } else {
        return i18n.__(obj);
    }
}

function variableHelper(name, val, isLang) {
    if (![null, undefined].includes(val) && typeof name === 'string') {
        if (isLang) {
            const { i18n } = hexo.theme;
            val = toI18n(val, i18n)
        }

        let varStr = Array.isArray(val) || (isPlainObject(val) && val.toString === Object.prototype.toString)
            ? JSON.stringify(val, null, 2)
            : `'${String(val)}'`;
        return `<script>window.${name}=${varStr}</script>`;
    }
}

hexo.extend.helper.register('variable', variableHelper)