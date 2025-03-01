import mongoose from "mongoose";
const RegistrationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    workcollegename: {
      type: String,
      required: true,
    },
    contactnumber: {
      type: String,
      required: true,
    },
    postslug: {
      type:String,
      required: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);
RegistrationSchema.index({ email: 1, postslug: 1 }, { unique: true });
const RegistrationModel = mongoose.model("Registration", RegistrationSchema);
export default RegistrationModel;
