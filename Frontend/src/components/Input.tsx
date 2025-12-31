import { useState, useEffect } from "react";

interface InputProps{
    placeholder?: string;
    reference?: any;
    type?: string;
    label?: string;
    helperText?: string;
    error?: string;
    showPasswordToggle?: boolean;
    icon?: React.ReactNode;
}

export function Input({
    placeholder, 
    reference, 
    type = "text", 
    label, 
    helperText, 
    error,
    showPasswordToggle = false,
    icon
}: InputProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const inputType = showPasswordToggle ? (showPassword ? "text" : "password") : type;

    // Check if input has value
    useEffect(() => {
        const checkValue = () => {
            if (reference?.current) {
                setHasValue(reference.current.value.length > 0);
            }
        };

        const inputElement = reference?.current;
        if (inputElement) {
            // Check initial value
            checkValue();
            
            // Add event listeners
            inputElement.addEventListener('input', checkValue);
            inputElement.addEventListener('change', checkValue);
            
            return () => {
                inputElement.removeEventListener('input', checkValue);
                inputElement.removeEventListener('change', checkValue);
            };
        }
    }, [reference]);

    const isActive = isFocused || hasValue;

    return (
        <div className="w-full">
            <div className="relative">
                {/* Floating Label */}
                {label && (
                    <label 
                        className={`absolute left-3 transition-all duration-300 ease-in-out pointer-events-none z-10
                            ${isActive 
                                ? 'top-0 -translate-y-1/2 text-xs font-medium bg-white px-2' 
                                : 'top-1/2 -translate-y-1/2 text-sm text-gray-500'
                            }
                            ${icon && !isActive ? 'left-10' : 'left-3'}
                            ${error ? 'text-red-500' : isActive ? 'text-teal-600' : 'text-gray-500'}
                        `}
                        style={{
                            color: error ? '#BF092F' : isActive ? '#3B9797' : '#6B7280'
                        }}
                    >
                        {label}
                    </label>
                )}

                {/* Icon */}
                {icon && !hasValue && (
                    <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-all duration-300 z-20
                        ${isActive ? 'opacity-60 scale-90' : 'opacity-100 scale-100'}
                    `}>
                        <div className={`transition-colors duration-300`}
                             style={{
                                 color: error ? '#BF092F' : isFocused ? '#3B9797' : '#9CA3AF'
                             }}>
                            {icon}
                        </div>
                    </div>
                )}

                {/* Input Field */}
                <input 
                    ref={reference} 
                    placeholder={isActive ? "" : ""} 
                    type={inputType}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={`relative w-full px-3 py-3.5 md:px-4 md:py-4 border-2 rounded-xl transition-all duration-300 text-sm md:text-base bg-white z-0
                        ${icon && !hasValue ? 'pl-10' : ''}
                        ${showPasswordToggle ? 'pr-12' : ''}
                        focus:outline-none placeholder-transparent
                        ${isActive ? 'pt-6 pb-2' : 'pt-3.5 pb-3.5'}
                    `}
                    style={{
                        borderColor: error ? '#BF092F' : isFocused ? '#3B9797' : '#E5E7EB',
                        boxShadow: isFocused 
                            ? error 
                                ? '0 0 0 4px rgba(191, 9, 47, 0.1)' 
                                : '0 0 0 4px rgba(59, 151, 151, 0.1), 0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                            : 'none'
                    }}
                />

                {/* Enhanced Placeholder */}
                {placeholder && !isActive && !label && (
                    <div className={`absolute inset-y-0 flex items-center pointer-events-none transition-all duration-300 z-10
                        ${icon ? 'left-10' : 'left-4'}
                    `}>
                        <span className={`text-sm transition-all duration-300 ${isFocused ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'}`}
                              style={{
                                  color: error ? '#BF092F' : '#9CA3AF'
                              }}>
                            {placeholder}
                        </span>
                    </div>
                )}

                {/* Password Toggle */}
                {showPasswordToggle && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute inset-y-0 right-0 pr-3 flex items-center transition-all duration-300 hover:scale-110 z-20`}
                        style={{
                            color: error ? '#BF092F' : '#9CA3AF'
                        }}
                        onMouseEnter={(e) => {
                            if (!error) e.currentTarget.style.color = '#16476A';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = error ? '#BF092F' : '#9CA3AF';
                        }}
                    >
                        <div className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200">
                            {showPassword ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            )}
                        </div>
                    </button>
                )}

                {/* Focus Ring Enhancement */}
                {isFocused && (
                    <div className={`absolute inset-0 rounded-xl pointer-events-none transition-all duration-300
                        ${error 
                            ? 'ring-4 ring-red-100 border-red-500' 
                            : 'ring-4 ring-blue-100 border-blue-500'
                        }
                    `} />
                )}
            </div>

            {/* Helper Text */}
            {helperText && !error && (
                <div className="mt-2 flex items-center space-x-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" style={{color: '#3B9797'}}>
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <p className="text-xs font-medium" style={{color: '#16476A'}}>
                        {helperText}
                    </p>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="mt-2 flex items-center space-x-1 animate-shake">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" style={{color: '#BF092F'}}>
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <p className="text-xs font-medium" style={{color: '#BF092F'}}>
                        {error}
                    </p>
                </div>
            )}
        </div>
    );
}