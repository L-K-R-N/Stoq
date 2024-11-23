import { texts } from '@/constants';
import { redirect } from 'react-router-dom';

interface Props {}

const ErrorPage: React.FC<Props> = () => {
   redirect(texts.BASE_URL + 'about');
   return <></>;
};

export default ErrorPage;
