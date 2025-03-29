interface InputProps{
    onChange: () => void;
    placeholder?: string;
}

export function Input({onChange, placeholder}:InputProps ){

    return <div>
        <input placeholder={placeholder} type={"text"} className="px-4 py-2 border rounded m-2 border-slate-300" onChange={onChange}/>
    </div>
}