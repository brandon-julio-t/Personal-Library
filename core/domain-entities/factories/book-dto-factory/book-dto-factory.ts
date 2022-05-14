import Factory from "../../../application/contracts/common/factory";
import BookDTO from "../../dtos/book-dto";
import BookDTOFactoryInput from "./book-dto-factory-input";

export default abstract class BookDTOFactory
  implements Factory<BookDTOFactoryInput, BookDTO>
{
  abstract create(data: BookDTOFactoryInput): BookDTO;
}
