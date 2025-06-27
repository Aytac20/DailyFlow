import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";
import { toast } from "react-toastify";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ FIXED HERE
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <header>
      <Navbar bg="white" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/" className="tracking-wider text-lg">
            DailyFlow
          </Navbar.Brand>

          <Nav className="ms-auto">
            {userInfo && (
              <Nav.Link onClick={logoutHandler} style={{ cursor: "pointer" }}>
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
