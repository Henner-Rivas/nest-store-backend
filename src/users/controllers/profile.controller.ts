import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decortator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { Role } from 'src/auth/models/roles.model';
import { PayloadToken } from 'src/auth/models/token.model';
import { OrdersService } from '../services/orders.service';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly orderService: OrdersService) {}

  @Roles(Role.CUSTOMER)
  @Get('my-orders')
  getOrders(@Req() req: Request) {
    const user = req.user as PayloadToken;
    return this.orderService.ordersByCustomer(user.sub);
  }
}
