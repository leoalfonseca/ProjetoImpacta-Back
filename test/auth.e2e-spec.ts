import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication System', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signup request', () => {
    const username = 'teste';

    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ username, password: '1234' })
      .expect(201)
      .then((res) => {
        const { id, username } = res.body;
        expect(id).toBeDefined();
        expect(username).toEqual(username);
      });
  });

  it('signup as a new user then get the currently logged in user', async () => {
    const username = 'teste';

    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ username, password: '1234' })
      .expect(201);

    const cookie = res.get('Set-Cookie');

    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .expect(200);

    expect(body.username).toEqual(username);
  });
});
