const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const users_Schema = new mongoose.Schema(
  {
    Category: String,
    file_status: String,
    result: String,

    file_number: String,
    file_open_date: String,
    file_category: String,
    result_release_date: String,
    travel_procedures_date: String,
    travel_date: String,
    image: String,

    //user auth
    nationality: String,
    birth_date: String,
    national_id: {
      type: String,
    },
    last_name: String,
    //admin
    name: {
      type: String,
      required: [true, "username has been required"],
    },
    password: {
      type: String,
    },
    gmail_Account: String,
    role: {
      type: String,
      enum: ['user', 'admin', 'Sadmin'],
      default: 'user',
    },
    members: [
      {
        full_name: String,
        national_id: String,
        birth_date: String,
      }
    ],

    file_details: {
      submit_date: String,
      status_received_date: String,
      evaluation_completed_date: String,
      processed_date: String,
      reached_out_to_the_client_date_success: String,
      reached_out_to_the_client_date_fail: String,
      reached: {
        type: Boolean,
        default: false
      },
      Delivered: {
        type: Boolean,
        default: false
      },
      opend: {
        type: Boolean,
        default: false
      },
    }

  },
  {
    timestamps: { createdAt: "creationTime", updatedAt: "lastModified" },
    versionKey: false,
  }
);

users_Schema.index({ name: 1 });
users_Schema.index({ national_id: 1 }, { unique: true });

users_Schema.pre("save", async function (next) {
  const isModified = this.isModified("password");
  if (!isModified) return next(); //Don't re-hash if not modified + it will save empty or default value
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const usersDB = mongoose.model("users_table", users_Schema);

module.exports = usersDB;
