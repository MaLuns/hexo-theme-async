
const isPlainObject = (obj) => {
    return Object.prototype.toString.call(obj) === '[object Object]';
};

function variableHelper (name, val) {
    if (![null, undefined].includes(val) && typeof name === 'string') {
        let varStr = Array.isArray(val) || (isPlainObject(val) && val.toString === Object.prototype.toString)
            ? JSON.stringify(val, null, 2)
            : `'${String(val)}'`;
        return `<script>window.${name}=${varStr}</script>`;
    }
}

hexo.extend.helper.register('variable', variableHelper)