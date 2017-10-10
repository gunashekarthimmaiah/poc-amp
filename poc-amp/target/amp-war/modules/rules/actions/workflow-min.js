(function(){var e=YAHOO.util.Dom,b=YAHOO.util.KeyListener,a=YAHOO.util.Selector;var c=Alfresco.util.encodeHTML,d=Alfresco.util.combinePaths,f=Alfresco.util.hasEventInterest;Alfresco.module.RulesWorkflowAction=function(o){Alfresco.module.RulesWorkflowAction.superclass.constructor.call(this,"Alfresco.module.RulesWorkflowAction",o,["button","container","connection"]);if(o!="null"){YAHOO.Bubbling.on("folderSelected",this.onDestinationSelected,this)}return this};var i=Alfresco.module.RulesWorkflowAction;YAHOO.lang.augmentObject(i,{VIEW_MODE_APPROVAL_STEP:"approval-step",VIEW_MODE_REJECTION_STEP:"rejection-step"});YAHOO.extend(Alfresco.module.RulesWorkflowAction,Alfresco.component.Base,{options:{siteId:"",rootNode:null,repositoryBrowsing:true,containerId:"documentLibrary",templateUrl:Alfresco.constants.URL_SERVICECONTEXT+"modules/rules/actions/workflow",viewMode:i.VIEW_MODE_APPROVAL_STEP,allowedViewModes:[i.VIEW_MODE_APPROVAL_STEP,i.VIEW_MODE_REJECTION_STEP]},containerDiv:null,showDialog:function n(o){if(!this.containerDiv){Alfresco.util.Ajax.request({url:this.options.templateUrl,dataObj:{htmlid:this.id},successCallback:{fn:this.onTemplateLoaded,obj:o,scope:this},failureMessage:"Could not load template:"+this.options.templateUrl,execScripts:true})}else{this._showDialog(o)}},onTemplateLoaded:function l(p,s){this.containerDiv=document.createElement("div");this.containerDiv.setAttribute("style","display:none");this.containerDiv.innerHTML=p.serverResponse.responseText;var q=e.getFirstChild(this.containerDiv);this.widgets.dialog=Alfresco.util.createYUIPanel(q);this.widgets.destinationLocation=new Alfresco.Location(this.id+"-destinationLabel");this.widgets.destinationLocation.setOptions({siteId:this.options.siteId,rootNode:this.options.rootNode});this.widgets.selectDestinationButton=Alfresco.util.createYUIButton(this,"selectDestination-button",this.onSelectDestinationClick);this.widgets.okButton=Alfresco.util.createYUIButton(this,"ok-button",null,{type:"submit"});this.widgets.cancelButton=Alfresco.util.createYUIButton(this,"cancel-button",this.onCancelClick);var r=new Alfresco.forms.Form(this.id+"-form");this.widgets.form=r;r.addValidation(this.id+"-action",Alfresco.forms.validation.mandatory,null,"keyup");r.addValidation(this.id+"-nodeRef",Alfresco.forms.validation.mandatory,null,"keyup");r.setSubmitElements(this.widgets.okButton);r.doBeforeAjaxRequest={fn:function(t,u){YAHOO.Bubbling.fire("workflowOptionsSelected",{options:{label:t.dataObj.label,action:t.dataObj.action,nodeRef:t.dataObj.nodeRef,path:t.dataObj.path,viewMode:this.options.viewMode},eventGroup:this});this.widgets.dialog.hide();return false},obj:null,scope:this};r.applyTabFix();r.init();var o=new b(document,{keys:b.KEY.ESCAPE},{fn:function(u,t){this.onCancelClick()},scope:this,correctScope:true});o.enable();this._showDialog(s)},_showDialog:function g(o){e.get(this.id+"-title").innerHTML=this.msg(this.options.viewMode+".header");o=o?o:{};e.get(this.id+"-label").value=o.label?c(o.label):this.msg(this.options.viewMode+".label.default");Alfresco.util.setSelectedIndex(e.get(this.id+"-action"),o.action);e.get(this.id+"-nodeRef").value=o.nodeRef?o.nodeRef.toString():"";this.widgets.destinationLocation.displayByNodeRef(o.nodeRef);this.widgets.form.validate();this.widgets.form._toggleSubmitElements(true);this.widgets.dialog.show()},onSelectDestinationClick:function j(q,r){if(!this.widgets.destinationDialog){this.widgets.destinationDialog=new Alfresco.module.DoclibGlobalFolder(this.id+"-selectDestination");var o=[Alfresco.module.DoclibGlobalFolder.VIEW_MODE_SITE];if(this.options.repositoryBrowsing===true){o.push(Alfresco.module.DoclibGlobalFolder.VIEW_MODE_REPOSITORY,Alfresco.module.DoclibGlobalFolder.VIEW_MODE_USERHOME,Alfresco.module.DoclibGlobalFolder.VIEW_MODE_SHARED)}this.widgets.destinationDialog.setOptions({allowedViewModes:o,siteId:this.options.siteId,containerId:this.options.containerId,title:this.msg("title.destinationDialog"),nodeRef:this.options.rootNode})}var p=e.get(this.id+"-nodeRef").value;this.widgets.destinationDialog.setOptions({pathNodeRef:p?new Alfresco.util.NodeRef(p):null});this.widgets.destinationDialog.showDialog()},onDestinationSelected:function h(p,o){if(f(this.widgets.destinationDialog,o)){var q=o[1];if(q!==null){e.get(this.id+"-nodeRef").value=q.selectedFolder.nodeRef;this.widgets.destinationLocation.displayByNodeRef(q.selectedFolder.nodeRef)}this.widgets.form.validate()}},onCancelClick:function k(o,p){this.widgets.dialog.hide()}});var m=new Alfresco.module.RulesWorkflowAction("null")})();