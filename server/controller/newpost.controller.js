import { errormsg } from "../utilzation/404.js";
import Post from "../module/newpost.module.js";

export const createpost = async (req, res, next) => {
  if (!req.user.isAuth) {
    return next(errormsg(400, "You are not allowed the page"));
  }
  if (!req.body.title || !req.body.content) {
    return next(errormsg(400, "please fill the not requirements"));
  }
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-z0-9]/g, "-");
  const newpost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });
  try {
    const uploadpost = await newpost.save();
    res.status(200).json(uploadpost);
  } catch (error) {
    next(error);
  }
};
export const getpost = async (req, res, next) => {
  try {
  
    const initindex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortdir = req.query.order === "asc" ? 1 : -1;

    const filters = {
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
    };

    const posts = await Post.find(filters)
      .sort({ updatedAt: sortdir })
      .skip(initindex)
      .limit(limit);

    const totalposts = await Post.countDocuments(filters);

    const now = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(now.getMonth() - 1);

    const lastmonth = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo, $lte: now },
    });

    res.status(200).json({
      posts,
      totalposts,
      lastmonth,
    });
  } catch (error) {
    console.error("Error in getpost:", error);
    next(error);
  }
};


export const deletepost=async(req,res,next)=>{
  if(!req.user.isAuth ||req.user.id!==req.params.userId){
    return next(errormsg(400,'You are not allowe to delete the post'))
  }
  try{
    await Post.findByIdAndDelete(req.params.postId)
    res.status(200).json('The post has been delete')

  }catch(error){
    next(error)
  }
}
export const updatepost=async(req,res,next)=>{
  if(!req.user.isAuth ||req.user.id!==req.params.userId){
    return next(errormsg(400,'You are not allowe to update the post'))
  }
  try{
    const updatepost=await Post.findByIdAndUpdate(
      req.params.postId,
      {
      $set:{
        title:req.body.title,
        content:req.body.content,
        image:req.body.image
      }},{new:true})
    res.status(200).json(updatepost)
    }catch(error){
    next(error)
  }
}