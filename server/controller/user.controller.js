import { errormsg } from "../utilzation/404.js"
import bcryptjs from "bcryptjs"
import User from '../module/user.module.js'
import RegistrationModel from "../module/Registration.module.js"
import Post from "../module/newpost.module.js"
export const test=(req,res)=>{
    res.json({message:"It is create..."})

}
export const update=async(req,res,next)=>{
    if(req.user.id!==req.params.userId){
        return next(errormsg(403,"You are not allow"))
    }
    if(req.body.password){
        if(req.body.password.length<6){
            return next(errormsg(400,"Please greater 6 password"))
        }
        req.body.password=bcryptjs.hashSync(req.body.password,10)
    }
    if(req.body.name){
        if(req.body.name.length <7 || req.body.name.lenght>20){
            return next(errormsg(400,"Please 7 and 20 character"))
        }
        if(req.body.name.includes(' ')){
            return next(errormsg(400,'space is cannot used'))
        }
        if(req.body.name!=req.body.name.toLowerCase()){
            return next(errormsg(400,'only the lowercase'))
        }   
    }
    try{
        const updateuser=await User.findByIdAndUpdate(req.params.userId,{
            $set:{
                name:req.body.name,
                email:req.body.email,
                password:req.body.password,
                profilephoto:req.body.profilephoto
            },
        },{new:true})
        const{password,...rest}=updateuser._doc;
        res.status(200).json(rest)
    }
    catch(error){
        next(error)
    }
}
export const deleteaccount=async(req,res,next)=>{
    if(!req.user.isAuth && req.user.id!==req.params.userId){
        return next(errormsg(403,'You not delete the account'))
    }
    try{
        await User.findByIdAndDelete(req.params.userId)
        res.status(200).json('User has been delete')
    }catch(error){
        next(error)
    }
}
export const signout=(req,res,next)=>{
    try{
        res.clearCookie('access_token').status(200).json('user has been signout ')
    }
    catch(error){
        next(error)
    }
}
export const getuser = async (req, res, next) => {
    if (!req.user?.isAuth) {
      return next(errormsg(400,"you are not allowed"))
    }
  
    try {
      const initindex = Number(req.query.startindex) || 0;
      const limit = Number(req.query.limit) || 9;
      const sortdir = req.query.order === "asc" ? 1 : -1;
      const userlist = await User.find()
        .sort({ createdAt: sortdir })
        .skip(initindex)
        .limit(limit);
      const withoutpassword = userlist.map((user) => {
        const { password, ...rest } = user._doc;
        return rest;
      });
      const totaluser = await User.countDocuments();
      const now = new Date();
      const oneMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
  
      const lastmonth = await User.countDocuments({
        createdAt: { $gte: oneMonth, $lt: now },
      });
  
      res.status(200).json({
        userlist: withoutpassword,
        totaluser,
        lastmonth,
      });
    } catch (error) {
      next(error);
    }
  };
  
export const getAllRegistrations = async (req, res) => {
    try {
        if(!req.user.isAuth){
            next(errormsg(404,"You not allow the page"))
        }
      const registrations = await RegistrationModel.find();
      res.status(200).json({ success: true, registrations });
    } catch (error) {
      next(error)
    }
  };
  export const getUserCourses = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            return next(errormsg(401, "Unauthorized: User ID missing"));
        }
        const user = await User.findById(req.user.id).select("email");
        if (!user) {
            return next(errormsg(404, "User not found"));
        }
        const userRegistrations = await RegistrationModel.find({ email: user.email });
        if (!userRegistrations.length) {
            return res.status(200).json({ success: true, courses: [] });
        }

        const courses = await Promise.all(
            userRegistrations.map(async (registration) => {
                const post = await Post.findOne({ slug: registration.postslug }).select("title slug image");
                return post ? { title: post.title, slug: post.slug, image: post.image } : null;
            })
        );

        res.status(200).json({
            success: true,
            courses: courses.filter((course) => course !== null),
        });

    } catch (error) {
        next(error);
    }
};
