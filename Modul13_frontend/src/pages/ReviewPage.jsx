import { useEffect, useState } from "react";
import { Alert, Col, Container, Row, Spinner, Stack } from "react-bootstrap";
import { getThumbnail } from "../api";
import { GetMyReviews } from "../api/apiReview";
import ModalDeleteComment from "../components/modals/ModalDeleteComment";
import { useLocation } from "react-router-dom";

const ReviewPage = () => {
    const [contents, setContents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();

    const fetchContent = () => {
        setIsLoading(true);
        GetMyReviews()
        .then((data) => {
            setContents(data);
            // console.log(data);
            setIsLoading(false);
        })
        .catch((err) => {
            console.log(err);
        });
    }
    useEffect(() => {
        fetchContent();
    }, [location]);
    
    return (
        <Container className="mt-4">
            <Stack direction="horizontal" gap={3} className="mb-3">
                <h1 className="h4 fw-bold mb-0 text-nowrap">Review Video</h1>
                <hr className="border-top border-light opacity-50 w-100" />
          </Stack>
          {isLoading ? (
            <div className="text-center">
                <Spinner
                as="span"
                animation="border"
                variant="primary"
                size="lg"
                role="status"
                aria-hidden="true"
              />
              <h6 className="mt-2 mb-0">Loading...</h6>
            </div>
          ) : contents?.length > 0 ? (
            <Row>
              {contents?.map((data) => (
                <Col md={6} lg={4} className="mb-3" key={data.id}>
                  <div
                    className="card text-white"
                    style={{ aspectRatio: "16 / 9" }}
                  >
                    <img
                      src={getThumbnail(data.content.thumbnail)}
                      className="card-img w-100 h-100 object-fit-cover bg-light"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title text-truncate">{data.content.title}</h5>
                      <div className="d-flex justify-content-between">
                        <p className="card-text">{data.content.description}</p>
                        <ModalDeleteComment id={data.id} onClose={fetchContent}/>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          ) : (
            <Alert variant="dark" className="text-center">
                Belum ada review, ayo tambahin review!
            </Alert>
          )}
        </Container>
      );
}

export default ReviewPage;