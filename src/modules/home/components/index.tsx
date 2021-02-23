import { useAuth } from "modules/common/contexts/auth-context";
import { Typography } from "@material-ui/core";

function Home() {
  const { user } = useAuth();
  return (
    <div>
      {user ? (
        <Typography variant="caption">Hello {user.name}</Typography>
      ) : (
        <Typography>Please log-in</Typography>
      )}
    </div>
  );
}

export { Home };
