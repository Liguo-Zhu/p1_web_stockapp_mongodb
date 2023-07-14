import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
//import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import useNews from "../api/Api_getnews";

export default function NewsList() {
  const { loading, news, error } = useNews();
  if (loading) {
    return <div className="container my-5 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="container my-5 text-center">{error.message}</div>;
  }
  return (
    //https://reactstrap.github.io/?path=/docs/components-layout--layout-row-cols
    <Container>
      <Row className="row">
        <div className="col-lg-6">
          <h3 className=" m-3">Latest News</h3>
          {<NewsCard {...news[0]} />}
        </div>

        <div className="col-lg-6">
          <h5 className="m-3">Click to view more latest news</h5>
          <ul>
            <li className="p-1">{<NewsTable {...news[1]} />}</li>
            <li className="p-1">{<NewsTable {...news[2]} />}</li>
            <li className="p-1">{<NewsTable {...news[3]} />}</li>
            <li className="p-1">{<NewsTable {...news[4]} />}</li>
            <li className="p-1">{<NewsTable {...news[5]} />}</li>
            <li className="p-1">{<NewsTable {...news[6]} />}</li>
            <li className="p-1">{<NewsTable {...news[7]} />}</li>
            <li className="p-1">{<NewsTable {...news[8]} />}</li>
          </ul>
        </div>
      </Row>
    </Container>
  );
}

//Display a card of news including the image, title, summary and a link to click for details
function NewsCard({ image, title, summary, url }) {
  return (
    <div key={url}>
      <Card>
        <Card.Body>
          <Card.Img src={image} alt="news_image" />
          <Card.Title>{title}</Card.Title>
          <Card.Text>{summary}</Card.Text>
          <Card.Link href={url} target="blank">
            Go for details
          </Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
}

//Display a table of some latest news
function NewsTable({ title, url }) {
  return (
    <ListGroup>
      <ListGroup.Item action href={url} target="blank">
        {title}
      </ListGroup.Item>
    </ListGroup>
  );
}
