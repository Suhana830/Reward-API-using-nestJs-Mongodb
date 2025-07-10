
import { Controller, Post, Body, Res, HttpStatus, Get, Query } from '@nestjs/common';
import { RedeemService } from './redeem.service';
import { Response } from 'express';

@Controller('rewards/redeem')
export class RedeemController {
    constructor(private readonly redeemService: RedeemService) { }

    @Post()
    async redeemPoints(
        @Body('userId') userId: string,
        @Body('option') option: string,
        @Res() res: Response,
    ) {
        try {
            const data = await this.redeemService.redeem(userId, option);
            return res.status(HttpStatus.OK).json({
                status: 'success',
                message: `Redeemed ${data.pointsRedeemed} points for ${option}`,
                data,
            });
        } catch (error) {
            return res.status(error.status || 500).json({
                status: 'error',
                message: error.message || 'Failed to redeem',
            });
        }
    }


}