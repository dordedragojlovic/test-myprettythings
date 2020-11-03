function clearAlert(timer) {
  clearTimeout(timer);
}

function onError(errorObj, setError, setLoading) {
  const message = errorObj.split('GraphQL error:').join('');

  setError(message);

  const timer = setTimeout(() => {
    setError('');
    setLoading(false);
    clearAlert(timer);
  }, 2700);
}

export default onError;
