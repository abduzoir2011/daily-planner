import { z } from 'zod';

// ─────────────────────────────────────────────────────────────────────────────
// Auth Validators
// ─────────────────────────────────────────────────────────────────────────────

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required').min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z
  .object({
    displayName: z
      .string()
      .min(1, 'Name is required')
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be less than 50 characters'),
    email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const resetPasswordSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
});

// ─────────────────────────────────────────────────────────────────────────────
// Task Validators
// ─────────────────────────────────────────────────────────────────────────────

export const taskSchema = z.object({
  title: z
    .string()
    .min(1, 'Task title is required')
    .max(200, 'Title must be less than 200 characters'),
  description: z.string().max(2000, 'Description must be less than 2000 characters').optional(),
  status: z.enum(['backlog', 'todo', 'in-progress', 'done', 'cancelled']).default('todo'),
  priority: z.enum(['urgent', 'high', 'medium', 'low', 'none']).default('none'),
  dueDate: z.string().nullable().optional(),
  tags: z.array(z.string().max(30)).max(10, 'Maximum 10 tags allowed').default([]),
  projectId: z.string().nullable().optional(),
  timeEstimate: z.number().min(1).max(480).nullable().optional(),
});

export const projectSchema = z.object({
  name: z
    .string()
    .min(1, 'Project name is required')
    .max(100, 'Name must be less than 100 characters'),
  color: z.string().min(1, 'Please select a color'),
  icon: z.string().optional(),
});

// ─────────────────────────────────────────────────────────────────────────────
// Habit Validators
// ─────────────────────────────────────────────────────────────────────────────

export const habitSchema = z.object({
  title: z
    .string()
    .min(1, 'Habit title is required')
    .max(100, 'Title must be less than 100 characters'),
  description: z.string().max(500).optional(),
  frequency: z.enum(['daily', 'weekly']).default('daily'),
  color: z
    .enum(['violet', 'blue', 'cyan', 'green', 'yellow', 'orange', 'red', 'pink'])
    .default('violet'),
  icon: z.string().optional(),
  targetDays: z.array(z.number().min(0).max(6)).optional(),
});

// ─────────────────────────────────────────────────────────────────────────────
// Timer Config Validator
// ─────────────────────────────────────────────────────────────────────────────

export const timerConfigSchema = z.object({
  workDuration: z.number().min(1).max(120).default(25),
  shortBreakDuration: z.number().min(1).max(60).default(5),
  longBreakDuration: z.number().min(1).max(120).default(15),
  sessionsBeforeLongBreak: z.number().min(1).max(10).default(4),
  autoStartBreaks: z.boolean().default(false),
  autoStartWork: z.boolean().default(false),
  tickingSound: z.boolean().default(false),
  notificationsEnabled: z.boolean().default(true),
});

// Inferred types from schemas
export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
export type TaskFormValues = z.infer<typeof taskSchema>;
export type ProjectFormValues = z.infer<typeof projectSchema>;
export type HabitFormValues = z.infer<typeof habitSchema>;
export type TimerConfigFormValues = z.infer<typeof timerConfigSchema>;
