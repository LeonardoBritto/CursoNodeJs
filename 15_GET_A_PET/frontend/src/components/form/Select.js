import styles from './Select.module.css'

function Select({text, name, options, handleOnChange, value}) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <select 
                name={name} 
                id={name} 
                onChange={handleOnChange} 
                defaultValue={value || ''}
            >
                <option>Selecione uma opção</option>
                {options.map((option) =>(
                    <option defaultValue={option} key={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}

export default Select