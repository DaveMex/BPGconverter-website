import React from 'react';

const Button = ({
    children,
    variant = 'primary',
    className = '',
    href,
    onClick,
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-primary hover:bg-secondary text-white shadow-lg shadow-primary/30 focus:ring-primary",
        secondary: "bg-white text-slate-800 border border-slate-200 hover:bg-slate-50 hover:border-primary/30 focus:ring-slate-200",
        ghost: "bg-transparent text-slate-600 hover:text-primary hover:bg-primary/5",
        support: "bg-gradient-to-r from-[#FFDD00] to-[#FBB03B] text-slate-900 hover:shadow-yellow-400/30" // Buy me a coffee style
    };

    const Component = href ? 'a' : 'button';

    return (
        <Component
            href={href}
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </Component>
    );
};

export default Button;
