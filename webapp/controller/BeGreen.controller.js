sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("tatapower.dev.controller.BeGreen", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf tatapower.dev.view.BeGreen
		 */
		//	onInit: function() {
		//
		//	},

		onInit: function(evt) {

			// set explored app's demo model on this sample
			var oModel = new sap.ui.model.json.JSONModel("json/BeGreen.json");
			this.getView().setModel(oModel);
			var vbox1 = this.getView().byId("Flexboxview");
			var fragment = sap.ui.xmlfragment(["tatapower.dev.fragments.NewConnection.NewConnectionSideMenu"].join("."), this);
			vbox1.addItem(fragment);

			var vbox = this.getView().byId("FlexboxProcedure");
			vbox.destroyItems();
			var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.BeGreen.AboutDSM"].join("."), this);
			vbox.addItem(fragment1);

		},

		handleButtonPress: function(evt) {

			var vbox = this.getView().byId("FlexboxProcedure");
			vbox.destroyItems();
			if (evt.oSource.mProperties.text === "Introduction") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.BeGreen.Introduction"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "About DSM") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.BeGreen.AboutDSM"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "DSM Programmes") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.BeGreen.DSMProgrammes"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "Energy Conservation") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.BeGreen.EnergyConveration"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "Contact") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.BeGreen.Contact"].join("."), this);
				vbox.addItem(fragment1);
			}

			// 	else if(evt.oSource.mProperties.text === "Ceiling Fan") {

			// 	var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.BeGreen.ceiling_fan"].join("."), this);
			// 	vbox.addItem(fragment1);
			// }
			// 	else if(evt.oSource.mProperties.text === "Energy Audit") {

			// 	var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.BeGreen.energy_audit"].join("."), this);
			// 	vbox.addItem(fragment1);
			// }
			// 	else if(evt.oSource.mProperties.text ==="Energy Refrigerator") {

			// 	var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.BeGreen.energy_eff_refrigerator"].join("."), this);
			// 	vbox.addItem(fragment1);
			// }
			// 	else if(evt.oSource.mProperties.text === "LED Tube") {

			// 	var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.BeGreen.led_tube"].join("."), this);
			// 	vbox.addItem(fragment1);
			// }
			// 	else if(evt.oSource.mProperties.text === "Split AC") {

			// 	var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.BeGreen.split_ac"].join("."), this);
			// 	vbox.addItem(fragment1);
			// }

		},
		onHomePress: function(oEvent) {
			this.getRouter().navTo("home");
		},

		getRouter: function() {
				return sap.ui.core.UIComponent.getRouterFor(this);
			}
			/**
			 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
			 * (NOT before the first rendering! onInit() is used for that one!).
			 * @memberOf tatapower.dev.view.BeGreen
			 */
			//	onBeforeRendering: function() {
			//
			//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf tatapower.dev.view.BeGreen
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf tatapower.dev.view.BeGreen
		 */
		//	onExit: function() {
		//
		//	}

	});

});