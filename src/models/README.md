# Models

این پوشه شامل تمام مدل‌های دیتابیس پروژه است.

## مدل‌های موجود

### 1. User (`user.model.ts`)
مدل کاربران سیستم
- **فیلدها:**
  - `email`: ایمیل کاربر (unique)
  - `password`: رمز عبور (hashed)
  - `role`: نقش کاربر (admin, manager, user)
  - `name`: نام کاربر
  - `phone`: شماره تلفن
  - `avatar`: آواتار کاربر
  - `isActive`: وضعیت فعال/غیرفعال

### 2. Employee (`employee.model.ts`)
مدل کارمندان
- **فیلدها:**
  - `firstName`: نام
  - `lastName`: نام خانوادگی
  - `email`: ایمیل
  - `phone`: شماره تلفن
  - `departmentId`: شناسه دپارتمان
  - `position`: موقعیت شغلی
  - `salary`: حقوق
  - `hireDate`: تاریخ استخدام
  - `status`: وضعیت (active, inactive, terminated)
  - `address`: آدرس
  - `emergencyContact`: اطلاعات تماس اضطراری

### 3. Department (`department.model.ts`)
مدل دپارتمان‌ها
- **فیلدها:**
  - `name`: نام دپارتمان
  - `description`: توضیحات
  - `managerId`: شناسه مدیر
  - `budget`: بودجه
  - `location`: مکان
  - `isActive`: وضعیت فعال/غیرفعال

## استفاده

```typescript
import { User, Employee, Department } from '@/models';
import { getUsersCollection, getEmployeesCollection } from '@/lib/db';

// استفاده در API routes
const usersCollection = await getUsersCollection();
const user = await usersCollection.findOne({ email: 'test@example.com' });
```
