import { Module } from '@nestjs/common';
import { RedeemController } from './redeem.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Redeem, RedeemSchema } from './schemas/redeem.schema';
import { RedeemService } from './redeem.service';
import { Reward, RewardSchema } from 'src/rewards/schemas/reward.schema';



@Module({

  imports: [
    MongooseModule.forFeature([
      { name: Redeem.name, schema: RedeemSchema },
      { name: Reward.name, schema: RewardSchema }
    ])
  ],
  controllers: [RedeemController],
  providers: [RedeemService],
  exports: [RedeemService]

})
export class RedeemModule { }
