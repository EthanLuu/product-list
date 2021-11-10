import { useParams } from 'react-router';

export default () => {
  const { key } = useParams<{ key: string }>();
};
