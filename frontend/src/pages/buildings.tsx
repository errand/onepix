
import Building from "../components/Building";
import axios from "../lib/axios";
import {useEffect, useState} from "react";
import useSWR from "swr";
import Collapsible from "../components/Collapsible";
import Checkbox from "../components/Checkbox";

export default function Buildings() {

    const baseUrl = '/api/buildings'
    const [queryParams, setQueryParams] = useState([])
    const [queryAddress, setQueryAddress] = useState('')
    const [page, setPage] = useState(0)
    const [error, setError] = useState('')

    const getBuildings = (page, params?) => axios
            .get(baseUrl + `?page=${page}${params}`)
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409)  setError(error)
            })

    // @ts-ignore
    const { data: buildings, isLoading } = useSWR([baseUrl, page, queryAddress], () => getBuildings(page, queryAddress));
    const limit = 12
    const maxPage = Math.ceil(buildings?.length/limit)

    const onChange = (event) => {
        //console.log(event)
    }


    const handleChange = (evt) => {
        const prevState = queryParams;
        if(prevState.some(elem => elem.field === evt[0].field && elem.value === evt[0].value)) {
            const newParams = prevState.filter(elem => !(elem.field === evt[0].field && elem.value === evt[0].value))
            setQueryParams(newParams)
        } else {
            setQueryParams(previousData => [...previousData, ...evt])
        }
    }

    useEffect(() => {
        let actAddress =''
        console.log(queryParams)
        queryParams.forEach(param => {
            actAddress += '&';
            actAddress += param.field + ((param.field === 'building_class' || param.field === 'constructive') ? "[]=" : '=') + param.value;
        })
        setQueryAddress(actAddress)

    })

    const onLoadMore = () => setPage((page+1)%maxPage)
    if (isLoading) return <h1>loading...</h1>
    return (
       <>
           <main className="main">

               <div className="container">

                   <div className="page-top">

                       <nav className="page-breadcrumb" itemProp="breadcrumb">
                           <a href="/">Главная</a>
                           <span className="breadcrumb-separator"> {">"} </span>

                           Новостройки
                       </nav>

                       <div className="page-top__switchers">

                           <div className="container">
                               <div className="row">

                                   <div className="page-top__switchers-inner">

                                       <a href="#" className="page-top__filter">
                                           <span className="icon-filter"></span>
                                           Фильтры
                                       </a>

                                       <a href="#" data-tab-name="loop" className="page-top__switcher tab-nav active">
                                           <span className="icon-grid"></span>
                                       </a>

                                       <a href="#" data-tab-name="map" className="page-top__switcher tab-nav">
                                           <span className="icon-marker"></span>
                                       </a>

                                   </div>

                               </div>
                           </div>

                       </div>

                   </div>

                   <div className="page-section">

                       <div className="page-content">

                           <h1 className="visuallyhidden">Новостройки</h1>

                           <div className="page-loop__wrapper loop tab-content tab-content__active">

                               <ul className="page-loop with-filter">
                                   {error && <>error</>}
                                   {buildings?.length < 1 && <>Подходящих вариантов не найдено</>}
                                   {buildings && buildings.slice(0,limit*(page+1)).map((building) => <Building building={building} key={building.id} />)}

                               </ul>

                               <div className="show-more">

                                   <button className="show-more__button" onClick={onLoadMore}>

                                       <span className="show-more__button-icon"></span>

                                       Показать еще

                                   </button>

                               </div>

                           </div>

                           <div className="page-map tab-content map">

                               <h1>Тут будет карта</h1>

                           </div>

                       </div>

                       <div className="page-filter fixed">

                           <div className="page-filter__wrapper">

                               <form id="page-filter" className="page-filter__form"
                                     onChange={onChange}>

                                   <div className="page-filter__body">

                                       <div className="page-filter__category">
                                           <Collapsible label={'Срок сдачи'}>
                                               <ul className="deadline">
                                                   <li>
                                                       <div className="radio">
                                                           <input type="radio"
                                                                  name="deadline"
                                                                  id="all"
                                                                  value="all"
                                                                  defaultChecked={true}
                                                           />
                                                           <label htmlFor="all">Любой</label>
                                                       </div>
                                                   </li>
                                                   <li>
                                                       <div className="radio">
                                                           <input type="radio"
                                                                  name="deadline"
                                                                  id="passed"
                                                                  value="passed"
                                                           />
                                                           <label htmlFor="passed">Сдан</label>
                                                       </div>
                                                   </li>
                                                   <li>
                                                       <div className="radio">
                                                           <input type="radio"
                                                                  name="deadline"
                                                                  id="this-year"
                                                                  value="this-year"
                                                           />
                                                           <label htmlFor="this-year">В этом году</label>
                                                       </div>
                                                   </li>
                                                   <li>
                                                       <div className="radio">
                                                           <input type="radio"
                                                                  name="deadline"
                                                                  id="next-year"
                                                                  value="next-year"
                                                           />
                                                           <label htmlFor="next-year">В следующем году</label>
                                                       </div>
                                                   </li>
                                               </ul>
                                           </Collapsible>
                                       </div>

                                       <div className="page-filter__category">
                                           <Collapsible label={'Класс жилья'}>
                                               <ul className="housing">
                                                   <li>
                                                       <Checkbox label={'Эконом'}
                                                                 value={'Эконом'}
                                                                 name={'building_class'}
                                                                 id={'economical'}
                                                                 icon={null}
                                                                 checked={false}
                                                                 onChange={handleChange}
                                                       />
                                                   </li>
                                                   <li>
                                                       <div className="checkbox">
                                                           <Checkbox label={'Комфорт'}
                                                                     value={'Комфорт'}
                                                                     name={'building_class'}
                                                                     id={'comfort'}
                                                                     icon={null}
                                                                     checked={false}
                                                                     onChange={handleChange}
                                                           />
                                                       </div>
                                                   </li>
                                                   <li>
                                                       <div className="checkbox">
                                                           <Checkbox label={'Бизнес'}
                                                                     value={'Бизнес'}
                                                                     name={'building_class'}
                                                                     id={'business'}
                                                                     icon={null}
                                                                     checked={false}
                                                                     onChange={handleChange}
                                                           />
                                                       </div>
                                                   </li>
                                                   <li>

                                                       <div className="checkbox">
                                                           <Checkbox label={'Элит'}
                                                                     value={'Элит'}
                                                                     name={'building_class'}
                                                                     id={'elite'}
                                                                     icon={null}
                                                                     checked={false}
                                                                     onChange={handleChange}
                                                           />
                                                       </div>
                                                   </li>
                                               </ul>
                                           </Collapsible>
                                       </div>

                                       <div className="page-filter__category">
                                           <Collapsible label={'Основные опции'}>
                                               <ul className="general">
                                                   <li>
                                                       <Checkbox label={'Благоустроенный двор'}
                                                                 value={1}
                                                                 name={'yard'}
                                                                 id={'yard'}
                                                                 icon={'icon-garden'}
                                                                 checked={false}
                                                                 onChange={handleChange}
                                                       />
                                                   </li>
                                                   <li>
                                                       <Checkbox label={'Отделка под ключ'}
                                                                 value={1}
                                                                 name={'finishing'}
                                                                 id={'finishing'}
                                                                 icon={'icon-paint'}
                                                                 checked={false}
                                                                 onChange={handleChange}
                                                       />
                                                   </li>
                                                   <li>
                                                       <Checkbox label={'Подземный паркинг'}
                                                                 value={1}
                                                                 name={'parking'}
                                                                 id={'parking'}
                                                                 icon={'icon-parking'}
                                                                 checked={false}
                                                                 onChange={handleChange}
                                                       />
                                                   </li>
                                                   <li>
                                                       <Checkbox label={'Кирпичный дом'}
                                                                 value={'Кирпичное'}
                                                                 name={'constructive'}
                                                                 id={'constructive'}
                                                                 icon={'icon-brick'}
                                                                 checked={false}
                                                                 onChange={handleChange}
                                                       />
                                                   </li>
                                                   <li>
                                                       <Checkbox label={'Вид на реку'}
                                                                 value={1}
                                                                 name={'river'}
                                                                 id={'river'}
                                                                 icon={'icon-water'}
                                                                 checked={false}
                                                                 onChange={handleChange}
                                                       />
                                                   </li>
                                                   <li>
                                                       <Checkbox label={'Лес рядом'}
                                                                 value={1}
                                                                 name={'forest'}
                                                                 id={'forest'}
                                                                 icon={'icon-tree'}
                                                                 checked={false}
                                                                 onChange={handleChange}
                                                       />
                                                   </li>
                                                   <li>
                                                       <Checkbox label={'Есть акции'}
                                                                 value={1}
                                                                 name={'sale'}
                                                                 id={'sale'}
                                                                 icon={'icon-sale'}
                                                                 checked={false}
                                                                 onChange={handleChange}
                                                       />
                                                   </li>
                                               </ul>
                                           </Collapsible>
                                       </div>

                                       <div className="page-filter__category">
                                           <Collapsible label={'Дополнительные опции'}>
                                               <ul className="additional">
                                                   <li>
                                                       <Checkbox label={'Двор без машин'}
                                                                 value={1}
                                                                 name={'without_cars'}
                                                                 id={'without_cars'}
                                                                 icon={null}
                                                                 checked={false}
                                                                 onChange={handleChange}
                                                       />
                                                   </li>
                                                   <li>
                                                       <Checkbox label={'Высокие потолки'}
                                                                 value={1}
                                                                 name={'ceiling'}
                                                                 id={'ceiling'}
                                                                 icon={null}
                                                                 checked={false}
                                                                 onChange={handleChange}
                                                       />
                                                   </li>
                                                   <li>
                                                       <Checkbox label={'Есть кладовые'}
                                                                 value={1}
                                                                 name={'pantries'}
                                                                 id={'pantries'}
                                                                 icon={null}
                                                                 checked={false}
                                                                 onChange={handleChange}
                                                       />
                                                   </li>
                                                   <li>
                                                       <Checkbox label={'Панорамные окна'}
                                                                 value={1}
                                                                 name={'windows'}
                                                                 id={'windows'}
                                                                 icon={null}
                                                                 checked={false}
                                                                 onChange={handleChange}
                                                       />
                                                   </li>
                                               </ul>
                                           </Collapsible>
                                       </div>

                                   </div>

                                   <div className="page-filter__buttons">

                                       <button className="button button--pink w-100" type="submit"
                                               id="apply_filter">Применить фильтры
                                       </button>

                                       <button className="button w-100" type="reset" id="reset_filter">Сбросить фильтры
                                           <svg width="9" height="8" viewBox="0 0 9 8" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                               <path
                                                   d="M8.5 0.942702L7.5573 0L4.49999 3.05729L1.4427 0L0.5 0.942702L3.55729 3.99999L0.5 7.0573L1.4427 8L4.49999 4.94271L7.55728 8L8.49998 7.0573L5.44271 3.99999L8.5 0.942702Z"/>
                                           </svg>
                                       </button>

                                   </div>

                               </form>

                           </div>

                       </div>

                   </div>

               </div>

           </main>
       </>
    );
}
