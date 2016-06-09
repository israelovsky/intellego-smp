sap.ui.jsview("originacion.Quiz", {

    /** Specifies the Controller belonging to this View.
     * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
     * @memberOf originacion.DashBoard
     */
    getControllerName: function() {
        return "originacion.Quiz";
    },

    /** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed.
     * Since the Controller is given to this method, its event handlers can be attached right away.
     * @memberOf originacion.DashBoard
     */
    getQuiz: function() {

    },
    createContent: function(oController) {
        var oQuizPage, oForm, oDisplayBase, oInputBase, oModelQuiz, _self, bdLoader;
        jQuery.sap.require(
            "js.base.InputBase",
            "js.base.ActionBase",
            "js.base.DisplayBase",
            "js.base.LayoutBase",
            "js.base.PopupBase",
            "js.base.TileBase",
            "js.base.ListBase",
            "js.base.ContainerBase"
        );

        oTileBase = new sap.ui.mw.TileBase();
        oContainerBase = new sap.ui.mw.ContainerBase();
        oDisplayBase = new sap.ui.mw.DisplayBase();
        oActionBase = new sap.ui.mw.ActionBase();
        oInputBase = new sap.ui.mw.InputBase();
        oLayoutBase = new sap.ui.mw.LayoutBase();
        oPopupBase = new sap.ui.mw.PopupBase();
        oListBase = new sap.ui.mw.ListBase();
        _self = this;

        bdLoader = new sap.m.BusyDialog("bdLoaderQuiz", {
            text: 'Espere por favor...',
            title: 'Cargando'
        });
        var oButtons = [
            oActionBase.createButton("btnEnd", "Finalizar", "Emphasized", "sap-icon://sys-enter", oController.endQuiz, oController)
        ];
        var oFooterBar = oContainerBase.createBar("", null, oButtons, null);


        oQuizCarousel = new sap.m.Carousel("idCarousel", {
            activePage: 0,
            loop: false,
            pages: [null]
        });
        oController.getCuestions();

        bdLoader.open();

        // var p1 =  new Promise(function (fulfill, reject){
        //             try {
        //               var oModelQuiz = sap.ui.getCore().getModel("oModelQuiz");
        //               var numQuiz = oModelQuiz.getProperty("/").length;
        //               for (var i = 0; i < numQuiz; i++) {
        //                   var objectHeader;
        //                   oQuizPage = oContainerBase.createPage("idQuiz"+i, "DEMO APP SAP", false, true, false, true, null, null, oContainerBase.createBar("", null, oButtons, null));
        //                   objectHeader = new sap.m.ObjectHeader("idObhead"+i,{title: "" ,responsive : true});
        //                   oList = oListBase.createSelectList("idQuo"+i, true, null, oModelQuiz, "" , sap.m.ListMode.SingleSelect, oController.pressListQuiz, oController ); 
        //                   oQuizPage.addContent(objectHeader);
        //                   oQuizPage.addContent(oList);  
        //                   oQuizCarousel.addPage(oQuizPage);
        //               } 
        //               fulfill(oQuizCarousel);
        //             } catch (ex) {
        //               reject(ex);
        //             }
        //           }.bind(oController));
        //   var response =  p1.then(function(value) {
        //     resolve(value); // Success!
        //   }, function(reason) {
        //     reject(reason); // Error!
        //   });


        var oModelQuiz = sap.ui.getCore().getModel("oModelQuiz");
        var numQuiz = oModelQuiz.getProperty("/").length;
        for (var i = 0; i < numQuiz; i++) {
            var objectHeader;
            oQuizPage = oContainerBase.createPage("idQuiz" + i, "DEMO INTELLEGO", false, true, true, true, null, null, oContainerBase.createBar("", null, oButtons, null));
            objectHeader = new sap.m.ObjectHeader("idObhead" + i, { title: "", responsive: true });
            oList = oListBase.createSelectList("idQuo" + i, true, null, oModelQuiz, "", sap.m.ListMode.SingleSelect, oController.pressListQuiz, oController);
            oQuizPage.addContent(objectHeader);
            oQuizPage.addContent(oList);
            oQuizCarousel.addPage(oQuizPage);
        }
        return oQuizCarousel;


    }

});
