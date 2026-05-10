import './SectionHeader.css';

const SectionHeader = ({ eyebrow, title, description, align = 'left' }) => {
  return (
    <header className={`section-header section-header--${align}`}>
      {eyebrow ? <span className="section-header-eyebrow">{eyebrow}</span> : null}
      <h2 className="section-header-title">{title}</h2>
      {description ? <p className="section-header-description">{description}</p> : null}
    </header>
  );
};

export default SectionHeader;
