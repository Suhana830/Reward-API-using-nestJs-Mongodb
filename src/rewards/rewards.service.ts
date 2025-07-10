import { Injectable, NotFoundException, Res, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Reward } from './schemas/reward.schema';
import { Model } from 'mongoose'
import { Redeem } from 'src/redeem/schemas/redeem.schema';


@Injectable()
export class RewardsService {
    constructor(
        @InjectModel(Reward.name) private rewardModel: Model<Reward>,
        @InjectModel(Redeem.name) private redeemModel: Model<Redeem>

    ) { }


    async createReward(userId: string, totalPoints: Number) {

        try {

            const reward = await this.rewardModel.create({ userId: userId, totalPoints: totalPoints })
            return {
                status: 'success',
                data: reward,
                message: 'Reward created'
            }
        } catch (error) {

            throw new HttpException(`Failed to create reward `, HttpStatus.INTERNAL_SERVER_ERROR)
        }


    }

    async getUserPoints(userId: string) {
        const reward = await this.rewardModel.findOne({ userId: userId }).lean();


        if (!reward) {
            throw new NotFoundException(`No reward data for user Id  ${userId} `)
        }

        return {

            totalPoints: reward.totalPoints,
            updateAt: reward.updateAt
        }
    }
}
