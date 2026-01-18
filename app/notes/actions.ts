"use server";

import  prisma  from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createNote(formData: FormData) {
  const title = formData.get("title");
  const content = formData.get("content");

  if (typeof title !== "string" || typeof content !== "string") {
    throw new Error("Invalid form data");
  }

  if (!title.trim()) {
    throw new Error("Title is required");
  }

  await prisma.notes.create({
    data: {
      title,
      content,
    },
  });

  // /notes を再検証 → 一覧が更新される
  revalidatePath("/notes");
}
