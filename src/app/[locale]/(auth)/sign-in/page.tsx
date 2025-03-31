// import cn from 'classnames';


interface HeadeProps {
  className?: string;
}

const Auth = ({ className }: HeadeProps) => {
  return <div className={className}>Sign in</div>;
};

export default Auth