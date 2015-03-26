define([
    'dojo/_base/declare',
    'jimu/BaseWidget',
    'esri/map',
    'esri/lang',
    'esri/layers/FeatureLayer'
    ],
function(declare, BaseWidget,map,esriLang,FeatureLayer) {
  //To create a widget, you need to derive from BaseWidget.
  return declare([BaseWidget], {
    // DemoWidget code goes here 

    //please note that this property is be set by the framework when widget is loaded.
    //templateString: template,

    baseClass: 'jimu-widget-demo',

      postCreate: function() {
      this.inherited(arguments);
      console.log('postCreate');
    },

    startup: function() {
      this.inherited(arguments);
      this.mapIdNode.innerHTML = 'map id:' + this.map.id;
        var featureLayer = new FeatureLayer("http://water.arcgisonline.cn/arcgis/rest/services/Hosted/%E6%B0%B4%E6%96%87%E7%AB%99%E7%9B%91%E6%B5%8B%E6%95%B0%E6%8D%AE/FeatureServer/0",{
      //var featureLayer = new FeatureLayer("http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/SanFrancisco/311Incidents/FeatureServer/0",{
      //var featureLayer = new FeatureLayer("http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Census_USA/MapServer/3",{
            mode: FeatureLayer.MODE_ONDEMAND,
            outFields: ["*"]
        });
      this.map.addLayer(featureLayer);
        //hook into the onClick event
      dojo.connect(featureLayer, "onClick", function(evt){
      //we need to query the feature layer for this point
      var query = new esri.tasks.Query();
      //get the location of mouse click..The API doesnt tell you about this.  This is the magic part
      //I stumbled across this value by using debugger and console.log(evt) and searching the object.
      query.geometry = evt.graphic.geometry;
      query.spatialRelationship = esri.tasks.Query.SPATIAL_REL_CONTAINS;
      //select the actual point
      featureLayer.selectFeatures(query, esri.layers.FeatureLayer.SELECTION_NEW,
                function(features){
                    //user clicked on something, then we should have features
                    if(features.length > 0){
                        var data = "";
                        for(var x in features){
                            //data = "Feature "+x+":n";

                            //building a string of the queried data
                            //for(var y in featureLayer.fields){
                                var name1 = featureLayer.fields[2].name;
                                var name2 = featureLayer.fields[3].name;
                                data+= name1+" : "+features[x].attributes[name1];
                                data+= name2+" : "+features[x].attributes[name2];
                                //alert(y);返回的y是fields的索引数
                            //}
                        }
                        document.getElementById('renj').innerText=data;
                    }else{
                        alert("Failed to select the feature");
                    }
                });

        });
        //dialog = new TooltipDialog({
        //    id: "tooltipDialog",
        //    style: "position: absolute; width: 250px; font: normal normal normal 10pt Helvetica;z-index:100"
        //});
        //dialog.startup();
        //featureLayer.on("click", function(evt) {
                //var objectId = evt.graphic.attributes[featureLayer.objectIdField];
            //var t="<b>${NAME}</b><hr><b>2000 Population: </b>${POP2000:NumberFormat}<br>"
            //   + "<b>2000 Population per Sq. Mi.: </b>${POP00_SQMI:NumberFormat}<br>"
            //    + "<b>2007 Population: </b>${POP2007:NumberFormat}<br>"
            //   + "<b>2007 Population per Sq. Mi.: </b>${POP07_SQMI:NumberFormat}";
            //var content= evt.graphic.attributes[featureLayer.fields(0).name];
            //alert(content);
            //dialog.setContent(content);
            //registry.byId("showcontent").set("value", "POP2007");
                //alert(objectId);
                //alert(objectId);
        //});
    },

    onOpen: function(){
      console.log('onOpen');
    },

    onClose: function(){
      console.log('onClose');
    },

    onMinimize: function(){
      console.log('onMinimize');
    },

    onMaximize: function(){
      console.log('onMaximize');
    },

    onSignIn: function(credential){
      /* jshint unused:false*/
      console.log('onSignIn');
    },

    onSignOut: function(){
      console.log('onSignOut');
    }
  });
});