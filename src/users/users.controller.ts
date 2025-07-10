import { Controller, Get, Param, Res, HttpStatus, NotFoundException, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    async createUser(@Body() body, @Res() res: Response) {
        const { name, email, password } = body;

        try {

            const user = await this.usersService.createUser(name, email, password);
            return res.status(HttpStatus.CREATED).json({
                status: 'success',
                data: user
            })

        } catch (err) {
            return res.status(err.status || 500).json({
                status: 'error',
                message: err.message || 'Something went wrong'
            })
        }

    }

    @Get(':id')
    async getUser(@Param('id') id: string, @Res() res: Response) {

        try {

            const user = await this.usersService.findById(id);


            if (!user) {
                throw new NotFoundException(`User with ID ${id} not found`);

            }

            return res.status(HttpStatus.OK).json({
                status: 'success',
                data: user,
            })


        } catch (err) {
            return res.status(err.status || 500).json({
                status: 'error',
                message: err.message || 'Something went wrong'
            })
        }



    }


    @Get()
    async getAllUsers(@Res() res: Response) {
        const users = await this.usersService.findAll();

        try {
            return res.status(HttpStatus.OK).json({
                status: 'success',
                data: users
            });
        } catch (err) {
            return res.status(err.status || 500).json({
                status: 'error',
                message: err.message || 'Something went wrong'
            })
        }





    }
}
