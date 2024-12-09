import React from 'react';
import PropTypes from 'prop-types';

const MockComponent = ({ title, description, onAction }) => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{title}</h1>
      <p style={styles.description}>{description}</p>
      <button style={styles.button} onClick={onAction}>
        Perform Action
      </button>
    </div>
  );
};

MockComponent.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  onAction: PropTypes.func,
};

MockComponent.defaultProps = {
  title: 'Default Title',
  description: 'This is a mock component for testing purposes.',
  onAction: () => alert('Action performed!'),
};

const styles = {
  container: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    maxWidth: '400px',
    textAlign: 'center',
  },
  title: {
    fontSize: '1.5em',
    marginBottom: '8px',
  },
  description: {
    fontSize: '1em',
    color: '#666',
    marginBottom: '16px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default MockComponent;
