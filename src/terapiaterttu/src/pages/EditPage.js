import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const EditPage = () => {

  return (
    <Container>
      <Row>
        <Col sm={8}>
          <Accordion defaultActiveKey={['0']} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Accordion Item #1</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Accordion Item #2</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion></Col>
        <Col sm={4}>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col sm>

        </Col>
        <Col sm>Mauris elementum ligula velit, et luctus mauris lobortis et. Integer leo metus, molestie non consequat et, rutrum quis massa. Aliquam semper nulla mi, id eleifend ante consequat quis. Vestibulum varius hendrerit massa et maximus. In laoreet accumsan condimentum. Duis libero lorem, ultricies commodo pharetra vitae, malesuada non elit. Donec iaculis, nisl nec condimentum suscipit, elit mauris imperdiet lacus, vitae sollicitudin purus urna vitae ipsum. Duis et luctus erat, at varius ipsum. </Col>
        <Col sm>Praesent sit amet volutpat urna. Sed non auctor urna. Quisque aliquam sit amet leo vel ornare. Morbi ut ante nisi. Phasellus purus enim, tincidunt vel hendrerit vitae, sollicitudin eget sapien. Etiam bibendum mollis tincidunt. Nulla vitae maximus tortor. Integer consectetur quis ligula nec cursus. Nulla nisl magna, rutrum a luctus sit amet, commodo sed arcu. Aliquam eu efficitur nulla. Ut tristique tellus nec lacinia sollicitudin. Nam non mattis turpis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. </Col>
      </Row>
    </Container>
  )

}

export default EditPage