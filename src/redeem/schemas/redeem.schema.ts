import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Redeem extends Document {

    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    rewardType: string;

    @Prop({ required: true })
    pointsRedeemed: number;
}

export const RedeemSchema = SchemaFactory.createForClass(Redeem)