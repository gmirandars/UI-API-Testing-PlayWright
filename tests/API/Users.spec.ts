// tests/specs/users.api.spec.ts

import { test, expect } from '@playwright/test';
import {
  CreateUserResponse,
  GetListUsersResponse,
  GetSingleUserResponse,
  UpdateUserResponse,
} from '../../src/interfaces/API';
import { UserBuilder } from '../../src/builders/API/UserBuilder';
import { faker } from '@faker-js/faker';

test.describe('API Tests para /api/users', () => {
  const usersEndpoint = '/api/users';

  test('GET /users/{id} - should return a existent user', async ({ request }) => {
    const existentUser = UserBuilder.buildExistentUser();
    const response = await request.get(`${usersEndpoint}/${existentUser.id}`);
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    const responseBody: GetSingleUserResponse = await response.json();
    expect(responseBody.data.id).toBe(existentUser.id);
    expect(responseBody.data.email).toBe(existentUser.email);
    expect(responseBody.data.first_name).toBe(existentUser.first_name);
  });

  test('GET /users/{id} - should return status code 404 when user not exists', async ({
    request,
  }) => {
    const userId = 9999999;
    const response = await request.get(`${usersEndpoint}/${userId}`);
    expect(response.status()).toBe(404);
    expect(response.ok()).toBeFalsy();
  });

  test('GET /users?page=2 - should return a list of user for the requested page', async ({
    request,
  }) => {
    const page = 2;
    const response = await request.get(usersEndpoint, {
      params: {
        page: page,
      },
    });
    expect(response.status()).toBe(200);
    const responseBody: GetListUsersResponse = await response.json();
    expect(responseBody.page).toBe(page);
    expect(responseBody.data.length).toBeGreaterThan(0);
    expect(Array.isArray(responseBody.data)).toBeTruthy();
  });

  test('POST /users - should create a new user', async ({ request }) => {
    const payload = UserBuilder.buildUserPayload();
    const response = await request.post(usersEndpoint, {
      data: payload,
    });
    expect(response.status()).toBe(201);
    const responseBody: CreateUserResponse = await response.json();
    expect(responseBody.name).toBe(payload.name);
    expect(responseBody.job).toBe(payload.job);
    expect(responseBody.id).toBeDefined();
    expect(responseBody.createdAt).toBeDefined();
  });

  test('PUT /users/{id} - should full update a existent user', async ({ request }) => {
    const existentUser = UserBuilder.buildExistentUser();
    const payload = UserBuilder.buildUserPayload();
    const response = await request.put(`${usersEndpoint}/${existentUser.id}`, {
      data: payload,
    });
    expect(response.status()).toBe(200);
    const responseBody: UpdateUserResponse = await response.json();
    expect(responseBody.name).toBe(payload.name);
    expect(responseBody.job).toBe(payload.job);
    expect(responseBody.updatedAt).toBeDefined();
  });

  test('PATCH /users/{id} - should partialy update a existent user', async ({ request }) => {
    const existentUser = UserBuilder.buildExistentUser();
    const partialPayload = { job: faker.person.jobTitle };
    const response = await request.patch(`${usersEndpoint}/${existentUser.id}`, {
      data: partialPayload,
    });
    expect(response.status()).toBe(200);
    const responseBody: UpdateUserResponse = await response.json();
    expect(responseBody.job).toBe(partialPayload.job);
    expect(responseBody.updatedAt).toBeDefined();
  });

  test('DELETE /users/{id} - should delete a existent user', async ({ request }) => {
    const existentUser = UserBuilder.buildExistentUser();
    const response = await request.delete(`${usersEndpoint}/${existentUser.id}`);
    expect(response.status()).toBe(204);
    expect(await response.body()).toHaveLength(0);
  });
});
