import { v4 } from "uuid";
import CommentFactory from "../../domain-entities/factories/comment-factory/comment-factory";
import commentFactoryInput from "../../domain-entities/factories/comment-factory/comment-factory-input";
import Comment from "../../domain-entities/models/comment";

export default class CommentFactoryImpl extends CommentFactory {
  create(data: commentFactoryInput): Comment {
    const entity = new Comment();
    Object.assign(entity, data);
    entity.setPrimaryKey(entity.getPrimaryKey() || v4());
    return entity;
  }
}
