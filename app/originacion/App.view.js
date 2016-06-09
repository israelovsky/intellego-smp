sap.ui.jsview("originacion.App", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf originacion.App
	*/ 
	getControllerName : function() {
		return "originacion.App";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf originacion.App
	*/ 
	createContent : function(oController) {
 		this.setDisplayBlock(true);
 		var currentApp=new sap.m.App("navContainer");
 		currentApp.setBackgroundImage("img/back.jpg")
 		//#ff6300
 		return currentApp
	}

});