import { z } from "zod";

// Indian mobile regex: optional +91 or 0 prefix followed by 10 digits starting with 6-9
const indianMobileRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;

export const leadFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(80, "Full name cannot exceed 80 characters"),
  mobile: z
    .string()
    .trim()
    .regex(indianMobileRegex, "Please enter a valid 10-digit Indian mobile number"),
  email: z
    .string()
    .trim()
    .email("Please provide a valid email address")
    .optional()
    .or(z.literal("")),
  loanCategory: z.enum(
    [
      "Personal Loan",
      "Credit Card Debt",
      "Business Loan",
      "Multiple Loans / Mixed",
      "Other",
    ],
    {
      errorMap: () => ({ message: "Please select your loan category" }),
    }
  ),
  outstandingAmount: z.string().optional().or(z.literal("")),
  preferredTime: z.string().optional().or(z.literal("")),
  description: z
    .string()
    .trim()
    .max(1000, "Description cannot exceed 1000 characters")
    .optional()
    .or(z.literal("")),
  consentGiven: z.literal(true, {
    errorMap: () => ({
      message: "You must consent to receive communication regarding your enquiry",
    }),
  }),
  source: z.string().optional().default("website_form"),
});

export const quickCallbackSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(80, "Full name cannot exceed 80 characters"),
  mobile: z
    .string()
    .trim()
    .regex(indianMobileRegex, "Please enter a valid 10-digit Indian mobile number"),
  loanCategory: z.string().min(1, "Please select a loan type"),
  consentGiven: z.literal(true, {
    errorMap: () => ({ message: "Please agree to receive a callback" }),
  }),
  source: z.string().optional().default("callback_modal"),
});

export const loginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const setupAdminSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain uppercase, lowercase, and numeric characters"
    ),
  setupKey: z.string().min(1, "Setup authorization key is required"),
});

export const leadStatusUpdateSchema = z.object({
  status: z.enum([
    "NEW",
    "CONTACTED",
    "FOLLOW_UP",
    "IN_PROGRESS",
    "CONVERTED",
    "CLOSED",
  ]),
  assignedTo: z.string().optional().nullable(),
  followUpDate: z.string().optional().nullable(),
  note: z.string().trim().optional(),
});

export const blogPostSchema = z.object({
  title: z.string().trim().min(5, "Title must be at least 5 characters"),
  slug: z
    .string()
    .trim()
    .min(3, "Slug must be at least 3 characters")
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  excerpt: z.string().trim().min(10, "Excerpt must be at least 10 characters"),
  content: z.string().trim().min(30, "Content must be at least 30 characters"),
  category: z.string().min(1, "Category is required"),
  featuredImage: z.string().optional().nullable(),
  imageAlt: z.string().optional().nullable(),
  author: z.string().default("Settle Loan Expert Editorial Team"),
  published: z.boolean().default(true),
  metaTitle: z.string().optional().nullable(),
  metaDescription: z.string().optional().nullable(),
  readTime: z.string().optional().default("5 min read"),
});

export const faqSchema = z.object({
  question: z.string().trim().min(5, "Question must be at least 5 characters"),
  answer: z.string().trim().min(10, "Answer must be at least 10 characters"),
  category: z.string().default("General"),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true),
});
