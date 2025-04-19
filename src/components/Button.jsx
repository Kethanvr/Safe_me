// Button component for standardized buttons
export default function Button({ 
  type = 'button', 
  onClick, 
  children, 
  variant = 'primary',
  fullWidth = false,
  disabled = false,
  icon = null
}) {
  const baseStyle = "flex items-center justify-center py-3 px-6 rounded-xl font-semibold text-base transition-all duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    google: "bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 shadow-sm",
    danger: "bg-red-500 hover:bg-red-600 text-white"
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyle} 
        ${variants[variant]} 
        ${fullWidth ? 'w-full' : ''} 
        ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
      `}
    >
      {icon && <span className="mr-2 flex items-center">{icon}</span>}
      {children}
    </button>
  );
}
