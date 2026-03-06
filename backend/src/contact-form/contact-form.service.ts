import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactFormSubmissionDto, UpdateContactStatusDto } from './dto/contact-form.dto';

@Injectable()
export class ContactFormService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateContactFormSubmissionDto) {
    return this.prisma.contactFormSubmission.create({
      data,
    });
  }

  async findAll(params: { page?: number; limit?: number; status?: string; topic?: string }) {
    const { page = 1, limit = 50, status, topic } = params;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (status) where.status = status;
    if (topic) where.topic = topic;

    const [data, total] = await Promise.all([
      this.prisma.contactFormSubmission.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.contactFormSubmission.count({ where }),
    ]);

    return {
      data,
      meta: {
        page,
        perPage: limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const submission = await this.prisma.contactFormSubmission.findUnique({
      where: { id },
    });

    if (!submission) {
      throw new NotFoundException(`Submission #${id} not found`);
    }

    return submission;
  }

  async updateStatus(id: number, data: UpdateContactStatusDto) {
    await this.findOne(id); // Check if exists
    return this.prisma.contactFormSubmission.update({
      where: { id },
      data: { status: data.status },
    });
  }

  async updateNotes(id: number, notes: string) {
    await this.findOne(id);
    return this.prisma.contactFormSubmission.update({
      where: { id },
      data: { notes },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.contactFormSubmission.delete({
      where: { id },
    });
  }

  async getStats() {
    const total = await this.prisma.contactFormSubmission.count();
    const newCount = await this.prisma.contactFormSubmission.count({ where: { status: 'new' } });
    const inProgressCount = await this.prisma.contactFormSubmission.count({ where: { status: 'in_progress' } });
    const completedCount = await this.prisma.contactFormSubmission.count({ where: { status: 'completed' } });

    return {
      total,
      new: newCount,
      inProgress: inProgressCount,
      completed: completedCount,
    };
  }
}
