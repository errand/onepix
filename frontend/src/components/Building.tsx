import { motion, Variants } from "framer-motion"
import {useEffect, useState} from "react";
import { useFetcher } from '../hooks/fetcher';

export default function Building({building}) {

    const [stations, setStations] = useState([])
    const {buildingMetro} = useFetcher()

    const {id, title, image, deadline, address, building_class, special} = building;

    useEffect(() => {
        console.log(building)
    }, [])

    const formatDeadline = (timestamp) => {
        const date = Date.parse(timestamp);
        const month = new Date(date).getMonth();
        const year = new Date(date).getFullYear();
        const now = Date.now();
        if(date < now) {
            return ': сдан'
        } else {
            return ` до ${Math.floor(month / 3 + 1)} кв. ${year} г.`
        }

    }
    const cardVariants: Variants = {
        offscreen: {
            y: 100,
            opacity: 0
        },
        onscreen: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <motion.li
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}
            className="page-loop__item">

            <a href="#" className="favorites-link favorites-link__add"
               title="Добавить в Избранное" role="button">
                                        <span className="icon-heart"><span className="path1"></span><span
                                            className="path2"></span></span>
            </a>

            <a href="#" className="page-loop__item-link">

                <div className="page-loop__item-image">

                    <img src={image} alt="" />

                    <div className="page-loop__item-badges">
                        {special && <span className="badge">Услуги 0%</span>}
                        <span className="badge">{building_class}+</span>
                    </div>

                </div>

                <div className="page-loop__item-info">

                    <h3 className="page-title-h3">{title}</h3>

                    <p className="page-text">Срок сдачи{formatDeadline(deadline)}</p>

                    <div className="page-text to-metro">
                        <span className="icon-metro icon-metro--red"></span>
                        <span className="page-text">Студенческая <span> 5 мин.</span></span>
                        <span className="icon-walk-icon"></span>
                    </div>

                    <span className="page-text text-desc">{address}</span>

                </div>

            </a>

        </motion.li>
    )
}
