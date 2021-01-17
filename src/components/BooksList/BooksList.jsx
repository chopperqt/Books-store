import { useSelector } from "react-redux";

const BooksList = ({}) => {

    const BooksStore = useSelector(state => state.books[0])
    console.log(BooksStore);
    return (
        <div>
            {BooksStore.map(item => <h3>{item.book_name}</h3>)}
        </div>
    );
}
 
export default BooksList;