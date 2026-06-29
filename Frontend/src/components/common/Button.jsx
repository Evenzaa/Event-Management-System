const VARIANT_CLASSES = {
  primary:
    'bg-gradient-to-r from-violet-600 to-blue-500 text-white hover:opacity-90 shadow-sm',
  outline:
    'bg-white text-violet-600 border border-violet-600 hover:bg-violet-50',
  ghost: 'bg-violet-50 text-violet-700 hover:bg-violet-100',
};

const SIZE_CLASSES = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3 text-base',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  as: Component = 'button',
  className = '',
  ...props
}) {
  const classes = [
    'inline-flex items-center justify-center gap-2 rounded-[15px] font-semibold transition-colors duration-150 cursor-pointer',
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className,
  ].join(' ');

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}
