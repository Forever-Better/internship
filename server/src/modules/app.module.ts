import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import databaseConfig from 'src/config/database.config';
import appConfig from 'src/config/app.config';
import authConfig from 'src/config/auth.config';
import fileConfig from 'src/config/file.config';
import { TypeOrmConfigService } from 'src/database/typeorm-config.service';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FollowerModule } from './follower/follower.module';
import { LikeModule } from './like/like.module';
import { PostModule } from './post/post.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig, authConfig, fileConfig],
      envFilePath: [`.env.${process.env.NODE_ENV || 'production'}`],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
    AuthModule,
    FileModule,
    FollowerModule,
    LikeModule,
    PostModule,
    UserModule,
  ],
})
export class AppModule {}
