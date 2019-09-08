import React, { PureComponent } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,} from "recharts";
import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";

export default class AdminStatistics extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      stats: [],
      isLoading: true,
    }
  }

  async componentDidMount() {
    let stats = this.state.stats;

    try {
      const response = await fetch('http://localhost:4000/favorites/stats/');
      stats = await response.json();
      console.log("admin Statistics Data", stats);

    } finally {
      this.setState({
        stats,
        isLoading: false,
      })
    }
    console.log("state", this.state.stats);
  }

  static jsfiddleUrl = "https://jsfiddle.net/alidingling/vxq4ep63/";

  render() {

    return (
      <Container>
        <Row>
          <Col clssName="mt-5">
            <Card clssName="mt-5">
              <CardHeader> Number of followers per vacation </CardHeader>
              <CardBody>
                <BarChart
                  data={this.state.stats}
                  width={730}
                  height={250}
                  margin={{
                    top: 20,
                    right: 0,
                    left: 20,
                    bottom: 5
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="title" />
                  <YAxis />
                  <Legend />
                  <Bar
                    dataKey="TOTAL_FOLLOWERS"
                    barSize={40}
                    fill="#121212"
                  />
                </BarChart>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}