import React from "react"

const Button = ({
    children,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    classname = '',
    ...props
}) => {
    
  return (
    <div>
        <button className={`${bgColor} ${textColor} ${classname}`} {...props}>{children}</button>
    </div>
  )
}

export default Button