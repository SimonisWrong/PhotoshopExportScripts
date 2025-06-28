// runEndSaveJobs.jsx
// Runs all export scripts in sequence:


// Define the script paths in the order to run them
var basePath = "D:/Program Files/Photoshop Scripts/";
var scriptPaths = [
    basePath + "SaveJobsEnd/saveAsTitleEndCard_Default0800.jsx",
    basePath + "SaveJobsEnd/saveAsTitleEndCard_Default1200.jsx",
    basePath + "SaveJobsEnd/saveAsTitleEndCard_Default1200Alt.jsx",
    basePath + "SaveJobsEnd/saveAsTitleEndCard_Default1600.jsx",
    basePath + "SaveJobsEnd/saveAsTitleEndCard_Textless1200.jsx",
    basePath + "SaveJobsEnd/saveAsTitleEndCard_Textless1200Alt.jsx",
];

// Check if a document is open
if (app.documents.length === 0) {
    alert("Please open a document before running this script.");
} else {
    // Run each script in sequence
    for (var i = 0; i < scriptPaths.length; i++) {
        var scriptFile = new File(scriptPaths[i]);
        
        if (scriptFile.exists) {
            try {
                $.evalFile(scriptFile);
                // Optional: Add a small delay between scripts
                // $.sleep(100);
            } catch (e) {
                alert("Error running script: " + scriptPaths[i] + "\nError: " + e);
            }
        } else {
            alert("Script file not found: " + scriptPaths[i]);
        }
    }
    
    //alert("All scripts completed!");
} 

