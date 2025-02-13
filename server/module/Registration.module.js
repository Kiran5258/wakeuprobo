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
      unique: true, 
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
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const RegistrationModel = mongoose.model("Registration", RegistrationSchema);
export default RegistrationModel;
