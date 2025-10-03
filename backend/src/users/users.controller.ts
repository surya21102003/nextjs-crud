import { Controller, Post, Body, Get, Param, Delete, UseGuards, Request, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Post()
  create(@Body() body: { email: string; password: string }) {
    return this.service.create(body.email, body.password);
  }

  ///@UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.service.findAll();
  }

  /*//@UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Request() req) {
    return this.service.findOne(req.user.userId);
  }*/
// users.controller.ts
@Get(':id')
async findOneme(@Param('id') id: string) {
  const user = await this.service.findOne(id);
  return user;
}

 // @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
  /*@Patch(':id')
  //@UseGuards(JwtAuthGuard)
  updateEmail(@Request() req, @Body() body: { newEmail: string }) {
    return this.service.updateEmail(req.user.userId, body.newEmail);
  } */

  @Patch(':id')
updateEmail(@Param('id') id: string, @Body() body: { email: string }) {
  return this.service.updateEmail1(id, body.email);
}

}
