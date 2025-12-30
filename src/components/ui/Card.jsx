import React from 'react';

const Card = ({ children, className = '', hoverEffect = false, ...props }) => {
    const baseStyles = "bg-white rounded-2xl p-6 border border-slate-200 shadow-sm";
    const hoverStyles = hoverEffect ? "transition-all duration-300 hover:shadow-xl hover:border-primary/20 hover:-translate-y-1" : "";

    return (
        <div className={`${baseStyles} ${hoverStyles} ${className}`} {...props}>
            {children}
        </div>
    );
};

export default Card;
