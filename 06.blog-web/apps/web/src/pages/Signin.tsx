import { Quote } from "../components/Quote";
import { Auth } from "../components/signin/Auth";

const Signin = () => {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          <Auth />
        </div>
        <div>
          <Quote />
        </div>
      </div>
    </div>
  );
};

export default Signin;
