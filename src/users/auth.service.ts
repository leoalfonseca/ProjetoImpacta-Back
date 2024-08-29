import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import * as CryptoJS from 'crypto-js';
import * as jwt from 'jsonwebtoken';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(
    email: string,
    password: string,
    username: string,
    name: string,
  ) {
    // Verifica se o email está em uso
    const users = await this.usersService.find(email);
    if (users.length) {
      throw new BadRequestException('Email em uso');
    }

    // Gera o salt
    const salt = randomBytes(8).toString('hex');

    // Cria hash com a senha e o salt
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // Junta o salt e o hash
    const result = salt + '.' + hash.toString('hex');

    // Cria novo usuário e salva
    const user = await this.usersService.create(email, result, username, name);

    return user;
  }

  async signin(encryptedUsername: string, encryptedPassword: string) {
    const secretKey = process.env.SECRET_KEY || '';

    const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
    const bytes2 = CryptoJS.AES.decrypt(encryptedUsername, secretKey);
    const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
    const decryptedUsername = bytes2.toString(CryptoJS.enc.Utf8);

    const [user] = await this.usersService.find(decryptedUsername);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (!decryptedPassword) {
      throw new BadRequestException('Desencriptação falhou');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(decryptedPassword, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Senha Inválida');
    }

    // Gera um token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: '24h',
      },
    );

    return { token };
  }
}
