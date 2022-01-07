import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";

type Props = {
    children?: ReactNode;
    title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta charSet='utf-8' />
                <meta
                    name='viewport'
                    content='initial-scale=1.0, width=device-width'
                />
            </Head>
            <header>
                <nav className="navbar">
                    <Link href='/'>
                        <a>Home</a>
                    </Link>

                    <Link href='account'>
                        <a>Accounts</a>
                    </Link>
                </nav>
            </header>
            <div className="bodyContent">
                {children}
            </div>
        </div>
    );
};

export default Layout;
