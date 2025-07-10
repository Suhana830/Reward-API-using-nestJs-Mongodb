import { Injectable } from '@nestjs/common';
import { Transaction } from './schemas/transaction.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reward } from 'src/rewards/schemas/reward.schema';


@Injectable()
export class TransactionsService {

    constructor(
        @InjectModel(Transaction.name)
        private transactionModel: Model<Transaction>,

        @InjectModel(Reward.name)
        private readonly rewardModel: Model<Reward>,
    ) { }

    async createTransaction(TransactionData: any) {
        const { userId, amount, category, pointsEarned } = TransactionData;

        const transaction = await this.transactionModel.create({
            userId,
            amount,
            category,
            pointsEarned
        });

        const reward = await this.rewardModel.findOne({ userId });

        if (!reward) {
            await this.rewardModel.create({
                userId,
                totalPoints: pointsEarned,
                updateAt: Date.now()
            })
        }
        else {

            reward.totalPoints += pointsEarned;
            await reward.save();
        }

        return transaction;
    }

    async getUserTransactions(userId: string) {


        return await this.transactionModel.find({ userId })
            .sort({ createdAt: -1 })
            .limit(5);
    }
}
