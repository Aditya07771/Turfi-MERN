import mongoose from "mongoose";

// Enum for account status
export const AccountStatus = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
};

// Enum for user types
export const UserType = {
  OWNER: "owner",
  ADMIN: "admin",
  EMPLOYEE: "employee",
};

// Owner Schema
const OwnerSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true }, // ✅ Unique is enough
    password: { type: String, required: true },
    companyName: { type: String, required: true, trim: true },
    userType: {
      type: String,
      enum: Object.values(UserType),
      default: UserType.OWNER,
    },
    accountStatus: {
      type: String,
      enum: Object.values(AccountStatus),
      default: AccountStatus.PENDING,
    },
    companyDetails: {
      registrationNumber: String,
      industry: String,
      contactNumber: String,
    },
  },
  { timestamps: true }
);

// ✅ Only keep this index (no need for email index)
OwnerSchema.index({ accountStatus: 1 });

export const Owner = mongoose.model("Owner", OwnerSchema);
