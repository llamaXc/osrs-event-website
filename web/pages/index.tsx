import Layout from "../components/Layout";
import { FloatingBox } from "../components/FloatingBox";

const IndexPage = () => (
    <Layout title='Home'>
        <FloatingBox
            title={"Hello World"}
            buttonText={"Vist Repo"}
            url={"https://github.com/llamaXc/osrs-event-website"}
        />
    </Layout>
);

export default IndexPage;
