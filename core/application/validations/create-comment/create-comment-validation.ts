import Validation from "../../contracts/common/validation";
import CreateCommentValidationInput from "./create-comment-validation-input";

export default class CreateCommentValidation extends Validation<CreateCommentValidationInput> {
  validate(payload: CreateCommentValidationInput): void {
    const { comment } = payload;
    if (!comment) {
      throw new Error("missing required field comment");
    }
  }
}
