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
        var featureLayer = new FeatureLayer("http://services5.arcgis.com/JfkMFO4dd69NwLOF/arcgis/rest/services/%E7%9C%81%E7%BA%A7%E8%A1%8C%E6%94%BF%E4%B8%AD%E5%BF%83/FeatureServer/0",{
      //var featureLayer = new FeatureLayer("http://water.arcgisonline.cn/arcgis/rest/services/Hosted/%E6%B0%B4%E6%96%87%E7%AB%99%E7%9B%91%E6%B5%8B%E6%95%B0%E6%8D%AE/FeatureServer/0",{
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
                        var data1 = "";
                        var data2 = "";
                             for(var x in features){
                             //x in features指的是每个监测站点，点击事件
                                var name1 = featureLayer.fields[1].name;
                                var name2 = featureLayer.fields[3].name;
                                data1=features[x].attributes[name1];
                                data2=features[x].attributes[name2];
                        }
                        document.getElementById('renj').innerText=data1;
                        document.getElementById('video').innerHTML='<object id="obx" name="obx" width="290" height="260"><param name="movie" value='+data2+'></param><embed src='+data2+' width="290" height="260"></embed></object>';
                    }else{
                        alert("Failed to select the feature");
                    }
                });

        });
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