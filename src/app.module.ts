import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { RewardsModule } from './rewards/rewards.module';

import { TransactionsModule } from './transactions/transactions.module';
import { RedeemModule } from './redeem/redeem.module';



@Module({
  imports: [

    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URL!),
    UsersModule,
    RewardsModule,
    TransactionsModule,
    RedeemModule
  ],


})
export class AppModule { }
