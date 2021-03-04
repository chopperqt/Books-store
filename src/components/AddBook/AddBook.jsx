import React , {useState, useEffect, useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios'
import './style.css';
import {
    Input,
    FormGroup,
    FormFeedback,
    Label,
    Form,
    PopoverHeader, 
    PopoverBody, 
    UncontrolledPopover
} from 'reactstrap';
import {
    WrapperColor
} from '../../components';
import actionMenu from '../../redux/Menu/actions';
import actionAuthors from '../../redux/Authors/actions';
const AddBook = () => {
    const dispatch = useDispatch();
    //actions
    const {
        actionOpenFullMenu
    } = actionMenu
    
    const {
        actionsGetAuthors,
        actionsGetSearchAuthor
    } = actionAuthors

    //redux store 
    const authorsStore = useSelector(state => state.authors.authors);
    const searchAuthorStore = useSelector(state => state.authors.searchAuthor);

    //validation status
    const [validName, setValidName] = useState(false);
    const [validPages, setValidPages] = useState(false);
    const [validAge, setValidAge] = useState(false);
    const [validPrice, setValidPrice] = useState(false);
    const [validBestseller, setValidBestseller] = useState(false);


    const [valueName, setValueName] = useState('');
    const [valueAge, setValueAge] = useState('');
    const [valuePrice, setValuePrice] = useState(0);
    const [valuePages, setValuePages] = useState(0);
    const [valueBestseller, setValueBestseller] = useState('');
    const [valueAuthors, setValueAuthors] = useState([]);
    const [valueAuthorsText, setValueAuthorsText] = useState('');
    const [valueGenres, setValueGenres] = useState([]);
    const [valueGenresText, setValueGenresText] = useState('');

    const validationProcess = () => {
        let age = false;
        let name = false;
        let price = false;
        let bestseller = false;
        let pages = false;

        //valid name
        if (valueName.length < 3) {
            setValidName(() => true)
            name = false
        }else {
            setValidName(() => false)
            name = true
        }

        //valid age
        if (valueAge.length <= 0) {
            setValidAge(() => true)
            age = false
        }else {
            setValidAge(() => false)
            age = true
        }

        //valid price
        if (valuePrice <= 0) {
            setValidPrice(() => true);
            price = false
        }else {
            setValidPrice(() => false);
            price = true
        }
        
        //valid pages
        if (valuePages <= 0) {
            setValidPages(() => true);
            pages = false
        }else {
            setValidPages(() => false);
            pages = true 
        }

        //valid bestseller
        if (valueBestseller.length <= 0) {
            setValidBestseller(() => true);
            bestseller = false
        }else {
            setValidBestseller(() => false);
            bestseller = true
        }

        sendData(age,bestseller,name,price,pages)

    }

    const sendData = (age,bestseller,name,price,pages) => {
        if (age === true && bestseller === true && name === true && price === true && pages === true) {
            console.log("Да ваши данные успешно отправлены")
        }else {
            console.log('Заполните все данные верно')
        }
    }

    //searching
    const searchData = e => {
        dispatch(actionsGetSearchAuthor(e))
    }

    useMemo(() => {
        if (valueAuthorsText.length !== 0) {
            dispatch(actionsGetSearchAuthor(valueAuthorsText))
        }
    }, [valueAuthorsText])

    //popover
    const [popupAuthors, setPopupAuthors] = useState(false);
    const [popupGenres, setPopupGenres] = useState(false);
    const popupAuthorsToggle = e => {
        if (e.target.value.length !== 0) {
            setPopupAuthors(true)
        }else {
            setPopupAuthors(false)
        }
    } 
    const popupGenresToggle = e => {
        if (e.target.value.length !== 0) {
            setPopupGenres(true)
        }else {
            setPopupGenres(false)
        }
    }


    //add/remove author/genres to local state
    const clickAuthor = (data) => {
        let filterValueAuthor = valueAuthors.filter(item => item.author_firstname === data);

        if (filterValueAuthor.length === 0) {
            console.log('in')
            let filterData = authorsStore.filter(author => author.author_firstname === data);
            setValueAuthors(prev => [...prev, filterData[0]]);
        }
        setPopupAuthors(false);
        setValueAuthorsText('')
    }

    const clickRemoveAuthor = (data) => {
        let filterAuthor = valueAuthors.filter(item => item.author_firstname !== data);
        setValueAuthors(filterAuthor);
        setPopupAuthors(false)
    }
    
    const changeGenres = (e) => {
        let filterGenres = valueGenres.filter(item => item === e.target.value);

        if (filterGenres.length === 0) {
            setValueGenres(prev => [...prev, e.target.value])
        }
        
    }

    const clickRemoveGenres = (data) => {
        let  filterGenres = valueGenres.filter(item => item !== data)

        setValueGenres(filterGenres)
    }
    //fetch data
    function fetchAuthors() {
        axios.get("https://api.allorigins.win/raw?url=http://test.zrkcompany.ru/authors.json")
        .then(response => {
          dispatch(actionsGetAuthors(response.data))
        })
        .catch(function(error) {
          console.log(error)
        })
      }

    //initial render page
    useEffect(() => {
        dispatch(actionOpenFullMenu(0));

        if (authorsStore.length === 0) {
            fetchAuthors()
        }
    },[])

    return (
        <div>
            <WrapperColor>
                <div className="col-md-12 col-sm-12 col-lg-12 col-xs-12 p-4 d-md-flex d-lf-flex column-md-count-2 column-lg-count-1">
                    <Form className="col-md-6 col-sm-12 col-lg p-3">
                        <FormGroup>
                            <Label>Name<span className="text-danger">*</span></Label>
                            <Input className="mt-2" invalid={validName} onChange={(e) => {
                                setValueName(e.target.value)
                                setValidName(false)
                            }} value={valueName} />
                            <FormFeedback>You haven't entered anything!</FormFeedback>
                        </FormGroup>
                        <FormGroup className="mt-2">
                            <Label>Age limit<span className="text-danger">*</span> {valueAge}</Label>
                            <Input className="mt-2" type="select" invalid={validAge} name="select" onChange={e => {
                                    setValueAge(e.target.value)
                                    setValidAge(false)
                                }} placeholder="Choise">
                                <option value="" selected disabled>Please select</option>
                                <option>2+</option>
                                <option>4+</option>
                                <option>6+</option>
                                <option>12+</option>
                                <option>16+</option>
                                <option>18+</option>
                            </Input>
                            <FormFeedback>You haven't chosen anything!</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label>Price($)<span className="text-danger">*</span></Label>
                            <Input invalid={validPrice} value={valuePrice} type="number" onChange={e => {
                                setValuePrice(e.target.value)
                                setValidPrice(false)
                            }} />
                            <FormFeedback>You haven't entered anything!</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label>Genres</Label>
                            <Input type="select" onChange={e => {
                                changeGenres(e)
                            }}>
                                <option value="" selected disabled>Please select</option>
                                <option >Gear</option>
                                <option >Sport</option>
                                <option >Travel</option>
                                <option >Cooking</option>
                                <option >Game</option>
                                <option >Love Story</option>
                            </Input>
                            <FormFeedback>You haven't entered anything!</FormFeedback>
                            <div className="authors__tags">
                                {valueGenres.length !== 0 ? valueGenres.map((item, index) => <Tag key={index} firstname={item} remove={clickRemoveGenres} />) : null}
                            </div>
                        </FormGroup>
                    </Form>
                    <Form className="col-md-6 col-sm-12 col-lg-6 p-3">
                        <FormGroup >
                            <Label>Pages<span className="text-danger">*</span></Label>
                            <Input invalid={validPages} value={valuePages} type="number" onChange={e => {
                                setValuePages(e.target.value)
                                setValidPages(false)
                            }} />
                            <FormFeedback>You haven't entered anything!</FormFeedback>
                        </FormGroup>
                        <FormGroup >
                            <Label>Bestseller<span className="text-danger">*</span></Label>
                            <Input type="select" name="select" invalid={validBestseller} onChange={e => {
                                setValueBestseller(e.target.value)
                                setValidBestseller(false)
                            }}>
                                <option value="" selected disabled>Please select</option>
                                <option>Yes</option>
                                <option>No</option>
                            </Input>
                            <FormFeedback>You haven't chosen anything!</FormFeedback>
                        </FormGroup>
                        <FormGroup className="author__add__book">
                            <Label>Authors</Label>
                            <Input onChange={e => {
                                popupAuthorsToggle(e);
                                setValueAuthorsText(e.target.value)
                            }} placeholder="Please add author" value={valueAuthorsText} />
                            <div className="popup-authors" id="popup-authors" style={popupAuthors ? {display: "block"} : {display: 'none'}}>
                                <PopoverHeader>
                                    <p className="text-muted mb-0">Authors</p>
                                </PopoverHeader>
                                <PopoverBody>
                                    {searchAuthorStore.length === 0 ? <p>Nothing!</p> : searchAuthorStore.map((item,index) => <p onClick={() => clickAuthor(item.author_firstname)} key={index}>{item.author_firstname} {item.author_lastname}</p>)}
                                </PopoverBody>
                            </div>
                            <div className="authors__tags">
                                {valueAuthors ? valueAuthors.map((author,index) => <Tag key={index} firstname={author.author_firstname} lastname={author.author_lastname} remove={clickRemoveAuthor} />) : null}
                            </div>
                        </FormGroup>
                    </Form>
                </div>
                <div className="col-md-12 col-sm-12 col-lg-12 d-flex justify-content-end">
                    <button className="btn btn-outline-primary m-4" onClick={validationProcess}>Add book</button>
                </div>
            </WrapperColor>
        </div>
    );
}
 

const Tag = ({firstname,lastname,remove}) => {
    return (
        <div className="tag">
            <h5 className="text fs-6">{firstname} {lastname}<i className="bi bi-x" onClick={() => remove(firstname)}></i></h5>
        </div>
    )
    
}
export default AddBook;