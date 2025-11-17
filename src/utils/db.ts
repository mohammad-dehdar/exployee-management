import clientPromise from './mongodb';
import { Db, Collection } from 'mongodb';
import { User, Employee, Department, EmployeeProfile } from '@/models';

export async function getDb(): Promise<Db> {
  const client = await clientPromise;
  return client.db('employee-app');
}

export async function getUsersCollection(): Promise<Collection<User>> {
  const db = await getDb();
  return db.collection<User>('users');
}

export async function getEmployeesCollection(): Promise<Collection<Employee>> {
  const db = await getDb();
  return db.collection<Employee>('employees');
}

export async function getDepartmentsCollection(): Promise<Collection<Department>> {
  const db = await getDb();
  return db.collection<Department>('departments');
}

export async function getEmployeeProfilesCollection(): Promise<Collection<EmployeeProfile>> {
  const db = await getDb();
  return db.collection<EmployeeProfile>('employee_profiles');
}
