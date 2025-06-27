// createChapterExportFolders.jsx
// Creates the complete folder structure for ChapterExport

// ====== CONFIG ======
var baseFolderPath = "D:/_Photoshop Exports";
var chapterExportFolder = baseFolderPath + "/ChapterExport";
// =====================

// Function to create folder if it doesn't exist
function createFolderIfNotExists(folderPath) {
    var folder = new Folder(folderPath);
    if (!folder.exists) {
        var success = folder.create();
        if (success) {
            $.writeln("Created folder: " + folderPath);
        } else {
            $.writeln("Failed to create folder: " + folderPath);
        }
        return success;
    } else {
        $.writeln("Folder already exists: " + folderPath);
        return true;
    }
}

// Main function to create the folder structure
function createChapterExportFolders() {
    // Main folder structure to create
    var folderStructure = [
        "001 Default 1600px",
        "002 Default 1200px", 
        "003 Default 0800px",
        "012 Website 1200px",
        "022 Bubbles 1200px",
        "031 Textless 1600px",
        "032 Textless 1200px",
        "043 Censored 0800px",
        "100 TitleEndCards",
        "200 Translations/LANG/1200px",
        "200 Translations/LANG/0800px",
        "900 TranslatorsZip/01 Default",
        "900 TranslatorsZip/02 Bubbles", 
        "900 TranslatorsZip/03 Textless",
        "900 TranslatorsZip/99 TitleEndCards"
    ];

    // Create base folder first
    if (!createFolderIfNotExists(baseFolderPath)) {
        alert("Failed to create base folder: " + baseFolderPath);
        return;
    }

    // Create ChapterExport folder
    if (!createFolderIfNotExists(chapterExportFolder)) {
        alert("Failed to create ChapterExport folder: " + chapterExportFolder);
        return;
    }

    // Create all subfolders
    var successCount = 0;
    var totalFolders = folderStructure.length;

    for (var i = 0; i < folderStructure.length; i++) {
        var subfolderPath = chapterExportFolder + "/" + folderStructure[i];
        if (createFolderIfNotExists(subfolderPath)) {
            successCount++;
        }
    }

    // Show results
    var message = "Folder creation completed!\n\n";
    message += "Created " + successCount + " out of " + totalFolders + " folders.\n";
    message += "Base path: " + chapterExportFolder + "\n\n";

    if (successCount === totalFolders) {
        message += "All folders created successfully!";
    } else {
        message += "Some folders may already exist or failed to create.";
        alert(message);
    }

    //alert(message);
}

// Execute the main function
createChapterExportFolders(); 