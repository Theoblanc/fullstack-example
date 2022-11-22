import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowerEntity } from './entities/follower.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FollowerEntity])],
  providers: [],
  exports: [],
})
export class FollowerModule {}
