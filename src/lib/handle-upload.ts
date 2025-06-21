const PRESENT_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_NAME;

export const handleUpload = async (file: File | null) => {
  if (!file) {
    alert("Please select a file");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", PRESENT_NAME!);

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const result = await res.json();
    return result.secure_url;
  } catch (err) {
    console.log(err);
    alert("Failed to upload file");
  }
};
