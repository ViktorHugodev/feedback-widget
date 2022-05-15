import { prisma } from "../../prisma";
import { FeedbackRepositoriesTypes, FeedbackRepository } from "../feedback-repository";


export class PrismaFeedbacksRepository implements FeedbackRepository {
 async create({type,comment, screenshot}: FeedbackRepositoriesTypes) {
    await prisma.feedback.create({
      data:{
        type,
        comment,
        screenshot,
      }
    })
  }
}