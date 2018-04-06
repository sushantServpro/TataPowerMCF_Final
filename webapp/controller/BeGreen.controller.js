sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"tatapower/dev/model/formatter",
	"sap/m/MessageBox"
], function(Controller, JSONModel,Filter, formatter, MessageBox) {
	"use strict";

	return Controller.extend("tatapower.dev.controller.BeGreen", {

	
		onInit: function(evt) {
			var oViewModel = new JSONModel({
				busy: false,
				delay: 0
			});
			this.oView.setModel(oViewModel, "BeGreenView");
			// set explored app's demo model on this sample
			var oModel = new sap.ui.model.json.JSONModel("json/BeGreen.json");
			this.getView().setModel(oModel);
			
			this.oComponent = this.getOwnerComponent();
			this.oDataModel = this.getOwnerComponent().getModel("McfPortalModel");
			
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
			else if(evt.oSource.mProperties.description === "Ceiling Fan") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.BeGreen.ceiling_fan"].join("."), this);
				vbox.addItem(fragment1);
			}
				else if(evt.oSource.mProperties.description === "Energy Audit") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.BeGreen.energy_audit"].join("."), this);
				vbox.addItem(fragment1);
			}
				else if(evt.oSource.mProperties.description ==="Energy Refrigerator") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.BeGreen.energy_eff_refrigerator"].join("."), this);
				vbox.addItem(fragment1);
			}
				else if(evt.oSource.mProperties.description === "LED Tube") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.BeGreen.led_tube"].join("."), this);
				vbox.addItem(fragment1);
			}
				else if(evt.oSource.mProperties.description === "Split AC") {

				var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.BeGreen.split_ac"].join("."), this);
				vbox.addItem(fragment1);
			}

		},
		onHomePress: function() {
			this.getRouter().navTo("home");
		},
