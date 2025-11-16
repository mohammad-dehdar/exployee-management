import { ObjectId } from 'mongodb';

export interface Employee {
  _id?: ObjectId | string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  departmentId?: ObjectId | string;
  position?: string;
  salary?: number;
  hireDate?: Date;
  status?: 'active' | 'inactive' | 'terminated';
  avatar?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  emergencyContact?: {
    name?: string;
    relationship?: string;
    phone?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: ObjectId | string;
}

export interface CreateEmployeeInput {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  departmentId?: string;
  position?: string;
  salary?: number;
  hireDate?: Date;
  status?: 'active' | 'inactive' | 'terminated';
  avatar?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  emergencyContact?: {
    name?: string;
    relationship?: string;
    phone?: string;
  };
}

export interface UpdateEmployeeInput {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  departmentId?: string;
  position?: string;
  salary?: number;
  hireDate?: Date;
  status?: 'active' | 'inactive' | 'terminated';
  avatar?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  emergencyContact?: {
    name?: string;
    relationship?: string;
    phone?: string;
  };
}
