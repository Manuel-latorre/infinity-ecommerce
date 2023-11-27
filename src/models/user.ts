import mongoose, { Schema, model, models  } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Email not valid'
        ]
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false
    },
    fullname: {
        type: String,
        required: [true, 'Fullname is required'],
        minLength: [3, 'Fullname must be at least 3 characters'],
        maxLength: [30, 'Fullname must be at least 30 characters']
    },
    cart: [
        {
          product: {
            type: Schema.Types.ObjectId, // Debes ajustar el tipo según tu modelo de productos
            ref: 'Product', // Ajusta el nombre del modelo de productos
          },
          quantity: Number,
        },
      ],
});

const User = models.User || model('User', userSchema)

export default User