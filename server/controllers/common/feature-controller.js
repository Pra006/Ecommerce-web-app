import Feature from "../../models/Feature.js"

export const addFeatureImage = async(req, res) => {
    try {
        console.log("Request body:", req.body);
        const {image} = req.body;
        console.log("Image to save:", image);
        const featureImages = new Feature({
            image
        })
        await featureImages.save();
        res.status(201).json({
            success: true,
            message: "Feature image added successfully",
            data: featureImages
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occured",
        } )
        
    }
}
export const getFeatureImage = async(req, res) => {
    try {
            const images = await Feature.find({});
            res.status(200).json({
                success: true,
                data: images
            })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occured",
        } )
        
    }
}

export const deleteFeatureImage = async(req, res) => {
    try {
        const {id} = req.params;
        const deletedImage = await Feature.findByIdAndDelete(id);
        
        if (!deletedImage) {
            return res.status(404).json({
                success: false,
                message: "Feature image not found",
            });
        }
        
        res.status(200).json({
            success: true,
            message: "Feature image deleted successfully",
            data: deletedImage
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error occured",
        });
    }
}