import React from "react";
import { Button } from "react-bootstrap";
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import API from "../../utils/API";

export class Dashboard extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        user_data : [],
        team_data : [],
        organization_data : []
      };
    }

  disconnect = () => {
    API.logout();
    window.location = "/";
  };

  async componentWillMount () {
    var user_data;
    var orga_data;
    var team_data;
    const [firstResponse, secondResponse, thirdresponse] = await Promise.all([
      API.getUsers(),
      API.getTeams(),
      API.getOrganizations()
    ]);
    user_data = firstResponse.data.users;
    team_data = secondResponse.data.teams;
    orga_data = thirdresponse.data.organizations;
    this.setState({
      user_data : user_data,
      team_data : team_data,
      organization_data : orga_data
    });
  }
  render() {
    const user_columns = [
      {
        Header: 'Email',
        accessor: 'email' // String-based value accessors!
      },
      {
        Header: 'Name',
        accessor: 'name' // String-based value accessors!
      },
      {
        Header: 'Organization',
        accessor: 'organization.name' // String-based value accessors!
      }
    ];
    const team_columns = [
      {
        Header: 'Team',
        accessor: 'name' // String-based value accessors!
      }
    ];
    const organization_columns = [
      {
        Header: 'Organization',
        accessor: 'name' // String-based value accessors!
      }
    ];
    return (
      <div className="Dashboard">
        <h1>Dashboard</h1>
        <ReactTable
          data={this.state.user_data}
          columns={user_columns}
        />
        <ReactTable
          data={this.state.team_data}
          columns={team_columns}
        />

        <ReactTable
          data={this.state.organization_data}
          columns={organization_columns}
        />

        <Button onClick={this.disconnect} block bsSize="large" type="submit">
          Se déconnecter
        </Button>
      </div>
    );
  }
}