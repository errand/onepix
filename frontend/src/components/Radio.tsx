
interface radioType {
    label: string,
    name: string,
    id: string,
    value: string | number,
    checked?: boolean,
    defaultChecked?: boolean,
    onChange?: (e: any) => void;
}

const Radio = ({ label, name, id, value, checked, defaultChecked, onChange, ...props }: radioType) => {

    const handleOnChange = () => {
        onChange([{field: name, value: value}])
    }

    return (
        <div className="radio">
            <input type="radio"
                   name={name}
                   id={id}
                   value={value}
                   checked={checked}
                   defaultChecked={defaultChecked}
                   onChange={handleOnChange}
                   {...props}
            />
                <label htmlFor={id}>{label}</label>
        </div>
    );
};
export default Radio;
