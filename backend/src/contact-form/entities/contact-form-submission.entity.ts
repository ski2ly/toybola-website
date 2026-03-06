// This file is not needed as we are using Prisma instead of TypeORM
// The entity is defined in prisma/schema.prisma

export class ContactFormSubmission {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  topic: string;
  message: string | null;
  status: string;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}
