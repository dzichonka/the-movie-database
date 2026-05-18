import RefreshButton from '../../components/RefreshButton/RefreshButton';

type ErrorPageProps = {
  onRefresh: () => void;
};
const ErrorPage = ({ onRefresh }: ErrorPageProps) => (
  <>
    <div className="container">
      <h1>Error boundary caught an error</h1>
      <RefreshButton onClick={onRefresh} />
    </div>
  </>
);
export default ErrorPage;
