export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__copy">
          &copy; {new Date().getFullYear()} Big Things Software. All rights
          reserved.
        </p>
        <p className="footer__tagline">
          Empowering open-source innovation &mdash; free of charge.
        </p>
      </div>
    </footer>
  );
}
