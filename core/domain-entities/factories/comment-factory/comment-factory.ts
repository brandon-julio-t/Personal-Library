import Factory from "../../../application/contracts/common/factory";
import Comment from "../../models/comment";
import CommentFactoryInput from "./comment-factory-input";

export default abstract class CommentFactory implements Factory<CommentFactoryInput, Comment> {
    abstract create(data: CommentFactoryInput): Comment;
}