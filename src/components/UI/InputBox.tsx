import { useState } from "react"

interface InputProps {
    name: string;
    type: string;
    id?: string;
    value?: string;
    placeholder: string;
    icon: string;
}
const InputBox: React.FC<InputProps> = ({name, type, id, value, placeholder, icon}) => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  return (
    <div className='relative w-[100%] mb-4'>
      <input 
        type={type === 'password' ? passwordVisible ? 'text' : 'password' : type} 
        name={name} 
        placeholder={placeholder} 
        defaultValue={value} 
        id={id} 
        className='input-box'
      />
      <i className={`fi ${icon} input-icon`}></i>
      {type === 'password' &&
        <i className={`fi fi-rr-eye${!passwordVisible ? '-crossed' : ''} input-icon left-[auto] right-4 cursor-pointer`}
        onClick={() => setPasswordVisible(!passwordVisible)}
        ></i>  
    }
    </div>
  )
}
export default InputBox