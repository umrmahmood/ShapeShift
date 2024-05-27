//  UserSchema.js

// Importing dependencies
import mongoose, { Schema } from "mongoose"; // Importing mongoose and Schema from mongoose package.
import bcryptjs from "bcryptjs"; // Importing bcryptjs for password hashing.

// Defining the user schema using the Schema constructor.
const UserSchema = new Schema(
  {
    email: {
      type: String, // Data type for email field.
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address format"], // Validation for email format.
      required: true, // Email field is required.
      unique: true, // Email field must be unique.
    },
    password: { type: String },

    // authentications passes
    firebaseId: { type: String },
    fcmToken: String,

    profile: {
      // Sub-document for user profile details.
      username: {
        // Username details.
        type: String, // Data type for username field.
        lowercase: true, // Username will be stored in lowercase.
        unique: true, // Username must be unique.
        // Validation for username format.
        index: true, // Indexing for quicker queries.
      },
      firstName: {
        // First name details.
        type: String, // Data type for first name field.
        match: [/^[a-zA-Z]+(?:-[a-zA-Z]+)*$/, "is invalid"], // Validation for first name format.
        default: "",
      },
      lastName: {
        // Last name details.
        type: String, // Data type for last name field.
        match: [/^[a-zA-Z]+(?:-[a-zA-Z]+)*$/, "is invalid"], // Validation for last name format.
        default: "",
      },
      birthday: Date, // Data type for birthday field.
      pronouns: {
        // Pronouns details.
        type: String, // Data type for pronouns field.
        enum: ["Mr.", "Mrs.", "Miss", "Ms.", "Dr.", ""], // Enumeration for pronouns.
        default: "",
      },
      avatarUrl: {
        type: String,
        default:
          "https://res.cloudinary.com/dryyvdzip/image/upload/v1715767119/DefaultImage.png",
      }, // Data type for avatar field.
      avatar: { type: String, default: "66448d9c21f44c996153d41e" },
      socials: {
        // Social media details.
        facebook: {
          type: String,
          default: "",
        },
        twitter: {
          type: String,
          default: "",
        },
        instagram: {
          type: String,
          default: "",
        },
        pinterest: {
          type: String,
          default: "",
        },
        tiktok: {
          type: String,
          default: "",
        },
        youtube: {
          type: String,
          default: "",
        },
        reddit: {
          type: String,
          default: "",
        },
        discord: {
          type: String,
          default: "",
        },
        medium: {
          type: String,
          default: "",
        },
        github: {
          type: String,
          default: "",
        },
      },
      bio: {
        // Biography details.
        type: String, // Data type for bio field.
        maxlength: [300, "Bio cannot exceed 300 characters"], // Maximum length for bio.
        default: "",
      },
    },
    address: {
      // Address details.
      street1: {
        type: String,
        default: "",
      }, // Data type for street1 field.
      street2: {
        type: String,
        default: "",
      }, // Data type for street2 field.
      city: {
        type: String,
        default: "",
      }, // Data type for city field.
      country: {
        type: String,
        default: "",
      }, // Data type for country field.
      zip: {
        type: String,
        default: "",
      }, // Data type for zip field.
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
        status: {
          type: Boolean, // Data type for active field.
          default: true, // Default value for active field.
        },
        lastActiveAt: {
          type: Date, // Data type for storing the last active timestamp.
          default: null, // Default value for last active timestamp (current time).
        },
      },
      role: {
        // User role details.
        type: String, // Data type for role field.
        default: "user", // Default value for role field.
        enum: ["user", "admin"], // Enumeration for user roles.
      },
      haveShop: { type: Boolean, default: false },
      shopId: { type: String },
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
  try {
    // Hashing Password
    if (this.isModified("password")) {
      const hashedPassword = await bcryptjs.hash(this.password, 10); // Hashing the password using bcryptjs.
      this.password = hashedPassword; // Assigning the hashed password to the password field.
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Middleware to automatically set username from email

UserSchema.pre("save", function (next) {
  if (!this.profile.username) {
    // Extracting username from email
    const atIndex = this.email.indexOf("@");
    const extractedUsername = this.email.substring(0, atIndex);
    this.profile.username = extractedUsername;
  }
  next();
});

// Creating the User model using the schema.
const User = mongoose.model("User", UserSchema);

export default User; // Exporting the User model.
