import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import ContactForm from 'components/ContactForm';
import Filter from 'components/Filter';
import ContactList from 'components/ContactList';

import css from './App.module.scss';

export class App extends Component {
    state = {
        contacts: [
            { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
            { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
            { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
            { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
        ],
        filter: '',
    };

    // ================== LOGIC
    addContact = (name, number) => {
        const contact = {
            id: nanoid(),
            name,
            number,
        };

        let includesName = false;
        this.state.contacts.map(contact => {
            contact.name === name && (includesName = true);
            return includesName;
        });

        includesName
            ? Notify.warning(name + ' is already in contacts')
            : this.setState(({ contacts }) => ({
                  contacts: [contact, ...contacts],
            }));
    };

    handlerFilter = evt => {
        const { name, value } = evt.currentTarget;
        this.setState({
            [name]: value,
        });
    };
    // ================== /LOGIC

    render() {
        const { contacts, filter } = this.state;

        // ==================== FILTER
        const normalizedFilter = filter.toLowerCase();
        const filterContacts = contacts.filter(contact =>
            contact.name.toLowerCase().includes(normalizedFilter),
        );
        // ==================== /FILTER

        return (
            <div className={css.container}>
                <h1 className={css.title}>Phonebook</h1>
                <ContactForm onSubmit={this.addContact} />
                <h2 className={css.title}>Contacts</h2>
                <Filter onFilter={this.handlerFilter} />
                <ContactList contacts={filterContacts} />
            </div>
        );
    }
}
