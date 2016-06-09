sap.ui.jsview("originacion.DashBoard", {

    /** Specifies the Controller belonging to this View.
     * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
     * @memberOf originacion.DashBoard
     */
    getControllerName: function() {
        return "originacion.DashBoard";
    },

    /** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed.
     * Since the Controller is given to this method, its event handlers can be attached right away.
     * @memberOf originacion.DashBoard
     */
    createContent: function(oController) {
        var oDashBoardPage, oFooterBar, oImageIntellego, oForm, oDisplayBase, oInputBase, bdLoader;
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

        oImageIntellego = oDisplayBase.createImage("imgIntellego", "img/logo.png", null);
        oDashBoardPage = oContainerBase.createPage("dashBoardPoll", "DEMO INTELLEGO", false, true, true, true, null, null, null);

        var dataContact,oTmpModel;
        dataContact = { 
            "username": "",
            "company": "",
            "name": "",
            "phonemovil": "",
            "questionSend": 1, 
            "rol":"user"
        };

        bdLoader = new sap.m.BusyDialog("bdLoaderDashboard", {
            text: 'Espere por favor...',
            title: 'Cargando'
        });
        oForm = oLayoutBase.createForm("idRegistration", true, 1, "Registro:");
        oForm.setModel(dataContact,"dataContact");
        oForm.addContent(oDisplayBase.createLabel("", "Nombre*"));
        oForm.addContent(oInputBase.createInputText("txtName", "Text", "Ingresa tu nombre completo", "{dataContact/name}", true, true, "^(([A-Za-zÑñ]+)\\s?)*$"));

        oForm.addContent(oDisplayBase.createLabel("", "Empresa*"));
        oForm.addContent(oInputBase.createInputText("txtCompany", "Text", "Ingresa nombre de tu compañía", "{dataContact/company}", true, true, "^(([A-Za-zÑñ]+)\\s?)*$"));

        oForm.addContent(oDisplayBase.createLabel("", "Correo Electrónico*"));
        oForm.addContent(oInputBase.createInputText("txtEmail", "Email", "Ingresa tu correo electrónico", "{dataContact/username}", true, true, "^[_a-z0-9-]+(\\.[_a-z0-9-]+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,3})$"));

        oForm.addContent(oDisplayBase.createLabel("", "Télefono*"));
        oForm.addContent(oInputBase.createInputText("txtPhone", "Tel", "Ingresa tu número telefonico", "{dataContact/phonemovil}", true, true, "^\\d{10}$").setMaxLength(10));
        oButtons = [
            oActionBase.createButton("btnCancel", "Cancelar", "Emphasized", "sap-icon://sys-cancel", oController.clearForm, oController),
            oActionBase.createButton("btnStartQuiz", "Iniciar", "Emphasized", "sap-icon://request", oController.goToQuiz, oController)
        ];
        oFooterBar = oContainerBase.createBar("", null, oButtons, null);

        oDashBoardPage.addContent(oImageIntellego);
        oDashBoardPage.addContent(oForm);
        oDashBoardPage.addContent(oFooterBar);
        return oDashBoardPage;
    }
});
