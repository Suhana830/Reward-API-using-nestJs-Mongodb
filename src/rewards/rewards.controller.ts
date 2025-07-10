import { Controller, Get, Res, HttpStatus, NotFoundException, Query, Post, Body } from '@nestjs/common';
import { Response } from 'express';
import { RewardsService } from './rewards.service';
import { TransactionsService } from 'src/transactions/transactions.service';


@Controller('rewards')
export class RewardsController {

    constructor(
        private readonly rewardsService: RewardsService,
        private readonly transactionsService: TransactionsService
    ) { }

    @Get('points')
    async getUserPoints(
        @Query('userId') userId: string,
        @Res() res: Response,

    ) {
        if (!userId) {
            throw new NotFoundException('Missing userID in query');
        }

        try {

            const data = await this.rewardsService.getUserPoints(userId);


            return res.status(HttpStatus.OK).json({
                status: 'success',
                data
            })

        } catch (err) {
            return res.status(err.status || 500).json({
                status: 'error',
                message: err.message || 'Something went wrong'
            })
        }







    }

    @Post()
    async createReward(@Body() body, @Res() res: Response) {
        const { userId, totalPoints } = body;

        try {

            const data = await this.rewardsService.createReward(userId, totalPoints);
            return res.status(HttpStatus.CREATED).json({
                status: 'success',
                data: data
            })
        } catch (err) {
            return res.status(err.status || 500).json({
                status: 'error',
                message: err.message || 'Something went wrong'
            })
        }
    }


    @Get('transaction')
    async getUserTransaction(
        @Query('userId') userId: string,
        @Res() res: Response
    ) {

        try {
            if (!userId) {
                throw new NotFoundException('Missing userID in query');
            }


            const transactions = await this.transactionsService.getUserTransactions(userId)

            return res.status(HttpStatus.OK).json({
                status: 'success',
                count: transactions.length,
                data: transactions
            });

        } catch (error) {


            return res.status(error.status || 500).json({
                status: 'error',
                message: error.message || 'Failed to fetch transactions'
            });
        }
    }

    @Get('options')
    async getOption(@Res() res: Response) {



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

        return res.status(HttpStatus.OK).json({
            status: 'success',
            data: REWARD_OPTIONS,
        });
    }
}
