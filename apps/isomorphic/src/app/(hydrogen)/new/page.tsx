
import PageHeader from '@/app/shared/page-header';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('new Page'),
};

const pageHeader = {
  title: 'new page',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      name: 'new',
    },
  ],
};

export default function BlankPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <div>
        <h1>lksdlkdlskjklfa11111</h1>
      </div>
    </>
  );
}
