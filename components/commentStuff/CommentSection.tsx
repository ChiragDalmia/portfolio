import { getComments, type Comment } from "@/lib/comment-actions";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

export default async function CommentSection() {
  const comments: Comment[] = await getComments();

  return (
    <section className="w-full max-w-2xl mx-auto">
      <CommentList comments={comments} />
      <CommentForm />
    </section>
  );
}
