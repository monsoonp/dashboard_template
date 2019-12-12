import React, { useState } from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  // Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";

const Modals = props => {
  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);

  const toggle = () => setModal(!modal);
  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  };
  const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
  };
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt-4 mb-4" fluid>
        {/* Table */}
        <Row>
          <div className=" col">
            <Card className=" shadow">
              <CardHeader className=" bg-gradient-danger">
                <h3 className="mb-0">Modal</h3>
              </CardHeader>
              <CardBody>
                <Row>
                  <div>
                    <Button color="danger" onClick={toggle}>
                      {buttonLabel} Modal Button
                    </Button>
                    <Modal isOpen={modal} toggle={toggle} className={className}>
                      <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                      <ModalBody>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                        <br />
                        <Button color="success" onClick={toggleNested}>
                          Show Nested Modal
                        </Button>
                        <Modal
                          isOpen={nestedModal}
                          toggle={toggleNested}
                          onClosed={closeAll ? toggle : undefined}
                        >
                          <ModalHeader>Nested Modal title</ModalHeader>
                          <ModalBody>Stuff and things</ModalBody>
                          <ModalFooter>
                            <Button color="primary" onClick={toggleNested}>
                              Done
                            </Button>{" "}
                            <Button color="secondary" onClick={toggleAll}>
                              All Done
                            </Button>
                          </ModalFooter>
                        </Modal>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="primary" onClick={toggle}>
                          Do Something
                        </Button>{" "}
                        <Button color="secondary" onClick={toggle}>
                          Cancel
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </div>
                </Row>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Modals;
