import "styles/layouts/Authentication/style.scss";

export const AuthenticationLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <div className="authenticationLayoutWrapper">
      <div className="formWrapper">{children}</div>
    </div>
  );
};
