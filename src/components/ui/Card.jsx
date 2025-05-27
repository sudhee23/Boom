const Card = ({ children, className = "" }) => {
  return (
    <div className={`bg-white rounded-2xl border shadow-sm p-6 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
