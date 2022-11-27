import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('status')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'view application status' })
  getAppStatus(@Req() req: Request) {
    const baseUrl = req.protocol + '://' + req.get('host');

    return this.appService.getAppStatus(baseUrl);
  }
}