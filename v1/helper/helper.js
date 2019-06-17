const Init = class {
    constructor(arr) {
        this.target = arr[0];
        this.options = arr[1];
        this.data = arr[2];
    }
    static setTarget (plugin) {
        return typeof plugin.target === 'string' ? document.querySelectorAll(plugin.target) : NodeList.prototype.isPrototypeOf(plugin.target) ? plugin.target : [plugin.target]
    }
    static setOptions (plugin, cfgs) {
        return Object.assign({}, cfgs, plugin.options);
    }
    static setData (plugin) {
        return plugin.data;
    }

};
const sel = (v, el = document) => el.querySelector(v);
const selAll = (v, el = document) => Array.from(el.querySelectorAll(v));
const eventTrigger = (el, eventType, detail) => el.dispatchEvent(new CustomEvent(eventType, { detail }));
const setCookie = (name, value, days) => {
    let todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + Number(days));
    document.cookie = name + '=' + escape(value) + '; path=/; expires=' + todayDate.toGMTString() + ';'
};
const getCookie = name => {
    if (name === null) {
        return false;
    }
    let cookie = document.cookie.split('; ');
    for (let i = 0, max = cookie.length; i < max; i++){
        let cName = cookie[i].split('=');
        if(name == cName[0]){
            return cName[1];
        }
    }
};

export {
    Init,
    sel,
    selAll,
    eventTrigger,
    setCookie,
    getCookie
};
