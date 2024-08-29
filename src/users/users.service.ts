import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string, username: string, name: string) {
    const user = this.repo.create({ email, password, username, name });
    return this.repo.save(user);
  }

  async findOne(id: string): Promise<User | null> {
    if (!id) {
      return null;
    }
    return this.repo.findOneBy({ id });
  }

  async find(username: string): Promise<User[]> {
    return this.repo.find({ where: { username } });
  }

  async update(id: string, attrs: Partial<User>): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    await this.repo.remove(user);
  }
}
