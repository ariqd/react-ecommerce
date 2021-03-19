import "./styles.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="wrap">&copy; Atalla {new Date().getFullYear()}</div>
    </footer>
  );
};

export default Footer;
