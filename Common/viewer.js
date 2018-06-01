
// var imgRoot = '../../Build/Cesium/Widgets/Images/';
// var terrainViewModels = [
//     new Cesium.ProviderViewModel({
//             name : 'STK World Terrain meshes',
//             iconUrl : /* buildModuleUrl(... */ imgRoot+'TerrainProviders/STK.png',
//             tooltip : 'High-resolution, mesh-based terrain for the entire globe. Free for use on the Internet. Closed-network options are available.\nhttp://www.agi.com',
//             creationFunction : function() {
//                 return new Cesium.CesiumTerrainProvider({
//                     url : 'https://assets.agi.com/stk-terrain/world',
//                     requestWaterMask : true,
//                     requestVertexNormals : true
//                 });
//             }
//     }),
//     new Cesium.ProviderViewModel({
//             name : 'WGS84 Ellipsoid',
//             iconUrl : /*buildModuleUrl('*/ imgRoot+'TerrainProviders/Ellipsoid.png',
//             tooltip : 'WGS84 standard ellipsoid, also sknown as EPSG:4326',
//             creationFunction : function() {
//                 return new Cesium.EllipsoidTerrainProvider();
//             }
//     })
// ];

// var imageryViewModels = [
//     new Cesium.ProviderViewModel({
//             name : 'ESRI World Imagery',
//             iconUrl : imgRoot+'ImageryProviders/esriWorldImagery.png',
//             tooltip : 'http://www.esri.com',
//             creationFunction : function() {
//                 return new Cesium.ArcGisMapServerImageryProvider({
//                     url : 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
//                     enablePickFeatures : false
//                 });
//             }
//     }),
//     new Cesium.ProviderViewModel({
//             name : 'Bing Maps Aerial with Labels',
//             iconUrl : imgRoot+'ImageryProviders/bingAerialLabels.png',
//             tooltip : 'Bing Maps aerial imagery with label overlays \nhttp://www.bing.com/maps',
//             creationFunction : function() {
//                 return new Cesium.BingMapsImageryProvider({
//                     url : 'https://dev.virtualearth.net',
//                     mapStyle : Cesium.BingMapsStyle.AERIAL_WITH_LABELS
//                 });
//             }
//     }),
//     new Cesium.ProviderViewModel({
//             name : 'Open\u00adStreet\u00adMap',
//             iconUrl : imgRoot+'ImageryProviders/openStreetMap.png',
//             tooltip : 'http://www.openstreetmap.org',
//             creationFunction : function() {
//                 return Cesium.createOpenStreetMapImageryProvider({
//                     url : 'https://a.tile.openstreetmap.org/'
//                 });
//             }
//     })
// ];

var viewer = new Cesium.Viewer('cesiumContainer', {
    /*terrainProvider : new Cesium.CesiumTerrainProvider({
        url : 'https://assets.agi.com/stk-terrain/world'
    }),
    baseLayerPicker: false*/

    // UPDATE_1.45
    //terrainProviderViewModels: terrainViewModels,
    //selectedTerrainProviderViewModel: terrainViewModels[0],
    //imageryProviderViewModels: imageryViewModels,
    //selectedImageryProviderViewModel: imageryViewModels[1],
    // UPDATE_1.45

    homeButton: false,
    animation: false,
    timeline: false,
    // misleading info, hide help button...
    navigationHelpButton: false
});

{
    let viewModel = viewer.baseLayerPicker.viewModel;
    console.log('Available terrains', viewModel.terrainProviderViewModels);
    console.log('Available terrains', viewModel.terrainProviderViewModels.map(terrain => terrain.name));
    if (viewModel.terrainProviderViewModels.length >= 2) {
        let terrain = viewModel.terrainProviderViewModels[1];
        console.log('Selecting terrain[1] =', terrain.name);
        viewModel.selectedTerrain = terrain;
    }
}

var scene = viewer.scene;
var canvas = viewer.canvas;
