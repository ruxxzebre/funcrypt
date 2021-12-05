import {Card, Button, ListGroup, ListGroupItem} from "react-bootstrap";
import {useRouter} from "next/router";

const Cardy = ({order, block}) => {
    const router = useRouter();
    return <Card style={{width: '18rem', margin: "10px"}}>
        {/*<Card.Img variant="top" src="holder.js/100px180"/>*/}
        <Card.Body>
            <Card.Title>Block {order.toString()}</Card.Title>
            <ListGroup className="list-group-flush">
                <ListGroupItem>Hash: {block.hash}</ListGroupItem>
                <ListGroupItem>Previous hash: {block.previousHash || "Genesis Block"}</ListGroupItem>
                {/*<ListGroupItem>Transactions: {block.transactions}</ListGroupItem>*/}
                <ListGroupItem>Timestamp: {new Date(block.timestamp).toLocaleDateString()}</ListGroupItem>
                <ListGroupItem>Nonce: {block.nonce}</ListGroupItem>
            </ListGroup>
            {/*<Card.Text>*/}
            {/*    Some quick example text to build on the card title and make up the bulk of*/}
            {/*    the card's content.*/}
            {/*</Card.Text>*/}
            <Button variant="primary" onClick={() => router.push(`/transactions/${block.hash}`)}>View transactions</Button>
        </Card.Body>
    </Card>
}

export default Cardy;
