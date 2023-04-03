
import Building from "../components/Building";
import axios from "../lib/axios";
import {useEffect, useState} from "react";
import useSWR from "swr";
import Collapsible from "../components/Collapsible";

export default function Buildings() {

    const [buildings, setBuildings] = useState([])
    const [queryParams, setQueryParams] = useState('')

    const [page, setPage] = useState(0)
    const limit = 12
    const maxPage = Math.ceil(buildings.length/limit)

    const onChange = (event) => {
        const {name, value} = event?.target;
        // @ts-ignore
        setQueryParams({[name]: value})
    }

    useEffect(() => {
        console.log(queryParams)
    })

    const onLoadMore = () => setPage((page+1)%maxPage)

    const { data } = useSWR([`/api/buildings?page=${page}`, queryParams],() => axios
        .get('/api/buildings')
        .then(res => setBuildings(res.data))
        .catch(error => {
            if (error.response.status !== 409) throw error
        }),);

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
