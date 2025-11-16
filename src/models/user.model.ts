import { ObjectId } from 'mongodb';

export interface User {
  _id?: ObjectId | string;
  email: string;
  password: string;
  role?: 'admin' | 'manager' | 'user';
  name?: string;
  phone?: string;
  avatar?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateUserInput {
  email: string;
  password: string;
  role?: 'admin' | 'manager' | 'user';
  name?: string;
  phone?: string;
}

export interface UpdateUserInput {
  email?: string;
  name?: string;
  phone?: string;
  role?: 'admin' | 'manager' | 'user';
  avatar?: string;
  isActive?: boolean;
}
