import './styles/main.scss';

import { Layout } from './components/layout/Layout/Layout';
import { MainPage } from './pages/other/MainPage';

const App = () => {
   return (
      <div className="">
         <Layout>
            <MainPage />
         </Layout>
      </div>
   );
};

export default App;
