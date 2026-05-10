import './EmptyState.css';

const EmptyState = ({ title, description }) => {
  return (
    <div className="empty-state">
      <div className="empty-state-mark" aria-hidden="true" />
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-description">{description}</p>
    </div>
  );
};

export default EmptyState;
