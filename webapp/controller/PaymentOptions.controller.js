sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"tatapower/dev/model/formatter",
	"sap/m/MessageBox"
], function(Controller, JSONModel,Filter, formatter, MessageBox) {
	"use strict";

	return Controller.extend("tatapower.dev.controller.PaymentOptions", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf tatapower.dev.TATAPOWER..view.FAQ
		 */
		//	onInit: function() {
		//
		//	},
			onInit: function(evt) {
				var oViewModel = new JSONModel({
				busy: false,
				delay: 0
			});
			this.oView.setModel(oViewModel, "PaymentOptionView");
			//this.getRouter().getRoute("MyAccounts").attachPatternMatched(this._onObjectMatched, this);
			this.oComponent = this.getOwnerComponent();
			this.oDataModel = this.getOwnerComponent().getModel();
			//this.getOwnerComponent().getModel().metadataLoaded().then(this.onMetadataLoaded.bind(this));
			// set explored app's demo model on this sample
			var oModel = new sap.ui.model.json.JSONModel("json/PaymentOptions.json");

			this.getView().setModel(oModel);
			var vbox1 = this.getView().byId("Flexboxview");
			var fragment = sap.ui.xmlfragment(["tatapower.dev.fragments.NewConnection.NewConnectionSideMenu"].join("."), this);
			vbox1.addItem(fragment);
			var vbox = this.getView().byId("FlexboxProcedure");
			vbox.destroyItems();
			var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.PaymentOptions.NACH"].join("."), this);
			vbox.addItem(fragment1);
			
			var that = this;
					var drpcatofsearch = '/OfflineLocatorDescriptionSet';
					this.oDataModel.read(drpcatofsearch, {
						success: function(oData) {
							oViewModel.setProperty("/busy", false);
							that.oView.setModel(new JSONModel(oData), "Descriptiondrp");
						},
						error: function(error) {
							oViewModel.setProperty("/busy", false);
						}
					});
			
		},
		_onObjectMatched: function() {
				//var oDataModel1 = this.getOwnerComponent().getModel();
			    this.oDataModel.metadataLoaded().then(function() {
				this.searchAddress();
				}.bind(this));
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
			if (evt.oSource.mProperties.text === "NACH") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.PaymentOptions.NACH"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "NACH Application Form") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.PaymentOptions.NachApplicationForm"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "Online Payment") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.PaymentOptions.OnlinePayment"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "Payment Status") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.PaymentOptions.PaymentStatus"].join("."), this);
				vbox.addItem(fragment1);
			} else if (evt.oSource.mProperties.text === "Offline Payment Options") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.PaymentOptions.OfflinePaymentOptions"].join("."), this);
				vbox.addItem(fragment1);
				//this.searchAddress();
			} else if (evt.oSource.mProperties.text === "Online Payment Receipt") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.PaymentOptions.OnlinePaymentReceipt"].join("."), this);
				vbox.addItem(fragment1);
			}
			
		},
			ValueHelpAreaSearch : function(oEvent){
			var that = this;
			var oViewModel = this.oView.getModel("PaymentOptionView");
			var sPath = "/SearchAreaSet";
			this.selectedObjectInput = oEvent.getSource();
			this._valueHelpDialog = sap.ui.xmlfragment(
				"tatapower.dev.fragments.PaymentOptions.ValueHelpAreaSearch",
				this
			);
			this.getView().addDependent(this._valueHelpDialog);
			
			oViewModel.setProperty("/busy", true);
				this.oDataModel.read(sPath, {
					success: function(oData) {
						oViewModel.setProperty("/busy", false);
						that.oView.setModel(new JSONModel(oData), "Area");
					},
					error: function(error) {
						oViewModel.setProperty("/busy", false);
					}
				}); 
			
			this._valueHelpDialog.open();
		},
			_handleValueHelpSearch: function(evt) {
			var sValue = evt.getParameter("value");
			var oFilter1 = new Filter("ZpcArea", sap.ui.model.FilterOperator.Contains, sValue);
			
			var oFilters = new sap.ui.model.Filter({
				filters: [
					oFilter1
				],
				and: false
			});
			evt.getSource().getBinding("items").filter(oFilters, sap.ui.model.FilterType.Application);
		},
			_handleValueHelpClose: function(evt) {
		//	var oView = this.getView();
			var oSelectedItem = evt.getParameter("selectedItem");
			var aContexts = evt.getParameter("selectedContexts");
			if (oSelectedItem && aContexts.length) {
	            aContexts.map(function(oContext) { 
	            	var ContractAcId = oContext.getObject().ZpcArea;
	            sap.ui.getCore().byId("areaInput").setValue(ContractAcId); 
	            //get address value
	             
	            return oContext.getObject().ZpcArea;    
	               
			 });
			}
			 //this.getAddressdata();
		},
		onPressReset : function(){
			  sap.ui.getCore().byId("areaInput").setValue("");
		}
	/*	,
		searchAddress : function(){
			
			var areadata = '"Andheri (W)"';
			var filters = new Array();
			filters.push(new sap.ui.model.Filter("IArea", sap.ui.model.FilterOperator.EQ,areadata));
			var oTable = sap.ui.getCore().byId("idProductsTable");
			oTable.bindRows({path:"/OfflineLocatDesSet", filters:filters});
			
		}*/,
		onPressSearch : function(){
			//var areadata = sap.ui.getCore().byId("areaInput").getValue();
			//var oTable = sap.ui.getCore().byId("idProductsTable");
			/*var areadata = sap.ui.getCore().byId("areaInput").getValue();
			var filters = new Array();
			filters.push(new sap.ui.model.Filter("IArea", sap.ui.model.FilterOperator.EQ,areadata));
			var oTable = sap.ui.getCore().byId("idProductsTable");
			oTable.bindRows({path:"/OfflineLocatDesSet", filters:filters});*/
			
			
			
			
				var oView = this.getView();
			
				var areadata = sap.ui.getCore().byId("areaInput").getValue();
					var oViewModel = this.oView.getModel("PaymentOptionView");
					//var sPath = "/OfflineLocatDesSet?$filter=IArea eq '"+areadata+"'";
					var sPath = "/OfflineLocatDesSet";
					var filters = new Array();
			    	filters.push(new sap.ui.model.Filter("IArea ", sap.ui.model.FilterOperator.EQ, "'"+areadata+"'"));
					
					//alert(sPath);
					oViewModel.setProperty("/busy", true);
					this.oDataModel.read(sPath, {
						filters: filters,
					success: function(oData) {
						oViewModel.setProperty("/busy", false);
						oView.setModel(new JSONModel(oData), "AddressDetails");
					},
					error: function(error) {
					//	oViewModel.setProperty("/busy", false);
					}
				});	
				
				
					
				
		},
		
		
			onPopinLayoutChanged: function() {
			//var oTable = sap.ui.getCore().byId("idProductsTable");
			var oComboBox = sap.ui.getCore().byId("idPopinLayout");
			var sPopinLayout = oComboBox.getSelectedKey();
			var areadata = sap.ui.getCore().byId("areaInput").getValue();
			var oView = this.getView();
			var oViewModel = this.oView.getModel("PaymentOptionView");
			var sPath = "/OfflineLocatorSpecificSet";
			 
			var filters = new Array();
			filters.push(new sap.ui.model.Filter("IArea ", sap.ui.model.FilterOperator.EQ, "'"+areadata+"'"));
			filters.push(new sap.ui.model.Filter("IType ", sap.ui.model.FilterOperator.EQ, "'"+sPopinLayout+"'"));
			/*switch (sPopinLayout) {
				case "CashCheque":
					var val = "'Tata Power Customer Relations Center / Cash &amp; Cheque Counter'";
					filters.push(new sap.ui.model.Filter("ZpcTypeDesc ", sap.ui.model.FilterOperator.EQ, val));
					break;
				case "ChequeKiosk":
					 val = "'Cheque Kiosk'";
					filters.push(new sap.ui.model.Filter("ZpcTypeDesc ", sap.ui.model.FilterOperator.EQ, val));
					break;
				case "TataPowerDropBox":
					 val = "'Tata Power Drop Box'";
					filters.push(new sap.ui.model.Filter("ZpcTypeDesc ", sap.ui.model.FilterOperator.EQ, val));
					break;
				default:
					val = "'Electronic Drop Box'";
					filters.push(new sap.ui.model.Filter("ZpcTypeDesc ", sap.ui.model.FilterOperator.EQ, val));
					break;
			}*/
			
					oViewModel.setProperty("/busy", true);
					this.oDataModel.read(sPath, {
						filters: filters,
					success: function(oData) {
						oViewModel.setProperty("/busy", false);
						oView.setModel(new JSONModel(oData), "AddressDetails");
					},
					error: function(error) {
					//	oViewModel.setProperty("/busy", false);
					}
					});
			
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