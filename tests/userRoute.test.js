const { describe, expect, test, it, vi } = require('vitest');
const request = require('supertest');
const app = require('../app');
const  prisma  = vi.mock('../db'); // Assuming you named the mock file mockPrisma.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



describe('User Registration', () => {
  it('should register a new user', async () => {
    const newUser = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      company: 'Test Company',
      gender: 'Male'
    };

    prisma.user.create.mockResolvedValueOnce(newUser);

    const res = await request(app)
      .post('/api/users/register')
      .send(newUser);

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('User registered successfully');
    expect(res.body.user).toEqual(newUser);
  });

  
});

describe('User Login', () => {
  it('should log in an existing user', async () => {
    const existingUser = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      password: await bcrypt.hash('password123', 10),
      company: 'Test Company',
      gender: 'Male'
    };

    prisma.user.findUnique.mockResolvedValueOnce(existingUser);

    const res = await request(app)
      .post('/api/users/login')
      .send({ email: existingUser.email, password: 'password123' });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  
});


//getuserdetails
describe('Get User Profile', () => {
    it('should get the profile of an authenticated user', async () => {
      const authenticatedUser = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
        gender: 'Male'
      };
  
      prisma.user.findUnique.mockResolvedValueOnce(authenticatedUser);
  
      const token = jwt.sign({ id: authenticatedUser.id, email: authenticatedUser.email }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
  
      const res = await request(app)
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${token}`);
  
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(authenticatedUser);
    });
  
   
  });
