import React from 'react';
import { ContentWrapper } from '../components/ContentWrapper';
import { SideBar } from '../components/SideBar';


const Home = () => {
    return (
        <div id="wrapper">
            <SideBar/>
            <ContentWrapper/>
        </div>
    );
}

export default Home;
