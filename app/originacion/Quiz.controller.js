var currentPage = 0;
sap.ui.controller("originacion.Quiz", {
    /**
     * Called when a controller is instantiated and its View controls (if available) are already created.
     * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
     * @memberOf originacion.DashBoard
     */
    onInit: function() {
        var oController = this;
        oController.router = sap.ui.core.UIComponent.getRouterFor(oController);
        oController.router.attachRoutePatternMatched(oController.getCuestions, oController);
        var bdLoader = sap.ui.getCore().byId("bdLoaderQuiz");    
        // if (!sap.ui.getCore().userId){
        //   var oRouter = sap.ui.core.UIComponent.getRouterFor(oController);
        //   oRouter.navTo("DashBoard", {}, false);               
        // }
        //sap.ui.getCore().userId = 5;
       // if (sap.ui.getCore().getModel("oModelQuiz")){
       //   if(Object.keys(sap.ui.getCore().getModel("oModelQuiz").getProperty("/")).length <= 0){
       //      oController.getCuestions();
       //   }
       // }

        sap.ui.getCore().byId("idCarousel").attachPageChanged(function(evt){
               var eventDefault = evt.getParameters();
               bdLoader.open();
            setTimeout(function(){
                var oCurrentPage = eventDefault.newActivePageId.replace("idQuiz",""); 
                currentPage = oCurrentPage;
                p1 = oController.bootstrapQuizPage(sap.ui.getCore().getModel("oModelQuiz"),oCurrentPage);
                p1.then(function(result){
                  bdLoader.close();
                }).catch(function(error){
                  bdLoader.close();
                    console.log("Error al borrar CustomerLoanRelationship " + error);
                });
            },1000);
        });
 
    },  
    bootstrapQuizPage : function(oModel,numberPage){
        var bdLoader = sap.ui.getCore().byId("bdLoaderQuiz");  
        return new Promise(function(resolve, reject) {
            try {
                 if (numberPage!=0){
                    var currentPath;
                    currentPath = oModel.getProperty("/"+numberPage);
                    sap.ui.getCore().byId("idObhead"+numberPage).setIntro(currentPath.textQuestion);
                    sap.ui.getCore().byId("idQuo"+numberPage).destroyItems();
                    sap.ui.getCore().byId("idQuo"+numberPage).setModel(currentPath,numberPage);
                      var i = 1;
                      for (i=1; i <= Object.keys(currentPath.textQuestionCont).length; i++) {
                        var itemsTemplate="";
                        itemsTemplate = new sap.ui.core.Item({
                                    text : currentPath.textQuestionCont[i],
                                    enabled : true,
                                    key : i 
                        });
                        sap.ui.getCore().byId("idQuo"+numberPage).addItem(itemsTemplate);
                      }
                 }else{// if (numberPage!=0){
                    var currentPath;
                    currentPath = oModel.getProperty("/"+numberPage);
                    sap.ui.getCore().byId("idObhead"+numberPage).setIntro(currentPath.textQuestion);
                    sap.ui.getCore().byId("idQuo"+numberPage).destroyItems();
                    sap.ui.getCore().byId("idQuo"+numberPage).setModel(currentPath,numberPage);
                      var i = 1;
                      for (i=1; i <= Object.keys(currentPath.textQuestionCont).length; i++) {
                        var itemsTemplate="";
                        itemsTemplate = new sap.ui.core.Item({
                                    text : currentPath.textQuestionCont[i],
                                    enabled : true,
                                    key : i 
                        });
                        sap.ui.getCore().byId("idQuo"+numberPage).addItem(itemsTemplate);
                      }
                    //sap.ui.getCore().byId("idQuo0").addItem() 
                 }   
                resolve(true); 
            } catch (e) {
                reject(e);
            }
        }.bind(this));


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
    onAfterRendering: function() {
        /* console.log("**** DASHBOARD - CREACION DE BD ****");
        jQuery.sap.require("js.db.Pouch");
        oDB = new sap.ui.db.Pouch("ex14");*/ //creación de la base de datos


        /*  console.log("**** DASHBOARD - CREACION DE BD TEST ****");
        jQuery.sap.require("js.db.PouchTest");
        oDBT = new sap.ui.db.PouchTest("GenTest"); //creación de la base de datos*/
        var oController = this; 
         setTimeout(function(){
         oController.bootstrapQuizPage(sap.ui.getCore().getModel("oModelQuiz"),0);
         },3000);

    },
    pressListQuiz: function(evt){
        var oController,answer,questionNumber,noPage; 
        oController = this;
        noPage = currentPage;
        answer = evt.getSource().getSelectedKey();
        questionNumber = new sap.ui.model.json.JSONModel(evt.getSource().oModels); 
        //answer = evt.getSource().mProperties.selectedKey;

        oController.sendAnswer(answer,questionNumber.getProperty("/"+noPage+"/numberQuestion"));
    },
    onEndQuiz:function(){
        var dialogAdds = sap.ui.getCore().byId('idThanks');
    },
    sendAnswer: function(answer,questionNumber){
        var oController;
        oController = this;
        var bdLoader = sap.ui.getCore().byId("bdLoaderQuiz");
        bdLoader.open();
        jQuery.ajax({
            type : "POST",
            url : sap.ui.getCore().AppContext.config.getProperty("url")+"/answer/respAnswer",
            dataType : "json",
            async: true, 
            data:{ 
                "id": sap.ui.getCore().userId, 
                "answer": answer, 
                "questionNumber": questionNumber
            },       
            success : function(data,textStatus, jqXHR) {
                bdLoader.close();
                oModel = new sap.ui.model.json.JSONModel();
                oModel.setData(data);

                if (Object.keys(oModel.getData()).length > 0){
                   sap.m.MessageToast.show("Tu respuesta fue la opción ("+oModel.getProperty("/answer")+")");
                   sap.ui.getCore().byId("idQuo"+currentPage).setEnabled(false);
                }else{
                    sap.m.MessageToast.show("Hubo un error, vuelva a intentar");
                    sap.ui.getCore().byId("idQuo"+currentPage).clearSelection();
                }
            },
            error : function(xhr, ajaxOptions, thrownError){
                sap.m.MessageToast.show("Ha ocurrido un error en la red, vuelva a intentar");
                sap.ui.getCore().byId("idQuo"+currentPage).clearSelection();
                bdLoader.close();
            }            

        }); // Fin  jQuery.ajax

    },
   getCuestions: function(){
        var oModelQuiz = new sap.ui.model.json.JSONModel();
        var bdLoader = sap.ui.getCore().byId("bdLoaderQuiz");
        var aData = jQuery.ajax({
            type : "GET",
            url : sap.ui.getCore().AppContext.config.getProperty("url")+"/question/getQuestion",
            dataType : "json",
            async: false, 
            success : function(data,textStatus, jqXHR) {
                bdLoader.close();
                oModelQuiz = new sap.ui.model.json.JSONModel(data);
                if (Object.keys(oModelQuiz.getData()).length > 0){
                   sap.ui.getCore().setModel(oModelQuiz, "oModelQuiz");
                }else{
                   sap.m.MessageToast.show("Hubo un error, vuelva a intentar");
                }
            },
            error : function(xhr, ajaxOptions, thrownError){
                sap.m.MessageToast.show("Hubo un error en la red, vuelva a intentar");
                bdLoader.close();
            }

        });  
    },
    endQuiz: function(evt){
       var oModelQuiz,oController,countErr=0;
       oModelQuiz = sap.ui.getCore().getModel("oModelQuiz");
       oController=this;
       for (var i = 0; i < oModelQuiz.getProperty("/").length ; i++) {
          if (sap.ui.getCore().byId("idQuo"+i).getSelectedKey() == ""){
            countErr++;
          }
       }
       if (countErr>0){
         sap.m.MessageToast.show("Faltan preguntas por contestar.");
       }else{
         var oModelQuiz;
         for (var i = 0; i < oModelQuiz.getProperty("/").length ; i++) {
           sap.ui.getCore().byId("idQuo"+i).setEnabled(true);
           sap.ui.getCore().byId("idQuo"+i).clearSelection();
         }
         sap.ui.getCore().byId("idCarousel").setActivePage("idQuiz0");        
         sap.m.MessageToast.show("¡Gracias por participar!.", {
            duration: 7000,
            closeOnBrowserNavigation: false
         });        
         var oRouter = sap.ui.core.UIComponent.getRouterFor(oController);
         oRouter.navTo("DashBoard", {}, false);   
       }
    }
});
