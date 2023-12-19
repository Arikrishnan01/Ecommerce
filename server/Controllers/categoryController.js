import slugify from 'slugify';
import categorySchema  from '../Models/categoryModel.js';

export const createCategory = async(req, res) => {
    try{
        const { name } = req.body;
        if(!name){
            return res.status(401).json({
                message: "Name is required"
            });
        }
        /**check exist category */
        const existCategory = await categorySchema.findOne({ name });
        if(existCategory){
            return res.status(201).json({
                success: true,
                message: "Category Already Exists"
            });
        }
        /**create new category to db */
        const category = await new categorySchema({
            name,
            slug:slugify(name)
        })
        .save()
        return res.status(200).json({
            success: true,
            message: "Category created succefully",
            category
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in create category",
            error: error.message
        });
    }
}

/** update category controller */
export const updateCategory = async(req, res) => {
    try{
        const { id } = req.params;
        const { name } = req.body;
        /**find and update the category */
        const category = await categorySchema.findByIdAndUpdate(
            id,
            {name, slug: slugify(name)},
            {new: true}
        )
        return res.status(200).json({
            success: true,
            message: "Category Updated successfully",
            category
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in Update Category",
            error: error.message
        });
    }
}

/** get all category controller */
export const getAllCategory = async(req, res) => {
    try{
        /**get all category from db */
        const allCategory = await categorySchema.find({});
        return res.status(200).json({
            success: true,
            message: "All category Fetched",
            allCategory
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in Get All Category",
            error: error.message
        });
    }
}

/** get single category using params */
export const getBySingleCategory = async(req, res) => {
    try{
        // const { id } = req.params;
        /**get byid category */
        const byId = await categorySchema.findOne({ slug: req.params.slug});

            return res.status(200).json({
                success: true,
                message: "Category fetched successfully",
                byId
            });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in getById Category",
            error: error.message
        });
    }
}

/** delete category */
export const deleteCategory = async(req, res) => {
    try{
        const { id } = req.params;
        const category = await categorySchema.findByIdAndDelete(id);
        if(category){
            return res.status(200).json({
                success: true,
                message: "Category deleted successfully",
                category
            });
        }
        else{
            return res.status(404).json({
                success: false,
                message: "Couldn't find Category"
            });
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in delete category",
            error: error.message
        });
    }
}