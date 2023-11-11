import { Formik, Field, ErrorMessage } from 'formik';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import { FaRegIdCard } from 'react-icons/fa';
import * as Yup from 'yup';
import { Button, StyledForm } from './ContactForm.styled';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'components/redux/contactsSlice';

const contactSchema = Yup.object().shape({
  name: Yup.string().min(3, 'Too Short!').required('Required'),
  number: Yup.string()
    .matches(
      /^\d{3}-\d{2}-\d{2}$/,
      'Invalid phone number. Please enter a valid phone number in the format XXX-XX-XX.'
    )
    .required('Required'),
});

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.list);

  const handleSubmit = (name, number) => {
    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };
    const isContactDublicate = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (isContactDublicate) {
      Notiflix.Notify.failure(`${newContact.name} is already in contacts.`);
      return;
    }
    dispatch(addContact(newContact));
  };
  return (
    <div>
      <Formik
        initialValues={{
          name: '',
          number: '',
        }}
        validationSchema={contactSchema}
        onSubmit={(values, actions) => {
          handleSubmit(values.name, values.number);
          actions.resetForm();
        }}
      >
        <StyledForm>
          <label>Name </label>
          <Field name="name" type="text" placeholder="Name Surname" />
          <ErrorMessage component="div" name="name" />

          <label>Number</label>
          <Field name="number" type="tel" placeholder="000-00-00" />
          <ErrorMessage component="div" name="number" />

          <Button type="submit">
            <span>Add contact</span> <FaRegIdCard />
          </Button>
        </StyledForm>
      </Formik>
    </div>
  );
};
