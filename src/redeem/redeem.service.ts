import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Redeem } from './schemas/redeem.schema';
import { Reward } from 'src/rewards/schemas/reward.schema';

const REWARD_OPTIONS = [
    {
        type: 'cashback',
        pointsRequired: 100,
    },
    {
        type: 'voucher',
        pointsRequired: 150,
    },
    {
        type: 'gift_card',
        pointsRequired: 200,
    },
    {
        type: 'discount_coupon',
        pointsRequired: 80,
    },
];

@Injectable()
export class RedeemService {
    constructor(
        @InjectModel(Redeem.name) private redemptionModel: Model<Redeem>,
        @InjectModel(Reward.name) private rewardModel: Model<Reward>,
    ) { }

    async redeem(userId: string, rewardType: string) {

        const option = REWARD_OPTIONS.find(opt => opt.type === rewardType);
        if (!option) {
            throw new BadRequestException('Invalid reward type');
        }

        const pointsRequired = option.pointsRequired;

        const reward = await this.rewardModel.findOne({ userId });
        if (!reward) throw new NotFoundException('User not found');

        if (reward.totalPoints < pointsRequired) {
            throw new BadRequestException('Not enough reward points');
        }


        reward.totalPoints -= pointsRequired;
        await reward.save();


        const redemption = await this.redemptionModel.create({
            userId,
            pointsRedeemed: pointsRequired,
            rewardType,
        });

        return {
            userId,
            rewardType,
            pointsRedeemed: pointsRequired,
            remainingPoints: reward.totalPoints,

        };
    }
}