import Container from '../../components/common/Container';
import { LeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export default function NavOrganizerDash() {

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white">
     <Container className="flex h-16 items-center justify-between px-4">
        <a href="/" className="flex items-center gap-2 font-bold text-slate-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-blue-500" />
          <span className="text-lg">Evenzaa</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex text-slate-600 hover:text-slate-900 ">
            <LeftOutlined style={{fontSize:"12px"}}/>
            <Link
                to="/"
                className="font-medium cursor-pointer text-base"
                >
                Back To Website
            </Link>
        </nav>

      </Container>
    </header>
  );
}
