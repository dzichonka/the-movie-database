import RefreshButton from '../../components/RefreshButton/RefreshButton';

type ErrorPageProps = {
  onRefresh: () => void;
};
export const ErrorPage = ({ onRefresh }: ErrorPageProps) => (
  <>
    <div>
      <h1>error boundary caught an error</h1>
      <RefreshButton onClick={onRefresh} />
    </div>
  </>
);
