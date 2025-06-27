// cloneToTranslatorsZip.jsx
// Clones contents from source folders to destination folders for translators zip

// ====== CONFIG ======
var rootFolder = "D:/_Photoshop Exports/ChapterExport/";

// Source to destination mapping
var folderMappings = [
    {
        source: "002 Default 1200px",
        destination: "900 TranslatorsZip/01 Default"
    },
    {
        source: "022 Bubbles 1200px", 
        destination: "900 TranslatorsZip/02 Bubbles"
    },
    {
        source: "032 Textless 1200px",
        destination: "900 TranslatorsZip/03 Textless"
    }
];
// =====================

function cloneFolderContents(sourcePath, destPath) {
    var sourceFolder = new Folder(sourcePath);
    var destFolder = new Folder(destPath);
    
    if (!sourceFolder.exists) {
        alert("Source folder does not exist: " + sourcePath);
        return false;
    }
    
    // Create destination folder if it doesn't exist
    if (!destFolder.exists) {
        destFolder.create();
    }
    
    // Get all files in source folder
    var sourceFiles = sourceFolder.getFiles();
    var copiedCount = 0;
    
    for (var i = 0; i < sourceFiles.length; i++) {
        var sourceFile = sourceFiles[i];
        
        // Only process files, not folders
        if (sourceFile instanceof File) {
            var fileName = sourceFile.name;
            var destFile = new File(destFolder + "/" + fileName);
            
            try {
                // Copy the file
                sourceFile.copy(destFile);
                copiedCount++;
            } catch (e) {
                alert("Error copying file " + fileName + ": " + e);
            }
        }
    }
    
    return copiedCount;
}

function main() {
    var totalCopied = 0;
    
    for (var i = 0; i < folderMappings.length; i++) {
        var mapping = folderMappings[i];
        var sourcePath = rootFolder + mapping.source;
        var destPath = rootFolder + mapping.destination;
        
        //alert("Copying from: " + mapping.source + "\nTo: " + mapping.destination);
        
        var copiedCount = cloneFolderContents(sourcePath, destPath);
        if (copiedCount !== false) {
            totalCopied += copiedCount;
            //alert("Copied " + copiedCount + " files from " + mapping.source);
        }
    }
    
    //alert("Clone operation completed!\nTotal files copied: " + totalCopied);
}

// Run the script
main(); 