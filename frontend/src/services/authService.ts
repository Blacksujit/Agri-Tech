import { User, UserWithoutPassword, LoginRequest, SignupRequest, AuthResponse, JWTPayload } from '@/types/auth';
import { generateToken } from '@/lib/jwt';
import { env } from '@/lib/env';

export class AuthService {
  static async signup(data: SignupRequest): Promise<AuthResponse> {
    const response = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    });

    if (!response.ok) {
      throw new Error('Signup failed');
    }

    // Generate JWT token for frontend
    const token = generateToken({
      userId: data.email,
      email: data.email,
      name: data.name,
    });

    return {
      user: {
        _id: data.email,
        name: data.name,
        email: data.email,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      token,
    };
  }

  static async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        email: data.email,
        password: data.password,
      }),
    });

    if (!response.ok) {
      throw new Error('Invalid email or password');
    }

    // Generate JWT token for frontend
    const token = generateToken({
      userId: data.email,
      email: data.email,
      name: data.email,
    });

    return {
      user: {
        _id: data.email,
        name: data.email,
        email: data.email,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      token,
    };
  }

  static async getUserById(userId: string): Promise<UserWithoutPassword | null> {
    // For Flask backend, userId is the email
    try {
      const response = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/api/user/${userId}`);
      if (!response.ok) {
        return null;
      }
      const user = await response.json();
      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }

  static async updateUser(userId: string, data: Partial<User>): Promise<UserWithoutPassword | null> {
    try {
      const response = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/api/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        return null;
      }
      const user = await response.json();
      return user;
    } catch (error) {
      console.error('Error updating user:', error);
      return null;
    }
  }
}
