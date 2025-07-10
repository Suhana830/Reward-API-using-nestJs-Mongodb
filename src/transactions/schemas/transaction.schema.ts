import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema({ timestamps: true })
export class Transaction extends Document {
    @Prop({ required: true })
    userId: string;

    @Prop()
    amount: number;

    @Prop()
    category: string;

    @Prop()
    pointsEarned: number;



}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);