const logout = () => {
  localStorage.removeItem('jid');
  window.location.href = '/signin';
};

export default logout;
