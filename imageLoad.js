/**
 * Loader function that helps to trigger a callback when multiple images has been loaded. Besides
 * indicates which images were correctly/wrong loaded.
 * 
 * @param {Array} Images An array of strings with the paths to the images.
 * @param {Function} Callback Callback function executed when all images has been loaded or not.
 */
function ImageLoader(Images, Callback){
    // Keep the count of the verified images
    var allLoaded = 0;

    // The object that will be returned in the callback
    var _log = {
        success: [],
        error: []
    };

    // Executed everytime an img is successfully or wrong loaded
    var verifier = function(){
        allLoaded++;

        // triggers the end callback when all images has been tested
        if(allLoaded == Images.length){
            Callback.call(undefined, _log);
        }
    };

    // Loop through all the images URLs
    for (var index = 0; index < Images.length; index++) {
        // Prevent that index has the same value by wrapping it inside an anonymous fn
        (function(i){
            // Image path providen in the array e.g image.png
            var imgSource = Images[i];
            var img = new Image();
            
            img.addEventListener("load", function(){
                _log.success.push(imgSource);
                verifier();
            }, false); 
            
            img.addEventListener("error", function(){
                _log.error.push(imgSource);
                verifier();
            }, false); 
           
            img.src = imgSource;
        })(index);
    }
}


ImageLoader(["example.png", "example.jpg", "http://i.imgur.com/fHyEMsl.jpg"], function(result){
    if(result.error){
        // outputs: ["example.png", "example.jpg"]
        console.log("The following images couldn't be properly loaded: ", result.error);
    }

    // outputs: ["http://i.imgur.com/fHyEMsl.jpg"]
    console.log("The following images were succesfully loaded: ", result.success);
});