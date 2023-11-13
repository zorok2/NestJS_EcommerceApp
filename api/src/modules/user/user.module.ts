/* eslint-disable prettier/prettier */
import { OrderModule } from './../order/order.module';
import { ProductModule } from './../product/product.module';
import { PassportModule } from '@nestjs/passport';
import { Module, forwardRef } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address, Permission, User } from '../../entities/user/user.entity';
import { ProxyModule } from 'src/lib/proxy/proxy.module';
import { UserRepositories as UserRepositories } from './repositories';
import { UserServices } from './services';
import { UserCommands } from './commands';
import { UtilsModule } from 'src/lib/utils/utils.module';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';
import { UserControllers } from './controllers';
import { SharedModule } from 'src/shared/shared.module';
import { PermissionRepository } from './repositories/permission.repository';
import { JwtModule } from '@nestjs/jwt';
import { UserQueryHandlers } from './queries';
import { JWTService } from './services/jwt.service';
import { Review } from 'src/entities/user/review.entity';
import { ChatRepository } from '../chat/chat.repository';
import { Chat } from 'src/entities/user/chat.entity';
@Module({
  imports: [
    // PassportModule.register({
    //   defaultStrategy: 'jwt',
    //   property: 'user',
    //   session: false,
    // }),
    JwtModule.register({
      secret:
        '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCzlNRm65a5NRpc\n3yskSaY3KIeYnf0ThHBel15yluuwWOKbeWZoIkkeeIzmik/twb2kkaZTlq1UTQew\nEW6tmm5/carceexiw5Yb8lDooKjn3R+qwvaKqxCND5rWxfkaQbO4XrVpVqtMG+ub\nqIZ/aTa30j6+DvQDyXKb84zt0tHWh0FOe3K+pVcytEMDk1oJDimSyYMxo2N9kIAw\n+38Z5QzVy1s3CQppfPoYVBclsP360QBHPJMVNevBtEaGzeUUUPMw1CK+UtDABG4q\nH4gY03yb+QzrmgZVrt2np1aXqXchiUmgPfN3cNCaiLBzKSCQc3457ife3aq+oBw9\ndW8Oc+kJAgMBAAECggEAHpr+kRTVIPbzKYFST7KqnItwgproawdfBEv9aX+dpvYb\nFr67rIMtXX9TmiXX5fAnMzEsfOH4491l8kSiTX18mAVGBqHT3ugxAM3NKrxY1P1b\nXIWyMWNipHvUmoZuhCJO8BzaA5wlAQlgH+z6kSPcEruG/Gq9fRi7yubY7Z5Iq2wj\nG+/1ZHoVa6os6Ks962/+LZT7V4oN82fBT/+MCga60p4eytuJ3tRToC8mvEIjua+n\nu5MUdK5HyRLpdfi70lkCiWxHjBObw4moCIFN6gZpbkf4j6oW0CY46BNCDbDz5x/8\niUI7IYVbcKDnNr6N7P7AmivxPSJtXz20CtisfRCZhQKBgQC1CohrQksfhJ3E/H6o\nFsRoVhm1U9LuUaJtsVjzq+n1kCNq0V89QalTqlgusgtkZJihXQK3g3CIFyqgmahg\nFcRQqX/bGBHBqzxhsehbrg5xp767BsMXeF+h0hFKrynVLLj6bjfuRlE5cU8reWah\ns3ehfeagytJFImn+yxGRZioYpQKBgQD975FKXjUT76vjrQ8OAyLojIrV+VULeIwL\nOiOGx+hD+benH0Yd5QEnORV4sg+j2PdXt/AclnJytfbsrXP07DG5nc0DFOQ4FmqU\nO6FKIBmf5Uq6gmxPNZLqWL4RV2claCfgpXLXcYGTHbAiaQNrIjW3S9oRV4R0cPz2\ni2tqg099lQKBgQCxzmx5W5zIkckaJRqIIAQ6rQWGz5MEuWyb62h/ucKIiU4fpQ6y\n7QBOyajeA8OokBxPrzfx4MfvAUG+heuWowoyZqbKGfOmkHU3RjH9iQ9qlOOAcH2/\nWVwjZFvTTAH7+naajxGjlbBEiILHIe6otciy9SJDna+ycsBDnFHeycZieQKBgQCZ\nTGMdzjmky2+thvAruWD9mrrF6juZLTD+Jh8EYvKo9rwUPCEMMw+7Kg74SiZ+96B6\naCSgXYLCFW/3+c6i8WQjdkwprBcKdR3qVwVLxo0xpi6y4cGZH/KNXv1/YpB2WKaa\nS8dEoNVkhuuqGlNh/ckH2tbO2VKxKPTNseUq7BK08QKBgQCpxW4R2kdEBgw6Co1P\nMonOGvN76KaLtw63RVlQ6pInJnTlKPG9XtUEK7PbaU1MXRnNynXhzLSwolBUrNBY\nNvwaOrhtC2/1zrGL7qDanb6zUqa6Z/ZYFHmht9OiNgEopokBecsO9ikSYK/dta5I\n5HByyTJjNHRRm8RMLuTptN4Biw==\n-----END PRIVATE KEY-----\n',
      signOptions: { expiresIn: '1d', algorithm: 'RS256' },
    }),
    forwardRef(() => ProductModule),
    forwardRef(() => OrderModule),
    UtilsModule,
    JwtModule,
    UserModule,
    ProxyModule,
    CqrsModule,
    SharedModule,
    TypeOrmModule.forFeature([User, Address, Permission, Review, Chat]),
  ],
  providers: [
    ...UserRepositories,
    ...UserServices,
    ...UserCommands,
    ...UserQueryHandlers,
  ],
  controllers: [...UserControllers],
  exports: [
    UserRepository,
    UserService,
    PermissionRepository,
    JWTService,
    ChatRepository,
  ],
})
export class UserModule {}
