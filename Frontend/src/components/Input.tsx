interface InputProps{
    placeholder?: string;
    reference?: any
}

export function Input({placeholder, reference}:InputProps ){

    return <div className="w-full">
        <input ref={reference} placeholder={placeholder} type={"text"} className="w-full px-3 py-2 md:px-4 md:py-2 border rounded m-1 md:m-2 border-slate-300 text-sm md:text-base"/>
    </div>
}