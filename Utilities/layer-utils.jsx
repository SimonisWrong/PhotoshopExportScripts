// ===== layer-utils.jsx =====

function hideLayerByName(psdFile, targetName) {
    // Recursively search through layers and layer groups
    function searchAndHide(layers) {
        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            
            // Check if this layer matches the target name
            if (layer.name === targetName) {
                layer.visible = false;
                return true; // Found and hidden
            }
            
            // If it's a layer group, search recursively
            if (layer.typename === "LayerSet") {
                if (searchAndHide(layer.layers)) {
                    return true; // Found in subgroup
                }
            }
        }
        return false; // Not found
    }
    
    return searchAndHide(psdFile);
}

function showLayerByName(psdFile, targetName) {
    // Recursively search through layers and layer groups
    function searchAndShow(layers) {
        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            
            // Check if this layer matches the target name
            if (layer.name === targetName) {
                layer.visible = true;
                return true; // Found and shown
            }
            
            // If it's a layer group, search recursively
            if (layer.typename === "LayerSet") {
                if (searchAndShow(layer.layers)) {
                    return true; // Found in subgroup
                }
            }
        }
        return false; // Not found
    }
    
    return searchAndShow(psdFile);
}