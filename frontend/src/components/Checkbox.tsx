
interface checkboxType {
    label: string,
    name: string,
    id: string,
    value: string | number,
    icon: string,
    checked: boolean,
    onChange?: (e: any) => void;
}

const Checkbox = ({ label, name, id, value, icon, checked, onChange, ...props }: checkboxType) => {

    const handleOnChange = () => {
        onChange([{field: name, value: value}])
    }

    return (
        <div className="checkbox">
            <input type="checkbox"
                   name={name}
                   id={id}
                   value={value}
                   checked={checked}
                   onChange={handleOnChange}
                   {...props}
            />
                <label htmlFor={id}>{label}</label>
            { icon && <span className={icon}></span> }
        </div>
    );
};
export default Checkbox;
