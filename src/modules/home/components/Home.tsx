import { useAuth } from "modules/common/contexts/auth-context";
import { Typography } from "@material-ui/core";
import "./Home.css";

function Home() {
  const { user } = useAuth();
  const features = user?.features?.map((feat) => (
    <p key={feat.id}>{feat.title}</p>
  ));
  return (
    <div>
      {user ? (
        <div>
          Hello {user.name} <ul>{features}</ul>
        </div>
      ) : (
        <Typography>Please log-in</Typography>
      )}
    </div>
  );
}

export default Home;
