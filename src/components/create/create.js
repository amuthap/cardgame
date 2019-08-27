import React from 'react';
import request from 'superagent';
import { Container, Card, CardHeader, CardBody, Form, FormGroup, Label, Input, Button, Col, Row, Table, FormText, FormFeedback } from 'reactstrap';
import { API_PORT } from '../../constants';
import _ from 'lodash';
import Footer from '../footer/footer';
import './create.css';
import Helmet from 'react-helmet';
import Logo from '../logo/logo';
import { Link } from 'react-router-dom'

class Create extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      players: 3,
      gameID: "",
      names: {
        0: "Player 1",
        1: "Player 2",
        2: "Player 3",
        3: "Player 4",
        4: "Player 5",
        5: "Player 6",
      },
      secret: {
        0: "",
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
      },
      creating: false,
      created: false,
      model: null,
    };

    this.onPlayersUpdated = this.onPlayersUpdated.bind(this);
    this.onNameUpdated = this.onNameUpdated.bind(this);
    this.readFile = this.readFile.bind(this);
    this.onFileRead = this.onFileRead.bind(this);
    this.createGame = this.createGame.bind(this);

    this.fileReader = new FileReader();
    this.fileReader.onloadend = this.onFileRead;

    this.apiBase = (process.env.NODE_ENV === 'production') ? '/api' : `${window.location.protocol}//${window.location.hostname}:${API_PORT}`;
  }

  async createGame() {
    
    this.setState({
      ...this.state,
      creating: true,
    });

    const r = await request
      .post(`${this.apiBase}/create`)
      .send({
        players: this.state.players,
        model: this.state.model,
        names: this.state.names,
      });

    const gameId = r.body.game;

    for (var i=0; i<r.body.credentials.length; i++) {
      this.setState({
        ...this.state,
        secret: {
          ...this.state.secret,
          [i]: r.body.credentials[i],
        },
      });
    }

    this.setState({
      ...this.state,
      gameID: gameId,
      created: true,
    });
  }

  onFileRead() {
    this.setState({
      ...this.state,
      model: JSON.parse(this.fileReader.result),
    });
  }

  readFile(e) {
    this.fileReader.readAsText(e.target.files[0]);
  }

  onPlayersUpdated(e) {
    this.setState({
      ...this.state,
      players: parseInt(e.target.value),
    });
  }

  onNameUpdated(idx, e) {
    this.setState({
      ...this.state,
      names: {
        ...this.state.names,
        [idx]: e.target.value,
      }
    });
  }

  isFormValid() {
    for (var i=0; i<this.state.players; i++) {
      if (_.isEmpty(this.state.names[i])) {
        return false;
      }
    }
    return true;
  }

  render() {
    let createForm = <div />;
    let linkDisplay = <div />;
    if (!this.state.created) {
      createForm = (
        <div>
          <p>Show game is the simple card game that anyone can play. Make the total sum of your cards to lower and if you think you will be having the lowest sum than others press show button.</p>
          <p><Link to="/about"></Link>.</p>
          <small className="text-muted">To start playing, select the number of players and enter their names.</small>
          <hr />
          <Form>
            <FormGroup row>
              <Label for="players" sm={2}>Players</Label>
              <Col sm={10}>
                <Input type="select" name="players" id="players" onChange={e => this.onPlayersUpdated(e)} value={this.state.players}>
                <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                </Input>
              </Col>
            </FormGroup>
            <hr />
            {Array(this.state.players).fill(0).map((v, i) => 
              <FormGroup row key={i}>
                <Label for={`p${i}`} sm={2}>Name</Label>
                <Col sm={10}>
                  <Input autoComplete={"off"} type="text" invalid={_.isEmpty(this.state.names[i])} name={`p${i}`} id={`p${i}`} onChange={e => this.onNameUpdated(i, e)} value={this.state.names[i]} />
                  <FormFeedback>The name cannot be empty</FormFeedback>
                </Col>
              </FormGroup>
            )}
            <hr />
            
            <hr />
            <Button block size="lg" color="warning" disabled={this.state.creating || !this.isFormValid()} onClick={this.createGame}>Proceed</Button>
          </Form>
          <hr />
          <small className="text-muted">
            Players will be able to join the game with the links that are generated after you proceed.
          </small>
        </div>
      );
    } else {
      linkDisplay = (
        <div>
          <div className="text-center text-muted">
            <p>The following links should be distributed to the players respectively.</p>
          </div>
          <Table>
            <tbody>
            {Array(this.state.players).fill(0).map((v, i) => 
              <tr key={i}>
                <td>{this.state.names[i]}</td>
                <td>
                  <a href={`${window.location.origin}/${this.state.gameID}/${i}/${this.state.secret[i]}`}>{window.location.origin}/{this.state.gameID}/{i}/{this.state.secret[i]}</a>
                </td>
              </tr>
            )}
            </tbody>
          </Table>
          <hr />
          <div className="text-center">
            <small className="text-muted">
              These links are unique for each player and would allow them to join the game.
            </small>
          </div>
        </div>
      );
    }

    return (
      <div>
        <Helmet bodyAttributes={{style: 'background-color : #000'}}/>
        <Container className="create">
          <Row style={{paddingTop: "20px"}}>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <div className="text-center">
                <Logo />
              </div>
              <Card>
                <CardHeader className="text-center">SHOW - Card Game</CardHeader>
                <CardBody>
                  {createForm}
                  {linkDisplay}
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }} className="text-center">
              <Footer />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Create;