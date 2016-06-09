/**
 * [PreLoader Clase de tipo object notation que controla la carga inicial de la app]
 * @type {Object}
 */
var PreLoader = function(_preloader, _content, _legend) {
    this.preloader = _preloader;
    this.content = _content;
    this.legend = _legend;

};
/**
 * [setPreloader Setter del id del DIV que funciona como preloader]
 * @param {[string]} _preloader [id del DIV preloader]
 */

PreLoader.prototype.start = function() {
    var currentClass, promiseSAPUI5, promiseMaps, logonSMP, promiseLogin, promiseNetwork;
    currentClass = this;

    promiseSAPUI5 = this.addLibrary("resources/sap-ui-core.js", true);
    //promiseMaps = this.addLibrary("https://maps.googleapis.com/maps/api/js", false);

    promiseSAPUI5
        .then(function(response) {
            sap.ui.getCore().AppContext = new Object();
            var config = new sap.ui.model.resource.ResourceModel({
                bundleUrl: "config/config.properties"
                    //bundleName:"a_es"
                    ,
                bundleLocale: "es_MX"
            });
            sap.ui.getCore().AppContext.config = config;

            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

                setTimeout(function() {
                    currentClass.hideLoader();
                }, 2000);
                currentClass.createShell("AO", "com.gentera");

            } else {
                setTimeout(function() {
                    currentClass.hideLoader();
                }, 2000);
                currentClass.createShell("AO", "com.gentera");
            }
        }).catch(function(error) {
            console.log(error);
        });
};



    /**
     * [monitorNetwork - monitoreo del estatus de red online/offline]
     * @return {[type]} [description]
     */

PreLoader.prototype.hideLoader = function() {
    document.getElementById(this.preloader).innerHTML = "";
    document.getElementById(this.preloader).style.visibility = 'hidden';
    var el = document.querySelector('#' + this.preloader + '');
    el.parentNode.removeChild(el);
};

PreLoader.prototype.createShell = function(_title, _name) {
    new sap.m.Shell("Shell", {
        title: _title,
        app: new sap.ui.core.ComponentContainer({
            name: _name
        })
    }).placeAt(this.content);

    console.log("Terminó de ejecutar el método de CreateShell");
}
PreLoader.prototype.addLibrary = function(_src, _isSAPUI5) {

    var currentScript, readyFlag, firstScript, currentClass;
    currentClass = this;
    return new Promise(function(resolve, reject) {
        try {

            setTimeout(function() {
                readyFlag = false;
                currentScript = document.createElement('script');
                currentScript.type = 'text/javascript';
                currentScript.src = _src;
                if (_isSAPUI5) {
                    currentScript.id = "sap-ui-bootstrap";
                    currentScript.setAttribute("data-sap-ui-libs", "sap.m, sap.ui.commons");
                    currentScript.setAttribute("data-sap-ui-theme", "sap_bluecrystal");
                    currentScript.setAttribute("data-sap-ui-xx-bindingSyntax", "complex");
                    currentScript.setAttribute("data-sap-ui-preload", "none");
                    currentScript.setAttribute("data-sap-ui-resourceroots", '{"com.gentera":"./","originacion":"originacion","js":"js"}');
                };
                currentScript.onload = currentScript.onreadystatechange = function() {
                    if (!readyFlag && (!this.readyState || this.readyState == 'complete')) {
                        readyFlag = true;
                        resolve("Script cargado:" + _src);

                    }
                };
                firstScript = document.getElementsByTagName('script')[0];
                firstScript.parentElement.appendChild(currentScript);

            }, 4000)


            //firstScript.parentElement.insertBefore(currentScript, firstScript);
        } catch (e) {
            reject(e);

        }


    });

};

PreLoader.prototype.addSAPUI5 = function(_fn) {
    this.addLibrary("resources/sap-ui-core.js", "Cargando componentes básicos...", _fn, true);
};

(function() {
    var preloader = new PreLoader("preloader", "content", "preloaderLegend");
    preloader.start();

})();
