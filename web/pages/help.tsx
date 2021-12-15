import Link from "next/link";
import Layout from "../components/Layout";

const HelpPage = () => (
    <Layout title='Help | Set a title here'>
        <h1>Help page</h1>
        <p>You are on /help page! Check the url! </p>
        <p>
            More pages can be made by following this pattern shown in help.tsx
        </p>
        <p>
            <Link href='/'>
                <a>Go home</a>
            </Link>
        </p>
    </Layout>
);

export default HelpPage;
