import React from 'react';

interface ButtonProps {
  width?: string; // العرض يمكن أن يكون اختياريًا
  height?: string; // الارتفاع يمكن أن يكون اختياريًا
  children: React.ReactNode; // المحتوى يجب أن يكون عقدة React
  onClick?: () => void; // الدالة يمكن أن تكون اختياريًا
  className?: string; // الفئات يمكن أن تكون اختياريًا
}

const Button: React.FC<ButtonProps> = ({ width, height, children, onClick, className }) => {
  const styles: React.CSSProperties = {
    width: width || '100px', // العرض الافتراضي إذا لم يتم توفير العرض
    height: height || '40px', // الارتفاع الافتراضي إذا لم يتم توفير الارتفاع
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    borderRadius: '8px',
    cursor: 'pointer',
  };

  return (
    <button
      style={styles}
      onClick={onClick}
      className={className} // إضافة فئات CSS وتيلويند هنا
    >
      {children}
    </button>
  );
};

export default Button;
