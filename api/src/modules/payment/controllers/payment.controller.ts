/* eslint-disable prettier/prettier */
import { Controller, Get, Logger } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';

@Controller('/payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  private readonly logger = new Logger(PaymentController.name);

  @Get()
  async getAllPayment() {
    const payment = await this.paymentService.getList();
    return payment;
  }
}
