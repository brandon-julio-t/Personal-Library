import BookDTO from "../../domain-entities/dtos/book-dto";
import BookDto from "../../domain-entities/dtos/book-dto";
import BookDTOFactory from "../../domain-entities/factories/book-dto-factory/book-dto-factory";
import bookDtoFactoryInput from "../../domain-entities/factories/book-dto-factory/book-dto-factory-input";

export default class BookDTOFactoryImpl extends BookDTOFactory {
  create(data: bookDtoFactoryInput): BookDto {
    const { book, comments } = data;

    const dto = new BookDTO();
    Object.assign(dto, book);
    dto.comments = comments.map((x) => x.body);
    dto.commentcount = comments.length;

    return dto;
  }
}
