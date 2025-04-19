// InputField component for standardized form inputs
import { useState } from 'react';

export default function InputField({ 
  type, 
  placeholder, 
  value, 
  onChange, 
  icon, 
  required = false,
  name,
  autoComplete
}) {
  const [focused, setFocused] = useState(false);
  
  return (
    <div className={`relative mb-4 transition-all duration-300 ${
      focused ? 'ring-2 ring-purple-300 rounded-xl' : ''
    }`}>
      {icon && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
          {icon}
        </div>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full p-3 bg-gray-50 border border-gray-300 rounded-xl font-medium text-base focus:outline-none 
          transition-all duration-300 ${
            icon ? 'pl-10' : 'pl-3'
          } focus:border-purple-500 hover:border-gray-400`}
      />
    </div>
  );
}
