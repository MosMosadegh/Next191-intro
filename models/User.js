const mongoose  = require("mongoose")

const schema = mongoose.Schema({

    firstName: {
        type: String,
        required: true,
        minlength: 4,
        trim: true, // حذف فضاهای خالی
      },
    lastName: {
        type: String,
        required: true,
        minlength: 4,
        trim: true, // حذف فضاهای خالی
      },
    userName: {
        type: String,
        required: true,
        minlength: 4,
        trim: true, // حذف فضاهای خالی
      },
      email: {
        type: String,
        required: true,
        unique: true, // ایمیل باید منحصر به فرد باشد
        trim: true,
        lowercase: true, // تبدیل به حروف کوچک
        match: /.+\@.+\..+/, // اعتبارسنجی فرمت ایمیل
      },
      password: {
        type: String,
        required: true,
        minlength: 8,
      },
      role: {
        type: String,
        required: true,
      },

})

const model = mongoose.models.User || mongoose.model ("User", schema)

export default model