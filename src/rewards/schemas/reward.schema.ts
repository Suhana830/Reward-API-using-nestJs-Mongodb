import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })

export class Reward extends Document {
    @Prop({ required: true }) userId: string;
    @Prop({ required: true }) totalPoints: number;

    @Prop()
    createdAt?: Date;

    @Prop()
    updateAt?: Date;
}

export const RewardSchema = SchemaFactory.createForClass(Reward);