interface ContainerProps {
  children: React.ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  return (
    <div className="container m-auto border bg-slate-100 border-slate-200 ">
      {children}
    </div>
  );
};
