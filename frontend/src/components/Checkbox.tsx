import {useEffect, useState} from "react";

interface checkboxType {
    label: string,
    name: string,
    id: string,
    value: string,
    icon: string,
    checked: boolean,
    onChange?: (e: any) => void;
}

const Checkbox = ({ label, name, id, value, icon, checked, onChange, ...props }: checkboxType) => {

    const defaultChecked = checked ? checked : false;
    const [isChecked, setIsChecked] = useState(defaultChecked);

    const handleOnChange = () => {
        setIsChecked((prev) => !prev)
        onChange([{field: name, value: value}])
    }

    useEffect(() => {
    })

    return (
        <div className="checkbox">
            <input type="checkbox"
                   name={name}
                   id={id}
                   value={value}
                   checked={isChecked}
                   onChange={handleOnChange}
                   {...props}
            />
                <label htmlFor={id}>{label}</label>
            { icon && <span className={icon}></span> }
        </div>
    );
};
export default Checkbox;
