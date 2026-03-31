import { notFound } from "next/navigation";
import { getAdminPostById } from "@/queries/posts";
import { PostEditorShell } from "@/components/admin/PostEditorShell";

export default async function EditPostPage({
  params
}: {
  params: {
    id: string;
  };
}) {
  const post = await getAdminPostById(params.id);
  if (!post) notFound();

  return <PostEditorShell post={post} />;
}
