// saveAsTitleEndCard.jsx

// Load utility functions
$.evalFile("D:/Program Files/Photoshop Scripts/Utilities/layer-utils.jsx"); // Using absolute path

// ====== CONFIG ======
var targetWidth = 1200; // Change this for each resolution (1200, 1600, etc)
var L0FolderName = "D:/_Photoshop Exports";
var L1folderName = "ChapterExport";
var L2folderName = "100 TitleEndCards";
var exportFolderName = L0FolderName + "/" + L1folderName + "/" + L2folderName;
var suffix = "Default1200";
// =====================

var originalDoc = app.activeDocument;

// Create temporary duplicate document
var tempDoc = originalDoc.duplicate();

// Save original settings
var originalRulerUnits = app.preferences.rulerUnits;
app.preferences.rulerUnits = Units.PIXELS;

// Hide layer
showLayerByName(tempDoc.layers, "Header");
showLayerByName(tempDoc.layers, "Please support my series!");
showLayerByName(tempDoc.layers, "subscription methods:");

// Rasterize everything before resizing
tempDoc.flatten();

// Resize temporary document
tempDoc.resizeImage(UnitValue(targetWidth, "px"), null, null, ResampleMethod.BICUBICSHARPER);

// Get filename without extension
var docName = tempDoc.name.replace(/\.[^\.]+$/, '').replace(/\s+copy$/, ""); // strips trailing " copy"
var exportFolder = new Folder(exportFolderName);
if (!exportFolder.exists) exportFolder.create();

var exportFile = new File(exportFolder + "/" + docName + suffix + ".png"); // Export to subfolder

var exportOptions = new ExportOptionsSaveForWeb();
exportOptions.format = SaveDocumentType.PNG;
exportOptions.PNG8 = false;
exportOptions.transparency = false;
exportOptions.interlaced = false;
exportOptions.includeProfile = false;
exportOptions.optimized = true; // Only affects PNG8

tempDoc.exportDocument(exportFile, ExportType.SAVEFORWEB, exportOptions);

// Close temporary document without saving
tempDoc.close(SaveOptions.DONOTSAVECHANGES);

// Restore initial state
app.activeDocument = originalDoc;

// Restore settings
app.preferences.rulerUnits = originalRulerUnits; 