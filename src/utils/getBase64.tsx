export const getImageBase64 = file => new Promise((resolve, reject) => {
    var image, oldWidth, oldHeight, newHeight, canvas, ctx, newDataUrl;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    console.log("getBase64 file: ", file);
    reader.onload = () => {
        var img = new Image();
        img.onload = () => {
            const imageType = file.type || "image/jpeg";
            const imageArguments = 0.5;

            image = new Image();
            // @ts-ignore
            image.src = reader.result;
            oldWidth = image.width; //1280
            oldHeight = image.height;//720
            const newWidth = file.size >= 2000000 ? oldWidth/4 : file.size >= 800000 ? oldWidth / 2 : oldWidth; //640
            newHeight = Math.floor((oldHeight / oldWidth) * newWidth); //360
        
            canvas = document.createElement("canvas");
            canvas.width = newWidth;
            canvas.height = newHeight;

            ctx = canvas.getContext("2d");
            ctx.drawImage(image, 0, 0, newWidth, newHeight);
            newDataUrl = canvas.toDataURL(imageType, imageArguments);
            resolve(newDataUrl);
        };
        // @ts-ignore
        img.src = reader.result;
    };
    reader.onerror = (error) => reject(error);
});


export const getPDFBase64 = file => new Promise((resolve, reject) => {
    console.log("getBase64 file: ", file);

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(r){
    console.log("r", r)
    resolve(r.target.result);
    }
    reader.onerror = (error) => reject(error);
});