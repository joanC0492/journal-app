interface Iupload {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: Array<any>;
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder: string;
  access_mode: string;
  original_filename: string;
}

export const fileUpload = async (file: File): Promise<string | undefined> => {
  if (!file) throw new Error("Ningn archivo a subir");

  const URL = "https://api.cloudinary.com/v1_1/drgrephvt/upload";
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "react-journal");

  try {
    const res = await fetch(URL, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("No se pudo subir la imagen");

    const dataJson: Iupload = await res.json();
    return dataJson.secure_url;
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      console.log("error.message", error.message);
    }
  }
};
