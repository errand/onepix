const log = [
    {field: 'building_class', value: "Эконом"},
    {field: 'building_class', value: "Комфорт"},
    {field: 'building_class', value: "Бизнес"},
    {field: 'building_class', value: "Элит"},
]

if(log.some(elem => elem.field === 'building_class' && elem.value === 'Эконом')) {
    let newLog = log.filter(elem => !(elem.field === 'building_class' && elem.value === 'Эконом'))

    console.log(newLog)
}

