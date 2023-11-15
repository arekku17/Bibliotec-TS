import mongoose, { Schema, Types } from "mongoose";

interface IUser {
    username: string;
    googleId?: string;
    password?: string;
    correo: string;
    roles: Types.ObjectId;
}

const usuarioSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true
    },
    googleId: {
        type: String
    },
    password: {
        type: String
    },
    correo: {
        type: String,
        required: true
    },
    roles: [
        {
            ref: "Role",
            type: mongoose.Schema.Types.ObjectId
        }
    ]
}, {
    versionKey: false,
    timestamps: true
});

const User = mongoose.models.Usuario || mongoose.model<IUser>('Usuario', usuarioSchema);
export default User;