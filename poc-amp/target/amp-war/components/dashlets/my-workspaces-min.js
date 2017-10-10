(function(){var e=YAHOO.util.Dom,j=YAHOO.util.Event;var d=Alfresco.util.encodeHTML;Alfresco.dashlet.MyWorkspaces=function f(l){Alfresco.dashlet.MyWorkspaces.superclass.constructor.call(this,"Alfresco.dashlet.MyWorkspaces",l,["button","container","datasource","datatable","animation"]);this.preferencesService=new Alfresco.service.Preferences();YAHOO.Bubbling.on("siteDeleted",this.onSiteDeleted,this);return this};YAHOO.extend(Alfresco.dashlet.MyWorkspaces,Alfresco.component.Base,{createSite:null,options:{sites:[],imapEnabled:false},onReady:function h(){var t=this;j.addListener(this.id+"-createSite-button","click",this.onCreateSiteLinkClick,this,true);this.widgets.dataSource=new YAHOO.util.DataSource(this.options.sites,{responseType:YAHOO.util.DataSource.TYPE_JSARRAY});var u=Alfresco.util.generateDomId(null,"fav-site"),l=Alfresco.util.generateDomId(null,"imap-site"),q=Alfresco.util.generateDomId(null,"del-site");var o=function m(z,y,B,E){e.setStyle(z,"width",B.width+"px");e.setStyle(z.parentNode,"width",B.width+"px");var A=y.getData("shortName"),x=y.getData("isFavourite"),D=y.getData("isIMAPFavourite");var C='<div class="site-favourites">';C+='<a class="favourite-site '+u+(x?" enabled":"")+'" title="'+t.msg("link.favouriteWorkspace")+'">&nbsp;</a>';if(t.options.imapEnabled){C+='<a class="imap-favourite-site '+l+(D?" imap-enabled":"")+'" title="'+t.msg("link.imap_favouriteWorkspace")+'">&nbsp;</a>'}C+="</div>";z.innerHTML=C};var w=function p(A,z,C,E){var B=z.getData("shortName"),x=z.getData("title"),y=z.getData("description");var D='<div class="site-title"><a href="'+Alfresco.constants.URL_PAGECONTEXT+"site/"+B+'/dashboard" class="theme-color-1">'+d(x)+"</a></div>";D+='<div class="site-description">'+d(y)+"</div>";A.innerHTML=D};var n=function r(y,x,A,C){e.setStyle(y,"width",A.width+"px");e.setStyle(y.parentNode,"width",A.width+"px");var z=x.getData("isSiteManager"),B="";if(z){B='<a class="delete-site '+q+'" title="'+t.msg("link.deleteWorkspace")+'">&nbsp;</a>'}y.innerHTML=B};var s=[{key:"siteId",label:"Favourite",sortable:false,formatter:o,width:this.options.imapEnabled?40:20},{key:"title",label:"Description",sortable:false,formatter:w},{key:"description",label:"Actions",sortable:false,formatter:n,width:32}];this.widgets.dataTable=new YAHOO.widget.DataTable(this.id+"-workspaces",s,this.widgets.dataSource,{MSG_EMPTY:"<h3>"+this.msg("label.noWorkspaces")+"</h3>"});this.widgets.dataTable._deleteTrEl=function(A){var y=this,z=this.getTrEl(A);var x=new YAHOO.util.ColorAnim(z,{opacity:{to:0}},0.25);x.onComplete.subscribe(function(){YAHOO.widget.DataTable.prototype._deleteTrEl.call(y,A)});x.animate()};var v=function(y,x){var z=function A(D,C){var B=YAHOO.Bubbling.getOwnerByTagName(C[1].anchor,"div");if(B!==null){x.call(t,C[1].target.offsetParent,B)}return true};YAHOO.Bubbling.addDefaultAction(y,z)};v(u,this.onFavouriteSite);v(l,this.onImapFavouriteSite);v(q,this.onDeleteSite);this.widgets.dataTable.subscribe("rowMouseoverEvent",this.widgets.dataTable.onEventHighlightRow);this.widgets.dataTable.subscribe("rowMouseoutEvent",this.widgets.dataTable.onEventUnhighlightRow)},onDeleteSite:function a(m){var l=this.widgets.dataTable.getRecord(m);Alfresco.module.getDeleteSiteInstance().show({site:l.getData()})},onSiteDeleted:function b(o,n){var m=n[1].site,p=m.shortName;var l=this._findRecordByParameter(p,"shortName");if(l!==null){this.widgets.dataTable.deleteRow(l)}},onFavouriteSite:function k(r){var l=this.widgets.dataTable.getRecord(r),o=l.getData(),q=o.shortName;o.isFavourite=!o.isFavourite;this.widgets.dataTable.updateRow(l,o);var n={failureCallback:{fn:function p(u,v){var s=v.record,t=s.getData();t.isFavourite=!t.isFavourite;this.widgets.dataTable.updateRow(s,t);Alfresco.util.PopupManager.displayPrompt({text:this.msg("message.workspaceFavourite.failure",t.title)})},scope:this,obj:{record:l}},successCallback:{fn:function m(u,v){var s=v.record,t=s.getData();YAHOO.Bubbling.fire(t.isFavourite?"favouriteSiteAdded":"favouriteSiteRemoved",t)},scope:this,obj:{record:l}}};this.preferencesService.favouriteSite(q,n)},onImapFavouriteSite:function c(q){var m=this.widgets.dataTable.getRecord(q),o=m.getData(),p=o.shortName;o.isIMAPFavourite=!o.isIMAPFavourite;this.widgets.dataTable.updateRow(m,o);var n={failureCallback:{fn:function l(t,u){var r=u.record,s=r.getData();s.isIMAPFavourite=!s.isIMAPFavourite;this.widgets.dataTable.updateRow(r,s);Alfresco.util.PopupManager.displayPrompt({text:this.msg("message.workspaceFavourite.failure",s.title)})},scope:this,obj:{record:m}}};this.preferencesService.set(Alfresco.service.Preferences.IMAP_FAVOURITE_SITES+"."+p,o.isIMAPFavourite,n)},onCreateSiteLinkClick:function i(l){Alfresco.module.getCreateSiteInstance().show();j.preventDefault(l)},_findRecordByParameter:function g(p,o){var n=this.widgets.dataTable.getRecordSet();for(var m=0,l=n.getLength();m<l;m++){if(n.getRecord(m).getData(o)==p){return n.getRecord(m)}}return null}})})();