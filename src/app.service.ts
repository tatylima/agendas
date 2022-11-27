import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAppStatus(baseUrl: string) {
    return {
      status: 'App running! 👨‍🚀',
      docs: baseUrl + '/docs',
    };
  }
}