 
import mongoose, {Schema,Document,Model} from "mongoose";

export interface Iuser extends Document{
    name:string;
    email:string;
    password:string;
    createdAt:Date;
    updatedAt:Date;
}

const UserSchema:Schema<Iuser>=new Schema<Iuser>({
    name:{type:String,required:true,trim:true},
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    password: { type: String, required: true },
  },
  { timestamps: true },
)

export const User:Model<Iuser>=mongoose.models.User || mongoose.model<Iuser>("User",UserSchema);

export default User;