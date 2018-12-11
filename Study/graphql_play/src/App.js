import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import { USERS } from "./API/graphQL/query/Users";
import { ADD_USER } from "./API/graphQL/mutation/AddUser";

class App extends Component {
  state = {
    text: ""
  };

  handleTextEdit = event => {
    this.setState({
      text: event.target.value
    });
  };

  render() {
    const { text } = this.state;
    return (
      <div className="App" style={{ margin: "30px" }}>
        <h1>todo</h1>
        <div>
          <input type="text" value={text} onChange={this.handleTextEdit} />
          <Mutation
            mutation={ADD_USER}
            refetchQueries={[{ query: USERS }]}
            variables={{ name: text }}
          >
            {(addUser, { data }) => {
              return <button onClick={addUser}>등록</button>;
            }}
          </Mutation>
        </div>
        <ol>
          <Query query={USERS}>
            {({ loading, error, data }) => {
              if (loading) {
                return <p>...loading</p>;
              }
              if (error) console.error(error);
              if (data) {
                return data.users.map(({ id, name }, index) => (
                  <li
                    key={id}
                    style={{
                      padding: "10px",
                      borderBottom: "1px solid #ededed"
                    }}
                  >
                    {name}
                  </li>
                ));
              }
            }}
          </Query>
        </ol>
      </div>
    );
  }
}

export default App;
