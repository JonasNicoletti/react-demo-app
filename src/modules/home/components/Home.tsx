import { useAuth } from "modules/common/contexts/auth-context";
import { Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
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
        <Link href="#" variant="body2" component={RouterLink} to="/login">
          Log in
        </Link>
      )}
    </div>
  );
}

export default Home;
