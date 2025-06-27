// ChapterExportMaster.jsx
// Step 0: Select input folder that contains psd/png/jpg, fail if nothing selected
// Step 1: createChapterExportFolders.jsx once
// Step 2: runSaveAsJobs.jsx in batch (with input folder of psd/png/jpg)
// Step 3: cloneToTranslatorsZip.jsx once

// ====== CONFIG ======
var scriptBasePath = "D:/Program Files/Photoshop Scripts";
// =====================

// Function to select input folder
function selectInputFolder() {
    var defaultFolder = new Folder("D:/_Photoshop Exports/");
    var folder = Folder.selectDialog("Select folder containing PSD/PNG/JPG files:", defaultFolder);
    if (folder === null) {
        alert("No folder selected. Script cancelled.");
        return null;
    }
    return folder;
}

// Function to get all image files from folder
function getImageFiles(folder) {
    var imageFiles = [];
    var files = folder.getFiles();
    
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        if (file instanceof File) {
            var extension = file.name.toLowerCase().split('.').pop();
            if (extension === 'psd' || extension === 'png' || extension === 'jpg' || extension === 'jpeg') {
                imageFiles.push(file);
            }
        }
    }
    
    return imageFiles;
}

// Function to run createChapterExportFolders.jsx
function runCreateFolders() {
    var scriptPath = scriptBasePath + "/createChapterExportFolders.jsx";
    var scriptFile = new File(scriptPath);
    
    if (scriptFile.exists) {
        try {
            $.evalFile(scriptFile);
            $.writeln("✓ Created ChapterExport folders");
            return true;
        } catch (e) {
            alert("Error running createChapterExportFolders.jsx: " + e);
            return false;
        }
    } else {
        alert("Script file not found: " + scriptPath);
        return false;
    }
}

// Function to process a single file through all export scripts
function processFile(file) {
    try {
        // Open the file
        var doc = app.open(file);
        $.writeln("Processing: " + file.name);
        
        // Run all export scripts in sequence
        var exportScripts = [
            "SaveJobs/saveAsPNGto001.jsx",
            "SaveJobs/saveAsPNGto031.jsx", 
            "SaveJobs/saveAsPNGto002.jsx",
            "SaveJobs/saveAsPNGto012.jsx",
            "SaveJobs/saveAsPNGto022.jsx",
            "SaveJobs/saveAsPNGto032.jsx",
            "SaveJobs/saveAsPNGto003.jsx"
        ];
        
        for (var i = 0; i < exportScripts.length; i++) {
            var scriptPath = scriptBasePath + "/" + exportScripts[i];
            var scriptFile = new File(scriptPath);
            
            if (scriptFile.exists) {
                try {
                    $.evalFile(scriptFile);
                    $.writeln("  ✓ " + exportScripts[i]);
                } catch (e) {
                    $.writeln("  ✗ Error in " + exportScripts[i] + ": " + e);
                }
            } else {
                $.writeln("  ✗ Script not found: " + exportScripts[i]);
            }
        }
        
        // Close the document without saving
        doc.close(SaveOptions.DONOTSAVECHANGES);
        $.writeln("✓ Completed: " + file.name);
        
    } catch (e) {
        alert("Error processing file " + file.name + ": " + e);
    }
}

// Function to run cloneToTranslatorsZip.jsx
function runCloneToTranslators() {
    var scriptPath = scriptBasePath + "/cloneToTranslatorsZip.jsx";
    var scriptFile = new File(scriptPath);
    
    if (scriptFile.exists) {
        try {
            $.evalFile(scriptFile);
            $.writeln("✓ Cloned files to TranslatorsZip folders");
            return true;
        } catch (e) {
            alert("Error running cloneToTranslatorsZip.jsx: " + e);
            return false;
        }
    } else {
        alert("Script file not found: " + scriptPath);
        return false;
    }
}

// Main function
function main() {
    $.writeln("=== ChapterExport Master Script ===");
    
    // Step 0: Select input folder
    $.writeln("Step 0: Selecting input folder...");
    var inputFolder = selectInputFolder();
    if (inputFolder === null) {
        return;
    }
    
    // Get image files from the folder
    var imageFiles = getImageFiles(inputFolder);
    if (imageFiles.length === 0) {
        alert("No PSD/PNG/JPG files found in the selected folder.");
        return;
    }
    
    $.writeln("Found " + imageFiles.length + " image files to process");
    
    // Step 1: Create ChapterExport folders
    $.writeln("Step 1: Creating ChapterExport folders...");
    if (!runCreateFolders()) {
        return;
    }
    
    // Step 2: Process each file through all export scripts
    $.writeln("Step 2: Processing files through export scripts...");
    for (var i = 0; i < imageFiles.length; i++) {
        $.writeln("Processing file " + (i + 1) + " of " + imageFiles.length);
        processFile(imageFiles[i]);
    }
    
    // Step 3: Clone to TranslatorsZip folders
    $.writeln("Step 3: Cloning to TranslatorsZip folders...");
    if (!runCloneToTranslators()) {
        return;
    }
    
    $.writeln("=== ChapterExport Master Script Completed ===");
    alert("ChapterExport workflow completed successfully!\n\nProcessed " + imageFiles.length + " files.");
}

// Run the main function
main();


