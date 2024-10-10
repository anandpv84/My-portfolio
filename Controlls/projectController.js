const projects = require('../Modals/projectSchema')

const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

cloudinary.config({
    cloud_name: 'dvgtrq1y5',
    api_key: '264195124456943',
    api_secret: 'YYS9tRRAZCI98M_2fu-Il2y8GZU',
});

const uploadFromBuffer = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
            if (result) {
                resolve(result);
            } else {
                reject(error);
            }
        });
        streamifier.createReadStream(buffer).pipe(stream);
    });
};


exports.addproject = async (req, res) => {

    console.log("Inside addProject controller...")

    const userId = req.payload;
    const { title, language, github, website, overview } = req.body;
    let imageUrl = null;

    try {

        if (req.file) {
            try {
                console.log("Uploading image...");
                const imageResult = await uploadFromBuffer(req.file.buffer);
                imageUrl = imageResult.secure_url;
                console.log("Image uploaded successfully:", imageUrl);
            } catch (error) {
                console.error("Error uploading image:", error);
                return res.status(500).json({ error: "Error uploading image" });
            }
        }


        const existingProject = await projects.findOne({ github });
        if (existingProject) {
            console.log("Project already exists with GitHub link:", github);
            return res.status(406).json({ message: "Project already exists. Please upload a new one." });
        }

        const newProject = new projects({
            title,
            language,
            github,
            website,
            overview,
            projectImage: imageUrl,
            userId
        });
        await newProject.save();

        console.log("Project added successfully:", newProject);
        res.status(200).json({ message: "Project added successfully" });

    } catch (err) {
        console.error("Unable to add project:", err);
        res.status(500).json({ error: "Unable to add project", details: err.message });
    }
};


exports.getallproject = async (req, res) => {
    try {
        const homeproject = await projects.find()
        res.status(200).json(homeproject)
    } catch (err) {
        res.status(401).json("request faild due to ", err)
    }
}

exports.deleteuserproject = async(req,res)=>{
    const {id}= req.params;
    try{
        const removeproject = await projects.findByIdAndDelete({_id:id})
        res.status(200).json("project deleted successfully")
    }catch(err){
        res.status(401).json("delete faild",err)
    }
}
