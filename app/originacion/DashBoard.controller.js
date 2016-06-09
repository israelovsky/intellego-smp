sap.ui.controller("originacion.DashBoard", {

    /**
     * Called when a controller is instantiated and its View controls (if available) are already created.
     * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
     * @memberOf originacion.DashBoard
     */
    onInit: function() {
          
    },
    onBeforeShow: function(evt) {

    },
    /**
     * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
     * (NOT before the first rendering! onInit() is used for that one!).
     * @memberOf originacion.DashBoard
     */
    onBeforeRendering: function() {},
    /**
     * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
     * This hook is the same one that SAPUI5 controls get after being rendered.
     * @memberOf originacion.DashBoard
     */
    onAfterRendering: function() {},
    goToQuiz: function() {
        var oController,oModel,aData;
        oController = this;
        oInputBase = new sap.ui.mw.InputBase();
        var bdLoader = sap.ui.getCore().byId("bdLoaderDashboard");
       var validationError = 0;
       if (!oInputBase.validationForForm("txtName", "Input").type) {
          validationError++;
       }
       if (!oInputBase.validationForForm("txtCompany", "Input").type) {
          validationError++;
       }
       if (!oInputBase.validationForForm("txtEmail", "Input").type) {
          validationError++;
       }
       if (!oInputBase.validationForForm("txtPhone", "Input").type) {
          validationError++;
       }

       if (validationError > 0){
          return false;
       }
       bdLoader.open();
        aData = jQuery.ajax({
            type : "POST",
            url : sap.ui.getCore().AppContext.config.getProperty("url")+"/user/create",
            dataType : "json",
            async: true, 
            data:{ 
                "username": sap.ui.getCore().byId("txtEmail").getValue(), 
                "company": sap.ui.getCore().byId("txtCompany").getValue().toUpperCase(), 
                "name": sap.ui.getCore().byId("txtName").getValue().toUpperCase(), 
                "phonemovil": sap.ui.getCore().byId("txtPhone").getValue().toUpperCase(), 
                "questionSend": 1, 
                "rol":"user"
            },       
            success : function(data,textStatus, jqXHR) {
                bdLoader.close();
                oModel = new sap.ui.model.json.JSONModel();
                oModel.setData(data);
                if (Object.keys(oModel.getData()).length > 0){
                  sap.ui.getCore().byId("txtEmail").setValue('');
                  sap.ui.getCore().byId("txtCompany").setValue('');
                  sap.ui.getCore().byId("txtName").setValue('');
                  sap.ui.getCore().byId("txtPhone").setValue('');
                  sap.ui.getCore().userId = oModel.getProperty("/id");
                  var oRouter = sap.ui.core.UIComponent.getRouterFor(oController);
                  oRouter.navTo("Quiz", {}, false);
                }else{
                    sap.m.MessageToast.show("Hubo un error, vuelva a intentar");
                }

            },
            error : function(xhr, ajaxOptions, thrownError){
                sap.m.MessageToast.show("Ha ocurrido un error en la red, vuelva a intentar");
                bdLoader.close();
            }   

        });         
    },
    clearForm: function() {
        sap.ui.getCore().byId("txtEmail").setValue('');
        sap.ui.getCore().byId("txtCompany").setValue('');
        sap.ui.getCore().byId("txtName").setValue('');
        sap.ui.getCore().byId("txtPhone").setValue('');
    }
});
