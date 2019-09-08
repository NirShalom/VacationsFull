import * as React from 'react';
import { VacationsEditor, IEditorProps } from './VacationsEditor';
import { Container, Row } from "react-bootstrap";

interface IAppState {
  vacations: IEditorProps[];
  isLoading: boolean;
}

class AdminVacationsList extends React.Component<any, IAppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      vacations: [],
      isLoading: true,
    }
  }

  async componentDidMount() {
    let vacations = this.state.vacations;

    try {
      const response = await fetch('http://localhost:4000/vacations');
      vacations = await response.json();
      console.log(vacations);

    } finally {
      this.setState({
        vacations,
        isLoading: false,
      })
    }
  }

  render() {
    const { vacations, isLoading } = this.state;
    if (isLoading) {
      return <div> Loading </div>
    }
    return (
      <Container>
      <h4 className="display-4 text-center" style={{ color: 'red' }}>ADMIN VACATIONS EDITOR</h4>
      
      <Row className="justify-content-sm-center">
        {vacations.map(vacation =>
          <VacationsEditor key={vacation.id} {...vacation}
            onDelete={this.onDelete}
            onEdit = {this.onEdit}
          />
          
        )}
        </Row>
      
      </Container>
    );
  }

onEdit = (updatedVacation: any) => {
  console.log(updatedVacation);
  const { vacations } = this.state;
  const vacationToEdit = vacations.findIndex (vacation => vacation.id == updatedVacation.id)
  console.log("Before update: ", vacations[vacationToEdit])
  console.log("all vacations before update", vacations)

  vacations[vacationToEdit] = updatedVacation
  console.log("After update: ", vacations[vacationToEdit])

  this.setState({
    vacations: vacations
  });
  console.log("all vacations after update", vacations)

}

  onDelete = (id: number) => {
    const { vacations } = this.state;
    const vacationsAfterDelete = vacations.filter(vacation => vacation.id !== id)
    this.setState({
      vacations: vacationsAfterDelete
    });
  }
}


export default AdminVacationsList