const Description = ({
    descript,
    className,
  }: {
    descript: number;
    className?: string;
  } & React.ComponentProps<'p'>) => (
    <span className={className}>{descript.toLocaleString()}₮</span>
  );
  
  export default Description;
  