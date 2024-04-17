// Importing dependencies
import mongoose, { Schema } from "mongoose"; // Importing mongoose and Schema from mongoose package.
import bcrypt from "bcrypt"; // Importing bcrypt for password hashing.

// Defining the user schema using the Schema constructor.
const UserSchema = new Schema(
  {
    email: {
      type: String, // Data type for email field.
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address format"], // Validation for email format.
      required: true, // Email field is required.
      unique: true, // Email field must be unique.
    },
    password: { type: String, required: true }, // Data type and requirement for password field.

    profile: {
      // Sub-document for user profile details.
      username: {
        // Username details.
        type: String, // Data type for username field.
        lowercase: true, // Username will be stored in lowercase.
        unique: true, // Username must be unique.
        required: [true, "can't be blank"], // Username is required.
        match: [/^[a-zA-Z0-9]+$/, "is invalid"], // Validation for username format.
        index: true, // Indexing for quicker queries.
      },
      firstName: {
        // First name details.
        type: String, // Data type for first name field.
        match: [/^[a-zA-Z]+(?:-[a-zA-Z]+)*$/, "is invalid"], // Validation for first name format.
      },
      lastName: {
        // Last name details.
        type: String, // Data type for last name field.
        match: [/^[a-zA-Z]+(?:-[a-zA-Z]+)*$/, "is invalid"], // Validation for last name format.
      },
      birthday: Date, // Data type for birthday field.
      pronouns: {
        // Pronouns details.
        type: String, // Data type for pronouns field.
        enum: ["he/him/his", "she/her/hers", "they/them/theirs"], // Enumeration for pronouns.
      },
      avatar: String, // Data type for avatar field.
      socials: {
        // Social media details.
        facebook: String,
        twitter: String,
        instagram: String,
        pinterest: String,
        tiktok: String,
        youtube: String,
        reddit: String,
        discord: String,
        medium: String,
        github: String,
      },
      bio: {
        // Biography details.
        type: String, // Data type for bio field.
        maxlength: [300, "Bio cannot exceed 300 characters"], // Maximum length for bio.
      },
    },
    address: {
      // Address details.
      street1: String, // Data type for street1 field.
      street2: String, // Data type for street2 field.
      city: String, // Data type for city field.
      country: String, // Data type for country field.
      zip: String, // Data type for zip field.
    },
    history: [
      // User history details.
      {
        paid: { type: Number, default: 0 }, // Amount paid for an item.
        item: { type: Schema.Types.ObjectId, ref: "Product" }, // Reference to the purchased product.
        quantity: { type: Number, default: 1 }, // Quantity of the purchased item.
        date: { type: Date, default: Date.now }, // Date of the purchase.
        paymentMethod: String, // Payment method used for the purchase.
      },
    ],
    membership: {
      // Membership details.
      active: {
        // Membership activation status.
        type: Boolean, // Data type for active field.
        default: true, // Default value for active field.
      },
      role: {
        // User role details.
        type: String, // Data type for role field.
        default: "buyer", // Default value for role field.
        enum: ["buyer", "seller", "admin"], // Enumeration for user roles.
      },
      favorites: [{ type: Schema.Types.ObjectId, ref: "Product" }],
      registerDate: {
        type: Date,
        default: Date.now,
      },
    },
  },
  {
    timestamps: true, // Automatic timestamps for user creation and modification.
  }
);

// Middleware function to hash the user's password before saving it to the database.
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    // If password is not modified, skip hashing.
    return next();
  }
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10); // Hashing the password using bcrypt.
    this.password = hashedPassword; // Assigning the hashed password to the password field.
    next(); // Proceed to the next middleware.
  } catch (error) {
    next(error); // Handling any errors that occur during hashing.
  }
});

// Creating the User model using the schema.
const User = mongoose.model("User", UserSchema);

export default User; // Exporting the User model.
