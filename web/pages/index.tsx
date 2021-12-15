import Layout from "../components/Layout";
import { FloatingBox } from "../components/FloatingBox";

interface Props {
    username: string;
}

const IndexPage = (props: Props) => (
    <Layout title='Home | Next.js + TypeScript Example'>
        <FloatingBox
            title={props.username}
            buttonText={"Vist Repo"}
            url={"https://github.com/llamaXc/osrs-event-website"}
        />
    </Layout>
);

// Example of loading API data on page load.
// TODO: Use some state manager like Redux/Recoil/etc.
export async function getStaticProps() {
    // const res = await fetch(`https://.../data`);
    // const data = await res.json();
    // if (!data) {
    //     return {
    //          props: { username: "No user found" },
    //     };
    // }
    // return {
    //     props: { username: data.username },
    // };
    return {
        props: { username: "Hey there!" },
    };
}

export default IndexPage;
