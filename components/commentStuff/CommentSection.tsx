import { getComments } from "@/lib/comment-actions";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

export default async function CommentSection() {
  const comments = await getComments();

  return (
    <section className="w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <CommentList comments={comments} />
      <CommentForm />
    </section>
  );
}
