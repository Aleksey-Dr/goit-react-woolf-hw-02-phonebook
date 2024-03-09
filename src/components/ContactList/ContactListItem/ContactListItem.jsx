import css from './ContactListItem.module.scss';

const ContactListItem = ({ contact }) => {
    const { name, number } = contact;
    return (
        <li className={css['list-item']}>
            <span>{name}:</span>
            <span className={css['phone']}>{number}</span>
        </li>
    );
};

export default ContactListItem;
