import Link from 'next/link'
import Layout from '../components/Layout'

const MyTitleBar = () => {
    return (
        <div>
            <h4>Look at this custom resuable compoment!!!</h4>
            <p>
                Many more title bars can called by using{" "}
                <code>{"<MyTitleBar>"}</code>
            </p>
        </div>
    );
};

const AboutPage = () => (
    <Layout title='About | Next.js + TypeScript Example'>
        <h1>About</h1>
        <MyTitleBar />
    </Layout>
);

export default AboutPage
