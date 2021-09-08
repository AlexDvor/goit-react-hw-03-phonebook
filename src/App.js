import { Container } from "./components/Container/Container";
import { Component } from "react";
import Form from "./components/Form";
import Contact from "./components/Contact";
import Filter from "./components/Filter";

class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],

    filter: "",
  };

  getData = (data) => {
    const newContacts = {
      name: data.name,
      id: data.id,
      number: data.number,
    };
    this.updateContacts(newContacts);
  };

  updateContacts = (newData) => {
    this.state.contacts.some((item) => item.name === newData.name)
      ? alert(`${newData.name} is already in contacts`)
      : this.setState((prevState) => ({
          contacts: [newData, ...prevState.contacts],
        }));
  };

  handleFilterByName = (e) => {
    const value = e.target.value;
    this.setState({
      filter: value,
    });
  };

  renderListName = (array, name) => {
    return array.filter((item) =>
      item.name.toLowerCase().includes(name.toLowerCase())
    );
  };

  deleteNameItem = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((item) => item.id !== id),
    }));
  };

  render() {
    // console.log("render", this.state.contacts);
    const { contacts, filter } = this.state;

    return (
      <Container>
        <h2>Phonebook</h2>
        <Form getData={this.getData} />
        <h2>Contacts</h2>
        <Filter filter={filter} onChange={this.handleFilterByName} />
        <Contact
          data={this.renderListName(contacts, filter)}
          onDeleteNameItem={this.deleteNameItem}
        ></Contact>
      </Container>
    );
  }
}

export default App;
