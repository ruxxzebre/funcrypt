import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Offcanvas,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import useUser, { useBalance } from "../lib/useWallet";
import NewTransactionModal from "./NewTransactionModal";
import {useState} from "react";

const Header = () => {
  const { user } = useUser();
  const { balance } = useBalance();
  const [showNewTxModal, setShowNewTxModal] = useState(false);
  return (
    <Navbar bg="light" expand={false}>
      <NewTransactionModal handleClose={() => setShowNewTxModal(false)} show={showNewTxModal} />
      <Container fluid>
        <Navbar.Brand href="/">
          KingKongChain
          <img
            src="./monkey.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt=""
          />{" "}
          {balance && <>Balance: {balance}</>}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              KingKongChain - next revolutional blockchain solution
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2">Settings</Nav.Link>
              <Nav.Link onClick={(e) => setShowNewTxModal(true)}>New transaction</Nav.Link>
              {/*<NavDropdown title="Dropdown" id="offcanvasNavbarDropdown">*/}
              {/*    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>*/}
              {/*    <NavDropdown.Item href="#action4">*/}
              {/*        Another action*/}
              {/*    </NavDropdown.Item>*/}
              {/*    <NavDropdown.Divider/>*/}
              {/*    <NavDropdown.Item href="#action5">*/}
              {/*        Something else here*/}
              {/*    </NavDropdown.Item>*/}
              {/*</NavDropdown>*/}
            </Nav>
            {/*<Form className="d-flex">*/}
            {/*    <FormControl*/}
            {/*        type="search"*/}
            {/*        placeholder="Search"*/}
            {/*        className="me-2"*/}
            {/*        aria-label="Search"*/}
            {/*    />*/}
            {/*    <Button variant="outline-success">Search</Button>*/}
            {/*</Form>*/}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Header;
