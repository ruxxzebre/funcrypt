import { Button, Modal, Form } from "react-bootstrap";
import fetchJson from "../lib/fetchJSON";

import { useState } from "react";

function ConnectWalletModal({ handleClose, show }) {
  const [key, setKey] = useState("");
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Connect your wallet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Private Key</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setKey(e.target.value)}
                value={key}
                placeholder="your private key"
              />
              <Form.Text className="text-muted">
                We'll never share your private key to third parties
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose}>
            Generate
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={async () => {
              const reso = await fetchJson("/api/connect", {
                method: "POST",
                body: JSON.stringify({
                  privateKey: key,
                }),
              });
              console.log(reso);
              handleClose();
            }}
          >
            Connect
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConnectWalletModal;
