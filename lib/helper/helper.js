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
export {
    Init,
    sel,
    selAll,
    eventTrigger
};
