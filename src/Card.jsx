export function Card({ children, className }) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl p-4 card-bg ${className || ""}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className }) {
  return (
    <div className={`mb-2 ${className || ""}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className }) {
  return (
    <h2 className={`text-lg font-semibold ${className || ""}`}>
      {children}
    </h2>
  );
}

export function CardContent({ children, className }) {
  return (
    <div className={className || ""}>
      {children}
    </div>
  );
}
