import { Body, Controller, Get, HttpStatus, NotFoundException, Post, Query, Res } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Response } from 'express';

@Controller()
export class TransactionsController {

    constructor(private readonly transactionsService: TransactionsService) { }


    @Post('transactions')
    async createTransaction(@Body() body: any, @Res() res: Response) {
        try {

            const transaction = await this.transactionsService.createTransaction(body);

            return res.status(HttpStatus.CREATED).json({
                status: 'success',
                data: transaction,
                message: 'Transaction created and reward update. '
            });

        } catch (error) {
            return res.status(error.status || 500).json({
                status: 'error',
                message: error.message || 'Failed to fetch transactions'
            });
        }
    }


}
