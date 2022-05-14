import Interactor from "../../contracts/common/interactor";
import Validation from "../../contracts/common/validation";
import BookFactory from "../../../domain-entities/factories/book-factory/book-factory";
import BookRepository from "../../../domain-entities/repositories/book-repository";
import CreateBookValidationInput from "../../validations/create-book/create-book-validation-input";
import CreateBookInteractorInput from "./create-book-interactor-input";
import BookDTO from "../../../domain-entities/dtos/book-dto";
import BookDTOFactory from "../../../domain-entities/factories/book-dto-factory/book-dto-factory";

export default class CreateBookInteractor extends Interactor<
  CreateBookInteractorInput,
  BookDTO
> {
  constructor(
    private validation: Validation<CreateBookValidationInput>,
    private bookRepository: BookRepository,
    private bookFactory: BookFactory,
    private bookDtoFactory: BookDTOFactory
  ) {
    super();
  }

  execute(payload: CreateBookInteractorInput): BookDTO {
    const { title } = payload;

    this.validation.validate({ title });

    const book = this.bookRepository.save(this.bookFactory.create({ title }));

    return this.bookDtoFactory.create({ book, comments: [] });
  }
}
