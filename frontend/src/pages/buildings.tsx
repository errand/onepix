
import Building from "../components/Building";
import axios from "../lib/axios";
import {useState} from "react";
import useSWR from "swr";

export default function Buildings() {

    const [buildings, setBuildings] = useState<any[]>([])
    const [page, setPage] = useState(0)
    const limit = 10
    const maxPage = Math.ceil(buildings.length/limit)

    const onLoadMore = () => setPage((page+1)%maxPage)

    const { data } = useSWR(`/api/buildings?page=${page}`,() => axios
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

                               <form id="page-filter" className="page-filter__form">

                                   <div className="page-filter__body">

                                       <div className="page-filter__category">

                                           <a href="#proximity" className="page-filter__category-link"
                                              data-toggle="collapse">
                                               <h3 className="page-title-h3">Близость к метро</h3>
                                               <svg width="13" height="8" viewBox="0 0 13 8" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                   <path
                                                       d="M6.036 0.611083L0.191897 6.45712C-0.0639745 6.71364 -0.0639745 7.12925 0.191897 7.38642C0.44777 7.64294 0.863375 7.64294 1.11925 7.38642L6.49964 2.00408L11.88 7.38577C12.1359 7.64229 12.5515 7.64229 12.808 7.38577C13.0639 7.12925 13.0639 6.713 12.808 6.45648L6.96399 0.610435C6.71076 0.357856 6.28863 0.357856 6.036 0.611083Z"
                                                       fill="#111111"/>
                                               </svg>
                                           </a>

                                           <div className="page-filter__category-list collapse show" id="proximity">
                                               <ul className="proximity">
                                                   <li>
                                                       <div className="checkbox">
                                                           <input type="checkbox" name="<10" id="less10" />
                                                               <label htmlFor="less10">&lt;10</label>
                                                       </div>
                                                   </li>
                                                   <li>
                                                       <div className="checkbox">
                                                           <input type="checkbox" name="10-20" id="10-20" />
                                                               <label htmlFor="10-20">10-20</label>
                                                       </div>
                                                   </li>
                                                   <li>
                                                       <div className="checkbox">
                                                           <input type="checkbox" name="20-40" id="20-40" />
                                                               <label htmlFor="20-40">20-40</label>
                                                       </div>
                                                   </li>
                                                   <li>
                                                       <div className="checkbox">
                                                           <input type="checkbox" name="40+" id="more40" />
                                                               <label htmlFor="more40">40+</label>
                                                       </div>
                                                   </li>
                                                   <li className="w-100">
                                                       <div className="checkbox">
                                                           <input type="checkbox" name="any" id="any" checked />
                                                               <label htmlFor="any">Любой</label>
                                                       </div>
                                                   </li>
                                               </ul>
                                           </div>

                                       </div>

                                       <div className="page-filter__category">

                                           <a href="#deadline" className="page-filter__category-link"
                                              data-toggle="collapse">
                                               <h3 className="page-title-h3">Срок сдачи</h3>
                                               <svg width="13" height="8" viewBox="0 0 13 8" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                   <path
                                                       d="M6.036 0.611083L0.191897 6.45712C-0.0639745 6.71364 -0.0639745 7.12925 0.191897 7.38642C0.44777 7.64294 0.863375 7.64294 1.11925 7.38642L6.49964 2.00408L11.88 7.38577C12.1359 7.64229 12.5515 7.64229 12.808 7.38577C13.0639 7.12925 13.0639 6.713 12.808 6.45648L6.96399 0.610435C6.71076 0.357856 6.28863 0.357856 6.036 0.611083Z"
                                                       fill="#111111"/>
                                               </svg>
                                           </a>

                                           <div className="page-filter__category-list collapse show" id="deadline">
                                               <ul className="deadline">
                                                   <li>
                                                       <div className="radio">
                                                           <input type="radio" name="deadline" id="all" value="all"
                                                                  checked />
                                                               <label htmlFor="all">Любой</label>
                                                       </div>
                                                   </li>
                                                   <li>
                                                       <div className="radio">
                                                           <input type="radio" name="deadline" id="passed" value="passed" />
                                                               <label htmlFor="passed">Сдан</label>
                                                       </div>
                                                   </li>
                                                   <li>
                                                       <div className="radio">
                                                           <input type="radio" name="deadline" id="this-year"
                                                                  value="this-year" />
                                                               <label htmlFor="this-year">В этом году</label>
                                                       </div>
                                                   </li>
                                                   <li>
                                                       <div className="radio">
                                                           <input type="radio" name="deadline" id="next-year"
                                                                  value="next-year" />
                                                               <label htmlFor="next-year">В следующем году</label>
                                                       </div>
                                                   </li>
                                               </ul>
                                           </div>

                                       </div>

                                       <div className="page-filter__category">

                                           <a href="#housing" className="page-filter__category-link"
                                              data-toggle="collapse">
                                               <h3 className="page-title-h3">Класс жилья</h3>
                                               <svg width="13" height="8" viewBox="0 0 13 8" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                   <path
                                                       d="M6.036 0.611083L0.191897 6.45712C-0.0639745 6.71364 -0.0639745 7.12925 0.191897 7.38642C0.44777 7.64294 0.863375 7.64294 1.11925 7.38642L6.49964 2.00408L11.88 7.38577C12.1359 7.64229 12.5515 7.64229 12.808 7.38577C13.0639 7.12925 13.0639 6.713 12.808 6.45648L6.96399 0.610435C6.71076 0.357856 6.28863 0.357856 6.036 0.611083Z"
                                                       fill="#111111"/>
                                               </svg>
                                           </a>

                                           <div className="page-filter__category-list collapse show" id="housing">
                                               <ul className="housing">
                                                   <li>
                                                       <div className="checkbox">
                                                           <input type="checkbox" name="economical" id="economical" />
                                                               <label htmlFor="economical">Эконом</label>
                                                       </div>
                                                   </li>
                                                   <li>
                                                       <div className="checkbox">
                                                           <input type="checkbox" name="comfort" id="comfort" />
                                                               <label htmlFor="comfort">Комфорт</label>
                                                       </div>
                                                   </li>
                                                   <li>
                                                       <div className="checkbox">
                                                           <input type="checkbox" name="business" id="business" />
                                                               <label htmlFor="business">Бизнес</label>
                                                       </div>
                                                   </li>
                                                   <li>
                                                       <div className="checkbox">
                                                           <input type="checkbox" name="elite" id="elite" />
                                                               <label htmlFor="elite">Элит</label>
                                                       </div>
                                                   </li>
                                               </ul>
                                           </div>

                                       </div>

                                       <div className="page-filter__category">

                                           <a href="#general" className="page-filter__category-link"
                                              data-toggle="collapse">
                                               <h3 className="page-title-h3">Основные опции</h3>
                                               <svg width="13" height="8" viewBox="0 0 13 8" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                   <path
                                                       d="M6.036 0.611083L0.191897 6.45712C-0.0639745 6.71364 -0.0639745 7.12925 0.191897 7.38642C0.44777 7.64294 0.863375 7.64294 1.11925 7.38642L6.49964 2.00408L11.88 7.38577C12.1359 7.64229 12.5515 7.64229 12.808 7.38577C13.0639 7.12925 13.0639 6.713 12.808 6.45648L6.96399 0.610435C6.71076 0.357856 6.28863 0.357856 6.036 0.611083Z"
                                                       fill="#111111"/>
                                               </svg>
                                           </a>

                                           <div className="page-filter__category-list collapse show" id="general">
                                               <ul className="general">
                                                   <li>
                                                       <div className="checkbox">
                                                           <input type="checkbox" name="yard" id="yard" />
                                                               <label htmlFor="yard">Благоустроенный двор</label>
                                                               <span className="icon-garden"></span>
                                                       </div>
                                                   </li>
                                                   <li>
                                                       <div className="checkbox">
                                                           <input type="checkbox" name="finishing" id="finishing" />
                                                               <label htmlFor="finishing">Отделка под ключ</label>
                                                               <span className="icon-paint"></span>
                                                       </div>
                                                   </li>
                                                   <li>
                                                       <div className="checkbox">
                                                           <input type="checkbox" name="parking" id="parking" />
                                                               <label htmlFor="parking">Подземный паркинг</label>
                                                               <span className="icon-parking"></span>
                                                       </div>
                                                   </li>
                                                   <li>
                                                       <div className="checkbox">
                                                           <input type="checkbox" name="brick" id="brick" />
                                                               <label htmlFor="brick">Кирпичный дом</label>
                                                               <span className="icon-brick"></span>
                                                       </div>
                                                   </li>
                                                   <li>
                                                       <div className="checkbox">
                                                           <input type="checkbox" name="river" id="river" />
                                                               <label htmlFor="river">Вид на реку</label>
                                                               <span className="icon-water"></span>
                                                       </div>
                                                   </li>
                                                   <li>
                                                       <div className="checkbox">
                                                           <input type="checkbox" name="forest" id="forest" />
                                                               <label htmlFor="forest">Лес рядом</label>
                                                               <span className="icon-tree"></span>
                                                       </div>
                                                   </li>
                                                   <li>
                                                       <div className="checkbox">
                                                           <input type="checkbox" name="sale" id="sale" />
                                                               <label htmlFor="sale">Есть акции</label>
                                                               <span className="icon-sale"></span>
                                                       </div>
                                                   </li>
                                               </ul>
                                           </div>

                                       </div>

                                       <div className="page-filter__category">

                                           <a href="#additional" className="page-filter__category-link"
                                              data-toggle="collapse">
                                               <h3 className="page-title-h3">Дополнительные опции</h3>
                                               <svg width="13" height="8" viewBox="0 0 13 8" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                   <path
                                                       d="M6.036 0.611083L0.191897 6.45712C-0.0639745 6.71364 -0.0639745 7.12925 0.191897 7.38642C0.44777 7.64294 0.863375 7.64294 1.11925 7.38642L6.49964 2.00408L11.88 7.38577C12.1359 7.64229 12.5515 7.64229 12.808 7.38577C13.0639 7.12925 13.0639 6.713 12.808 6.45648L6.96399 0.610435C6.71076 0.357856 6.28863 0.357856 6.036 0.611083Z"
                                                       fill="#111111"/>
                                               </svg>
                                           </a>

                                           <div className="page-filter__category-list collapse show" id="additional">
                                               <ul className="additional">
                                                   <li>
                                                       <div className="checkbox">
                                                           <input type="checkbox" name="without-cars" id="without-cars" />
                                                               <label htmlFor="without-cars">Двор без машин</label>
                                                       </div>
                                                   </li>
                                                   <li>
                                                       <div className="checkbox">
                                                           <input type="checkbox" name="ceiling" id="ceiling" />
                                                               <label htmlFor="ceiling">Высокие потолки</label>
                                                       </div>
                                                   </li>
                                                   <li>
                                                       <div className="checkbox">
                                                           <input type="checkbox" name="pantries" id="pantries" />
                                                               <label htmlFor="pantries">Есть кладовые</label>
                                                       </div>
                                                   </li>
                                                   <li>
                                                       <div className="checkbox">
                                                           <input type="checkbox" name="windows" id="windows" />
                                                               <label htmlFor="windows">Панорамные окна</label>
                                                       </div>
                                                   </li>
                                                   <li>
                                                       <div className="checkbox">
                                                           <input type="checkbox" name="low-rise" id="low-rise" />
                                                               <label htmlFor="low-rise">Малоэтажный (&lt;10
                                                                   этажей)</label>
                                                       </div>
                                                   </li>
                                               </ul>
                                               <div className="collapse" id="additional_collapse">
                                                   <ul className="additional additional__collapse">
                                                       <li>
                                                           <div className="checkbox">
                                                               <input type="checkbox" name="windows-2" id="windows-2" />
                                                                   <label htmlFor="windows-2">Панорамные окна</label>
                                                           </div>
                                                       </li>
                                                       <li>
                                                           <div className="checkbox">
                                                               <input type="checkbox" name="low-rise-2" id="low-rise-2" />
                                                                   <label htmlFor="low-rise-2">Малоэтажный (&lt;10
                                                                       этажей)</label>
                                                           </div>
                                                       </li>
                                                       <li>
                                                           <div className="checkbox">
                                                               <input type="checkbox" name="without-cars-2"
                                                                      id="without-cars-2" />
                                                                   <label htmlFor="without-cars-2">Двор без машин</label>
                                                           </div>
                                                       </li>
                                                       <li>
                                                           <div className="checkbox">
                                                               <input type="checkbox" name="ceiling-2" id="ceiling-2" />
                                                                   <label htmlFor="ceiling-2">Высокие потолки</label>
                                                           </div>
                                                       </li>
                                                       <li>
                                                           <div className="checkbox">
                                                               <input type="checkbox" name="pantries-2" id="pantries-2" />
                                                                   <label htmlFor="pantries-2">Есть кладовые</label>
                                                           </div>
                                                       </li>
                                                   </ul>
                                               </div>
                                               <a href="#additional_collapse" className="page-filter__category-more"
                                                  data-toggle="collapse" data-count="9"
                                                  role="button">Показать еще (9)</a>
                                           </div>

                                       </div>

                                       <div className="page-filter__category service">

                                           <div className="checkbox">
                                               <input type="checkbox" name="service" id="service" checked />
                                                   <label htmlFor="service"><span className="checkbox__box"></span>Услуги
                                                       0%</label>
                                                   <span className="tip tip-info" data-toggle="popover"
                                                         data-placement="top"
                                                         data-content="And here's some amazing content. It's very engaging. Right?">
						<span className="icon-prompt"></span>
					</span>
                                           </div>

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
