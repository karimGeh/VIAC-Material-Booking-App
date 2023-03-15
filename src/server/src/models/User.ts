import mongoose from "mongoose";
import { Password } from "../services/password";
import { UserTypes } from "../enums/UserTypes";
import { ModelsNames } from "./_modelsNames";
import jwt from "jsonwebtoken";

export interface UserAttrs {
  code: string;
  type: UserTypes;
  fullName: string;
  email: string;
  password: string;
  phoneNum: string;
}

export interface UserDoc extends mongoose.Document, UserAttrs {
  createdAt: Date;
  updatedAt: Date;

  comparePassword(password: string): Promise<boolean>;
  generateAuthToken(): string;
}

export const userSchema = new mongoose.Schema<UserDoc>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
      enum: UserTypes,
      default: UserTypes.guest,
    },
    fullName: {
      type: String,
      required: true,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNum: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id;
        delete ret.password;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);
export interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

userSchema.methods.comparePassword = async function (password: string) {
  return await Password.compare(this.password, password);
};

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      type: this.type,
      code: this.code,
    },
    process.env.JWT__AUTH_SECRET_KEY!
  );
  return token;
};

export const User = mongoose.model<UserDoc, UserModel>(
  ModelsNames.User,
  userSchema
);
