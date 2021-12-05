import { Button, Modal, Form } from "react-bootstrap";
import fetchJson from "../lib/fetchJSON";

import {useEffect, useState} from "react";
import useUser, {useBalance} from "../lib/useWallet";

function NewTransactionModal({ handleClose, show }) {
    const { user } = useUser();
    const { balance } = useBalance();
    const [toAddress, setToAddress] = useState("");
    const [amount, setAmount] = useState(0);
    const [max, setMax] = useState(false);

    console.log(balance);
    useEffect(() => {
        if (max) {
            setAmount(balance);
        } else {
            setAmount(0);
        }
    }, [max]);

    if (!user || !balance) return "Loading...";
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create new transaction</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Text className="text-muted">
                            Your balance is:{" "}{balance}
                        </Form.Text>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>From</Form.Label>
                            <Form.Control
                                value={user?.wallet?.publicKey || ""}
                                disabled={true}
                                placeholder="your private key"
                            />
                            {/*<Form.Text className="text-muted">*/}
                            {/*    We'll never share your private key to third parties*/}
                            {/*</Form.Text>*/}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>To</Form.Label>
                            <Form.Control
                                value={toAddress}
                                onChange={(e) => setToAddress(e.target.value)}
                                placeholder="Receiver address"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                type="number"
                                value={amount}
                                onChange={(e) => {
                                    const val = parseFloat(e.target.value);
                                    if (val > balance) {
                                        setAmount(0);
                                    } else {
                                        setAmount(e.target.value);
                                    }
                                }}
                                placeholder="Amount"
                            />
                            <Form.Check onClick={(e) => setMax(e.target.checked)} type="checkbox" label="MAX" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
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
                        Proceed
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default NewTransactionModal;
