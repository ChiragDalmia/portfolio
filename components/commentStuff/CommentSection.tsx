import { getComments, type Comment } from "@/lib/comment-actions";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

export default async function CommentSection() {
  const comments: Comment[] = await getComments();

  return (
    <section className="min-h-fit">
      <CommentList comments={comments} />
      <CommentForm />
    </section>
  );
}
