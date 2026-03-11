export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] py-12 px-8 bg-[var(--color-surface)] backdrop-blur-md transition-all duration-300">
      <div className="max-w-[1120px] mx-auto flex justify-between items-center flex-wrap gap-4 max-md:flex-col max-md:text-center">
        <p className="text-sm text-[var(--color-text-muted)]">
          &copy; {new Date().getFullYear()} Big Things Software. All rights
          reserved.
        </p>
        <p className="text-sm text-[var(--color-text-muted)] font-medium">
          Empowering open-source innovation &mdash; free of charge.
        </p>
      </div>
    </footer>
  );
}
