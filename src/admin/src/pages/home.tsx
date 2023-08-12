import { MainLayout } from "layouts/MainLayout";

export const Home: React.FC<React.PropsWithChildren> = () => {
  return (
    <MainLayout>
      <div className="wrapper">
        {Array(20)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="container"
              style={{
                height: "10vh",
              }}
            >
              Hello from home
            </div>
          ))}
      </div>
    </MainLayout>
  );
};
