import { FC } from 'react';

type AppProps = {
    title: string;
}

const Header: FC<AppProps> = ({ title }) => {
    return <div className='header'><h1>{title}</h1></div>;
};

export default Header;