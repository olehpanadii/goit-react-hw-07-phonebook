import { Formik, Field, ErrorMessage } from 'formik';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import { FaRegIdCard } from 'react-icons/fa';
import * as Yup from 'yup';
import { Button, StyledForm } from './ContactForm.styled';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'components/redux/selectors';
import { addContact } from 'components/redux/operations';

const contactSchema = Yup.object().shape({
  name: Yup.string().min(3, 'Too Short!').required('Required'),
  phone: Yup.string()
    .matches(
      /^\d{3}-\d{3}-\d{4}$/,
      'Invalid phone number. Please enter a valid phone number in the format XXX-XXX-XXXX.'
    )
    .required('Required'),
});

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleSubmit = (name, phone) => {
    const newContact = {
      id: nanoid(),
      name: name,
      phone: phone,
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
          phone: '',
        }}
        validationSchema={contactSchema}
        onSubmit={(values, actions) => {
          handleSubmit(values.name, values.phone);
          actions.resetForm();
        }}
      >
        <StyledForm>
          <label>Name </label>
          <Field name="name" type="text" placeholder="Name Surname" />
          <ErrorMessage component="div" name="name" />

          <label>Number</label>
          <Field name="phone" type="tel" placeholder="000-000-0000" />
          <ErrorMessage component="div" name="phone" />

          <Button type="submit">
            <span>Add contact</span> <FaRegIdCard />
          </Button>
        </StyledForm>
      </Formik>
    </div>
  );
};
