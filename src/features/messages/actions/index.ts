"use server";

import { getCurrentUser } from "@/features/auth/actions";
import { inngest } from "@/features/inngest/client";
import { MessageRole, MessageType } from "@/generated/prisma/enums";
import { prisma } from "@/lib/db";

export const createMessage = async (value: string, projectId: string) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("unauthorized");
  }

  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
      userId: user.id,
    },
  });

  if (!project) {
    throw new Error("Project not found");
  }

  const newMessage = await prisma.message.create({
    data: {
      projectId,
      content: value,
      role: MessageRole.USER,
      type: MessageType.RESULT,
    },
  });

  await inngest.send({
    name: "code-agent/run",
    data: {
      value,
      projectId,
    },
  });

  return newMessage;
};

export const getMessages = async (projectId: string) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("No user found");
  }

  if (!projectId || projectId.trim().length === 0) {
    throw new Error("No project id provided");
  }

  return await prisma.message.findMany({
    where: {
      projectId,
    },
    orderBy: {
      createAt: "asc",
    },
    include: {
      fragments: true,
    },
  });
};
