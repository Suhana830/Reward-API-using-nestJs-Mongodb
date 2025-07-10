import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './schemas/transaction.schema';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { Reward, RewardSchema } from 'src/rewards/schemas/reward.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Transaction.name, schema: TransactionSchema },
            { name: Reward.name, schema: RewardSchema }
        ]),

    ],

    controllers: [TransactionsController],
    providers: [TransactionsService],
    exports: [TransactionsService]

})
export class TransactionsModule { }
