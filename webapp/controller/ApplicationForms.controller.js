sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("tatapower.dev.controller.ApplicationForms", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf tatapower.dev.TATAPOWER..view.FAQ
		 */
		//	onInit: function() {
		//
		//	},
		onInit: function(evt) {

			// set explored app's demo model on this sample
			var oModel = new sap.ui.model.json.JSONModel("json/ApplicationForms.json");

			this.getView().setModel(oModel);
			var vbox1 = this.getView().byId("Flexboxview");
			var fragment = sap.ui.xmlfragment(["tatapower.dev.fragments.NewConnection.NewConnectionSideMenu"].join("."), this);
			vbox1.addItem(fragment);
			var vbox = this.getView().byId("FlexboxProcedure");
			vbox.destroyItems();
			var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.ApplicationForms.ChangeOfName"].join("."), this);
			vbox.addItem(fragment1);
		},
		onHomePress: function(oEvent) {
			this.getRouter().navTo("home");
		},

		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		handleButtonPress: function(evt) {

			var vbox = this.getView().byId("FlexboxProcedure");
			vbox.destroyItems();
			if (evt.oSource.mProperties.text === "Change of Name") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.ApplicationForms.ChangeOfName"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "Change of Load") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.ApplicationForms.ChangeOfLoad"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "IGR Form") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.ApplicationForms.IGRForm"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "Distribution Franchise Agreement") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.ApplicationForms.DistributionFranchiseAgreement"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "Application For Shifting of Service") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.ApplicationForms.ApplicationForShiftingOfService"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "Work completion and Test Report") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.ApplicationForms.WorkCompletionTestReport"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "Meter Testing Request Form") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.ApplicationForms.MeterTestingRequestForm"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "Address Correction Form") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.ApplicationForms.AddressCorrectionForm"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "Permanent Disconnection Form") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.ApplicationForms.PermanentDisconnectionForm"].join("."), this);
				vbox.addItem(fragment1);
			}

		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf tatapower.dev.TATAPOWER..view.FAQ
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf tatapower.dev.TATAPOWER..view.FAQ
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf tatapower.dev.TATAPOWER..view.FAQ
		 */
		//	onExit: function() {
		//
		//	}

	});

});