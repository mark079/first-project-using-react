import './styles.css';

export const TextInput = ({handleChange, searchValue}) => {
    return(
        <input className="text-input" type="search" value={searchValue} onChange={handleChange} placeholder="Type your search" />
    );
}