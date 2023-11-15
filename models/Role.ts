import mongoose, { Schema, models } from "mongoose";

interface IRole {
    nombre: string;
}

const roleSchema = new Schema<IRole>({
    nombre: {
        type: String,
        required: true,
        unique: true
    }
}, {
    versionKey: false,
    timestamps: true
});

const Role = mongoose.models.Role || mongoose.model<IRole>('Role', roleSchema);
export default Role;