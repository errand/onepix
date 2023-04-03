import {useState} from "react";

const Collapsible = ({label, children}) => {
    const [isOpen, setOPen] = useState(true);

    const toggle = () => {
        setOPen((previousState) => !previousState);
    };
    // @ts-ignore
    return(
        <>
            <a href="#" onClick={toggle} className={`page-filter__category-link ${!isOpen && 'collapsed'}`}>
                <h3 className="page-title-h3">{label}</h3>
                <svg width="13" height="8" viewBox="0 0 13 8" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M6.036 0.611083L0.191897 6.45712C-0.0639745 6.71364 -0.0639745 7.12925 0.191897 7.38642C0.44777 7.64294 0.863375 7.64294 1.11925 7.38642L6.49964 2.00408L11.88 7.38577C12.1359 7.64229 12.5515 7.64229 12.808 7.38577C13.0639 7.12925 13.0639 6.713 12.808 6.45648L6.96399 0.610435C6.71076 0.357856 6.28863 0.357856 6.036 0.611083Z"
                        fill="#111111"/>
                </svg>
            </a>

            <div className={`page-filter__category-list ${isOpen ? 'show' : 'collapse'}`}>
                {children}
            </div>
        </>
    )
}
export default Collapsible;
