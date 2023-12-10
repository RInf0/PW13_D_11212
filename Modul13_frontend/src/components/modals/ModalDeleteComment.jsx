import { Modal, Button, Spinner, Form } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";
import { DeleteReview } from "../../api/apiReview";

function ModalDeleteComment({ id, onClose }) {
    const [show, setShow] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const handleClose = () => {
      setShow(false);
      onClose();
    };
    const handleShow = () => setShow(true);

    const submitData = (event) => {
        event.preventDefault();
        setIsPending(true);
        DeleteReview(id)
        .then((response) => {
            setIsPending(false);
            toast.success(response.message);
            handleClose();
        })
        .catch((err) => {
            console.log(err);
            setIsPending(false);
            toast.dark(err.message);
        });
    };

    return (
        <>
        <Button variant="danger" onClick={handleShow}>
            <FaTrash className="mx-3" />
        </Button>
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={submitData}>
                <Modal.Header closeButton>
                    <Modal.Title>Hapus Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="my-3">Apakah Anda yakin dengan sungguh-sungguh ingin menghapus review ini:</p>
                    <hr />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" type="submit" disabled={isPending}>
                    {isPending ? (
                        <>
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        Loading...
                        </>
                    ) : (
                        <span>Hapus</span>
                    )}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
        </>
    );
}

export default ModalDeleteComment