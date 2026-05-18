import RefreshButton from '../../components/RefreshButton/RefreshButton';

type ErrorPageProps = {
  onRefresh: () => void;
};
const ErrorPage = (props: ErrorPageProps) => {
  const { onRefresh } = props;
  return (
    <>
      <div className="container">
        <h1>Error boundary caught an error</h1>
        <RefreshButton onClick={onRefresh} />
      </div>
    </>
  );
};
export default ErrorPage;
