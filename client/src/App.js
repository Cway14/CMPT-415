import { useEffect, useState } from "react";
import { useFormik } from 'formik';

const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

function App() {
  const [users, setUsers] = useState([{}])

  useEffect(() => {
    fetch('/api').then(
      res => res.json()
    ).then(
      data => {
        setUsers(data)
      }
    )
  }, [])

  return (
    <div className="App">
      { (typeof users.users === 'undefined') ? (
        <p>loading...</p>
      ) : (
        users.users.map((user, i) => (
          <p key={i}>{user}</p>
        ))
      )}
      <SignupForm />
    </div>
  );
}

export default App;
