const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other",
    },
    birthday: {
      type: Date,
      default: "2000-01-01",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    productPurchased: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    createAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } }).sort({ createAt: -1 });
  next();
});

module.exports = mongoose.model("User", userSchema);
