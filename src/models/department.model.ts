import { ObjectId } from 'mongodb';

export interface Department {
  _id?: ObjectId | string;
  name: string;
  description?: string;
  managerId?: ObjectId | string;
  budget?: number;
  location?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: ObjectId | string;
}

export interface CreateDepartmentInput {
  name: string;
  description?: string;
  managerId?: string;
  budget?: number;
  location?: string;
  isActive?: boolean;
}

export interface UpdateDepartmentInput {
  name?: string;
  description?: string;
  managerId?: string;
  budget?: number;
  location?: string;
  isActive?: boolean;
}