onSubmitfanPress: function(oEvent) {
			
			this.getRouter().navTo("SubmitCeilingFan");
		},
		
		onPressCeiling : function(Event){
			var that = this;
			var oDataModel1 =  this.getOwnerComponent().getModel("McfPortalModel");
			var oViewModel = this.oView.getModel("BeGreenView");
			var consumerid = sap.ui.getCore().byId("sdlccosm_num").getValue();
			var vbox = this.getView().byId("FlexboxProcedure");
			vbox.destroyItems();
		//	var campid = 0;
			var path = "/GetCampIDSet('SECF')";
			this.oDataModel.read(path, {
				async:false,
				success: function(oData) {
					var conid = oData.ExCampid;
					localStorage.removeItem("Campid");
					localStorage.removeItem("CaNo");
					localStorage.removeItem("Campidcode");
					localStorage.setItem("Campid", conid);
					localStorage.setItem("Campidcode", "SECF");
					localStorage.setItem("CaNo", consumerid);
					var spath = "/CheckConsumerSet(Campid='"+conid+"',Campidcode='SECF',CaNo='"+consumerid+"')";
					oDataModel1.read(spath, {
						success: function(result) {
							/*if(result.LvMessage !== ""){
							MessageBox.alert(result.LvMessage);}else{
								var vbox = this.getView().byId("FlexboxProcedure");
								vbox.destroyItems();
								var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.DSMProgrammesTC"].join("."), this);
								vbox.addItem(fragment1);
							}*/
								MessageBox.alert(result.LvMessage);
								/*var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.BeGreen.DSMProgrammesTC"].join("."), this);
								vbox.addItem(fragment1);
								oViewModel.setProperty("/busy", false);*/
								that.oView.setModel(new JSONModel(result), "SupplyCatSerachdata");
								that.getRouter().navTo("SubmitCeilingFan");
						},
						error: function(eerror) {
							oViewModel.setProperty("/busy", false);
						}
					});
					oViewModel.setProperty("/busy", false);
					that.oView.setModel(new JSONModel(oData), "getcam");
				},
				error: function(error) {
					oViewModel.setProperty("/busy", false);
				}
			});
	
		
		},
		onPressRef : function(Event){
			var that = this;
			var oDataModel1 =  this.getOwnerComponent().getModel("McfPortalModel");
			var oViewModel = this.oView.getModel("BeGreenView");
			var consumerid = sap.ui.getCore().byId("ecosm_num").getValue();
			var vbox = this.getView().byId("FlexboxProcedure");
			vbox.destroyItems();
		//	var campid = 0;
			var path = "/GetCampIDSet('EERP')";
			this.oDataModel.read(path, {
				async:false,
				success: function(oData) {
					var conid = oData.ExCampid;
					localStorage.removeItem("Campid");
					localStorage.removeItem("CaNo");
					localStorage.removeItem("Campidcode");
					localStorage.setItem("Campid", conid);
					localStorage.setItem("Campidcode", "EERP");
					localStorage.setItem("CaNo", consumerid);
					var spath = "/CheckConsumerSet(Campid='"+conid+"',Campidcode='EERP',CaNo='"+consumerid+"')";
					oDataModel1.read(spath, {
						success: function(result) {
							/*if(result.LvMessage !== ""){
							MessageBox.alert(result.LvMessage);}else{
								var vbox = this.getView().byId("FlexboxProcedure");
								vbox.destroyItems();
								var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.DSMProgrammesTC"].join("."), this);
								vbox.addItem(fragment1);
							}*/
								MessageBox.alert(result.LvMessage);
								/*var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.BeGreen.DSMProgrammesTC"].join("."), this);
								vbox.addItem(fragment1);
								oViewModel.setProperty("/busy", false);*/
								that.oView.setModel(new JSONModel(result), "SupplyCatSerachdata");
								that.getRouter().navTo("SubmitRef");
						},
						error: function(eerror) {
							oViewModel.setProperty("/busy", false);
						}
					});
					oViewModel.setProperty("/busy", false);
					that.oView.setModel(new JSONModel(oData), "getcam");
				},
				error: function(error) {
					oViewModel.setProperty("/busy", false);
				}
			});
	
		
		},
		getRouter: function() {
				return sap.ui.core.UIComponent.getRouterFor(this);
			},
		onPressAudit : function(){
			$("#frmblockEA").css("display","block");
		},
		onNextSearch : function(){
			
			if(sap.ui.getCore().byId("conNoInputIdEA").getValue() !== "" && sap.ui.getCore().byId("conNoInputIdEA").getValue()){
				this.setAuditData(sap.ui.getCore().byId("conNoInputIdEA").getValue());
			var that = this;
		//	var cono = sap.ui.getCore().byId("conNoInputIdEA").getValue();
			var oViewModel = this.oView.getModel("BeGreenView");
		    oViewModel.setProperty("/busy", true);
		    var cono = localStorage.getItem("CaNo");
		    var camid = localStorage.getItem("Campid");
			var campcode = localStorage.getItem("Campidcode");
			if(camid != null && campcode != null){
			var drpcatofsupply = "/ConsumerOnNextDetailSet(Campid='"+camid+"',Campidcode='"+campcode+"',CaNo='"+cono+"')";
			//get the Existing utility drop down value from odata
				this.oDataModel.read(drpcatofsupply, {
					async:false,
					success: function(oData) {
						oViewModel.setProperty("/busy", false);
						if(oData.LvMessage !== ""){
								MessageBox.alert(oData.LvMessage);
								$("#hideblockEA").css("display","none");
						}else{
							$("#hideblockEA").css("display","block");
							that.oView.setModel(new JSONModel(oData), "AuditData");
							$("#blkConName").css("display","block");
						}
					/*	$("#hideblockEA").css("display","block");
							that.oView.setModel(new JSONModel(oData), "AuditData");
							$("#blkConName").css("display","block");*/
					},
					error: function(error) {
						oViewModel.setProperty("/busy", false);
					}
				});}}else{
					MessageBox.alert("Please enter consumer name and consumer number");
				}
			
		},
		onSubmitBeGreen : function(){
				var oEntry={};
				var sPath = "/BeGreenSubmitSet";
				var camid = localStorage.getItem("CampidEA");
				var campcode = localStorage.getItem("CampidcodeEA");
				var contactNoInputId = sap.ui.getCore().byId("contactNoInputIdEA").getValue();
				var altContactNoInputId = sap.ui.getCore().byId("altContactNoInputIdEA").getValue();
				var emailid = sap.ui.getCore().byId("ContactEmailInputIdEA").getValue();
				var conNoInputId = sap.ui.getCore().byId("conNoInputIdEA").getValue();
				var capacity = sap.ui.getCore().byId("capacityInputIdEA").getValue();
				var qty = sap.ui.getCore().byId("qtyInputIdEA").getValue();
				var cname = sap.ui.getCore().byId("conBillNameInputIdEA").getValue();
				var oViewModel = this.oView.getModel("BeGreenView");
				if(conNoInputId === ""){
					MessageBox.alert("Please enter consumer number");
					return false;
				}
				oViewModel.setProperty("/busy", true);
				oEntry.ImAltTelNumber = altContactNoInputId;
				oEntry.ImBuagId =   conNoInputId;
				oEntry.ImCampid =  camid;
				oEntry.ImCampidcode =  campcode;
				oEntry.ImCapacity =  capacity;
				oEntry.ImEmailIdAddr = emailid;
				oEntry.ImGuid  = camid;
			//	oEntry.ImManufacturer = "1";
				oEntry.ImPortalCname = cname;
				oEntry.ImQty =  qty;
				oEntry.ImTelNumber = contactNoInputId;
				
				this.oDataModel.create(sPath, oEntry, {
				async: false,
				success: function(oData) {
				//	MessageBox.alert("Saved as Draft");
					if(oData.TransId !== ""){
						MessageBox.alert("Your Transaction No. is:" + oData.TransId +
						".");
					}else{
							MessageBox.alert("Problem with submit.");
					}
					 sap.ui.getCore().byId('btnSaveCeiling').setProperty("enabled",false);
						//sap.ui.getCore().byId("btnSaveCeiling").setEnable("")
					oViewModel.setProperty("/busy", false);
				},
				error: function(error) {
					// MessageBox.error("Please enter correct Data.");
					oViewModel.setProperty("/busy", false);
				}
			});
				
		},
		setAuditData : function(consumerid){
			var that = this;
			var oDataModel1 =  this.getOwnerComponent().getModel("McfPortalModel");
			var oViewModel = this.oView.getModel("BeGreenView");
			//var consumerid = sap.ui.getCore().byId("ecosm_num").getValue();
			
		//	var campid = 0;
			var path = "/GetCampIDSet('EAP')";
			this.oDataModel.read(path, {
				async:false,
				success: function(oData) {
					var conid = oData.ExCampid;
					localStorage.removeItem("Campid");
					localStorage.removeItem("CaNo");
					localStorage.removeItem("Campidcode");
					localStorage.setItem("Campid", conid);
					localStorage.setItem("Campidcode", "EAP");
					localStorage.setItem("CaNo", consumerid);
					var spath = "/CheckConsumerSet(Campid='"+conid+"',Campidcode='EAP',CaNo='"+consumerid+"')";
					oDataModel1.read(spath, {
						success: function(result) {
							/*if(result.LvMessage !== ""){
							MessageBox.alert(result.LvMessage);}else{
								var vbox = this.getView().byId("FlexboxProcedure");
								vbox.destroyItems();
								var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.DSMProgrammesTC"].join("."), this);
								vbox.addItem(fragment1);
							}*/
								MessageBox.alert(result.LvMessage);
								return 1;
								/*var fragment1 = sap.ui.xmlfragment(["tatapower.dev.fragments.BeGreen.DSMProgrammesTC"].join("."), this);
								vbox.addItem(fragment1);
								oViewModel.setProperty("/busy", false);*/
								
						},
						error: function(eerror) {
							oViewModel.setProperty("/busy", false);
						}
					});
					/*oViewModel.setProperty("/busy", false);
					that.oView.setModel(new JSONModel(oData), "getcam");*/
				},
				error: function(error) {
					oViewModel.setProperty("/busy", false);
				}
			});
	
		
		},
			pressTermsOfUse: function() {
			this.getRouter().navTo("TermOfUse");
			},
			pressPrivacyPolicy: function() {
			this.getRouter().navTo("PrivacyPolicy");
			}
	
		

	});

});