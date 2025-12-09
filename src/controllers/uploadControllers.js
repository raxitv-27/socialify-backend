const { Storage } = require("@google-cloud/storage");

const bucketName = process.env.GCS_BUCKET_NAME;
const projectId = process.env.GCP_PROJECT_ID;

const storage = new Storage({ projectId });

exports.uploadBanner = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    const file = req.file;
    const fileName = `banners/${Date.now()}-${file.originalname}`;
    const bucket = storage.bucket(bucketName);
    const blob = bucket.file(fileName);

    const stream = blob.createWriteStream({
      resumable: false,
      contentType: file.mimetype,
      public: true,
    });

    stream.on("error", (err) => {
      console.error("Upload error:", err);
      return res.status(500).json({ success: false, message: "Upload failed" });
    });

    stream.on("finish", async () => {
      await blob.makePublic();
      const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;

      return res.json({ success: true, url: publicUrl });
    });

    stream.end(file.buffer);
  } catch (err) {
    console.error("Upload exception:", err);
    return res.status(500).json({ success: false, message: "Upload error" });
  }
};
