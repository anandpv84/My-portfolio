const projects = require('../Modals/projectSchema')

exports.addproject = async (req, res) => {
    console.log("inside addprojectcontroller")
    const userId = req.payload;
    console.log(userId)
    const projectImage = req.file.filename;
    console.log(projectImage)
    const { title, language, github, website, overview } = req.body;
    try {
        const existingProject = await projects.findOne({ github: github });
        if (existingProject) {
            res.status(406).json("project already exist, upload a new one")
        } else {
            const newProject = new projects({
                title: title,
                language: language,
                github: github,
                website: website,
                overview: overview,
                projectImage: projectImage,
                userId: userId
            })
            await newProject.save();
            res.status(200).json("project added successfully")
        }
    } catch (err) {
        res.status(401).json("unable to add project due to:", err)
    }
}


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
