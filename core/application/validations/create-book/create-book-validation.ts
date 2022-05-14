import Validation from "../../contracts/common/validation";
import CreateBookValidationInput from "./create-book-validation-input";

export default class CreateBookValidation extends Validation<CreateBookValidationInput> {
  validate(payload: CreateBookValidationInput): void {
    const { title } = payload;
    if (!title) {
      throw new Error("missing required field title");
    }
  }
}
