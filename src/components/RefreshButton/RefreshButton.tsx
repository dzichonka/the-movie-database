type RefreshButtonProps = {
  onClick?: () => void;
};

const RefreshButton = (props: RefreshButtonProps) => {
  const { onClick } = props;
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button className="btn" onClick={handleClick}>
      Fix it!
    </button>
  );
};

export default RefreshButton;
