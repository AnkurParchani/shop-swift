import { supabase } from "../db/supabase";
import { ImgFile } from "./../../global";

// To Upload image to supabase bucket
export const uploadItemImgToSupabase = async (
  bucketName: string,
  file: ImgFile,
  itemId: number
) => {
  const { mimetype, buffer, originalname, fieldname } = file;

  const extention = originalname.split(".").pop();
  const imageName = originalname.replace(/\.[^/.]+$/, "");
  const fileName = `${imageName}-${fieldname}-${itemId}.${extention}`;

  try {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(fileName, buffer, { contentType: mimetype });

    if (error) {
      console.error(error);
      throw new Error("Something went wrong while uploading the image");
    }

    // Returning file URL
    return data;
  } catch (err) {
    console.error(err);
    throw new Error("Something went wrong while uploading the image");
  }
};
