(function(){var d=YAHOO.util.Dom,i=YAHOO.util.Event,b=YAHOO.util.Element;Alfresco.DiscussionsToolbar=function(k){this.name="Alfresco.DiscussionsToolbar";this.id=k;this.widgets={};this.modules={};this.options={};Alfresco.util.YUILoaderHelper.require(["button","container","connection"],this.onComponentsLoaded,this);YAHOO.Bubbling.on("deactivateAllControls",this.onDeactivateAllControls,this);return this};Alfresco.DiscussionsToolbar.prototype={widgets:null,options:{siteId:null,containerId:null,allowCreate:null},setOptions:function f(k){this.options=YAHOO.lang.merge(this.options,k);return this},setMessages:function e(k){Alfresco.util.addMessages(k,this.name);return this},onComponentsLoaded:function g(){i.onContentReady(this.id,this.onReady,this,true)},onReady:function c(){this.widgets.createButton=Alfresco.util.createYUIButton(this,"create-button",this.onNewTopicClick,{disabled:!this.options.allowCreate});this.widgets.rssFeedButton=Alfresco.util.createYUIButton(this,"rssFeed-button",null,{type:"link"});if(this.widgets.rssFeedButton!==null){this._generateRSSFeedUrl()}},onNewTopicClick:function j(k){window.location.href=Alfresco.constants.URL_PAGECONTEXT+"site/"+this.options.siteId+"/discussions-createtopic"},onDeactivateAllControls:function a(m,l){var k,n,o=Alfresco.util.disableYUIButton;for(k in this.widgets){if(this.widgets.hasOwnProperty(k)){o(this.widgets[k])}}},_generateRSSFeedUrl:function h(){var k=Alfresco.constants.URL_FEEDSERVICECONTEXT+"components/discussions/rss?site="+encodeURIComponent(this.options.siteId);this.widgets.rssFeedButton.set("href",k)}}})();