import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import uploadConfig from '@config/upload';

import { Exclude, Expose } from 'class-transformer';

  @Entity('users')
  class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    avatar: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Expose({ name: 'avatar_url'})
    getAvatarUrl(): string | null{
        const defaultAvatar = 'https://www.minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg';
        if (!this.avatar){
            return defaultAvatar;
        }

        switch (uploadConfig.driver) {
            case 'disk':
                return `${process.env.APP_API_URL}/files/${this.avatar}`;
            case 's3':
                return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`
             default:
             return defaultAvatar;
        }
    }
  }

  export default User;
