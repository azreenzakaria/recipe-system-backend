import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow('MONGODB_URI'),
        dbName: configService.getOrThrow('DATABASE_NAME'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
