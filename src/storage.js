goog.provide("hydra.storage");

goog.require("goog.json");

// Shiv: iOS 3.1 and Android 1.6
if (!("JSON" in window)) {
    JSON = {
        "parse": goog.json.unsafeParse,
        "stringify": goog.json.serialize
    };
}

// TODO: Remove, unnecessary?
if (!("localStorage" in window)) {
    localStorage = {};
}

hydra.storage.set = function (key, value) {
    try {
        localStorage[hydra.storage.toNamespace(key)] = JSON.stringify(value) || null;
    } catch (_) {
    }
}

hydra.storage.get = function (key) {
    try {
        return JSON.parse(localStorage[hydra.storage.toNamespace(key)] || null);
    } catch (_) {
        return null;
    }
}

hydra.storage.remove = function (key) {
    try {
        delete localStorage[hydra.storage.toNamespace(key)];
    } catch (_) {
    }
}

hydra.storage.toNamespace = function (key) {
    return "hydra:" + key;
}

//hydra.storage.clear = function () {
//    localStorage.clear();
//}
