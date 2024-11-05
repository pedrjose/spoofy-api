import { config, loadConfigVariables } from "../config";
import { v2 as cloudinary } from 'cloudinary';

loadConfigVariables();

cloudinary.config({
    cloud_name: config.CloudinaryCloudName,
    api_key: config.CloudinaryApiKey,
    api_secret: config.CloudinaryApiSecrete,
});

export async function handleUpload(file: any) {
    const res = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    return res.secure_url;
};