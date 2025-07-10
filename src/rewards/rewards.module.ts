import { Module } from '@nestjs/common';
import { RewardsController } from './rewards.controller';
import { RewardsService } from './rewards.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Reward, RewardSchema } from './schemas/reward.schema';
import { Transaction, TransactionSchema } from 'src/transactions/schemas/transaction.schema';
import { TransactionsModule } from 'src/transactions/transactions.module';
import { Redeem, RedeemSchema } from 'src/redeem/schemas/redeem.schema';

@Module({

  imports: [
    MongooseModule.forFeature([
      { name: Reward.name, schema: RewardSchema },
      { name: Transaction.name, schema: TransactionSchema },
      { name: Redeem.name, schema: RedeemSchema }
    ]),
    TransactionsModule,

  ],
  controllers: [RewardsController],
  providers: [RewardsService],
  exports: [RewardsService]

})
export class RewardsModule { }
