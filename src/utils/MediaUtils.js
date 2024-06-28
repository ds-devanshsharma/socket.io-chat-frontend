import JSZip from "jszip";

export async function compress(file ){
    console.log(`Original file size : ${file.size}`);
    if(file){
        try{
            const zip = new JSZip();
            zip.file(file.name,file);
            
            const compressedContent = await zip.generateAsync({
                type:"uint8array",
                compression:"DEFLATE",
                compressionOptions:{
                    level:6
                }
            });
            console.log(`Compressed file size : ${compressedContent.length} `);

            // add limit logic here 
            return compressedContent;
        }
        catch{
            console.log("Error in compressing file .");
        }
    }
}

export async function decompress(data) {
    try {
        const zip = new JSZip();
        const decompressedContent = await zip.loadAsync(data);
        const files = Object.keys(decompressedContent.files);
        const fileContent = await decompressedContent.file(files[0]).async("blob");
        return fileContent;
    } catch (error) {
        console.error("Error in decompressing file:", error);
        return null;
    }
}
