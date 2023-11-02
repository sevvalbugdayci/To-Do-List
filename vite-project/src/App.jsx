import './App.css'
import React from 'react';
import { Layout} from 'antd';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SidebarComponent from './components/SidebarComponent'
import HeaderComponent from './components/HeaderComponent';
import MainComponent from './components/mainComponent';
import './styles/app.scss';
const { Header, Sider, Content } = Layout;

const App = () => {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }} >
          <Header>
            <HeaderComponent />
          </Header>       
        <Layout>
            <Sider width={200} theme="light">
              <SidebarComponent />
            </Sider>
            <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280 }}>
              <Routes>
                <Route path='/main' element={<MainComponent/>}/>
              </Routes>
            </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
