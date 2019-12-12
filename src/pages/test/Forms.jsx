import React from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  FormFeedback,
  CustomInput
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";

const Forms = () => {
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt-4 mb-4" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-dark">
                <h3 className="mb-0 text-secondary">Form</h3>
              </CardHeader>
              <CardBody>
                <Row className="m-0">
                  <Col className="mb-5 mb-xl-0" xl="4">
                    <Form>
                      <FormGroup>
                        <Label for="exampleText">Text</Label>
                        <Input
                          // type="email"
                          name="email"
                          id="exampleText"
                          placeholder="with a placeholder"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label
                          for="examplePassword"
                          // hidden
                        >
                          Password
                        </Label>
                        <Input
                          type="password"
                          name="password"
                          id="examplePassword"
                          placeholder="password placeholder"
                        />
                      </FormGroup>
                    </Form>
                    <hr />
                  </Col>
                  <Col className="mb-xl-0" xl="4">
                    <Form>
                      <FormGroup>
                        <Label for="exampleSelect">Select</Label>
                        <Input type="select" name="select" id="exampleSelect">
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </Input>
                      </FormGroup>
                      <FormGroup>
                        <Label for="exampleSelectMulti">Select Multiple</Label>
                        <Input
                          type="select"
                          name="selectMulti"
                          id="exampleSelectMulti"
                          multiple
                        >
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </Input>
                      </FormGroup>
                    </Form>
                    <hr />
                  </Col>
                  <Col className="mb-xl-0" xl="4">
                    <Form>
                      <FormGroup>
                        <Label for="exampleText">Text Area</Label>
                        <Input type="textarea" name="text" id="exampleText" />
                      </FormGroup>
                      <FormGroup>
                        <Label for="exampleFile">File</Label>
                        <Input type="file" name="file" id="exampleFile" />
                        <FormText color="muted">
                          This is some placeholder block-level help text for the
                          above input. It's a bit lighter and easily wraps to a
                          new line.
                        </FormText>
                      </FormGroup>
                    </Form>
                    <hr />
                  </Col>
                </Row>
                <Row>
                  <Col xl="8">
                    <Form>
                      <FormGroup tag="fieldset">
                        <legend>Radio Buttons</legend>
                        <FormGroup check>
                          <Label check>
                            <Input type="radio" name="radio1" /> Option one is
                            this and that—be sure to include why it's great
                          </Label>
                        </FormGroup>
                        <FormGroup check>
                          <Label check>
                            <Input type="radio" name="radio1" /> Option two can
                            be something else and selecting it will deselect
                            option one
                          </Label>
                        </FormGroup>
                        <FormGroup check disabled>
                          <Label check>
                            <Input type="radio" name="radio1" disabled /> Option
                            three is disabled
                          </Label>
                        </FormGroup>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input type="checkbox" /> Check me out
                        </Label>
                      </FormGroup>
                      <Button>Submit</Button>
                    </Form>
                    <hr />
                  </Col>
                  <Col xl="4">
                    <FormGroup>
                      <Label for="exampleEmail">Valid input</Label>
                      <Input valid />
                      <FormFeedback valid>
                        Sweet! that name is available
                      </FormFeedback>
                      <FormText>
                        Example help text that remains unchanged.
                      </FormText>
                    </FormGroup>
                    <FormGroup>
                      <Label for="examplePassword">Invalid input</Label>
                      <Input invalid />
                      <FormFeedback>
                        Oh noes! that name is already taken
                      </FormFeedback>
                      <FormText>
                        Example help text that remains unchanged.
                      </FormText>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xl="12">
                    <Form inline>
                      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="exampleEmail" className="mr-sm-2">
                          Email
                        </Label>
                        <Input
                          type="email"
                          name="email"
                          id="exampleEmail"
                          placeholder="something@idk.cool"
                        />
                      </FormGroup>
                      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="examplePassword" className="mr-sm-2">
                          Password
                        </Label>
                        <Input
                          type="password"
                          name="password"
                          id="examplePassword"
                          placeholder="don't tell!"
                        />
                      </FormGroup>
                      <Button>Submit</Button>
                    </Form>
                    <hr />
                  </Col>
                </Row>
                <Row>
                  <Col xl="6">
                    <Form>
                      <FormGroup>
                        <Label for="exampleDate">Date</Label>
                        <Input
                          type="date"
                          name="date"
                          id="exampleDate"
                          placeholder="date placeholder"
                        />
                      </FormGroup>
                    </Form>
                  </Col>
                  <Col xl="6">
                    <Form>
                      <FormGroup>
                        <Label for="exampleColor">Color</Label>
                        <Input
                          type="color"
                          name="color"
                          id="exampleColor"
                          placeholder="color placeholder"
                        />
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
                <Row>
                  <Col xl="6">
                    <Form>
                      <FormGroup>
                        <Label for="exampleCheckbox">Switches</Label>
                        <div>
                          <CustomInput
                            type="switch"
                            id="exampleCustomSwitch"
                            name="customSwitch"
                            label="Turn on this custom switch"
                          />
                          <CustomInput
                            type="switch"
                            id="exampleCustomSwitch2"
                            label="Can't click this label to turn on!"
                            // htmlFor="exampleCustomSwitch2_X"
                            disabled
                          />
                        </div>
                      </FormGroup>
                    </Form>
                  </Col>
                  <Col xl="6">
                    <Form>
                      <FormGroup>
                        <Label for="exampleCustomRange">Custom Range</Label>
                        <CustomInput
                          type="range"
                          id="exampleCustomRange"
                          name="customRange"
                        />
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Forms;
