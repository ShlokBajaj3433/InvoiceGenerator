import axios from "axios";

function dataURLtoBlob(dataurl) {
    const arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    for (let i = 0; i < n; i++) u8arr[i] = bstr.charCodeAt(i);
    return new Blob([u8arr], { type: mime });
}

export const uploadInvoiceThumbnail = async (imageData) => {
    const formData = new FormData();
    const blob = dataURLtoBlob(imageData);
    formData.append("file", blob, "thumbnail.png");
    formData.append("upload_preset", "Invoice-Thumbnail"); // Must match your unsigned preset name exactly

    try {
        const response = await axios.post(
            "https://api.cloudinary.com/v1_1/dpodcbnzg/image/upload",
            formData
        );
        return response.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            console.error("Cloudinary error:", error.response.data.error.message);
        }
        throw error;
    }
};