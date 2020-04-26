import React from 'react';
import {Card, Button, Container, Row, Col, OverlayTrigger, Tooltip} from "react-bootstrap";
import RadarChart from 'react-svg-radar-chart';
import 'react-svg-radar-chart/build/css/index.css';
import AboutWindow from './AboutWindow';
import { Tag } from 'antd';
import "antd/dist/antd.css";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.formatName = this.formatName.bind(this);
        this.state = {
          aboutShow: false
        };
        this.openAbout = this.openAbout.bind(this);
        this.closeAbout = this.closeAbout.bind(this);
        this.linkSearch = this.linkSearch.bind(this);
        this.renderTooltip = this.renderTooltip.bind(this);
    }

    formatName(name) {
        const a = name.split("-");
        var i;
        var ans = "";
        for (i = 0; i < a.length; i++) {
            const first = a[i].charAt(0).toUpperCase();
            const last = a[i].charAt(a[i].length-1);
            // console.log(a[i]);
            ans += (first + a[i].substring(1, a[i].length-1) + last) + " ";
        }
        return ans;
    }

    openAbout() {
      this.setState({aboutShow: true});
    }

    closeAbout() {
      this.setState({aboutShow: false});
    }

    linkSearch() {
      const c = this.props.params;
      window.location.replace(window.location.origin + "/#/search?" + 
      encodeURI("ver=" + this.props.version + "&name=" + this.props.name+'&breed='+c[2]+'&height='+c[3]+'&weight='+c[4]+'&pop='+c[5]+'&personality='+c[6]));
      window.location.reload(true)
    }

    renderTooltip(props) {
      return (
        <Tooltip id="button-tooltip" {...props}>
          Search with the same settings as before!
        </Tooltip>
      );
    }

    render() {
        // const tagColors = ["orange", "cyan", "lime", "gold", "geekblue", "magenta", "volcano", "purple"];
        const tagColors = ["black", "#6F4016", "#416366", "#414966"];
        if (this.props.tab2) {
          return(
            <>
            <AboutWindow show={this.state.aboutShow} close={this.closeAbout} body={this.props.about} title={this.formatName(this.props.name)} name={this.props.name} />
            <Card border='dark' style={{ boxShadow:'3px 3px 3px 3px rgba(50,50,50,0.24)', width: '20rem', flex: '1', size: 'cover', color:'#1B4F72', fontFamily: 'Loki', marginBottom: '2em'}}>
                <Card.Img variant="top" src={require('./dogpics/' + this.props.name + '.jpg')} height='300px' style={{objectFit: 'cover'}} />
                <Card.Body>
                <Card.Title>{this.props.rank + ". " + this.formatName(this.props.name)}</Card.Title>
                  <Container>
                    <Row className="justify-content-md-center">
                      {this.props.traits.split(",").map((value)=> (
                        <Tag color={tagColors[Math.floor(Math.random() * tagColors.length)]} 
                        style={{fontWeight: 'bold', fontFamily: '"Lucida Console", Courier, monospace', marginTop: '0.5em', 
                        padding: '0.1em', fontSize: '14px'}}>&nbsp;{value.trim()}&nbsp;</Tag>
                      ))}
                    </Row>
                    <Row className="justify-content-md-center">
                      <Col sm={0}>
                        <Button onClick={this.openAbout} style={{fontFamily: 'Loki', fontWeight:'bold', backgroundColor:'rgba(50, 50, 50, 0.3)', 
                        border: '2px solid black', borderRadius: '3px', color: 'black', marginTop: '1em', marginBottom: '2em'}}>Learn More</Button>
                      </Col>
                    </Row>
                  </Container>
                </Card.Body>
            </Card>
            </>
          );}
        const data = [
            {
              data: {
                breed: this.props.similarity,
                personality: ((this.props.version>1)? this.props.similarity : 0),
                height: this.props.height,
                weight: this.props.weight,
                popularity: this.props.popularity,
              },
              meta: { color: 'aqua' }
            }
          ];

      const captions = {
            // columns
            breed: 'Breed Sim',
            personality: 'Personality Sim',
            height: 'Height Sim',
            weight: 'Weight Sim',
            popularity: 'Popularity'
          };
        return (
            <>
            <AboutWindow show={this.state.aboutShow} close={this.closeAbout} body={this.props.about} title={this.formatName(this.props.name)} name={this.props.name} />
            <Card border='dark' style={{ boxShadow:'3px 3px 3px 3px rgba(50,50,50,0.24)', width: '20rem', flex: '1', size: 'cover', color:'#1B4F72', fontFamily: 'Loki', marginBottom: '2em'}}>
                <Card.Header> </Card.Header>
                <Card.Img variant="top" src={require('./dogpics/' + this.props.name + '.jpg')} height='300px' style={{objectFit: 'cover'}} />
                <Card.Body>
                <Card.Title>{this.props.rank + ". " + this.formatName(this.props.name)}</Card.Title>
                  <Container>
                    <Row className="justify-content-md-center">
                      <RadarChart captions={captions} data={data} size={250}/>
                    </Row>
                    <Row>
                      <Col sm={0}>
                        <Button onClick={this.openAbout} style={{fontFamily: 'Loki', fontWeight:'bold', backgroundColor:'rgba(50, 50, 50, 0.3)', 
                        border: '2px solid black', borderRadius: '3px', color: 'black', marginTop: '1em', marginBottom: '2em'}}>Learn More</Button>
                      </Col>
                      <Col sm={2}>
                      <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={this.renderTooltip}
                      >
                        <Button onClick={this.linkSearch} style={{fontFamily: 'Loki', fontWeight:'bold', backgroundColor:'rgba(50, 50, 50, 0.3)', 
                        border: '2px solid black', borderRadius: '3px', color: 'black', marginTop: '1em', marginBottom: '2em'}}>Search Me</Button>
                      </OverlayTrigger>
                        
                      </Col>
                    </Row>
                  </Container>
                </Card.Body>
            </Card>
            </>
        );
    }
}

export default App;
