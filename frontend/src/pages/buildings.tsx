
import Building from "../components/Building";
import axios from "../lib/axios";
import {useEffect, useState} from "react";
import useSWR from "swr";
import Collapsible from "../components/Collapsible";
import Checkbox from "../components/Checkbox";
import Radio from "../components/Radio";

export default function Buildings() {

    const queryInitial = [{field: "deadline", value: "Любой"}];
    const baseUrl = '/api/buildings'
    const [queryParams, setQueryParams] = useState(queryInitial)
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

    const handleChange = (evt) => {
        if(evt[0].field === 'deadline') {
            const $deadline = queryParams.find(item => item.field === 'deadline');
            $deadline.value = evt[0].value;
            setQueryParams(previousData => [...previousData])
        } else {
            if(queryParams.some(elem => elem.field === evt[0].field && elem.value === evt[0].value)) {
                setQueryParams(queryParams.filter(elem => !(elem.field === evt[0].field && elem.value === evt[0].value)))
            } else {
                setQueryParams(previousData => [...previousData, ...evt])
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        e.target.reset()
    }

    const handleResetClick = (e) => {
        setQueryParams(queryInitial)
        setQueryAddress('')
        setPage(0)
    }

    useEffect(() => {
        let actAddress =''
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

                               <form id="page-filter" className="page-filter__form" onSubmit={handleSubmit}>

                                   <div className="page-filter__body">

                                       <div className="page-filter__category">
                                           <Collapsible label={'Срок сдачи'}>
                                               <ul className="deadline">
                                                   <li>
                                                       <Radio
                                                           label={'Любой'}
                                                           name={'deadline'}
                                                           id={'deadline'}
                                                           value={'Любой'}
                                                           checked={queryParams.some(item => item.value === "Любой")}
                                                           onChange={handleChange}
                                                           />
                                                   </li>
                                                   <li>
                                                       <Radio
                                                           label={'Сдан'}
                                                           name={'deadline'}
                                                           id={'passed'}
                                                           value={'Сдан'}
                                                           checked={queryParams.some(item => item.value === "Сдан")}
                                                           onChange={handleChange}
                                                       />
                                                   </li>
                                                   <li>
                                                       <Radio
                                                           label={'В этом году'}
                                                           name={'deadline'}
                                                           id={'this_year'}
                                                           value={'Этот'}
                                                           checked={queryParams.some(item => item.value === "Этот")}
                                                           onChange={handleChange}
                                                       />
                                                   </li>
                                                   <li>
                                                       <Radio
                                                           label={'В следующем году'}
                                                           name={'deadline'}
                                                           id={'next_year'}
                                                           value={'Следующий'}
                                                           checked={queryParams.some(item => item.value === "Следующий")}
                                                           onChange={handleChange}
                                                       />
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
                                                                 checked={queryParams.some(item => item.value === "Эконом")}
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
                                                                     checked={queryParams.some(item => item.value === "Комфорт")}
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
                                                                     checked={queryParams.some(item => item.value === "Бизнес")}
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
                                                                     checked={queryParams.some(item => item.value === "Элит")}
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
                                                                 value={'Благоустроенный двор'}
                                                                 name={'yard'}
                                                                 id={'yard'}
                                                                 icon={'icon-garden'}
                                                                 checked={queryParams.some(item => item.value === "Благоустроенный двор")}
                                                                 onChange={handleChange}
                                                       />
                                                   </li>
                                                   <li>
                                                       <Checkbox label={'Отделка под ключ'}
                                                                 value={'Отделка под ключ'}
                                                                 name={'finishing'}
                                                                 id={'finishing'}
                                                                 icon={'icon-paint'}
                                                                 checked={queryParams.some(item => item.value === 'Отделка под ключ')}
                                                                 onChange={handleChange}
                                                       />
                                                   </li>
                                                   <li>
                                                       <Checkbox label={'Подземный паркинг'}
                                                                 value={'Подземный паркинг'}
                                                                 name={'parking'}
                                                                 id={'parking'}
                                                                 icon={'icon-parking'}
                                                                 checked={queryParams.some(item => item.value === 'Подземный паркинг')}
                                                                 onChange={handleChange}
                                                       />
                                                   </li>
                                                   <li>
                                                       <Checkbox label={'Кирпичный дом'}
                                                                 value={'Кирпичное'}
                                                                 name={'constructive'}
                                                                 id={'constructive'}
                                                                 icon={'icon-brick'}
                                                                 checked={queryParams.some(item => item.value === 'Кирпичное')}
                                                                 onChange={handleChange}
                                                       />
                                                   </li>
                                                   <li>
                                                       <Checkbox label={'Вид на реку'}
                                                                 value={'Вид на реку'}
                                                                 name={'river'}
                                                                 id={'river'}
                                                                 icon={'icon-water'}
                                                                 checked={queryParams.some(item => item.value === 'Вид на реку')}
                                                                 onChange={handleChange}
                                                       />
                                                   </li>
                                                   <li>
                                                       <Checkbox label={'Лес рядом'}
                                                                 value={'Лес рядом'}
                                                                 name={'forest'}
                                                                 id={'forest'}
                                                                 icon={'icon-tree'}
                                                                 checked={queryParams.some(item => item.value === 'Лес рядом')}
                                                                 onChange={handleChange}
                                                       />
                                                   </li>
                                                   <li>
                                                       <Checkbox label={'Есть акции'}
                                                                 value={'Есть акции'}
                                                                 name={'sale'}
                                                                 id={'sale'}
                                                                 icon={'icon-sale'}
                                                                 checked={queryParams.some(item => item.value === 'Есть акции')}
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
                                                                 value={'Двор без машин'}
                                                                 name={'without_cars'}
                                                                 id={'without_cars'}
                                                                 icon={null}
                                                                 checked={queryParams.some(item => item.value === 'Двор без машин')}
                                                                 onChange={handleChange}
                                                       />
                                                   </li>
                                                   <li>
                                                       <Checkbox label={'Высокие потолки'}
                                                                 value={'Высокие потолки'}
                                                                 name={'ceiling'}
                                                                 id={'ceiling'}
                                                                 icon={null}
                                                                 checked={queryParams.some(item => item.value === 'Высокие потолки')}
                                                                 onChange={handleChange}
                                                       />
                                                   </li>
                                                   <li>
                                                       <Checkbox label={'Есть кладовые'}
                                                                 value={'Есть кладовые'}
                                                                 name={'pantries'}
                                                                 id={'pantries'}
                                                                 icon={null}
                                                                 checked={queryParams.some(item => item.value === 'Есть кладовые')}
                                                                 onChange={handleChange}
                                                       />
                                                   </li>
                                                   <li>
                                                       <Checkbox label={'Панорамные окна'}
                                                                 value={'Панорамные окна'}
                                                                 name={'windows'}
                                                                 id={'windows'}
                                                                 icon={null}
                                                                 checked={queryParams.some(item => item.value === 'Панорамные окна')}
                                                                 onChange={handleChange}
                                                       />
                                                   </li>
                                                   <li>
                                                       <Checkbox label={'Малоэтажный (< 10 этажей)'}
                                                                 value={'Малоэтажный'}
                                                                 name={'low_rise'}
                                                                 id={'low_rise'}
                                                                 icon={null}
                                                                 checked={queryParams.some(item => item.value === 'Малоэтажный')}
                                                                 onChange={handleChange}
                                                       />
                                                   </li>
                                               </ul>
                                           </Collapsible>
                                       </div>

                                   </div>

                                   <div className="page-filter__buttons">

                                       <button className="button w-100" type="reset" id="reset_filter" onClick={handleResetClick}>Сбросить фильтры
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
